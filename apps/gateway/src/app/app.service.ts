import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getData(): { message: string } {
    return { message: 'Hello API de gateway - teste 3' };
  }

  getConfig(): any {
    return {
      message: 'Teste de variaveis de ambiente',
      variables: {
        DATABASE_HOST: this.configService.get<string>('DATABASE_HOST'),
        DATABASE_PORT: this.configService.get<string>('DATABASE_PORT'),
        DATABASE_NAME: this.configService.get<string>('DATABASE_NAME'),
        DATABASE_USER: this.configService.get<string>('DATABASE_USER'),
        DATABASE_PASSWORD: this.configService.get<string>('DATABASE_PASSWORD'),
        REDIS_HOST: this.configService.get<string>('REDIS_HOST'),
        REDIS_PORT: this.configService.get<string>('REDIS_PORT'),
        GATEWAY_PORT: this.configService.get<string>('GATEWAY_PORT'),
        CATALOG_PORT: this.configService.get<string>('CATALOG_PORT'),
        ORDER_PORT: this.configService.get<string>('ORDER_PORT'),
        NODE_ENV: this.configService.get<string>('NODE_ENV'),
        WEB_URL: this.configService.get<string>('WEB_URL'),
        GATEWAY_URL: this.configService.get<string>('GATEWAY_URL'),
        CATALOG_URL: this.configService.get<string>('CATALOG_URL'),
        ORDER_URL: this.configService.get<string>('ORDER_URL'),
      },
    };
  }
}
