import { PGVectorStoreArgs } from '@langchain/community/vectorstores/pgvector';

export const config: PGVectorStoreArgs = {
  postgresConnectionOptions: {
    connectionString: process.env.PGVECTOR_URL ?? '',
  },
  tableName: 'langchain',
  columns: {
    idColumnName: 'id',
    vectorColumnName: 'vector',
    contentColumnName: 'content',
    metadataColumnName: 'metadata',
  },
};
