'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Search, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { useCart } from '@/components/providers/cart-provider';
import { CartSheet } from '@/components/cart/cart-sheet';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/accueil', label: 'Accueil' },
  { href: '/catalogue', label: 'Catalogue' },
  { href: '/collections', label: 'Collections' },
  { href: '/about', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { getTotalItems, openCart } = useCart();

  const toggleMobile = () => setIsOpen(!isOpen);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                MYKS Sports
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary relative py-2',
                    pathname === item.href
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  )}
                >
                  {item.label}
                  {pathname === item.href && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2"
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={openCart}
                className="relative p-2"
              >
                <ShoppingBag className="h-4 w-4" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center space-x-4 md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={openCart}
                className="relative p-2"
              >
                <ShoppingBag className="h-4 w-4" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobile}
                className="p-2"
              >
                {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-background border-b border-border"
            >
              <div className="px-4 py-4 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'block text-sm font-medium transition-colors hover:text-primary py-2',
                      pathname === item.href
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    )}
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="pt-4 border-t border-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="w-full justify-start"
                  >
                    {theme === 'dark' ? (
                      <>
                        <Sun className="h-4 w-4 mr-2" />
                        Mode clair
                      </>
                    ) : (
                      <>
                        <Moon className="h-4 w-4 mr-2" />
                        Mode sombre
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <CartSheet />
    </>
  );
}