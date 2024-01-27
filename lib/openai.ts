import deepmerge from 'deepmerge';
import { OpenAIEmbeddings, OpenAIEmbeddingsParams } from '@langchain/openai';

const defaultConfigs = {
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: 'text-embedding-3-large',
  batchSize: 1024, // Default value if omitted is 512. Max is 2048
  // dimensions: 1024,
};

export const getEmbeddings = (configs?: Partial<OpenAIEmbeddingsParams>) => {
  const embeddings = new OpenAIEmbeddings(
    deepmerge(configs ?? {}, defaultConfigs)
  );

  return embeddings;
};
