'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from './button';

interface SearchbarProps {
  placeholder?: string;
  className?: string;
}

export function Searchbar({
  placeholder = 'Buscar produtos...',
  className = '',
}: SearchbarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      console.log('Pesquisando por:', query);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className={`flex-1 max-w-2xl mx-8 ${className}`}>
      <form onSubmit={handleSubmit}>
        <div className="flex bg-gray-100 rounded-md border border-gray-300  focus-within:ring-[6px] focus-within:ring-green-600/20 focus-within:border-green-600 transition-all items-center px-1.5">
          <div className="relative flex flex-1 items-center justify-center">
            <Search className="absolute left-1.5 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder={placeholder}
              className="w-full pl-7 pr-4 py-2.5 bg-transparent rounded-l-md text-base focus:outline-none transition-all"
            />
          </div>
          <Button
            type="submit"
            className="px-2 py-2 h-fit bg-green-600 hover:bg-green-700 text-white rounded-md"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
