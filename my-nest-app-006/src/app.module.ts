import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { envValidationSchema } from './config/env.validation';

import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';
import { Connection } from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: envValidationSchema,
      validationOptions: {
        abortEarly: true,
      },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.getOrThrow<string>('MONGODB_URI');
        return {
          uri,
          onConnectionCreate: (connection: Connection) => {
            connection.on('connected', () => {
              console.log('MongoDB connected');
            });
            connection.on('disconnected', () => {
              console.log('MongoDB connected');
            });
            connection.on('connected', () => {
              console.log('MongoDB connected');
            });
            return connection;
          },
        };
      },
    }),
    UserModule,
    AuthModule,
    CatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
