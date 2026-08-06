/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Cat } from './entities/cat.entity';
import { ListCatsQueryDto } from './dto/list-cat-query.dto';
import { NotFoundError } from 'rxjs';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cats')
export class CatsController {
  private readonly cats: Cat[] = [
    new Cat('Tom', 7, 'British Shorthair'),
    new Cat('Cherry', 0, 'Australian Mist'),
    new Cat('Leo', 3, 'Persian'),
    new Cat('Alexandria', 0, 'Sphynx'),
  ];

  @Get() getAllCats(@Query() query: ListCatsQueryDto) {
    const { name, age, breed, limit } = query;
    let result = [...this.cats];
    if (name) {
      result = result.filter((cat) =>
        cat.name.toLowerCase().includes(name.toLowerCase()),
      );
    }
    if (age !== undefined) {
      result = result.filter((cat) => cat.age === age);
    }
    if (breed) {
      result = result.filter((cat) =>
        cat.breed.toLowerCase().includes(breed.toLowerCase()),
      );
    }
    if (limit) {
      result = result.slice(0, limit);
    }
    return {
      message: 'The list of cats',
      total: result.length,
      data: result,
    };
  }

  @Get(':name') methodName(@Param('name') name: string) {
    const result = this.cats.find((cat) =>
      cat.name.toLowerCase().includes(name.toLowerCase()),
    );

    if (!result) {
      throw new NotFoundException(`Cat name ${name} was not found.`);
    }

    return { message: 'Cat found', data: result };
  }

  @Post() createNewCat(@Body() catDto: CreateCatDto) {
    const cat = new Cat(catDto.name, catDto.age, catDto.breed);
    const result = this.cats.push(catDto);
    return {
      message: 'Create new cat success.',
      total: result,
      data: this.cats,
    };
  }

  @Patch(':name') updateOneCat(
    @Param('name') name: string,
    @Body() catDto: UpdateCatDto,
  ) {
    const result = this.cats.find((cat) =>
      cat.name.toLowerCase().includes(name.toLowerCase()),
    );
    if (!result) {
      throw new NotFoundException(`Cat's name ${name} was not found`);
    }

    Object.assign(result, catDto);

    return {
      message: `Cat ${name} Updated success`,
      data: result,
    };
  }

  @Delete(':name') removeCat(@Param('name') name: string) {
    const index = this.cats.findIndex(
      (cat) => cat.name.toLowerCase() === name.toLowerCase(),
    );

    if (index === -1) {
      throw new NotFoundException(`Cat ${name} not found`);
    }

    const [result] = this.cats.splice(index, 1);

    return {
      message: `Cat ${result.name} has been removed`,
      data: this.cats,
    };
  }
}
