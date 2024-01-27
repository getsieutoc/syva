import { AudioTranscriptSentencesLoader } from 'langchain/document_loaders/web/assemblyai';
import { PGVectorStore } from '@langchain/community/vectorstores/pgvector';
import { NextRequest, NextResponse } from 'next/server';
import { OpenAIEmbeddings } from '@langchain/openai';
import { config } from '@/lib/pgvector';

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

  const docs = await loader.load();

  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: 'text-embedding-3-large',
    batchSize: 1024, // Default value if omitted is 512. Max is 2048
    // dimensions: 1024,
  });

  const pgvectorStore = await PGVectorStore.initialize(embeddings, config);

  await pgvectorStore.addDocuments(docs);

  return NextResponse.json({ docs });
}
