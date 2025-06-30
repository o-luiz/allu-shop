'use client';

import { useState, useEffect, use } from 'react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import ProductImageCarousel from '../../../components/ui/ProductImageCarousel';
import { Navbar } from '../../../components/layout/Navbar';
import { Breadcrumbs } from '../../../components/ui/Breadcrumbs';
import { MainFooter } from '../../../components/layout/MainFooter';
import { useCart } from '../../../contexts/CartContext';
import {
  fetchProductsPaginated,
  type Product,
} from '../../../services/catalog';
import {
  ShoppingCart,
  Shield,
  Truck,
  RotateCcw,
  CheckCircle,
  Eye,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// TODO: Implementar conexão com dados vindos da api e remover implementações mockadas

export default function ProductPage({ params }: PageProps) {
  const { slug } = use(params);
  const { addToCart } = useCart();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<'mensal' | 'anual'>('anual');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetchProductsPaginated(1, 100);
        const foundProduct = response.data.find((p: Product) => {
          const productSlug = p.name
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .trim();
          return productSlug === slug;
        });

        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          const productName = slug
            .split('-')
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

          setProduct({
            id: 1,
            name: productName,
            description: `${productName} com tecnologia avançada, design premium e alta performance. Ideal para games.`,
            price: 183.77,
            category: 'Electronics',
            stock: 10,
            image:
              'https://via.placeholder.com/500x350/3b82f6/ffffff?text=Produto+1',
          });
        }
      } catch (error) {
        console.error('Erro ao carregar produto:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
        <MainFooter />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <p>Produto não encontrado</p>
        </div>
        <MainFooter />
      </div>
    );
  }

  // Mock images para o carrossel
  const mockImages = [
    'https://picsum.photos/500/350?random=1',
    'https://picsum.photos/500/350?random=2',
    'https://picsum.photos/500/350?random=3',
    'https://picsum.photos/500/350?random=4',
  ];

  const monthlyPrice = selectedPlan === 'mensal' ? 183.77 : 1490.99;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: 'Catálogo', href: '/' },
            { label: product.name, isActive: true },
          ]}
        />
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-[60px] lg:items-start max-w-6xl mx-auto">
          <div className="w-full lg:w-[500px] lg:flex-shrink-0">
            <ProductImageCarousel
              images={mockImages}
              productName={product.name}
            />
          </div>

          <div className="flex-1 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                {product.description}
              </p>
            </div>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="mb-6">
                  <h4 className="font-medium mb-3">
                    Escolha o modelo de contrato:
                  </h4>
                  <div className="flex gap-2">
                    <Button
                      variant={
                        selectedPlan === 'mensal' ? 'default' : 'outline'
                      }
                      size="sm"
                      onClick={() => setSelectedPlan('mensal')}
                      className={`w-fit text-sm ${
                        selectedPlan === 'mensal'
                          ? 'bg-gray-800 hover:bg-gray-700 text-white border-gray-700'
                          : 'border-gray-300'
                      }`}
                    >
                      Mensal
                    </Button>
                    <Button
                      variant={selectedPlan === 'anual' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedPlan('anual')}
                      className={`w-fit text-sm ${
                        selectedPlan === 'anual'
                          ? 'bg-gray-700 hover:bg-gray-700 text-white border-gray-700'
                          : 'border-gray-300'
                      }`}
                    >
                      Anual
                    </Button>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-green-600">
                      R$ {monthlyPrice.toFixed(2)}
                    </span>
                    <span className="text-lg text-gray-500">
                      /{selectedPlan === 'mensal' ? 'mês' : 'ano'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-4 mt-8">
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-base mb-2"
                    onClick={() => {
                      addToCart(product);
                      toast.success('Produto adicionado ao carrinho!');
                    }}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Adicionar ao Carrinho
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full py-3 text-base border border-gray-300 hover:bg-gray-50"
                    onClick={() => router.push('/cart')}
                  >
                    <Eye className="h-5 w-5 mr-2" />
                    Ver Carrinho
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  BENEFÍCIOS E VANTAGENS
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">
                      Proteção contra furto qualificado e roubo
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">
                      Entrega grátis em 7 dias úteis
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <RotateCcw className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">
                      Pague mês a mês sem comprometer o limite do cartão
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">
                      Qualidade 100% garantida (produto novo ou semi-novo)
                    </span>
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
