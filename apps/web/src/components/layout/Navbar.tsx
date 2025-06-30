'use client';

import { AlluShopLogo } from '../logo/allushop-logo';
import { AutoCompleteSearchbar } from '../ui/AutoCompleteSearchbar';
import { Cart } from '../ui/Cart';
import Link from 'next/link';

export function Navbar() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/">
              <AlluShopLogo size="3xl" />
            </Link>
            <AutoCompleteSearchbar />
            <Cart />
          </div>
        </div>
      </header>

      <div className="h-20"></div>
    </>
  );
}
