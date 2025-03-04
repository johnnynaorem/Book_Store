import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ type: 'int', default: 0 })
  pages: number;

  @ManyToOne(() => User, (user) => user.books, { onDelete: 'CASCADE' })
  user: User;
}
