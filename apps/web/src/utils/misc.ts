import { Product } from '../services/catalog';

export const generateSlug = (product: Product) => {
  return product.name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .trim();
};
