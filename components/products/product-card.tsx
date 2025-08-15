'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, Heart, ShoppingBag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/components/providers/cart-provider';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300">
        <CardContent className="p-0">
          <div className="relative aspect-square overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.isNew && (
                <Badge className="bg-green-500 hover:bg-green-600">
                  Nouveau
                </Badge>
              )}
              {product.onSale && (
                <Badge className="bg-red-500 hover:bg-red-600">
                  Promo
                </Badge>
              )}
            </div>

            {/* Hover Actions */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" className="rounded-full p-2" asChild>
                  <Link href={`/products/${product.id}`}>
                    <Eye className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-3">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                {product.category}
              </p>
              <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {product.onSale && product.originalPrice ? (
                  <>
                    <span className="font-bold text-red-500">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  </>
                ) : (
                  <span className="font-bold">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
            </div>

            {/* Sizes */}
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">Tailles:</span>
              <div className="flex gap-1">
                {product.sizes.slice(0, 4).map((size) => (
                  <span
                    key={size}
                    className="text-xs px-1.5 py-0.5 bg-muted rounded text-muted-foreground"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>

            <Button 
              asChild 
              className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
              variant="outline"
            >
              <Link href={`/products/${product.id}`}>
                Voir le produit
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}