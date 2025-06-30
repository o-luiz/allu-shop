import { Product } from '../services/catalog';

export const generateSlug = (product: Product) => {
  return product.name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .trim();
};

export const PRODUCT_IMAGES = [
  [
    'https://v2-allugator-images.s3.amazonaws.com/products/Acer+Nitro+5+3050+Thumb.png',
    'https://v2-allugator-images.s3.amazonaws.com/products/Acer+Nitro+5+3050+2.jpeg',
    'https://v2-allugator-images.s3.amazonaws.com/products/Acer+Nitro+5+3050+3.jpeg',
    'https://v2-allugator-images.s3.amazonaws.com/products/Acer+Nitro+5+3050+4.jpeg',
    'https://v2-allugator-images.s3.amazonaws.com/products/Acer+Nitro+5+3050+5.jpeg',
    'https://v2-allugator-images.s3.amazonaws.com/products/Acer+Nitro+5+3050+6.jpeg',
  ],
  [
    'https://v2-allugator-images.s3.amazonaws.com/products/acer%20orion%201.png',
    'https://v2-allugator-images.s3.amazonaws.com/products/acer%20orion%202.webp',
  ],
  [
    'https://v2-allugator-images.s3.amazonaws.com/products/acer%20orion%202.png',
    'https://v2-allugator-images.s3.amazonaws.com/products/acer%20orion%202.webp',
    'https://v2-allugator-images.s3.amazonaws.com/products/allu.nv_specs-acer_orion%20i5%203060%2016GB_PO5-620-BR12_900x900px.png',
  ],
  [
    'https://v2-allugator-images.s3.amazonaws.com/products/acer%20orion%203.png',
    'https://v2-allugator-images.s3.amazonaws.com/products/acer%20orion%202.webp',
    'https://v2-allugator-images.s3.amazonaws.com/products/allu.nv_specs-acer_orion%20i7%203060%2016GB_PO5-620-BR15_900x900px.png',
  ],
  [
    'https://v2-allugator-images.s3.amazonaws.com/products/acer%20orion%201.webp',
    'https://v2-allugator-images.s3.amazonaws.com/products/acer%20orion%202.webp',
  ],
  [
    'https://v2-allugator-images.s3.amazonaws.com/products/acer%20vero%201.webp',
    'https://v2-allugator-images.s3.amazonaws.com/products/acer%20vero%202.webp',
    'https://v2-allugator-images.s3.amazonaws.com/products/acer%20vero%203.webp',
    'https://v2-allugator-images.s3.amazonaws.com/products/acer%20vero%204.webp',
    'https://v2-allugator-images.s3.amazonaws.com/products/acer%20vero%205.webp',
    'https://v2-allugator-images.s3.amazonaws.com/products/acer%20vero%206.webp',
    'https://v2-allugator-images.s3.amazonaws.com/products/acer%20vero%207.webp',
    'https://v2-allugator-images.s3.amazonaws.com/products/acer%20vero%208.webp',
  ],
  [
    'https://v2-allugator-images.s3.amazonaws.com/products/acer%20helios%20neo%20phn16-71-74ue.png',
  ],
  [
    'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/ACER+PREDATOR+300+SE/Acer+Predator+300+SE+Thumb.png',
    'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/ACER+PREDATOR+300+SE/Acer+Predator+300+SE+2.jpg',
    'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/ACER+PREDATOR+300+SE/Acer+Predator+300+SE+3.jpg',
    'https://v2-allugator-images.s3.amazonaws.com/products/allu.nv_specs-acer_triton_PT316-51s-72XA_900x900px.png',
  ],
  [
    'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER+PRO/Polar+Pacer+Pro+Thumb+2.png',
    'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER+PRO/Polar+Pacer+Pro+2.jpg',
    'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER+PRO/Polar+Pacer+Pro+3.jpg',
    'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER+PRO/Polar+Pacer+Pro+4.jpg',
  ],
  [
    'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER/Polar+Pacer+Thumb+2.png',
    'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER/Polar+Pacer+2.jpg',
    'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER/Polar+Pacer+3.jpg',
  ],
  [
    'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER+PRO/Polar+Pacer+Pro+Thumb+2.png',
    'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER+PRO/Polar+Pacer+Pro+2.jpg',
    'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER+PRO/Polar+Pacer+Pro+3.jpg',
    'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER+PRO/Polar+Pacer+Pro+4.jpg',
  ],
  [
    'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER/Polar+Pacer+Thumb+2.png',
    'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER/Polar+Pacer+2.jpg',
    'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER/Polar+Pacer+3.jpg',
  ],
  [
    'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+15+PRO+MAX/iPhone+15+Pro+Max+Thumb.png',
    'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+15+PRO+MAX/iPhone+15+Pro+Max+-+2.jpg',
    'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+15+PRO+MAX/iPhone+15+Pro+Max+-+3.jpg',
  ],
  [
    'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+15+PRO/iPhone+15+Pro+Thumb.png',
    'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+15+PRO/iPhone+15+Pro+-+2.jpg',
    'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+15+PRO/iPhone+15+Pro+-+3.jpg',
  ],
  [
    'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+15/iPhone+15+Thumb.png',
    'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+15/iPhone+15++-+2.jpg',
    'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+15/iPhone+15++-+3.jpg',
  ],
  [
    'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+14+PRO/iPhone+14+Pro+Thumb.png',
    'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+14+PRO/iPhone+14+Pro+-+2.jpg',
    'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+14+PRO/iPhone+14+Pro+-+3.jpg',
    'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+14+PRO/iPhone+14+Pro+-+4.jpg',
  ],
  [
    'https://v2-allugator-images.s3.amazonaws.com/products/iPhone+14+Pro+Max.png',
  ],
  [
    'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+14/iPhone+14+Thumb.png',
    'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+14/iPhone+14++-+2.jpg',
    'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+14/iPhone+14++-+3.jpg',
    'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+14/iPhone+14++-+4.jpg',
  ],
  [
    'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+13/iPhone+13+Thumb.png',
    'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+13/iPhone+13+-+2.jpg',
    'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+13/iPhone+13+-+3.jpg',
  ],
  [
    'https://v2-allugator-images.s3.amazonaws.com/products/PS5+Thumb+(1).png',
    'https://v2-allugator-images.s3.amazonaws.com/products/2.jpeg',
    'https://v2-allugator-images.s3.amazonaws.com/products/3.jpeg',
    'https://v2-allugator-images.s3.amazonaws.com/products/4.jpeg',
    'https://v2-allugator-images.s3.amazonaws.com/products/5.jpeg',
  ],
];

export const allImages = [
  'https://v2-allugator-images.s3.amazonaws.com/products/Acer+Nitro+5+3050+Thumb.png',
  'https://v2-allugator-images.s3.amazonaws.com/products/Acer+Nitro+5+3050+2.jpeg',
  'https://v2-allugator-images.s3.amazonaws.com/products/Acer+Nitro+5+3050+3.jpeg',
  'https://v2-allugator-images.s3.amazonaws.com/products/Acer+Nitro+5+3050+4.jpeg',
  'https://v2-allugator-images.s3.amazonaws.com/products/Acer+Nitro+5+3050+5.jpeg',
  'https://v2-allugator-images.s3.amazonaws.com/products/Acer+Nitro+5+3050+6.jpeg',
  'https://v2-allugator-images.s3.amazonaws.com/products/acer%20orion%201.png',
  'https://v2-allugator-images.s3.amazonaws.com/products/acer%20orion%202.webp',
  'https://v2-allugator-images.s3.amazonaws.com/products/acer%20orion%202.png',
  'https://v2-allugator-images.s3.amazonaws.com/products/allu.nv_specs-acer_orion%20i5%203060%2016GB_PO5-620-BR12_900x900px.png',
  'https://v2-allugator-images.s3.amazonaws.com/products/acer%20orion%203.png',
  'https://v2-allugator-images.s3.amazonaws.com/products/allu.nv_specs-acer_orion%20i7%203060%2016GB_PO5-620-BR15_900x900px.png',
  'https://v2-allugator-images.s3.amazonaws.com/products/acer%20orion%201.webp',
  'https://v2-allugator-images.s3.amazonaws.com/products/acer%20vero%201.webp',
  'https://v2-allugator-images.s3.amazonaws.com/products/acer%20vero%202.webp',
  'https://v2-allugator-images.s3.amazonaws.com/products/acer%20vero%203.webp',
  'https://v2-allugator-images.s3.amazonaws.com/products/acer%20vero%204.webp',
  'https://v2-allugator-images.s3.amazonaws.com/products/acer%20vero%205.webp',
  'https://v2-allugator-images.s3.amazonaws.com/products/acer%20vero%206.webp',
  'https://v2-allugator-images.s3.amazonaws.com/products/acer%20vero%207.webp',
  'https://v2-allugator-images.s3.amazonaws.com/products/acer%20vero%208.webp',
  'https://v2-allugator-images.s3.amazonaws.com/products/acer%20helios%20neo%20phn16-71-74ue.png',
  'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/ACER+PREDATOR+300+SE/Acer+Predator+300+SE+Thumb.png',
  'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/ACER+PREDATOR+300+SE/Acer+Predator+300+SE+2.jpg',
  'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/ACER+PREDATOR+300+SE/Acer+Predator+300+SE+3.jpg',
  'https://v2-allugator-images.s3.amazonaws.com/products/allu.nv_specs-acer_triton_PT316-51s-72XA_900x900px.png',
  'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER+PRO/Polar+Pacer+Pro+Thumb+2.png',
  'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER+PRO/Polar+Pacer+Pro+2.jpg',
  'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER+PRO/Polar+Pacer+Pro+3.jpg',
  'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER+PRO/Polar+Pacer+Pro+4.jpg',
  'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER/Polar+Pacer+Thumb+2.png',
  'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER/Polar+Pacer+2.jpg',
  'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER/Polar+Pacer+3.jpg',
  'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER+PRO/Polar+Pacer+Pro+Thumb+2.png',
  'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER+PRO/Polar+Pacer+Pro+2.jpg',
  'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER+PRO/Polar+Pacer+Pro+3.jpg',
  'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER+PRO/Polar+Pacer+Pro+4.jpg',
  'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+15+PRO+MAX/iPhone+15+Pro+Max+Thumb.png',
  'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+15+PRO+MAX/iPhone+15+Pro+Max+-+2.jpg',
  'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+15+PRO+MAX/iPhone+15+Pro+Max+-+3.jpg',
  'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+15+PRO/iPhone+15+Pro+Thumb.png',
  'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+15+PRO/iPhone+15+Pro+-+2.jpg',
  'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+15+PRO/iPhone+15+Pro+-+3.jpg',
  'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+15/iPhone+15+Thumb.png',
  'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+15/iPhone+15++-+2.jpg',
  'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+15/iPhone+15++-+3.jpg',
  'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+14+PRO/iPhone+14+Pro+Thumb.png',
  'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+14+PRO/iPhone+14+Pro+-+2.jpg',
  'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+14+PRO/iPhone+14+Pro+-+3.jpg',
  'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+14+PRO/iPhone+14+Pro+-+4.jpg',
  'https://v2-allugator-images.s3.amazonaws.com/products/iPhone+14+Pro+Max.png',
  'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+14/iPhone+14+Thumb.png',
  'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+14/iPhone+14++-+2.jpg',
  'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+14/iPhone+14++-+3.jpg',
  'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+14/iPhone+14++-+4.jpg',
  'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+13/iPhone+13+Thumb.png',
  'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+13/iPhone+13+-+2.jpg',
  'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/IPHONE+13/iPhone+13+-+3.jpg',
  'https://v2-allugator-images.s3.amazonaws.com/products/PS5+Thumb+(1).png',
  'https://v2-allugator-images.s3.amazonaws.com/products/2.jpeg',
  'https://v2-allugator-images.s3.amazonaws.com/products/3.jpeg',
  'https://v2-allugator-images.s3.amazonaws.com/products/4.jpeg',
  'https://v2-allugator-images.s3.amazonaws.com/products/5.jpeg',
];

export function getRandomImages(images: string[], n: number): string[] {
  if (n >= images.length) {
    return [...images];
  }

  const shuffled = [...images].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

export function getRandomImagesV2(images: string[], max: number): string[] {
  const count = Math.floor(Math.random() * max) + 1;
  return Array.from({ length: count }, () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  });
}
