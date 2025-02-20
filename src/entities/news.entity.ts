import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, JoinTable } from "typeorm";
import { User } from "./user.entity";
import { Category } from "./category.entity";
import { NewsStatus } from "../@types/news";

@Entity("news")
export class News {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  topic!: string;

  @Column("text")
  content!: string;

  @Column()
  banner!: string;

  @Column({ type: "enum", enum: NewsStatus, default: NewsStatus.DRAFT })
  status!: NewsStatus;

  @Column({ nullable: true })
  description!: string;

  @ManyToOne(() => User, (user) => user.blogs)
  user!: User;

  @ManyToMany(() => Category)
  @JoinTable()
  categories!: Category[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

}