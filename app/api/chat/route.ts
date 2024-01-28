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

    const retriever = vectorStore.asRetriever({});

    const template = `You are an excellent HR assistant. Use the following pieces of context to answer the question at the end.
      If you don't know the answer, just say that you don't know, don't try to make up an answer.
      Use three sentences maximum and keep the answer as concise as possible.
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
