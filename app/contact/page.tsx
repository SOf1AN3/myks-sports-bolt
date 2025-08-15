'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simuler l'envoi du formulaire
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Message envoyé',
        description: 'Nous vous répondrons dans les plus brefs délais.',
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur s\'est produite lors de l\'envoi du message.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: 'contact@myks-sports.com',
      subtitle: 'Réponse sous 24h'
    },
    {
      icon: Phone,
      title: 'Téléphone',
      details: '+33 1 23 45 67 89',
      subtitle: 'Lun-Ven 9h-18h'
    },
    {
      icon: MapPin,
      title: 'Adresse',
      details: '123 Rue du Sport',
      subtitle: '75001 Paris, France'
    }
  ];

  const socialLinks = [
    { icon: Facebook, name: 'Facebook', href: '#' },
    { icon: Instagram, name: 'Instagram', href: '#' },
    { icon: Twitter, name: 'Twitter', href: '#' }
  ];

  return (
    <div className="min-h-screen pt-16 bg-background">
      
      {/* Header */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-yellow-400/5 to-orange-400/10" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Contactez <span className="bg-gradient-primary bg-clip-text text-transparent">MYKS Sports</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Une question, une suggestion ou besoin d'aide ? Notre équipe est là pour vous accompagner.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {contactInfo.map((info, index) => (
              <motion.div key={info.title} variants={fadeInUp}>
                <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <info.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{info.title}</h3>
                    <p className="text-lg font-semibold mb-1">{info.details}</p>
                    <p className="text-sm text-muted-foreground">{info.subtitle}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Envoyez-nous un message</h2>
            <p className="text-lg text-muted-foreground">
              Remplissez le formulaire ci-dessous et nous vous répondrons rapidement
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Nom complet *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Votre nom complet"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Sujet *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Sujet de votre message"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Votre message détaillé..."
                      rows={6}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full gradient-primary hover:opacity-90 transition-opacity"
                    size="lg"
                  >
                    {isSubmitting ? (
                      'Envoi en cours...'
                    ) : (
                      <>
                        Envoyer le message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold mb-4">Suivez-nous</h2>
            <p className="text-lg text-muted-foreground">
              Restez connectés avec MYKS Sports sur les réseaux sociaux
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex justify-center gap-6"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                variants={fadeInUp}
                href={social.href}
                className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center text-white hover:opacity-90 transition-opacity"
              >
                <social.icon className="h-8 w-8" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}