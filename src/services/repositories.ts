import { Repository } from "typeorm";
import { dataSource } from "../config/dataSource";
import { User } from "../entities/user.entity";
import { News } from "../entities/news.entity";
import { Category } from "../entities/category.entity";

export const UserRepository: Repository<User> = dataSource.getRepository(User);

export const NewsRepository: Repository<News> = dataSource.getRepository(News);

export const CategoryRepository: Repository<Category> = dataSource.getRepository(Category);
