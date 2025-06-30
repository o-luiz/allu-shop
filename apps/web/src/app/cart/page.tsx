'use client';

import { useState } from 'react';
import { Trash2, Minus, Plus, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Navbar } from '../../components/layout/Navbar';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { MainFooter } from '../../components/layout/MainFooter';
import { useCart } from '../../contexts/CartContext';
import toast from 'react-hot-toast';

export default function CartPage() {
  const {
    cart,
    cartItemsCount,
    cartTotal,
    updateCartQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const [selectedPlans, setSelectedPlans] = useState<{
    [key: string]: 'mensal' | 'anual';
  }>({});

  const togglePlan = (itemId: string, plan: 'mensal' | 'anual') => {
    setSelectedPlans((prev) => ({
      ...prev,
      [itemId]: plan,
    }));
  };

  const getItemPrice = (itemId: string, basePrice: number) => {
    const plan = selectedPlans[itemId] || 'mensal';
    return plan === 'mensal' ? basePrice : basePrice * 0.85;
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />

        <div className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Carrinho', isActive: true },
            ]}
          />

          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trash2 className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Seu carrinho está vazio
            </h2>
            <p className="text-gray-600 mb-6">
              Adicione produtos ao seu carrinho para continuar
            </p>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => (window.location.href = '/')}
            >
              Continuar Comprando
            </Button>
          </div>
        </div>

        <MainFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Carrinho', isActive: true },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">
                Itens do Carrinho
              </h1>
              <Button
                variant="outline"
                onClick={() => {
                  clearCart();
                  toast.success('Carrinho limpo com sucesso!');
                }}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Limpar Carrinho
              </Button>
            </div>

            <div className="space-y-6">
              {cart.map((item) => {
                const currentPlan = selectedPlans[item.id] || 'mensal';
                const itemPrice = getItemPrice(item.id, item.price);

                return (
                  <Card key={item.id} className="border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 self-start to-green-700 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-semibold text-sm">
                            {item.name.split(' ')[0].substring(0, 2)}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3">
                            {item.product?.description ||
                              `${item.name} com tecnologia avançada e design premium`}
                          </p>

                          <div className="flex gap-2 mb-3">
                            <Button
                              variant={
                                currentPlan === 'mensal' ? 'default' : 'outline'
                              }
                              size="sm"
                              onClick={() => togglePlan(item.id, 'mensal')}
                              className={`text-xs h-6 ${
                                currentPlan === 'mensal'
                                  ? 'bg-gray-700 hover:bg-gray-700 text-white'
                                  : 'border-gray-300'
                              }`}
                            >
                              Mensal
                            </Button>
                            <Button
                              variant={
                                currentPlan === 'anual' ? 'default' : 'outline'
                              }
                              size="sm"
                              onClick={() => togglePlan(item.id, 'anual')}
                              className={`text-xs h-6 relative ${
                                currentPlan === 'anual'
                                  ? 'bg-gray-700 hover:bg-gray-700 text-white'
                                  : 'border-gray-300'
                              }`}
                            >
                              Anual
                            </Button>
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0 flex flex-col items-end gap-4">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center border border-gray-300 rounded">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => updateCartQuantity(item.id, -1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center text-sm font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => updateCartQuantity(item.id, 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>

                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                removeFromCart(item.id);
                                toast.success('Produto removido do carrinho!');
                              }}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <p className="text-xl font-bold text-gray-900">
                              R$ {itemPrice.toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-500">
                              R$ {itemPrice.toFixed(2)} cada
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="border-gray-200 sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Resumo do Pedido
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                      Subtotal ({cartItemsCount}{' '}
                      {cartItemsCount === 1 ? 'item' : 'itens'})
                    </span>
                    <span className="font-semibold">
                      R$ {cartTotal.toFixed(2)}
                    </span>
                  </div>

                  <hr className="border-gray-200" />

                  <div className="flex justify-between items-center text-lg">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-bold text-gray-900">
                      R$ {cartTotal.toFixed(2)}
                    </span>
                  </div>

                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 mt-6"
                    onClick={() => {
                      toast.success('Pedido finalizado com sucesso!');
                      clearCart();
                    }}
                  >
                    Finalizar Compra
                  </Button>

                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mt-6 pt-4 border-t border-gray-200">
                    <ShieldCheck className="h-4 w-4 text-green-600" />
                    <div className="text-center">
                      <p className="font-medium text-gray-700">
                        Compra 100% segura
                      </p>
                      <p className="text-xs">Seus dados estão protegidos</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <MainFooter />
    </div>
  );
}
