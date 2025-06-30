import { Controller, Inject, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MICROSERVICES } from '../../app/configs/constants';

@Controller('catalog')
export class CatalogController {
  constructor(
    @Inject(MICROSERVICES.CATALOG_SERVICE)
    private readonly catalogService: ClientProxy
  ) {}

  @Get('/')
  async getProducts() {
    const mockProducts = [
      {
        id: 1,
        name: 'Smartphone Galaxy S23',
        description: 'Smartphone Samsung Galaxy S23 com 128GB',
        price: 2999.99,
        category: 'Electronics',
        stock: 50,
        image: 'https://example.com/galaxy-s23.jpg',
      },
      {
        id: 2,
        name: 'Notebook Dell Inspiron',
        description: 'Notebook Dell Inspiron 15 polegadas, Intel i5',
        price: 4599.99,
        category: 'Electronics',
        stock: 25,
        image: 'https://example.com/dell-inspiron.jpg',
      },
      {
        id: 3,
        name: 'Fone de Ouvido Sony WH-1000XM4',
        description: 'Fone de ouvido sem fio com cancelamento de ruído',
        price: 1899.99,
        category: 'Electronics',
        stock: 30,
        image: 'https://example.com/sony-wh1000xm4.jpg',
      },
      {
        id: 4,
        name: 'Smart TV LG 55"',
        description: 'Smart TV LG 55 polegadas 4K Ultra HD',
        price: 3499.99,
        category: 'Electronics',
        stock: 15,
        image: 'https://example.com/lg-tv-55.jpg',
      },
      {
        id: 5,
        name: 'Câmera Canon EOS R6',
        description: 'Câmera mirrorless Canon EOS R6 com 20MP',
        price: 12999.99,
        category: 'Electronics',
        stock: 8,
        image: 'https://example.com/canon-eos-r6.jpg',
      },
      {
        id: 6,
        name: 'Tablet iPad Pro 12.9"',
        description: 'Tablet Apple iPad Pro 12.9 polegadas 256GB',
        price: 8999.99,
        category: 'Electronics',
        stock: 20,
        image: 'https://example.com/ipad-pro-12.jpg',
      },
      {
        id: 7,
        name: 'Console PlayStation 5',
        description: 'Console Sony PlayStation 5 com controle DualSense',
        price: 3999.99,
        category: 'Gaming',
        stock: 12,
        image: 'https://example.com/ps5.jpg',
      },
      {
        id: 8,
        name: 'Mouse Logitech G Pro X',
        description: 'Mouse gamer Logitech G Pro X Superlight',
        price: 899.99,
        category: 'Gaming',
        stock: 40,
        image: 'https://example.com/logitech-g-pro-x.jpg',
      },
      {
        id: 9,
        name: 'Teclado Mecânico Corsair K100',
        description: 'Teclado mecânico Corsair K100 RGB com switches Cherry MX',
        price: 1299.99,
        category: 'Gaming',
        stock: 35,
        image: 'https://example.com/corsair-k100.jpg',
      },
      {
        id: 10,
        name: 'Monitor Samsung Odyssey G9',
        description: 'Monitor ultrawide Samsung Odyssey G9 49 polegadas',
        price: 5999.99,
        category: 'Gaming',
        stock: 10,
        image: 'https://example.com/samsung-odyssey-g9.jpg',
      },
    ];

    return {
      success: true,
      data: mockProducts,
      total: mockProducts.length,
    };
  }
}
