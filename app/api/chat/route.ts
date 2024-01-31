import {
  StringOutputParser,
  BytesOutputParser,
} from '@langchain/core/output_parsers';
import { PGVectorStore } from '@langchain/community/vectorstores/pgvector';
import { StreamingTextResponse, Message as VercelChatMessage } from 'ai';
import { RunnableSequence } from '@langchain/core/runnables';
import { PromptTemplate } from '@langchain/core/prompts';
import { NextRequest, NextResponse } from 'next/server';
import { Document } from '@langchain/core/documents';
import { ChatOpenAI } from '@langchain/openai';
import { getEmbeddings } from '@/lib/openai';
import { getMemory } from '@/lib/memory';
import { config } from '@/lib/pgvector';
import { prisma } from '@/lib/prisma';

const combineDocumentsFn = (docs: Document[]) => {
  const serializedDocs = docs.map((doc) => doc.pageContent);
  return serializedDocs.join('\n\n');
};

const formatVercelMessages = (chatHistory: VercelChatMessage[]) => {
  const formattedDialogueTurns = chatHistory.map((message) => {
    if (message.role === 'user') {
      return `Human: ${message.content}`;
    } else if (message.role === 'assistant') {
      return `Assistant: ${message.content}`;
    } else {
      return `${message.role}: ${message.content}`;
    }
  });
  return formattedDialogueTurns.join('\n');
};

const questionTemplate = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question, in simple and consice English.

  <chat_history>
    {chat_history}
  </chat_history>

  Follow Up Input: {question}
  Standalone question:`;

const answerTemplate = `You are an experienced interviewer, you can address all aspects of the interview process and answer inquiries from both the company's perspective and the candidate's side.
  Answer the question based only on the following context and chat history:

  <context>
    {context}
  </context>

  <chat_history>
    {chat_history}
  </chat_history>

  Question: {question}`;

const questionPrompt = PromptTemplate.fromTemplate(questionTemplate);

const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);

type PromptRequest = {
  audioUrl: string;
  messages: VercelChatMessage[];
};

export async function POST(req: NextRequest) {
  try {
    const { audioUrl, messages }: PromptRequest = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json({ status: 204 });
    }

    const { question, previousMessages } = getMemory(messages);

    const link = await prisma.link.findFirst({
      where: { url: audioUrl },
    });

    if (!link) {
      throw new Error('Link not found in our systems');
    }

    const vectorStore = await PGVectorStore.initialize(getEmbeddings(), {
      ...config,
      tableName: link.id,
    });

    const llm = new ChatOpenAI({
      modelName: 'gpt-3.5-turbo',
      temperature: 0.2,
      streaming: true,
    });

    const standaloneQuestionChain = RunnableSequence.from([
      questionPrompt,
      llm,
      new StringOutputParser(),
    ]);

    let resolveWithDocuments: (value: Document[]) => void;
    const documentPromise = new Promise<Document[]>((resolve) => {
      resolveWithDocuments = resolve;
    });

    const retriever = vectorStore.asRetriever({
      callbacks: [
        {
          handleRetrieverEnd(documents) {
            resolveWithDocuments(documents);
          },
        },
      ],
    });

    const retrievalChain = retriever.pipe(combineDocumentsFn);

    const answerChain = RunnableSequence.from([
      {
        context: RunnableSequence.from([
          (input) => input.question,
          retrievalChain,
        ]),
        chat_history: (input) => input.chat_history,
        question: (input) => input.question,
      },
      answerPrompt,
      llm,
    ]);

    const conversationalRetrievalQAChain = RunnableSequence.from([
      {
        question: standaloneQuestionChain,
        chat_history: (input) => input.chat_history,
      },
      answerChain,
      new BytesOutputParser(),
    ]);

    const stream = await conversationalRetrievalQAChain.stream({
      question,
      chat_history: formatVercelMessages(previousMessages),
    });

    const documents = await documentPromise;
    const serializedSources = Buffer.from(
      JSON.stringify(
        documents.map((doc) => {
          return {
            pageContent: doc.pageContent.slice(0, 50) + '...',
            metadata: doc.metadata,
          };
        })
      )
    ).toString('base64');

    return new StreamingTextResponse(stream, {
      headers: {
        'x-message-index': (previousMessages.length + 1).toString(),
        'x-sources': serializedSources,
      },
    });
  } catch (error) {
    return NextResponse.json({ message: 'Error while POST chat' });
  }
}
