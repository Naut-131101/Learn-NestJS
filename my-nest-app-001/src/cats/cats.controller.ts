import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get('breed') findAll() {
    return { message: 'This action return all cats.' };
  }

  @Post('naming')
  doSomething(@Body() cat: { name: string }): string {
    return `We named the ado kitten "${cat.name}".`;
  }

  //   @Get('abc/*')
  //   findAll() {
  //     return 'Get evt';
  //   }
}
