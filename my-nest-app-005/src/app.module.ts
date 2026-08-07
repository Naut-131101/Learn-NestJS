import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { PhotoModule } from './photo/photo.module';
import { Photo } from './photo/entities/photo.entity';

const defaultOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'db',
  synchronize: true,
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        HOST: Joi.string().required(),
        PORT: Joi.number().port().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      ...defaultOptions,
      // name: 'default',
      host: 'localhost',
      entities: [User],
    }),
    TypeOrmModule.forRoot({
      ...defaultOptions,
      name: 'photosConnection',
      host: 'localhost',
      entities: [Photo],
    }),
    UsersModule,
    PhotoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
