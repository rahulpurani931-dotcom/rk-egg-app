/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  checkout: () => void;
  earnedPointsMultiplier?: number;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  updateQuantity,
  clearCart,
  checkout,
  earnedPointsMultiplier = 0.1
}: CartDrawerProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  const packagingCharge = cart.length > 0 ? 30 : 0;
  const gstTax = Math.round(subtotal * 0.05); // 5% GST
  const total = subtotal + packagingCharge + gstTax;
  
  // Calculate potential rewards gained
  const pointsToEarn = Math.round(subtotal * earnedPointsMultiplier);

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const orderId = 'RKE-' + Math.floor(100000 + Math.random() * 900000);
      setOrderSuccess(orderId);
      checkout(); // Parent callback
    }, 1200);
  };

  const handleCloseReceipt = () => {
    setOrderSuccess(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0F0F0F]/85 backdrop-blur-md transition-opacity" 
        onClick={orderSuccess ? handleCloseReceipt : onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0F0F0F] border-l border-white/10 shadow-2xl flex flex-col h-full transform transition-all duration-300">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-white/10 bg-[#161616] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-egg-yolk" />
              <h2 className="text-sm uppercase tracking-widest font-sans font-bold text-white">Your Order Summary</h2>
            </div>
            <button 
              onClick={orderSuccess ? handleCloseReceipt : onClose}
              className="text-white/60 hover:text-white p-1.5 rounded-full hover:bg-white/5 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Conditional success view */}
          {orderSuccess ? (
            <div className="flex-1 flex flex-col justify-center items-center px-6 text-center bg-[#161616]/50">
              <div className="w-16 h-16 bg-egg-yolk/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-egg-yolk" />
              </div>
              <h3 className="text-xl font-display font-medium italic text-white mb-2">Order Confirmed!</h3>
              <p className="text-white/60 font-sans text-xs mb-6 max-w-xs leading-relaxed">
                Your egg feast is sizzling! The kitchen has started preparing your order.
              </p>
              
              <div className="w-full bg-[#161616] p-5 rounded-xl border border-white/10 text-left mb-8 space-y-3">
                <div className="flex justify-between text-xs text-white/50">
                  <span>Order Reference</span>
                  <span className="font-mono font-bold text-egg-yolk">{orderSuccess}</span>
                </div>
                <div className="flex justify-between text-xs text-white/50 border-b border-white/5 pb-2">
                  <span>Status</span>
                  <span className="text-emerald-400 font-semibold uppercase tracking-wider text-[10px]">In Kitchen</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-white pt-1">
                  <span>Total Bill Charged</span>
                  <span className="text-base text-egg-yolk font-display font-normal">₹{total}</span>
                </div>
                <div className="flex items-center gap-2 bg-egg-yolk/10 border border-egg-yolk/20 p-2.5 rounded-lg text-xs font-semibold text-egg-yolk">
                  <Sparkles className="w-4 h-4 text-egg-yolk" />
                  <span>+{pointsToEarn} Egg rewards points added to Aryan Sharma!</span>
                </div>
              </div>

              <button
                onClick={handleCloseReceipt}
                className="w-full bg-egg-yolk text-[#0F0F0F] font-sans text-xs uppercase tracking-widest font-bold h-12 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
              >
                Back to Gourmet Dining
              </button>
            </div>
          ) : (
            <>
              {/* Cart Content */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col justify-center items-center text-center py-12">
                    <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center mb-4 text-white/30">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                    <p className="font-display font-medium italic text-white text-base">Your cart is entirely empty</p>
                    <p className="text-xs text-white/40 max-w-xs mt-1 leading-relaxed">
                      Choose from Surat's finest, premium street egg delicacies on our Menu!
                    </p>
                  </div>
                ) : (
                  cart.map((cartItem) => (
                    <div 
                      key={cartItem.id} 
                      className="flex items-center justify-between border-b border-white/15 pb-4 last:border-0"
                    >
                      <div className="flex items-center gap-4">
                        <img 
                          src={cartItem.item.image} 
                          alt={cartItem.item.name} 
                          className="w-16 h-16 rounded-lg object-cover bg-[#1E1E1E] border border-white/5 mix-blend-luminosity" 
                        />
                        <div>
                          <h4 className="font-display font-medium italic text-white text-sm">{cartItem.item.name}</h4>
                          <p className="text-egg-yolk font-display font-normal text-xs mt-0.5">
                            ₹{cartItem.item.price}
                          </p>
                        </div>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-2.5 bg-[#161616] rounded-lg p-1.5 border border-white/10">
                        <button 
                          onClick={() => updateQuantity(cartItem.id, -1)}
                          className="text-white hover:bg-white/10 p-1 rounded-md transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-white font-semibold text-xs min-w-4 text-center">
                          {cartItem.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(cartItem.id, 1)}
                          className="text-white hover:bg-white/10 p-1 rounded-md transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Calculations */}
              {cart.length > 0 && (
                <div className="border-t border-white/10 bg-[#161616] px-6 py-6 space-y-4">
                  <div className="space-y-2 text-xs text-white/60 flex flex-col">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-white">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Eco-packaging & Handle charges</span>
                      <span className="font-semibold text-white">₹{packagingCharge}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-white/5">
                      <span>GST Taxes (5%)</span>
                      <span className="font-semibold text-white">₹{gstTax}</span>
                    </div>
                    <div className="flex justify-between text-xs tracking-wider uppercase font-bold text-white pt-1">
                      <span>Total Amount Pay</span>
                      <span className="text-base text-egg-yolk font-display font-normal">₹{total}</span>
                    </div>
                  </div>

                  {/* Loyalty notification */}
                  <div className="flex items-center gap-2.5 bg-egg-yolk/5 px-3 py-2.5 rounded-xl text-[11px] font-semibold text-[#DFBA73] border border-white/5">
                    <Sparkles className="w-4 h-4 text-egg-yolk shrink-0" />
                    <span>Secure checkout earns you <strong className="text-white font-bold">{pointsToEarn} points</strong> on your profile rewards</span>
                  </div>

                  {/* Checkout CTA */}
                  <button 
                    onClick={handleCheckout}
                    disabled={isProcessing}
                    className="w-full bg-egg-yolk text-[#0F0F0F] font-sans text-xs uppercase tracking-widest font-bold h-12 rounded-xl shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 hover:opacity-95 cursor-pointer"
                  >
                    {isProcessing ? (
                      <span className="w-5 h-5 border-2 border-[#0F0F0F]/30 border-t-[#0F0F0F] rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Proceed to Pay</span>
                        <span className="font-semibold text-[10px] opacity-70 lowercase">(cash on delivery)</span>
                      </>
                    )}
                  </button>

                  <button 
                    onClick={clearCart}
                    className="w-full text-center text-xs text-white/40 hover:text-spiced-red hover:underline transition-colors mt-2 cursor-pointer"
                  >
                    Clear Cart Entirely
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}
