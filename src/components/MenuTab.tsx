/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, Plus, Sparkles, Check, Flame, ChevronRight, ShoppingCart } from 'lucide-react';
import { MenuItem, CartItem } from '../types';
import { MENU_ITEMS } from '../data';

interface MenuTabProps {
  onAddToCart: (item: MenuItem) => void;
  cart: CartItem[];
  onViewCart: () => void;
}

export default function MenuTab({ onAddToCart, cart, onViewCart }: MenuTabProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const categories = ['All', 'Signature', 'Breakfast', 'Snacks', 'Egg Curries', 'Beverages'];

  // Hero Product (3G Gotalo) details
  const heroProduct = MENU_ITEMS.find(item => item.id === '3g-gotalo') || MENU_ITEMS[0];

  // Filter items
  const filteredMenuItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const categoryMatch = selectedCategory === 'All' || item.category === selectedCategory;
      const searchMatch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, searchQuery]);

  const totalCartPrice = useMemo(() => {
    return cart.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  }, [cart]);

  const totalCartItemsCount = useMemo(() => {
    return cart.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [cart]);

  return (
    <div className="space-y-8 pb-32">
      
      {/* 1. Hero Featured Signature Banner (3G Gotalo) */}
      <section className="relative rounded-3xl overflow-hidden shadow-lg group">
        <div className="aspect-[4/5] md:aspect-video w-full overflow-hidden">
          <img 
            alt="3G Gotalo Signature Dish" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 mix-blend-luminosity hover:mix-blend-normal" 
            src={heroProduct.image} 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/95 via-[#0F0F0F]/45 to-transparent flex flex-col justify-end p-6 sm:p-8 text-left">
          <div className="inline-flex items-center gap-1 bg-egg-yolk text-[#0F0F0F] px-3 py-1 rounded-full w-fit mb-3">
            <Sparkles className="w-4 h-4 fill-[#0F0F0F]" />
            <span className="font-sans text-[9px] font-bold tracking-widest uppercase">MOST LOVED CRITIC PICK</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-normal italic text-white mb-2">{heroProduct.name}</h2>
          <p className="text-white/70 font-sans text-xs sm:text-sm mb-4 max-w-lg leading-relaxed">
            {heroProduct.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-display text-2xl font-normal italic text-egg-yolk">₹{heroProduct.price}</span>
            <button 
              onClick={() => onAddToCart(heroProduct)}
              className="bg-egg-yolk hover:bg-white text-[#0F0F0F] font-sans text-xs uppercase tracking-wider font-extrabold px-6 py-3 rounded-xl transition-transform active:scale-95 duration-200 cursor-pointer"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </section>

      {/* 2. Interactive Category Filter Scrollbar & Search Toggle */}
      <div className="sticky top-16 bg-[#0F0F0F]/95 backdrop-blur-md py-4 z-40 border-b border-white/5 -mx-4 px-4 flex items-center justify-between gap-4">
        {isSearchOpen ? (
          <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-1.5 border border-white/10 flex-1 transition-all">
            <Search className="w-4 h-4 text-white/40" />
            <input 
              type="text" 
              className="font-sans text-xs text-white outline-none flex-1 border-0 focus:ring-0 p-0 placeholder-white/30" 
              placeholder="Search spicy eggs..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button 
              onClick={() => {
                setSearchQuery('');
                setIsSearchOpen(false);
              }}
              className="text-white/40 hover:text-white font-sans text-xs uppercase tracking-wider font-bold"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex gap-2.5 overflow-x-auto hide-scrollbar flex-1 py-1">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 px-5 py-2 text-xs font-sans font-semibold rounded-full border transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat 
                    ? 'bg-egg-yolk text-[#0F0F0F] border-egg-yolk font-bold' 
                    : 'border-white/10 bg-white/5 hover:bg-white/10 text-[#E5E5E5]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {!isSearchOpen && (
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="bg-white/5 border border-white/10 p-2.5 rounded-full hover:bg-white/10 active:scale-90 transition-transform cursor-pointer"
            aria-label="Search items"
          >
            <Search className="w-4 h-4 text-white" />
          </button>
        )}
      </div>

      {/* 3. Grid representation of items */}
      {filteredMenuItems.length === 0 ? (
        <div className="py-16 text-center text-white/40 font-sans space-y-2">
          <p className="font-bold text-sm">No premium dishes fit your search</p>
          <p className="text-xs opacity-70">Try selecting 'All' or search for another keyword like 'spicy', 'egg', or 'cheese'!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenuItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-[#161616] rounded-2xl border border-white/10 overflow-hidden group flex flex-col justify-between transition-all duration-300 hover:border-white/20"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#1E1E1E]">
                {item.isMostLoved && (
                  <span className="absolute top-3 left-3 bg-[#A83A3A] border border-white/10 text-white text-[8px] font-sans font-semibold px-2.5 py-1 rounded-full z-10 tracking-widest flex items-center gap-1 uppercase">
                    <Flame className="w-3 h-3 text-white" /> SIGNATURE
                  </span>
                )}
                <img 
                  className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-102 group-hover:opacity-100 mix-blend-luminosity hover:mix-blend-normal" 
                  src={item.image} 
                  alt={item.name} 
                />
                <button 
                  onClick={() => onAddToCart(item)}
                  className="absolute bottom-4 right-4 bg-egg-yolk text-[#0F0F0F] hover:bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-90 transition-all cursor-pointer z-10 outline-none"
                  aria-label={`Add ${item.name}`}
                >
                  <Plus className="w-5 h-5 stroke-[2.5px]" />
                </button>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between text-left">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-display font-medium text-white italic text-base tracking-tight">{item.name}</h3>
                    <span className="font-display font-normal text-egg-yolk text-base italic">₹{item.price}</span>
                  </div>
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed line-clamp-3 opacity-90">
                    {item.description}
                  </p>
                </div>
                
                {item.tags && (
                  <div className="flex flex-wrap gap-1.5 pt-3.5">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-[9px] bg-white/5 border border-white/5 px-2 rounded-full text-on-surface-variant font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. Floating Cart Summary Bar (Renders if cart items present) */}
      {totalCartItemsCount > 0 && (
        <div 
          onClick={onViewCart}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-md bg-egg-yolk h-14 rounded-full shadow-2xl flex items-center justify-between px-6 z-40 transform transition-transform cursor-pointer hover:scale-102 duration-300 floating-cart-animation text-[#0F0F0F]"
        >
          <div className="flex items-center gap-3">
            <div className="bg-[#0F0F0F] text-white text-[8px] font-sans font-bold px-3 py-1 rounded-lg tracking-wider uppercase">
              {totalCartItemsCount} {totalCartItemsCount === 1 ? 'ITEM' : 'ITEMS'}
            </div>
            <span className="font-display italic font-normal text-sm text-[#0F0F0F]">₹{totalCartPrice.toFixed(2)}</span>
          </div>
          <button className="font-sans font-bold text-[10px] tracking-widest text-[#0F0F0F] flex items-center gap-1.5 outline-none">
            <span>VIEW CART</span>
            <ChevronRight className="w-4 h-4 text-[#0F0F0F] stroke-[2.5px]" />
          </button>
        </div>
      )}

    </div>
  );
}
