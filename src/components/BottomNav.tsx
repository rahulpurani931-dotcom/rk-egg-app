/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Home, Utensils, Calendar, User } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 w-full z-40 rounded-t-2xl bg-[#161616]/95 backdrop-blur-md shadow-[0_-4px_24px_rgba(0,0,0,0.4)] border-t border-white/10 flex justify-around items-center h-20 pb-safe px-4">
      <button 
        onClick={() => setActiveTab('home')}
        className={`flex flex-col items-center justify-center gap-1 w-16 transition-all duration-200 active:scale-90 ${
          activeTab === 'home' ? 'text-egg-yolk font-bold' : 'text-white/50 hover:text-egg-yolk'
        }`}
      >
        <Home className={`w-5 h-5 ${activeTab === 'home' ? 'fill-egg-yolk/10 text-egg-yolk' : 'text-white/50'}`} />
        <span className="text-[10px] font-sans tracking-wider uppercase">Home</span>
      </button>

      <button 
        onClick={() => setActiveTab('menu')}
        className={`flex flex-col items-center justify-center gap-1 w-16 transition-all duration-200 active:scale-90 ${
          activeTab === 'menu' ? 'text-egg-yolk font-bold' : 'text-white/50 hover:text-egg-yolk'
        }`}
      >
        <Utensils className={`w-5 h-5 ${activeTab === 'menu' ? 'fill-egg-yolk/10 text-egg-yolk' : 'text-white/50'}`} />
        <span className="text-[10px] font-sans tracking-wider uppercase">Menu</span>
      </button>

      <button 
        onClick={() => setActiveTab('book')}
        className={`flex flex-col items-center justify-center gap-1 w-16 transition-all duration-200 active:scale-90 ${
          activeTab === 'book' ? 'text-egg-yolk font-bold' : 'text-white/50 hover:text-egg-yolk'
        }`}
      >
        <Calendar className={`w-5 h-5 ${activeTab === 'book' ? 'fill-egg-yolk/10 text-egg-yolk' : 'text-white/50'}`} />
        <span className="text-[10px] font-sans tracking-wider uppercase">Book</span>
      </button>

      <button 
        onClick={() => setActiveTab('profile')}
        className={`flex flex-col items-center justify-center gap-1 w-16 transition-all duration-200 active:scale-90 ${
          activeTab === 'profile' ? 'text-egg-yolk font-bold' : 'text-white/50 hover:text-egg-yolk'
        }`}
      >
        <User className={`w-5 h-5 ${activeTab === 'profile' ? 'fill-egg-yolk/10 text-egg-yolk' : 'text-white/50'}`} />
        <span className="text-[10px] font-sans tracking-wider uppercase">Profile</span>
      </button>
    </nav>
  );
}
