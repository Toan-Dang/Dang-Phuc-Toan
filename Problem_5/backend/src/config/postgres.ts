import 'reflect-metadata';
import { User } from '../entity/User';
import { UserLogin } from '../entity/UserLogin';
import { UserToken } from '../entity/UserToken';
import { Resource } from '../entity/Resource';
import { DataSource } from 'typeorm';
import config from "./config";
import { Pool } from 'pg';

const typeOrmConfig = new DataSource ({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: config.postgres.username,
  password: config.postgres.password,
  database: config.postgres.database,
  synchronize: true,
  logging: false,
  entities: [
    User,
    UserLogin,
    UserToken,
    Resource
  ]
});

const pool = new Pool({
  user: config.postgres.username,
  host: 'localhost',
  database: config.postgres.database,
  password: config.postgres.password,
  port: 5432,
});
const userRepository = typeOrmConfig.getRepository(User);
const resourceRepository = typeOrmConfig.getRepository(Resource);
export {
  pool,
  typeOrmConfig,
  userRepository,
  resourceRepository,
}