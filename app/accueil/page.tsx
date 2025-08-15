'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Zap, Shield, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProductCard } from '@/components/products/product-card';
import { products } from '@/lib/data';

const fadeInUp = {
   initial: { opacity: 0, y: 60 },
   animate: { opacity: 1, y: 0 },
   transition: { duration: 0.6 }
};

const staggerContainer = {
   animate: {
      transition: {
         staggerChildren: 0.2
      }
   }
};

export default function AccueilPage() {
   const featuredProducts = products.slice(0, 3);

   return (
      <div className="min-h-screen">
         {/* Hero Section */}
         <section className="relative pt-16 min-h-[90vh] flex items-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/10 to-blue-500/20" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-yellow-400/5 to-orange-400/10" />

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
               <div className="absolute top-20 left-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />
               <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
               <motion.div
                  className="space-y-8"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
               >
                  <div className="space-y-4">
                     <motion.h1
                        className="text-4xl md:text-6xl font-bold leading-tight"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                     >
                        Élévez votre{' '}
                        <span className="bg-gradient-primary bg-clip-text text-transparent">
                           performance
                        </span>
                     </motion.h1>

                     <motion.p
                        className="text-lg text-muted-foreground max-w-lg"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                     >
                        Découvrez MYKS Sports, la révolution du vêtement de sport premium.
                        Design futuristique, confort exceptionnel et performance ultime.
                     </motion.p>
                  </div>

                  <motion.div
                     className="flex flex-col sm:flex-row gap-4"
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.6, duration: 0.8 }}
                  >
                     <Button asChild size="lg" className="gradient-primary hover:opacity-90 transition-opacity group">
                        <Link href="/catalogue">
                           Explorer la collection
                           <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                     </Button>

                     <Button asChild variant="outline" size="lg">
                        <Link href="/about">En savoir plus</Link>
                     </Button>
                  </motion.div>

                  {/* Features */}
                  <motion.div
                     className="grid grid-cols-3 gap-6 pt-8"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ delay: 0.8, duration: 0.8 }}
                  >
                     {[
                        { icon: Zap, label: 'Performance' },
                        { icon: Shield, label: 'Qualité' },
                        { icon: Truck, label: 'Livraison' }
                     ].map(({ icon: Icon, label }) => (
                        <div key={label} className="text-center">
                           <Icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                           <p className="text-sm font-medium">{label}</p>
                        </div>
                     ))}
                  </motion.div>
               </motion.div>

               {/* Hero Image */}
               <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
               >
                  <div className="relative aspect-square max-w-lg mx-auto">
                     <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-yellow-400/40 rounded-3xl blur-3xl" />
                     <img
                        src="https://images.pexels.com/photos/6551415/pexels-photo-6551415.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="MYKS Sports Athletic Wear"
                        className="relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl"
                     />
                  </div>
               </motion.div>
            </div>
         </section>

         {/* Featured Products */}
         <section className="py-20 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <motion.div
                  className="text-center mb-16"
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
               >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                     Produits vedettes
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                     Découvrez notre sélection de vêtements de sport premium,
                     conçus pour les athlètes exigeants.
                  </p>
               </motion.div>

               <motion.div
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
               >
                  {featuredProducts.map((product, index) => (
                     <motion.div
                        key={product.id}
                        variants={fadeInUp}
                     >
                        <ProductCard product={product} />
                     </motion.div>
                  ))}
               </motion.div>

               <motion.div
                  className="text-center mt-12"
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
               >
                  <Button asChild variant="outline" size="lg">
                     <Link href="/catalogue">
                        Voir tous les produits
                        <ArrowRight className="ml-2 h-4 w-4" />
                     </Link>
                  </Button>
               </motion.div>
            </div>
         </section>

         {/* Collections Section */}
         <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <motion.div
                  className="text-center mb-16"
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
               >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                     Nos collections
                  </h2>
                  <p className="text-lg text-muted-foreground">
                     Des collections pensées pour chaque sport et chaque moment
                  </p>
               </motion.div>

               <motion.div
                  className="grid md:grid-cols-2 gap-8"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
               >
                  {[
                     {
                        title: 'Training Pro',
                        description: 'Pour vos séances d\'entraînement les plus intenses',
                        image: 'https://images.pexels.com/photos/6551307/pexels-photo-6551307.jpeg?auto=compress&cs=tinysrgb&w=600',
                     },
                     {
                        title: 'Street Style',
                        description: 'Le parfait équilibre entre sport et mode urbaine',
                        image: 'https://images.pexels.com/photos/6551224/pexels-photo-6551224.jpeg?auto=compress&cs=tinysrgb&w=600',
                     }
                  ].map((collection, index) => (
                     <motion.div
                        key={collection.title}
                        variants={fadeInUp}
                     >
                        <Card className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                           <CardContent className="p-0">
                              <div className="relative aspect-[4/3] overflow-hidden">
                                 <img
                                    src={collection.image}
                                    alt={collection.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                 />
                                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                 <div className="absolute bottom-6 left-6 text-white">
                                    <h3 className="text-2xl font-bold mb-2">{collection.title}</h3>
                                    <p className="text-white/90">{collection.description}</p>
                                 </div>
                              </div>
                           </CardContent>
                        </Card>
                     </motion.div>
                  ))}
               </motion.div>
            </div>
         </section>

         {/* CTA Section */}
         <section className="py-20 bg-gradient-primary relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
               <motion.div
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  className="text-white space-y-6"
               >
                  <h2 className="text-3xl md:text-4xl font-bold">
                     Rejoignez l'élite sportive
                  </h2>
                  <p className="text-lg text-white/90 max-w-2xl mx-auto">
                     Ne laissez rien au hasard. Équipez-vous avec MYKS Sports et
                     repoussez vos limites avec style et performance.
                  </p>
                  <div className="pt-4">
                     <Button
                        asChild
                        size="lg"
                        variant="secondary"
                        className="bg-white text-primary hover:bg-white/90"
                     >
                        <Link href="/catalogue">
                           Découvrir maintenant
                           <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                     </Button>
                  </div>
               </motion.div>
            </div>
         </section>
      </div>
   );
}
