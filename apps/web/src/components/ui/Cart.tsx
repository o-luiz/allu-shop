'use client';

import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './button';
import { useCart } from '../../contexts/CartContext';

export function Cart() {
  const { cart, cartItemsCount, cartTotal, updateCartQuantity, isLoading } =
    useCart();
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setShowCartDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleGoToCart = () => {
    setShowCartDropdown(false);
    router.push('/cart');
  };

  return (
    <div className="relative" ref={cartRef}>
      <Button
        variant="outline"
        className="h-12 w-12 rounded-lg p-0 relative"
        onClick={() => setShowCartDropdown(!showCartDropdown)}
      >
        <ShoppingCart className="h-5 w-5" />
        {cartItemsCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cartItemsCount}
          </span>
        )}
      </Button>

      {showCartDropdown && (
        <div className="absolute right-0 top-14 w-96 bg-white rounded-lg shadow-lg border border-gray-300 z-[60] overflow-hidden">
          <div className="p-4 border-b border-gray-300 bg-white">
            <h3 className="font-semibold text-gray-900">Carrinho</h3>
          </div>

          {cart.length === 0 ? (
            <div className="p-8 text-center bg-gray-50">
              <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Seu carrinho está vazio</p>
            </div>
          ) : (
            <>
              <div className="max-h-64 overflow-y-auto bg-gray-50">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 border-b border-gray-200 last:border-b-0"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-semibold text-xs">
                          {item.name.split(' ')[0].substring(0, 2)}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-gray-900 truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-500 truncate">
                          {item.name.length > 30
                            ? item.name.substring(0, 30) + '...'
                            : item.name}
                        </p>
                        <p className="text-green-600 font-semibold text-sm">
                          R$ {item.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 w-7 p-0 border-gray-300 rounded-sm"
                          onClick={() => updateCartQuantity(item.id, -1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 w-7 p-0 border-gray-300 rounded-sm"
                          onClick={() => updateCartQuantity(item.id, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-300 bg-white">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-gray-900">Total:</span>
                  <span className="font-bold text-green-600 text-lg">
                    R$ {cartTotal.toFixed(2)}
                  </span>
                </div>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 rounded-sm"
                  onClick={handleGoToCart}
                >
                  Ir para carrinho
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
