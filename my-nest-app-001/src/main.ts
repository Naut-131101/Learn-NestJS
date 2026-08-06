import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000, () =>
    console.log(`Server is running at port: ${process.env.PORT}`),
  );
}
bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});

// import { NestFactory } from '@nestjs/core';
// import { NestExpressApplication } from '@nestjs/platform-express';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create<NestExpressApplication>(AppModule, {
//     abortOnError: false,
//   });
//   await app.listen(9999);
// }

// bootstrap();

// const port = process.env.PORT ?? 4000;
// console.log(port);
