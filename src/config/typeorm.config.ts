import { join } from 'path';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const env = process.env.NODE_ENV;
const database = env === 'test' ? ':memory:' : 'data.db';
const synchronize = env === 'production' ? false : true;
const entities = [join(__dirname, '..', '**', '*.entity.{js,ts}')];

export const typeormConfig: SqliteConnectionOptions = {
  type: 'sqlite',
  entities,
  logging: false,
  database,
  synchronize,
};
