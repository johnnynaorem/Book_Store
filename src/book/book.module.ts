import { Module } from '@nestjs/common';
import { BookService } from './services/book/book.service';
import { BookController } from 'src/book/controllers/book/book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/models/book.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), UserModule],
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}
