import { env } from 'process';
import { DataSource } from 'typeorm';

console.log(env.DB_HOST);
const source = new DataSource({
  type: 'postgres',
  host: env.DB_HOST,
  port: parseInt(env.DB_PORT),
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  entities: ['src/**/entities/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  synchronize: false,
});

export default source;
