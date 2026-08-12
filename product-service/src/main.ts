import "dotenv/config";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const host = process.env.PRODUCT_SERVICE_HOST ?? "127.0.0.1";
  const port = Number(process.env.PRODUCT_SERVICE_PORT ?? 4001);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host,
        port,
      },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen();
  console.log(`Product Service TCP đang chạy tại ${host}:${port}`);
}

bootstrap().catch((error: unknown) => {
  console.error("Không thể khởi động Product Service", error);
  process.exit(1);
});
