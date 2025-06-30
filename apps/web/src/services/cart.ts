import { type CartItem } from '../contexts/CartContext';
import { type Product } from './catalog';

// Mock de implementação de carrinho.
// Será removido assim que a o recurso de carrinho foi implementado no back

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3330';
const CART_STORAGE_KEY = 'allu-cart';

export interface CartApiResponse {
  success: boolean;
  data?: CartItem[];
  error?: string;
}

export interface AddToCartRequest {
  productId: string;
  quantity?: number;
}

export interface UpdateCartRequest {
  itemId: string;
  quantity: number;
}

class CartService {
  async getCart(): Promise<CartApiResponse> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));

      const cartData = localStorage.getItem(CART_STORAGE_KEY);
      const cart: CartItem[] = cartData ? JSON.parse(cartData) : [];

      return {
        success: true,
        data: cart,
      };
    } catch (error) {
      console.error('Erro ao buscar carrinho:', error);
      return {
        success: false,
        error: 'Erro ao carregar carrinho',
      };
    }
  }

  async addToCart(product: Product, quantity = 1): Promise<CartApiResponse> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const cartData = localStorage.getItem(CART_STORAGE_KEY);
      const cart: CartItem[] = cartData ? JSON.parse(cartData) : [];

      const productId = product.id.toString();
      const existingItemIndex = cart.findIndex((item) => item.id === productId);

      if (existingItemIndex >= 0) {
        cart[existingItemIndex].quantity += quantity;
      } else {
        const newItem: CartItem = {
          id: productId,
          name: product.name,
          price: 99.99,
          quantity,
          product,
        };
        cart.push(newItem);
      }

      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));

      return {
        success: true,
        data: cart,
      };
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      return {
        success: false,
        error: 'Erro ao adicionar produto ao carrinho',
      };
    }
  }

  async updateCartItem(
    itemId: string,
    quantity: number
  ): Promise<CartApiResponse> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));

      const cartData = localStorage.getItem(CART_STORAGE_KEY);
      const cart: CartItem[] = cartData ? JSON.parse(cartData) : [];

      if (quantity <= 0) {
        const updatedCart = cart.filter((item) => item.id !== itemId);
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
        return {
          success: true,
          data: updatedCart,
        };
      }

      const itemIndex = cart.findIndex((item) => item.id === itemId);
      if (itemIndex >= 0) {
        cart[itemIndex].quantity = quantity;
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      }

      return {
        success: true,
        data: cart,
      };
    } catch (error) {
      console.error('Erro ao atualizar carrinho:', error);
      return {
        success: false,
        error: 'Erro ao atualizar quantidade',
      };
    }
  }

  async removeFromCart(itemId: string): Promise<CartApiResponse> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));

      const cartData = localStorage.getItem(CART_STORAGE_KEY);
      const cart: CartItem[] = cartData ? JSON.parse(cartData) : [];

      const updatedCart = cart.filter((item) => item.id !== itemId);
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));

      return {
        success: true,
        data: updatedCart,
      };
    } catch (error) {
      console.error('Erro ao remover do carrinho:', error);
      return {
        success: false,
        error: 'Erro ao remover produto',
      };
    }
  }

  async clearCart(): Promise<CartApiResponse> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));

      localStorage.removeItem(CART_STORAGE_KEY);

      return {
        success: true,
        data: [],
      };
    } catch (error) {
      console.error('Erro ao limpar carrinho:', error);
      return {
        success: false,
        error: 'Erro ao limpar carrinho',
      };
    }
  }
}

export const cartService = new CartService();

export async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(url, { ...defaultOptions, ...options });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
