'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/products/product-card';
import { products } from '@/lib/data';
import { Badge } from '@/components/ui/badge';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function CollectionsPage() {
  const newProducts = products.filter(product => product.isNew);
  const saleProducts = products.filter(product => product.onSale);

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Collections <span className="bg-gradient-primary bg-clip-text text-transparent">MYKS</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Découvrez nos dernières nouveautés et offres spéciales
          </p>
        </motion.div>

        {/* Nouveautés */}
        {newProducts.length > 0 && (
          <motion.section
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-3xl font-bold">Nouveautés</h2>
              <Badge className="bg-green-500 hover:bg-green-600">
                {newProducts.length} produit{newProducts.length > 1 ? 's' : ''}
              </Badge>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {newProducts.map((product) => (
                <motion.div key={product.id} variants={fadeInUp}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        )}

        {/* Promotions */}
        {saleProducts.length > 0 && (
          <motion.section
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-3xl font-bold">Promotions</h2>
              <Badge className="bg-red-500 hover:bg-red-600">
                {saleProducts.length} produit{saleProducts.length > 1 ? 's' : ''}
              </Badge>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {saleProducts.map((product) => (
                <motion.div key={product.id} variants={fadeInUp}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        )}

        {/* Collections par catégorie */}
        <motion.section
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8">Collections par catégorie</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                category: 'T-Shirts',
                image: 'https://images.pexels.com/photos/6551415/pexels-photo-6551415.jpeg?auto=compress&cs=tinysrgb&w=600',
                description: 'T-shirts techniques haute performance'
              },
              {
                category: 'Leggings',
                image: 'https://images.pexels.com/photos/6551307/pexels-photo-6551307.jpeg?auto=compress&cs=tinysrgb&w=600',
                description: 'Leggings ultra-flex pour tous sports'
              },
              {
                category: 'Vestes',
                image: 'https://images.pexels.com/photos/6551224/pexels-photo-6551224.jpeg?auto=compress&cs=tinysrgb&w=600',
                description: 'Vestes techniques pour l\'extérieur'
              }
            ].map((collection) => {
              const categoryProducts = products.filter(p => p.category === collection.category);
              
              return (
                <motion.div
                  key={collection.category}
                  variants={fadeInUp}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                    <img
                      src={collection.image}
                      alt={collection.category}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold mb-1">{collection.category}</h3>
                      <p className="text-sm text-white/90">{collection.description}</p>
                      <p className="text-sm text-white/80 mt-1">
                        {categoryProducts.length} produit{categoryProducts.length > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>
      </div>
    </div>
  );
}