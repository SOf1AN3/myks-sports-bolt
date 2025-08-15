'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Award, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Performance',
      description: 'Nous concevons chaque produit pour maximiser vos performances sportives avec des matériaux techniques de pointe.'
    },
    {
      icon: Award,
      title: 'Qualité Premium',
      description: 'Nous utilisons uniquement les meilleurs matériaux et processus de fabrication pour garantir une durabilité exceptionnelle.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Notre équipe R&D intègre les dernières technologies pour créer des vêtements révolutionnaires.'
    },
    {
      icon: Users,
      title: 'Communauté',
      description: 'Nous créons une communauté d\'athlètes passionnés qui repoussent ensemble leurs limites.'
    }
  ];

  return (
    <div className="min-h-screen pt-16 bg-background">
      
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-yellow-400/5 to-orange-400/10" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              À propos de <span className="bg-gradient-primary bg-clip-text text-transparent">MYKS Sports</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              MYKS Sports est né de la passion pour l'excellence sportive et l'innovation. 
              Nous créons des vêtements de sport premium qui allient performance, style et durabilité.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Notre Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Équiper les athlètes d'aujourd'hui et de demain avec des vêtements techniques 
                qui dépassent les attentes en matière de performance, de confort et de style.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Chaque produit MYKS est conçu avec une attention méticuleuse aux détails, 
                en utilisant des technologies textiles avancées et des designs futuristes 
                qui reflètent l'évolution constante du sport moderne.
              </p>
            </div>

            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-yellow-400/20 rounded-3xl blur-3xl" />
              <img
                src="https://images.pexels.com/photos/6551376/pexels-photo-6551376.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="MYKS Sports Team"
                className="relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Valeurs</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Les principes fondamentaux qui guident chaque décision et chaque création chez MYKS Sports.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <motion.div key={value.title} variants={fadeInUp}>
                <Card className="text-center h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeInUp} className="space-y-6">
              <h2 className="text-3xl font-bold">Notre Histoire</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Fondée en 2020 par une équipe d'athlètes et d'ingénieurs textiles passionnés, 
                MYKS Sports est née du constat que les vêtements de sport traditionnels 
                ne répondaient plus aux exigences des sportifs modernes.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                En combinant recherche scientifique, design innovant et feedback direct 
                des athlètes, nous avons développé une gamme de vêtements qui redéfinit 
                les standards de l'industrie sportive.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Aujourd'hui, MYKS Sports équipe des milliers d'athlètes à travers le monde, 
                des amateurs passionnés aux professionnels de haut niveau, tous unis par 
                la même exigence d'excellence.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/6551294/pexels-photo-6551294.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="MYKS Sports Innovation"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-8 text-center text-white"
          >
            {[
              { number: '50K+', label: 'Athlètes équipés' },
              { number: '100+', label: 'Produits développés' },
              { number: '25', label: 'Pays présents' },
              { number: '98%', label: 'Satisfaction client' }
            ].map((stat, index) => (
              <motion.div key={stat.label} variants={fadeInUp}>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-white/90">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}