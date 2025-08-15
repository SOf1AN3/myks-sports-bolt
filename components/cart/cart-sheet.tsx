'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/components/providers/cart-provider';
import { formatPrice } from '@/lib/utils';

export function CartSheet() {
  const { state, closeCart, updateQuantity, removeItem, getTotalPrice, clearCart } = useCart();

  const handleCheckout = async () => {
    if (state.items.length === 0) return;

    try {
      const orderData = {
        items: state.items.map(item => ({
          productId: item.product.id,
          name: item.product.name,
          price: item.product.onSale ? item.product.originalPrice || item.product.price : item.product.price,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
        })),
        total: getTotalPrice(),
        status: 'pending'
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const order = await response.json();
        clearCart();
        closeCart();
        alert(`Commande créée avec succès! ID: ${order._id}. Vous serez contacté pour le paiement à la livraison.`);
      } else {
        throw new Error('Erreur lors de la création de la commande');
      }
    } catch (error) {
      console.error('Erreur checkout:', error);
      alert('Erreur lors de la commande. Veuillez réessayer.');
    }
  };

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 z-50"
          />
          
          {/* Sheet */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-border z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-lg font-semibold">Panier ({state.items.length})</h2>
              <Button variant="ghost" size="sm" onClick={closeCart}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {state.items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Votre panier est vide</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {state.items.map((item) => {
                    const itemId = `${item.product.id}-${item.size}-${item.color}`;
                    const price = item.product.onSale ? item.product.originalPrice || item.product.price : item.product.price;
                    
                    return (
                      <motion.div
                        key={itemId}
                        layout
                        className="flex gap-4 p-4 border border-border rounded-lg"
                      >
                        <div className="w-16 h-16 bg-muted rounded-md flex-shrink-0 overflow-hidden">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm truncate">
                            {item.product.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {item.size} • {item.color}
                          </p>
                          <p className="text-sm font-semibold">
                            {formatPrice(price)}
                          </p>
                          
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(itemId, item.quantity - 1)}
                              className="h-6 w-6 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            
                            <span className="text-sm font-medium w-6 text-center">
                              {item.quantity}
                            </span>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(itemId, item.quantity + 1)}
                              className="h-6 w-6 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(itemId)}
                              className="ml-auto text-xs text-muted-foreground hover:text-destructive"
                            >
                              Retirer
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="border-t border-border p-6 space-y-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                
                <Button
                  onClick={handleCheckout}
                  className="w-full gradient-primary hover:opacity-90 transition-opacity"
                >
                  Passer commande
                </Button>
                
                <p className="text-xs text-muted-foreground text-center">
                  Paiement à la livraison
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}