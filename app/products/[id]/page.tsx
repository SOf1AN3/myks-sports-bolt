import React from 'react';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/data';
import Link from 'next/link';
import ProductPageClient from './product-page-client';

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id);

  if (!product) {
    return (
      <div className="min-h-screen pt-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
          <Button asChild>
            <Link href="/catalogue">Retour au catalogue</Link>
          </Button>
        </div>
      </div>
    );
  }

  const similarProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  return <ProductPageClient product={product} similarProducts={similarProducts} />;
}