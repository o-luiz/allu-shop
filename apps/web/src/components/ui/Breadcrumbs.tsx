'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <div className="max-w-7xl    py-4">
      <nav className="text-sm text-gray-600 flex items-center">
        {items.map((breadcrumb, index) => (
          <span key={index} className="flex items-center">
            {index > 0 && <ChevronRight className="mx-2 h-4 w-4" />}
            {breadcrumb.href ? (
              <Link
                href={breadcrumb.href}
                className={`hover:underline hover:text-gray-900 transition-colors ${
                  breadcrumb.isActive ? 'text-gray-900 font-medium' : ''
                }`}
              >
                {breadcrumb.label}
              </Link>
            ) : (
              <span
                className={
                  breadcrumb.isActive ? 'text-gray-900 font-medium' : ''
                }
              >
                {breadcrumb.label}
              </span>
            )}
          </span>
        ))}
      </nav>
    </div>
  );
}
