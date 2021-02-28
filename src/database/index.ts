import { getConnectionOptions, Connection, createConnection } from 'typeorm';

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  const isTestEnv =  process.env.NODE_ENV.trim() === 'test';
  
  return createConnection(
    Object.assign(defaultOptions, {
      database: isTestEnv
        ? './src/database/database.test.sqlite'
        : defaultOptions.database,
    })
  );
};
