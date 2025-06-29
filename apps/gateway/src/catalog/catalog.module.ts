import { Module } from '@nestjs/common';
import { CatalogController } from './controllers/catalog.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICROSERVICES } from '../app/configs/constants';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: MICROSERVICES.CATALOG_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            port: parseInt(configService.get<string>('CATALOG_PORT')) || 3331,
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [CatalogController],
  providers: [],
})
export class CatalogModule {}
