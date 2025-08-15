'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { CartProvider } from '@/components/providers/cart-provider';
import { Navigation } from '@/components/navigation/navigation';
import { Toaster } from '@/components/ui/toaster';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Masquer la navigation sur la page d'accueil Coming Soon
  const showNavigation = pathname !== '/';

  if (!mounted) {
    return (
      <html lang="fr" suppressHydrationWarning>
        <head>
          <title>MYKS Sports - Vêtements de Sport Premium</title>
          <meta name="description" content="MYKS Sports - Découvrez notre collection de vêtements de sport premium avec un design futuristique et moderne." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body className={inter.className}>
          <div className="min-h-screen bg-background">
            <div className="animate-pulse">
              <div className="h-16 bg-gray-200 dark:bg-gray-800"></div>
              <div className="p-8">
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <title>MYKS Sports - Vêtements de Sport Premium</title>
        <meta name="description" content="MYKS Sports - Découvrez notre collection de vêtements de sport premium avec un design futuristique et moderne." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <div className="min-h-screen bg-background">
              {showNavigation && <Navigation />}
              <main>{children}</main>
              <Toaster />
            </div>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}