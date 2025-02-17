// data-source.ts
import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from './env';
import { News } from '../entities/news.entity';
import { Category } from '../entities/category.entity';

export const dataSource = new DataSource({
  type: 'mysql',
  host: DB_HOST || 'localhost',
  port: 3306,
  username: DB_USER || 'root',
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [User, News, Category],
  synchronize: true,
});
