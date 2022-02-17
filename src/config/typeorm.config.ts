import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const env = process.env.NODE_ENV;
const database = env === 'test' ? ':memory:' : 'data.db';
const synchronize = env === 'production' ? false : true;

export const typeormConfig: SqliteConnectionOptions = {
  type: 'sqlite',
  entities: ['/src/**/*.entity.ts'],
  logging: false,
  database,
  synchronize,
};
