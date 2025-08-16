'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Minus, Plus, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useCart, Product } from '@/components/providers/cart-provider';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
import { ProductCard } from '@/components/products/product-card';

const fadeInUp = {
   initial: { opacity: 0, y: 30 },
   animate: { opacity: 1, y: 0 },
   transition: { duration: 0.5 }
};

interface ProductPageClientProps {
   product: Product;
   similarProducts: Product[];
}

export default function ProductPageClient({ product, similarProducts }: ProductPageClientProps) {
   const { addItem, openCart } = useCart();
   const [selectedSize, setSelectedSize] = useState('');
   const [selectedColor, setSelectedColor] = useState('');
   const [quantity, setQuantity] = useState(1);

   const handleAddToCart = () => {
      if (!selectedSize || !selectedColor) {
         alert('Veuillez sélectionner une taille et une couleur');
         return;
      }

      for (let i = 0; i < quantity; i++) {
         addItem({
            product,
            size: selectedSize,
            color: selectedColor,
         });
      }

      openCart();
   };

   return (
      <div className="min-h-screen pt-16 bg-background">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            {/* Breadcrumb */}
            <motion.div
               variants={fadeInUp}
               initial="initial"
               animate="animate"
               className="mb-8"
            >
               <Button variant="ghost" asChild className="mb-4">
                  <Link href="/catalogue">
                     <ArrowLeft className="h-4 w-4 mr-2" />
                     Retour au catalogue
                  </Link>
               </Button>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 mb-16">

               {/* Images */}
               <motion.div
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.1 }}
               >
                  <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                     <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                     />
                  </div>
               </motion.div>

               {/* Product Info */}
               <motion.div
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.2 }}
                  className="space-y-6"
               >
                  {/* Header */}
                  <div>
                     <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{product.category}</Badge>
                        {product.isNew && <Badge className="bg-green-500">Nouveau</Badge>}
                        {product.onSale && <Badge className="bg-red-500">Promo</Badge>}
                     </div>

                     <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>

                     <div className="flex items-center gap-4 mb-4">
                        {product.onSale && product.originalPrice ? (
                           <>
                              <span className="text-3xl font-bold text-red-500">
                                 {formatPrice(product.price)}
                              </span>
                              <span className="text-xl text-muted-foreground line-through">
                                 {formatPrice(product.originalPrice)}
                              </span>
                              <Badge className="bg-red-500">
                                 -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                              </Badge>
                           </>
                        ) : (
                           <span className="text-3xl font-bold">
                              {formatPrice(product.price)}
                           </span>
                        )}
                     </div>

                     <p className="text-lg text-muted-foreground">
                        {product.description}
                     </p>
                  </div>

                  {/* Size Selection */}
                  <div>
                     <h3 className="font-semibold mb-3">Taille</h3>
                     <div className="flex flex-wrap gap-2">
                        {product.sizes.map((size) => (
                           <Button
                              key={size}
                              variant={selectedSize === size ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedSize(size)}
                              className="w-12 h-12"
                           >
                              {size}
                           </Button>
                        ))}
                     </div>
                  </div>

                  {/* Color Selection */}
                  <div>
                     <h3 className="font-semibold mb-3">Couleur</h3>
                     <div className="flex flex-wrap gap-2">
                        {product.colors.map((color) => (
                           <Button
                              key={color}
                              variant={selectedColor === color ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedColor(color)}
                           >
                              {color}
                           </Button>
                        ))}
                     </div>
                  </div>

                  {/* Quantity */}
                  <div>
                     <h3 className="font-semibold mb-3">Quantité</h3>
                     <div className="flex items-center gap-3">
                        <Button
                           variant="outline"
                           size="sm"
                           onClick={() => setQuantity(Math.max(1, quantity - 1))}
                           className="h-10 w-10 p-0"
                        >
                           <Minus className="h-4 w-4" />
                        </Button>

                        <span className="text-lg font-semibold w-12 text-center">
                           {quantity}
                        </span>

                        <Button
                           variant="outline"
                           size="sm"
                           onClick={() => setQuantity(quantity + 1)}
                           className="h-10 w-10 p-0"
                        >
                           <Plus className="h-4 w-4" />
                        </Button>
                     </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                     <Button
                        onClick={handleAddToCart}
                        className="flex-1 gradient-primary hover:opacity-90 transition-opacity"
                        size="lg"
                     >
                        Ajouter au panier
                     </Button>

                     <Button variant="outline" size="lg" className="p-3">
                        <Heart className="h-5 w-5" />
                     </Button>

                     <Button variant="outline" size="lg" className="p-3">
                        <Share2 className="h-5 w-5" />
                     </Button>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                     {[
                        { icon: Truck, title: 'Livraison', subtitle: '48-72h' },
                        { icon: RotateCcw, title: 'Retours', subtitle: '30 jours' },
                        { icon: Shield, title: 'Garantie', subtitle: '2 ans' },
                     ].map(({ icon: Icon, title, subtitle }) => (
                        <div key={title} className="text-center">
                           <Icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                           <p className="text-sm font-medium">{title}</p>
                           <p className="text-xs text-muted-foreground">{subtitle}</p>
                        </div>
                     ))}
                  </div>
               </motion.div>
            </div>

            {/* Description */}
            <motion.div
               variants={fadeInUp}
               initial="initial"
               whileInView="animate"
               viewport={{ once: true }}
               className="mb-16"
            >
               <Card>
                  <CardContent className="p-8">
                     <h2 className="text-2xl font-bold mb-4">Description détaillée</h2>
                     <p className="text-muted-foreground leading-relaxed">
                        {product.detailedDescription}
                     </p>
                  </CardContent>
               </Card>
            </motion.div>

            {/* Similar Products */}
            {similarProducts.length > 0 && (
               <motion.div
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  className="mb-16"
               >
                  <h2 className="text-2xl font-bold mb-8">Produits similaires</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {similarProducts.map((similarProduct) => (
                        <ProductCard key={similarProduct.id} product={similarProduct} />
                     ))}
                  </div>
               </motion.div>
            )}
         </div>
      </div>
   );
}
