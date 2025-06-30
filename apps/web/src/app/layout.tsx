'use client';
import '../global.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from '../contexts/CartContext';
import { Toaster } from 'react-hot-toast';

const toastOptions = {
  duration: 5000,
  style: {
    background: '#ffffff',
    color: '#374151',
    border: '1px solid #e5e7eb',
    marginBottom: '12px',
  },
  success: {
    iconTheme: {
      primary: '#10b981',
      secondary: '#ffffff',
    },
  },
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 0.5,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <CartProvider>
            {children}
            <Toaster position="bottom-right" toastOptions={toastOptions} />
          </CartProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
