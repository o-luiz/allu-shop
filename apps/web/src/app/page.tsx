'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

import { MainFooter } from '../components/layout/MainFooter';
import { Navbar } from '../components/layout/Navbar';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { fetchProductsPaginated } from '../services/catalog';
import { generateSlug } from '../utils/misc';

export default function HomePage() {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: ({ pageParam = 1 }) => fetchProductsPaginated(pageParam, 10),
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const allProducts = data?.pages.flatMap((page) => page.data) || [];
  const totalProducts = data?.pages[0]?.total || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
        <main>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Todos os produtos
              <span className="text-gray-500 ml-1">({totalProducts})</span>
            </h2>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Carregando produtos...</p>
            </div>
          ) : isError ? (
            <div className="text-center py-12">
              <p className="text-red-600">
                Erro ao carregar produtos: {error?.message}
              </p>
              <Button
                onClick={() => refetch()}
                className="mt-4 bg-green-600 hover:bg-green-700 rounded-sm"
              >
                Tentar novamente
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {allProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/catalog/${generateSlug(product)}`}
                    className="block"
                  >
                    <Card className="border-gray-300 shadow-sm hover:shadow-lg transition-shadow duration-200 rounded-sm flex flex-col h-full cursor-pointer">
                      <CardContent className="p-4 flex-1">
                        <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {product.name.split(' ')[0]}
                            </span>
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2 text-base">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2 min-h-[2.5rem]">
                          {product.description}
                        </p>
                        <p className="text-green-600 font-bold text-xl mb-3">
                          {product.price}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              <div ref={loadMoreRef} className="py-8">
                {isFetchingNextPage ? (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto" />
                    <p className="mt-2 text-gray-600">
                      Carregando mais produtos...
                    </p>
                  </div>
                ) : hasNextPage ? (
                  <div className="text-center">
                    <Button
                      onClick={() => fetchNextPage()}
                      className="bg-green-600 hover:bg-green-700 rounded-sm"
                    >
                      Carregar mais produtos
                    </Button>
                  </div>
                ) : allProducts.length > 0 ? (
                  <div className="text-center text-gray-500">
                    <p>Todos os produtos foram carregados</p>
                  </div>
                ) : null}
              </div>
            </>
          )}
        </main>
      </div>

      <MainFooter />
    </div>
  );
}
