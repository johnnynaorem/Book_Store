import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateBookDto } from 'src/book/dtos/create-book';
import { BookService } from 'src/book/services/book/book.service';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}
  @Post('/create-book/:id')
  create(@Body() book: CreateBookDto, @Param('id') id) {
    return this.bookService.createBook(book, +id);
  }
  @Get('get-books')
  find() {
    return this.bookService.find();
  }
  @Get('get-book/:id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }
  @Patch(':id')
  update(@Body() updateBook: CreateBookDto, @Param('id') id: string) {
    return this.bookService.update(+id, updateBook);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.bookService.delete(+id);
  }
}
