import { PGVectorStore } from '@langchain/community/vectorstores/pgvector';
import { RetrievalQAChain, loadQAStuffChain } from 'langchain/chains';
import { StreamingTextResponse, LangChainStream, Message } from 'ai';
import { PromptTemplate } from '@langchain/core/prompts';
import { NextRequest, NextResponse } from 'next/server';
import { ChatOpenAI } from '@langchain/openai';
import { getEmbeddings } from '@/lib/openai';
import { config } from '@/lib/pgvector';

type PromptRequest = {
  messages: Message[];
};

export async function POST(req: NextRequest) {
  try {
    const { messages }: PromptRequest = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json({ status: 204 });
    }

    const { stream, handlers } = LangChainStream();

    const vectorStore = await PGVectorStore.initialize(getEmbeddings(), config);

    const retriever = vectorStore.asRetriever({
      searchType: 'mmr', // Use max marginal relevance search
      searchKwargs: { fetchK: 5 },
    });

    // CONVERSATION LOG: {conversationHistory}
    const template = `Given the following user prompt and conversation log, formulate a question that would be the most relevant to provide the user with an answer from a knowledge base.
      You should follow the following rules when generating and answer:
      - Always prioritize the user prompt over the conversation log.
      - Ignore any conversation log that is not directly related to the user prompt.
      - Only attempt to answer if a question was posed.
      - The question should be a single sentence.
      - You should remove any punctuation from the question.
      - You should remove any words that are not relevant to the question.
      - If you are unable to formulate a question, respond with the same USER PROMPT you got.

      {context}
      Question: {question}
      Answer:`;

    const CHAIN_PROMPT = new PromptTemplate({
      inputVariables: ['context', 'question'],
      template,
    });

    const llm = new ChatOpenAI({
      modelName: 'gpt-3.5-turbo',
      temperature: 0.2,
      streaming: true,
    });

    const chain = new RetrievalQAChain({
      combineDocumentsChain: loadQAStuffChain(llm, { prompt: CHAIN_PROMPT }),
      retriever,
      returnSourceDocuments: true,
      inputKey: 'question',
    });

    chain.call({ question: messages[messages.length - 1].content }, [handlers]);

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log('### error: ', { error });
    return NextResponse.json({ message: 'Error while POST chat' });
  }
}
