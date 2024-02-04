import { AssemblyAI } from 'assemblyai';

declare global {
  // We need var in declare global
  // eslint-disable-next-line no-var, vars-on-top
  var assembly: AssemblyAI | undefined;
}

if (!process.env.ASSEMBLYAI_API_KEY) {
  throw new Error('ASSEMBLYAI_API_KEY is needed');
}

const assembly =
  global.assembly || new AssemblyAI({ apiKey: process.env.ASSEMBLYAI_API_KEY });

if (process.env.NODE_ENV === 'development') {
  global.assembly = assembly;
}

export { assembly };
