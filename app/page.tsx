'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Zap, Star, Bell } from 'lucide-react';

export default function ComingSoonPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
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

  const logoAnimation = {
    animate: {
      scale: [1, 1.05, 1],
      rotateY: [0, 5, 0]
    },
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const backgroundAnimation = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.3, 0.5, 0.3]
    },
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="h-screen bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-blue-500/10" />
        <motion.div
          {...backgroundAnimation}
          className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          {...backgroundAnimation}
          transition={{ ...backgroundAnimation.transition, delay: 2 }}
          className="absolute bottom-20 right-20 w-80 h-80 bg-yellow-400/15 rounded-full blur-3xl"
        />
        <motion.div
          {...backgroundAnimation}
          transition={{ ...backgroundAnimation.transition, delay: 4 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-orange-400/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 h-screen flex flex-col">
        {/* Header */}
        <motion.div
          className="pt-4 px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="text-xs text-muted-foreground">MYKS Sports</div>
            <div className="text-xs text-muted-foreground">2025</div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">

            {/* Logo Section */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.div
                {...logoAnimation}
                className="relative w-24 h-24 mx-auto"
              >
                <Image
                  src="/logo.png"
                  alt="MYKS Logo"
                  width={96}
                  height={96}
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </motion.div>
            </motion.div>

            {/* Title and Subtitle */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="space-y-4"
            >
              <motion.h1
                variants={fadeInUp}
                className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary via-yellow-400 to-orange-400 bg-clip-text text-transparent leading-tight"
              >
                MYKS Sports
              </motion.h1>

              <motion.div
                variants={fadeInUp}
                className="space-y-2"
              >
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  Bientôt Disponible
                </h2>
                <p className="text-base text-muted-foreground max-w-xl mx-auto">
                  Préparez-vous pour une révolution dans le sport.
                </p>
              </motion.div>
            </motion.div>

            {/* Features Cards */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto"
            >
              {[
                {
                  icon: Zap,
                  title: "Performance",
                  description: "Haute performance"
                },
                {
                  icon: Star,
                  title: "Premium",
                  description: "Qualité supérieure"
                },
                {
                  icon: Calendar,
                  title: "Innovation",
                  description: "Design futuriste"
                }
              ].map((feature, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300">
                    <CardContent className="p-4 text-center space-y-2">
                      <div className="w-8 h-8 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                        <feature.icon className="w-4 h-4 text-primary" />
                      </div>
                      <h3 className="text-sm font-semibold text-foreground">{feature.title}</h3>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Section */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.8 }}
              className="space-y-3"
            >
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  className="gradient-primary hover:opacity-90 transition-opacity font-semibold text-black px-6"
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Me notifier
                </Button>
                <Button
                  variant="outline"
                  className="border-primary/30 hover:bg-primary/10 px-6"
                >
                  En savoir plus
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                Rejoignez la liste d&apos;attente pour être les premiers informés
              </p>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          className="pb-4 px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-xs text-muted-foreground">
              © 2025 MYKS Sports. Le changement arrive.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}