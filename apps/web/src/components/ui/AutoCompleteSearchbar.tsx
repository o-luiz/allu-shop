'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './button';
import { fetchProducts, Product } from '../../services/catalog';
import { generateSlug } from '../../utils/misc';

interface AutoCompleteSearchbarProps {
  placeholder?: string;
  className?: string;
  onProductSelect?: (product: Product) => void;
}

export function AutoCompleteSearchbar({
  placeholder = 'Pressione "/" para pesquisar...',
  className = '',
  onProductSelect,
}: AutoCompleteSearchbarProps) {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const searchbarRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetchProducts();
        setProducts(response.data);
      } catch (err) {
        setError('Erro ao carregar produtos');
        console.error('Error loading products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    if (selectedIndex >= 0 && itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
    }
  }, [selectedIndex]);

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isDropdownOpen) {
        event.preventDefault();
        setSelectedIndex(-1);
        setIsDropdownOpen(false);
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isDropdownOpen]);

  useEffect(() => {
    const handleGlobalSlashKey = (event: KeyboardEvent) => {
      if (
        event.key === '/' &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey &&
        event.target instanceof HTMLElement &&
        event.target.tagName !== 'INPUT' &&
        event.target.tagName !== 'TEXTAREA' &&
        !event.target.isContentEditable
      ) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleGlobalSlashKey);
    return () => document.removeEventListener('keydown', handleGlobalSlashKey);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchbarRef.current &&
        !searchbarRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      console.log('Pesquisando por:', query);
      setIsDropdownOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isDropdownOpen && filteredProducts.length > 0) {
          setIsDropdownOpen(true);
          setSelectedIndex(0);
        } else if (isDropdownOpen && filteredProducts.length > 0) {
          setSelectedIndex((prev) =>
            prev < filteredProducts.length - 1 ? prev + 1 : prev
          );
        }
        break;
      case 'ArrowUp':
        if (!isDropdownOpen) return;
        e.preventDefault();
        setSelectedIndex((prev) => {
          if (prev <= 0) {
            inputRef.current?.focus();
            return -1;
          }
          return prev - 1;
        });
        break;
      case 'ArrowLeft':
      case 'ArrowRight':
        if (isDropdownOpen && selectedIndex >= 0) {
          e.preventDefault();
          setSelectedIndex(-1);
          inputRef.current?.focus();
        }
        break;
      case 'Enter':
        e.preventDefault();
        if (
          isDropdownOpen &&
          selectedIndex >= 0 &&
          selectedIndex < filteredProducts.length
        ) {
          const selectedProduct = filteredProducts[selectedIndex];
          handleProductClick(selectedProduct, false);
        } else {
          if (query.trim()) {
            console.log('Pesquisando por:', query);
            setIsDropdownOpen(false);
          }
        }
        break;
      case 'Escape':
        e.preventDefault();
        setSelectedIndex(-1);
        setIsDropdownOpen(false);
        inputRef.current?.focus();
        break;
    }
  };

  const handleProductClick = (product: Product, shouldUpdateQuery = true) => {
    if (shouldUpdateQuery) {
      setQuery(product.name);
    }
    setIsDropdownOpen(false);
    setSelectedIndex(-1);

    const slug = generateSlug(product);
    router.push(`/catalog/${slug}`);

    onProductSelect?.(product);
  };

  const handleClearSearch = () => {
    setQuery('');
    setFilteredProducts([]);
    setIsDropdownOpen(false);
    setSelectedIndex(-1);
  };

  // Remover conteúdo de filtragem do cliente e substituir por busca paginada no back
  useEffect(() => {
    if (query.trim() === '') {
      setFilteredProducts([]);
      setIsDropdownOpen(false);
      setSelectedIndex(-1);
      return;
    }

    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredProducts(filtered.slice(0, 10));
    setIsDropdownOpen(query.trim().length > 0);
    setSelectedIndex(-1);
  }, [query, products]);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, filteredProducts.length);
  }, [filteredProducts]);

  const truncateDescription = (description: string, maxLength = 50) => {
    return description.length > maxLength
      ? description.substring(0, maxLength) + '...'
      : description;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const calculateAnnualPrice = (monthlyPrice: number) => {
    return monthlyPrice * 12;
  };

  return (
    <div
      className={`flex-1 max-w-xl mx-8 relative ${className}`}
      ref={searchbarRef}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex bg-gray-100 rounded-md border border-gray-300 focus-within:ring-[6px] focus-within:ring-green-600/20 focus-within:border-green-600 transition-all items-center px-1.5">
          <div className="relative flex flex-1 items-center justify-center">
            <Search className="absolute left-1.5 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="w-full pl-7 pr-8 py-2.5 bg-transparent rounded-l-md text-base focus:outline-none transition-all"
            />
            {query && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
          <Button
            type="submit"
            className="px-2 py-2 h-fit bg-green-600 hover:bg-green-700 text-white rounded-md"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </form>

      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
        >
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              Carregando produtos...
            </div>
          ) : error ? (
            <div className="p-4 text-center text-red-500">{error}</div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              Nenhum produto encontrado
            </div>
          ) : (
            filteredProducts.map((product, index) => (
              <Link
                key={product.id}
                ref={(el) => {
                  if (el) {
                    itemRefs.current[index] = el;
                  }
                }}
                href={`/catalog/${generateSlug(product)}`}
                onClick={() => handleProductClick(product, true)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`group flex items-center p-3 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors ${
                  selectedIndex === index
                    ? 'bg-gray-100 border-green-100'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex-shrink-0 w-12 h-12 mr-3">
                  <Image
                    src={
                      // product.image ||
                      `https://picsum.photos/48/48?random=${product.id}`
                    }
                    alt={product.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3
                    className={`text-sm font-medium text-gray-900 truncate transition-all ${
                      selectedIndex === index
                        ? 'underline'
                        : 'group-hover:underline'
                    }`}
                  >
                    {product.name}
                  </h3>
                  <p
                    className={`text-xs text-gray-500 mt-0.5 transition-all ${
                      selectedIndex === index
                        ? 'underline'
                        : 'group-hover:underline'
                    }`}
                  >
                    {truncateDescription(product.description)}
                  </p>
                  <div className="flex items-center mt-1 gap-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                      {product.category}
                    </span>
                  </div>
                </div>

                <div className="flex-shrink-0 text-right ml-3">
                  <div className="text-sm font-semibold text-gray-900">
                    {formatPrice(product.price)}/mês
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatPrice(calculateAnnualPrice(product.price))}/ano
                  </div>
                </div>

                <div className="flex-shrink-0 ml-2">
                  <ArrowUpRight className="h-4 w-4 text-gray-400" />
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
