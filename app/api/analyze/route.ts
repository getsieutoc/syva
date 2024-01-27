// https://js.langchain.com/docs/integrations/document_loaders/web_loaders/assemblyai_audio_transcription#usage
import {
  // AudioTranscriptLoader,
  AudioTranscriptParagraphsLoader,
  // AudioTranscriptSentencesLoader
} from 'langchain/document_loaders/web/assemblyai';

// You can also use a local file path and the loader will upload it to AssemblyAI for you.
const audioUrl =
  'https://syvahiredemo.s3.eu-central-1.amazonaws.com/yt1s.com+-+Software+Engineering+Job+Interview+Full+Mock+Interview.mp3';

export async function POST() {
  const loader = new AudioTranscriptParagraphsLoader({
    audio: audioUrl,
    audio_end_at: 10000,
  });

  const docs = await loader.load();
  console.log('### docs: ', { docs });
}
