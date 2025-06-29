import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: parseInt(process.env.ORDER_PORT) || 3002,
      },
    }
  );

  await app.listen();
  Logger.log(
    `Order service rodando na porta ${process.env.ORDER_PORT || 3002}`
  );
}

bootstrap();
