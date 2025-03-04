import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Book } from './book.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  // @Column({ type: 'boolean', default: false })
  // isActive: boolean;

  @OneToMany(() => Book, (book) => book.user)
  books: Book[];
}
