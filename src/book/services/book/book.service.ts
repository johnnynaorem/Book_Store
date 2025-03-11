import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDto } from 'src/book/dtos/create-book';
import { Book } from 'src/models/book.entity';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepo: Repository<Book>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async createBook(book: CreateBookDto, userId: number): Promise<Book> {
    const { title, author, pages } = book;
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const newBook = this.bookRepo.create({ title, author, pages, user });
    return await this.bookRepo.save(newBook);
  }

  find() {
    return this.bookRepo.find({ relations: ['user'] });
  }

  findOne(bookId: number) {
    return this.bookRepo.findOne({
      where: { id: bookId },
      relations: ['user'],
    });
  }

  async update(bookId: number, updateBook: CreateBookDto) {
    const existBook = await this.findOne(bookId);
    if (!existBook) throw new NotFoundException('book not found....');
    this.bookRepo.update({ id: bookId }, { ...updateBook });
    return {
      status: true,
      message: 'Book updated successfully.',
    };
  }

  async delete(bookId: number) {
    const book = await this.findOne(bookId);
    if (!book) throw new NotFoundException('book not found....');
    this.bookRepo.delete(book);
    return {
      status: true,
      message: 'Book deleted successfully.',
    };
  }
}
