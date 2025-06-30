import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const webUrl =
    configService.get<string>('WEB_URL') || 'http://localhost:3000';

  app.enableCors({
    origin: webUrl,
    methods: '*',
    credentials: true,
  });

  app.setGlobalPrefix('api');

  const port = configService.get('GATEWAY_PORT') || 3330;
  await app.listen(port);
  Logger.log(`Gateway rodando na porta ${port} | http://localhost:${port}/api`);
}

bootstrap();
