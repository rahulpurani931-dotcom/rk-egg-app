/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Menu, ShoppingCart, Egg } from 'lucide-react';
import { TabType } from '../types';
import { LOGO_URL } from '../data';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export default function Header({ cartCount, onCartClick, activeTab, setActiveTab }: HeaderProps) {
  return (
    <header className="fixed top-0 w-full z-50 bg-cream-surface/90 sticky-nav border-b border-charcoal/5 h-16 flex justify-between items-center px-6 transition-all duration-300">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setActiveTab('home')}
          className="md:hidden text-charcoal hover:opacity-80 transition-opacity active:scale-90 transition-transform"
          aria-label="Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        {/* Logo and Branding */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <img 
            alt="R.K. Eggwala Logo" 
            className="h-9 object-contain group-hover:scale-105 transition-transform" 
            src={LOGO_URL} 
          />
          <span className="font-display italic font-semibold text-lg tracking-tight text-charcoal hidden sm:inline-block">
            R.K. <span className="text-egg-yolk font-normal opacity-85">Eggwala</span>
          </span>
        </div>
      </div>

      {/* Desktop Navigation Links */}
      <div className="flex items-center gap-6">
        <div className="hidden md:flex gap-8 items-center">
          <button 
            onClick={() => setActiveTab('home')}
            className={`font-sans text-[10px] uppercase tracking-[0.2em] font-semibold transition-colors ${
              activeTab === 'home' ? 'text-egg-yolk' : 'text-on-surface-variant hover:text-egg-yolk/85'
            }`}
          >
            Home
          </button>
          <button 
            onClick={() => setActiveTab('menu')}
            className={`font-sans text-[10px] uppercase tracking-[0.2em] font-semibold transition-colors ${
              activeTab === 'menu' ? 'text-egg-yolk' : 'text-on-surface-variant hover:text-egg-yolk/85'
            }`}
          >
            Menu
          </button>
          <button 
            onClick={() => setActiveTab('book')}
            className={`font-sans text-[10px] uppercase tracking-[0.2em] font-semibold transition-colors ${
              activeTab === 'book' ? 'text-egg-yolk' : 'text-on-surface-variant hover:text-egg-yolk/85'
            }`}
          >
            Book Table
          </button>
          <button 
            onClick={() => setActiveTab('profile')}
            className={`font-sans text-[10px] uppercase tracking-[0.2em] font-semibold transition-colors ${
              activeTab === 'profile' ? 'text-egg-yolk' : 'text-on-surface-variant hover:text-egg-yolk/85'
            }`}
          >
            Profile
          </button>
        </div>

        {/* Cart Trigger */}
        <button 
          onClick={onCartClick}
          className="relative text-egg-yolk p-2 hover:bg-charcoal/5 rounded-full transition-all active:scale-90 flex items-center justify-center"
          aria-label="Shopping Cart"
        >
          <ShoppingCart className="w-6 h-6 text-charcoal" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-spiced-red text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-extrabold shadow-sm animate-pulse">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
