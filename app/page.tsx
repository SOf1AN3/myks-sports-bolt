'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ComingSoonPage() {
  // Animation de vague pour le texte
  const waveAnimation = {
    animate: {
      opacity: [0.6, 1, 0.6],
      scale: [0.98, 1.02, 0.98],
    },
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  // Animation de pulsation pour le logo
  const logoAnimation = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.9, 1, 0.9]
    },
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col justify-center items-center overflow-hidden relative">
      {/* Logo au centre */}
      <div className="flex-1 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10"
        >
          <motion.div
            {...logoAnimation}
            className="relative w-80 h-80 mx-auto"
          >
            <Image
              src="/logo.png"
              alt="MYKS Logo"
              width={320}
              height={320}
              className="w-full h-full object-contain"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Coming Soon en bas */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="relative z-10 pb-16 text-center"
      >
        <motion.h2
          {...waveAnimation}
          className="text-4xl md:text-6xl font-black text-[#9AFF00] mb-4 tracking-wider uppercase"
          style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}
        >
          Coming Soon
        </motion.h2>
        <motion.p
          {...waveAnimation}
          transition={{
            ...waveAnimation.transition,
            delay: 0.3
          }}
          className="text-xl md:text-2xl text-[#9AFF00] font-bold tracking-[0.2em] uppercase"
          style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}
        >
          The change is HERE
        </motion.p>
      </motion.div>
    </div>
  );
}