import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const port = process.env.GATEWAY_PORT || 3330;
  await app.listen(port);
  Logger.log(`API gateway rodando | http://localhost:${port}/api`);
}

bootstrap();
