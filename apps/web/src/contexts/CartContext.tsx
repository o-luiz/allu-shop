'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { type Product } from '../services/catalog';
import { cartService } from '../services/cart';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  product?: Product;
}

interface CartContextType {
  cart: CartItem[];
  cartTotal: number;
  cartItemsCount: number;
  isLoading: boolean;

  addToCart: (product: Product) => Promise<void>;
  updateCartQuantity: (id: string, change: number) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartItem: (productId: string) => CartItem | undefined;
  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: React.ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadCart = async () => {
      setIsLoading(true);
      try {
        const response = await cartService.getCart();
        if (response.success && response.data) {
          setCart(response.data);
        }
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, []);

  const addToCart = async (product: Product): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await cartService.addToCart(product);
      if (response.success && response.data) {
        setCart(response.data);
      } else {
        throw new Error(response.error || 'Erro ao adicionar produto');
      }
    } catch (error) {
      console.error('Erro ao adicionar produto ao carrinho:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateCartQuantity = async (
    id: string,
    change: number
  ): Promise<void> => {
    setIsLoading(true);
    try {
      const currentItem = cart.find((item) => item.id === id);
      if (!currentItem) return;

      const newQuantity = currentItem.quantity + change;
      const response = await cartService.updateCartItem(id, newQuantity);

      if (response.success && response.data) {
        setCart(response.data);
      } else {
        throw new Error(response.error || 'Erro ao atualizar quantidade');
      }
    } catch (error) {
      console.error('Erro ao atualizar quantidade:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (id: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await cartService.removeFromCart(id);
      if (response.success && response.data) {
        setCart(response.data);
      } else {
        throw new Error(response.error || 'Erro ao remover produto');
      }
    } catch (error) {
      console.error('Erro ao remover produto:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await cartService.clearCart();
      if (response.success && response.data) {
        setCart(response.data);
      } else {
        throw new Error(response.error || 'Erro ao limpar carrinho');
      }
    } catch (error) {
      console.error('Erro ao limpar carrinho:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCartItem = (productId: string): CartItem | undefined => {
    return cart.find((item) => item.id === productId);
  };

  const isInCart = (productId: string): boolean => {
    return cart.some((item) => item.id === productId);
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const contextValue: CartContextType = {
    cart,
    cartTotal,
    cartItemsCount,
    isLoading,

    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,

    getCartItem,
    isInCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
}
