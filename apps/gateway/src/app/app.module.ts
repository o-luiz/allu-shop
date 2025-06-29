import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AppService } from './app.service';
import { MICROSERVICES } from './configs/constants';
import { AppController } from './controllers/app.controller';
import { CatalogModule } from '../catalog/catalog.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    ClientsModule.registerAsync([
      {
        name: MICROSERVICES.ORDER_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            port: parseInt(configService.get<string>('ORDER_PORT')) || 3002,
          },
        }),
        inject: [ConfigService],
      },
    ]),
    CatalogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
