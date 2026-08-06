import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Book } from './entity/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  private readonly books: Book[] = [
    new Book(1, 'Mario', 'Mama', 'happy', true),
    new Book(2, 'Dac Nhan Tam', 'Dao Chi Dung', 'life', true),
    new Book(3, 'The Power of Now', 'Eckhart Tolle', 'spirituality', true),
    new Book(4, 'The Alchemist', 'Paulo Coelho', 'fiction', true),
    new Book(5, 'The Da Vinci Code', 'Dan Brown', 'thriller', true),
  ];

  findAll() {
    return this.books;
  }

  findOne(id: number) {
    const book = this.books.find((b) => b.id === id);
    if (!book) {
      throw new NotFoundException(`Book ${id} not found`);
    }
    return book;
  }

  search(category?: string) {
    if (!category) {
      return this.books;
    }
    return this.books.filter(
      (b) => b.category.toLowerCase() === category.toLowerCase(),
    );
  }

  create(dto: CreateBookDto) {
    const book = new Book(
      this.books.length + 1,
      dto.title,
      dto.author,
      dto.category,
      true,
    );
    this.books.push(book);
    return book;
  }

  update(id: number, dto: UpdateBookDto) {
    const book = this.findOne(id);
    Object.assign(book, dto);
    return book;
  }

  remove(id: number) {
    const index = this.books.findIndex((b) => b.id === id);
    if (index === -1) {
      throw new NotFoundException(`Book ${id} not found`);
    }
    const [removed] = this.books.splice(index, 1);
    return removed;
  }

  removeAll() {
    this.books.length = 0;
    return [];
  }

  borrow(id: number) {
    const book = this.findOne(id);
    if (!book.available) {
      throw new BadRequestException(`Book "${book.title}" is not available`);
    }
    book.available = false;
    return book;
  }
}
