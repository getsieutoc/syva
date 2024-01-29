import { AudioTranscriptSentencesLoader } from 'langchain/document_loaders/web/assemblyai';
import { PGVectorStore } from '@langchain/community/vectorstores/pgvector';
import { TokenTextSplitter } from 'langchain/text_splitter';
import { NextRequest, NextResponse } from 'next/server';
import { OpenAIEmbeddings } from '@langchain/openai';
import { config } from '@/lib/pgvector';
import { prisma } from '@/lib/prisma';

type AnalyzeRequest = {
  audioUrl: string;
  audioStartFrom?: number;
  audioEndAt?: number;
};

export async function POST(req: NextRequest) {
  const {
    audioUrl,
    audioStartFrom = 0,
    audioEndAt = 5,
  }: AnalyzeRequest = await req.json();

  const loader = new AudioTranscriptSentencesLoader({
    audio: audioUrl,
    audio_start_from: audioStartFrom * 1000,
    audio_end_at: audioEndAt * 1000,
  });

  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: 'text-embedding-3-large',
    batchSize: 1024, // Default value if omitted is 512. Max is 2048
  });

  const splitter = new TokenTextSplitter({
    encodingName: 'cl100k_base',
    chunkSize: 100,
    chunkOverlap: 5,
  });

  const link = await prisma.link.create({
    data: {
      url: audioUrl,
      user: { connect: { id: 'hc2d0re130ohhokbf7elgiil' } },
    },
  });

  const pgvectorStore = await PGVectorStore.initialize(embeddings, {
    ...config,
    tableName: link.id,
  });

  const docs = await loader.load();

  const splittedDocs = await splitter.splitDocuments(docs);

  await pgvectorStore.addDocuments(splittedDocs);

  return NextResponse.json({ docs });
}
