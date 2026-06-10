/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, Star, Plus, Flame, Award, ShieldCheck, Mail, Send } from 'lucide-react';
import { HERO_Dishes_URL, STORY_IMAGES, LOGO_URL } from '../data';
import { MenuItem } from '../types';

interface HomeTabProps {
  onOrderNowClick: () => void;
  onExploreMenuClick: () => void;
  onQuickAdd: (itemId: string) => void;
}

export default function HomeTab({ onOrderNowClick, onExploreMenuClick, onQuickAdd }: HomeTabProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => setEmail(''), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden min-h-[80vh] flex items-center px-4 py-12 md:py-20">
        <div className="absolute right-0 top-0 w-full h-full pointer-events-none z-0">
          <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-egg-yolk via-transparent to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10 w-full">
          <div className="space-y-6 text-left">
            <div className="space-y-3.5">
              <span className="text-egg-yolk font-sans text-[10px] uppercase tracking-[0.25em] font-semibold block">
                Premium Street Food — Series No. 22
              </span>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-charcoal font-medium tracking-tight leading-[1.1] italic">
                The Egg, <span className="text-egg-yolk font-normal">Elevated.</span>
              </h1>
              <p className="text-on-surface-variant font-sans text-sm sm:text-base leading-relaxed max-w-md opacity-85">
                Experience the authentic sizzle of Surat's legendary street-style gastronomy. We carefully transform the humble farm egg into a signature, high-hygiene gourmet culinary masterpiece.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={onOrderNowClick}
                className="bg-egg-yolk text-[#0F0F0F] font-sans text-xs uppercase tracking-widest font-bold py-4 px-8 rounded-xl hover:opacity-90 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                Order Now
              </button>
              <button 
                onClick={onExploreMenuClick}
                className="border border-white/20 text-[#E5E5E5] font-sans text-xs uppercase tracking-widest font-semibold py-3.5 px-8 rounded-xl hover:bg-white/5 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                Explore Menu
              </button>
            </div>
          </div>
          
          <div className="relative group justify-self-center lg:justify-self-end w-full max-w-md md:max-w-none">
            <div className="absolute -inset-4 bg-egg-yolk/5 blur-3xl rounded-full animate-pulse group-hover:scale-110 transition-transform duration-700" />
            <img 
              alt="Signature Egg Dish Gotalo" 
              className="relative z-10 w-full h-auto rounded-3xl border border-white/5 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500 max-h-[500px] object-cover" 
              src={HERO_Dishes_URL} 
            />
          </div>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="bg-[#161616] border-y border-white/10 py-12 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1 md:border-r md:border-white/10 last:border-0 pr-4">
            <p className="font-display text-4xl text-egg-yolk italic font-normal">7,000+</p>
            <p className="font-sans text-[9px] tracking-[0.2em] uppercase opacity-40">Families Served</p>
          </div>
          <div className="space-y-1 md:border-r md:border-white/10 last:border-0 pr-4">
            <p className="font-display text-4xl text-egg-yolk italic font-normal">50+</p>
            <p className="font-sans text-[9px] tracking-[0.2em] uppercase opacity-40">Egg Varieties</p>
          </div>
          <div className="space-y-1 md:border-r md:border-white/10 last:border-0 pr-4">
            <p className="font-display text-4xl text-egg-yolk italic font-normal">12</p>
            <p className="font-sans text-[9px] tracking-[0.2em] uppercase opacity-40">Golden Years</p>
          </div>
          <div className="space-y-1">
            <p className="font-display text-4xl text-egg-yolk italic font-normal flex justify-center items-center gap-1.5">
              4.8 <Star className="w-5 h-5 fill-egg-yolk text-egg-yolk inline-block" />
            </p>
            <p className="font-sans text-[9px] tracking-[0.2em] uppercase opacity-40">User Rating</p>
          </div>
        </div>
      </section>

      {/* 3. Daily Specials - Bento Grid */}
      <section className="py-12 px-6 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
          <div className="space-y-1">
            <span className="text-[9px] uppercase tracking-[0.25em] text-egg-yolk font-semibold block">CHEF REVOLUTION</span>
            <h2 className="font-display text-3xl text-charcoal font-medium italic tracking-tight">Today's Daily Specials</h2>
            <p className="text-on-surface-variant font-sans text-xs opacity-75">Chef's curated egg masterworks freshly made for you</p>
          </div>
          <button 
            onClick={onExploreMenuClick}
            className="text-egg-yolk font-sans text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 hover:opacity-80 transition-all group"
          >
            <span>View Full Menu</span> 
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Bento Item 1: Large Featured Gotalo Plate */}
          <div className="md:col-span-8 bg-[#161616] border border-white/10 rounded-2xl overflow-hidden bento-card relative min-h-[420px] flex flex-col justify-end">
            <img 
              className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 hover:opacity-100" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAKbNAOwJ878FwrgdfV2sr-E5hCby6Ust85i6TtStK0Y4E2ACth3XTaAVXY_j8MI8kLJ19zHKYib0CLoNnRx8QrEUtBy7aHU1pucwFIYs2ZDkSk3VBRCUTu1XblEb-hdZs5C6xebGFIxDPtEczU76jjkRFrqXTPfAlufK3La1Z63Ya4iK2W0L6GagJ7F4bF_OiqhYhqPVQWYMIyCpXpe6DG6bRZHB6uCj-EGm7xbZrUjX3kBNqLthe9iviPSMWGIzMSluTRMT_Wt8" 
              alt="3G Gotalo dish"
            />
            {/* Ambient Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/95 via-[#0F0F0F]/60 to-transparent z-0" />
            
            <div className="relative z-10 p-6 sm:p-8 text-white space-y-4">
              <span className="bg-spiced-red/10 border border-spiced-red/30 text-egg-yolk font-sans text-[9px] font-semibold px-3 py-1 rounded-full inline-flex items-center gap-1 tracking-wider uppercase">
                <Flame className="w-3.5 h-3.5" /> MUST TRY CREATION
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-normal italic pb-1">3G Gotalo Special on toast</h3>
              <p className="font-sans text-xs text-white/70 max-w-md leading-relaxed">
                Our signature masterpiece of double eggs cooked with secret local Surti spices topped with fresh heavy butter, fresh mint slices, and hot pav bread!
              </p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-egg-yolk font-display text-2xl font-normal italic">₹249</span>
                <button 
                  onClick={() => onQuickAdd('3g-gotalo')}
                  className="bg-egg-yolk hover:bg-white text-[#0F0F0F] rounded-full p-3 shadow-md hover:scale-110 active:scale-95 transition-all outline-none cursor-pointer"
                  aria-label="Add 3G Gotalo to cart"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Bento Item 2: Small Grid items */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="bg-[#161616] rounded-2xl p-5 border border-white/5 bento-card flex flex-col h-full text-left">
              <img 
                className="w-full aspect-video sm:aspect-square md:aspect-video lg:aspect-square rounded-xl object-cover mb-4 mix-blend-luminosity hover:mix-blend-normal transition-all" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDClWITD7j45PyVQI6qrw5-ojpFCumtUjJiOnY8KbZCCuEOYsieIrr1aU967dWAyECGFThznxkmTCeuWW1FAhqECYYruyJFtjeoWjOnG2UfDN3SImvEl3TxXMQNc02DKQ6nLyKc9zDXD850CddMymFPrcocFaaq5M8YlINd1srsGFT6RwZkh2it8NrK6TUpvWOriGKGrBoVSJm3XUP25iE1QBAfDRzhdHkSsz--yvxIzHO2Ta7mzt_6mDUsqsePnXwhITjV_Dz4sEg" 
                alt="Surti Masala Fry"
              />
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-display font-medium text-charcoal text-base italic">Surti Masala Fry</h4>
                <span className="text-egg-yolk font-display font-medium italic">₹180</span>
              </div>
              <p className="font-sans text-xs text-on-surface-variant flex-grow opacity-75">
                A highly spiced, aromatic roasted egg coin delight for your crispy afternoon street cravings.
              </p>
            </div>

            <div className="bg-[#161616] border border-white/10 rounded-xl p-5 shadow-xs bento-card flex items-center justify-between text-charcoal">
              <div className="space-y-1 text-left">
                <h4 className="font-display font-medium text-lg italic text-[#E5E5E5]">Cheese Kheema</h4>
                <p className="font-sans text-xs text-on-surface-variant opacity-85">Melting slow-cooked minced egg tawa goodness.</p>
              </div>
              <button 
                onClick={() => onQuickAdd('cheese-kheema')}
                className="bg-egg-yolk text-[#0F0F0F] rounded-full p-3 hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                aria-label="Add Cheese Kheema to cart"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Story Section */}
      <section className="py-12 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Sizzling Photo Grid */}
          <div className="order-2 lg:order-1 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-8">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-white/5 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                  <img className="w-full h-full object-cover mix-blend-luminosity" src={STORY_IMAGES.streetVendor} alt="Surat Old Street Vendor" />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden shadow-lg bg-[#161616] border border-white/10 p-6 flex flex-col justify-center text-[#E5E5E5] text-left">
                  <Award className="w-8 h-8 mb-3 text-egg-yolk" />
                  <p className="font-display text-base font-normal italic leading-relaxed">Authentic Surat Tawa Style</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-lg border border-white/5">
                  <img className="w-full h-full object-cover mix-blend-luminosity" src={STORY_IMAGES.interior} alt="Elegant Dining Interior" />
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-white/5 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                  <img className="w-full h-full object-cover mix-blend-luminosity" src={STORY_IMAGES.family} alt="Joyful family sharing food" />
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="order-1 lg:order-2 space-y-6 text-left lg:pl-8">
            <div className="space-y-2">
              <span className="text-egg-yolk font-sans text-[10px] tracking-[0.25em] uppercase block">Since 2012</span>
              <h2 className="font-display text-3xl font-medium italic pb-1 text-charcoal">Our Sizzling Journey</h2>
            </div>
            <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed opacity-85">
              Born on the energetic, bustling street tawas of Surat, Gujarat, <strong>R.K. Eggwala</strong> began with a single high-fired tawa, fresh country eggs, and a fire in our heart to redefine street egg cuisine. 
            </p>
            <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed opacity-85">
              Today, we are humbled to have served over 7,000 corporate and local families, taking our spicy country preparations and upgrading them with premium hygienic dairy ingredients and a modern, state-of-the-art sterile culinary kitchen setting. 
            </p>
            <div className="pt-2">
              <button 
                onClick={onExploreMenuClick}
                className="flex items-center gap-3 text-egg-yolk text-xs uppercase tracking-wider font-semibold group outline-none cursor-pointer"
              >
                <span className="h-[1px] w-8 bg-egg-yolk transition-all group-hover:w-12" />
                <span>Read Full Story & View Menu</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Newsletter Signup / Community Section */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="bg-[#161616] border border-white/10 rounded-[2rem] p-8 md:p-14 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-egg-yolk/5 rounded-full blur-3xl -mr-32 -mt-32" />
          
          <div className="relative z-10 max-w-lg text-center md:text-left space-y-3">
            <h2 className="text-white font-display text-2xl md:text-3xl font-medium italic tracking-tight flex items-center justify-center md:justify-start gap-2">
              Join the Egg-volution <Flame className="w-6 h-6 text-egg-yolk" />
            </h2>
            <p className="text-white/60 font-sans text-xs max-w-sm mx-auto md:mx-0">
              Get secret chef recipes, active community rewards, and be first to hear about new premium outlet openings near you!
            </p>
          </div>

          <div className="relative z-10 w-full md:w-auto">
            {submitted ? (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <p className="text-egg-yolk text-xs tracking-wider uppercase font-semibold flex items-center gap-2 justify-center">
                  <Mail className="w-4 h-4 text-egg-yolk" /> Welcome to the Sizzle Community!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input 
                  className="bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-white/20 font-sans text-xs w-full md:w-80 focus:outline-none focus:border-egg-yolk focus:ring-1 focus:ring-egg-yolk transition-colors" 
                  placeholder="Your healthy email address" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button 
                  type="submit"
                  className="bg-egg-yolk hover:bg-white text-[#0F0F0F] font-sans text-xs uppercase tracking-widest font-bold px-6 py-3.5 rounded-xl hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 6. Footer Content */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 opacity-90">
          <div className="space-y-4 text-left">
            <h4 className="font-display italic text-lg tracking-tight text-white">R.K. <span className="text-egg-yolk">Eggwala</span></h4>
            <p className="font-sans text-[11px] text-on-surface-variant max-w-xs leading-relaxed">
              Serving the finest premium street-style egg delicacies with absolute hygiene, quality commitment, and authentic Surat spices since 2012.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 gap-12">
            <div className="space-y-4 text-left">
              <h5 className="font-sans text-[9px] uppercase tracking-wider font-extrabold text-charcoal">Navigation</h5>
              <ul className="space-y-2.5 font-sans text-xs text-on-surface-variant">
                <li><button onClick={onExploreMenuClick} className="hover:text-egg-yolk transition-colors">Our Menu Items</button></li>
                <li><button onClick={onOrderNowClick} className="hover:text-egg-yolk transition-colors">Order Takeaway</button></li>
                <li><p className="text-charcoal/40">Locations: Surat | Ahmedabad | Pune</p></li>
              </ul>
            </div>
            <div className="space-y-4 text-left">
              <h5 className="font-sans text-[9px] uppercase tracking-wider font-extrabold text-charcoal">Support & Safety</h5>
              <ul className="space-y-2.5 font-sans text-xs text-on-surface-variant">
                <li><p className="text-on-surface-variant">Contact: support@rkeggwala.com</p></li>
                <li><span className="text-emerald-500 font-semibold flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> 5-Star Hygiene Certified</span></li>
                <li><p className="text-charcoal/40">© 2026 R.K. Eggwala.</p></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
