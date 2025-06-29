import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern('cart.get_cart')
  getCart() {
    return {
      userId: 'user123',
      items: [
        {
          id: 'prod001',
          name: 'Smartphone Galaxy S23',
          price: 899.99,
          quantity: 1,
          image: 'https://example.com/galaxy-s23.jpg',
        },
        {
          id: 'prod002',
          name: 'Fone de Ouvido Bluetooth',
          price: 129.99,
          quantity: 2,
          image: 'https://example.com/headphones.jpg',
        },
        {
          id: 'prod003',
          name: 'Capa Protetora para Smartphone',
          price: 29.99,
          quantity: 1,
          image: 'https://example.com/case.jpg',
        },
      ],
      total: 1189.96,
      itemCount: 4,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
}
