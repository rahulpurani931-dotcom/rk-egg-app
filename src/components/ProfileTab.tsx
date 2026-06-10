/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Award, QrCode, Settings, HelpCircle, MapPin, LogOut, Edit, MessageSquare, ChevronRight, CheckCircle2, RotateCcw, X, LogIn } from 'lucide-react';
import { MenuItem, Reservation, UserProfile } from '../types';
import { MOCK_PROFILE, RECENT_CRAVINGS, QR_CODE_URL } from '../data';

interface ProfileTabProps {
  reservations: Reservation[];
  onReorder: (itemName: string, price: number, image: string) => void;
  userPoints: number;
}

export default function ProfileTab({ reservations, onReorder, userPoints }: ProfileTabProps) {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    ...MOCK_PROFILE,
    points: userPoints > MOCK_PROFILE.points ? userPoints : MOCK_PROFILE.points
  });
  
  const [isEditingName, setIsEditingName] = useState(false);
  const [editNameField, setEditNameField] = useState(userProfile.name);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const triggerFeedback = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => {
      setFeedbackMsg(null);
    }, 2500);
  };

  const handleUpdateName = () => {
    if (editNameField.trim()) {
      setUserProfile({ ...userProfile, name: editNameField.trim() });
      setIsEditingName(false);
      triggerFeedback('Name updated to ' + editNameField.trim() + '!');
    }
  };

  const handleReorderClick = (name: string, price: number, image: string) => {
    onReorder(name, price, image);
    triggerFeedback(`Added "${name}" back into your shopping cart!`);
  };

  const handleCustomerSupport = () => {
    triggerFeedback('Opening help center chat with support specialists...');
  };

  const handleAddresses = () => {
    triggerFeedback('Navigating to your saved locations and addresses...');
  };

  const handleSettings = () => {
    triggerFeedback('Settings Panel unlocked. Preferences saved!');
  };

  // Gold Member conversion calculation
  // current points: userProfile.points (e.g. 1240). Gold tier is at 1300.
  // 60 points to Gold. Let's make it dynamic!
  const nextTierGoal = 1300;
  const pointsRemaining = Math.max(0, nextTierGoal - userProfile.points);
  const progressPercent = Math.min(100, Math.round((userProfile.points / nextTierGoal) * 100));

  return (
    <div className="space-y-8 pb-32 max-w-md mx-auto text-left relative">
      
      {/* Mini notification toast */}
      {feedbackMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-[#161616] border border-white/10 text-egg-yolk px-4 py-2.5 rounded-full shadow-lg z-50 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-egg-yolk" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* QR Loyalty Code Modal Overlay */}
      {isQrOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[#0F0F0F]/95 backdrop-blur-md" onClick={() => setIsQrOpen(false)} />
          <div className="bg-[#161616] border border-white/10 rounded-2xl p-8 w-full max-w-xs relative z-10 text-center shadow-2xl animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setIsQrOpen(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white p-1.5 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <h4 className="font-display font-medium italic text-white mb-4">Your Loyalty Reward ID</h4>
            <div className="bg-white p-4 rounded-xl border border-white/5 mb-6 flex justify-center shadow-inner">
              <img 
                alt="Loyalty QR Code scan counter" 
                className="w-40 h-40 mix-blend-multiply" 
                src={QR_CODE_URL} 
              />
            </div>
            <p className="font-sans text-xs text-white/60 leading-relaxed">
              Scan this dynamic ticket code on any bill tawa counter at R.K. Eggwala store to credit point rewards automatically!
            </p>
          </div>
        </div>
      )}

      {/* 1. Profile header with Avatar */}
      <section className="flex items-center gap-5 mt-4">
        <div className="relative group">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-egg-yolk shadow-md bg-[#1E1E1E]">
            <img 
              className="w-full h-full object-cover" 
              src={userProfile.avatar} 
              alt={userProfile.name} 
            />
          </div>
          <button 
            onClick={() => setIsEditingName(!isEditingName)}
            className="absolute bottom-0 right-0 bg-egg-yolk text-[#0F0F0F] p-1.5 rounded-full shadow-md flex items-center justify-center border-2 border-[#161616] hover:scale-110 transition-transform cursor-pointer"
            aria-label="Edit name profile"
          >
            <Edit className="w-3 h-3 font-semibold stroke-[2.5px]" />
          </button>
        </div>

        <div className="flex-1 space-y-1">
          {isEditingName ? (
            <div className="flex items-center gap-1.5">
              <input 
                type="text" 
                className="font-display font-medium italic text-white text-base border-b border-white/45 outline-none bg-transparent w-36 py-0.5 px-1" 
                value={editNameField}
                onChange={(e) => setEditNameField(e.target.value)}
              />
              <button 
                onClick={handleUpdateName}
                className="bg-egg-yolk text-[#0F0F0F] px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-wider"
              >
                Save
              </button>
            </div>
          ) : (
            <h2 className="font-display text-xl font-medium italic text-white">{userProfile.name}</h2>
          )}
          <p className="font-sans text-xs text-on-surface-variant opacity-75">
            Gold Member • Since {userProfile.memberSince}
          </p>
        </div>
      </section>

      {/* 2. Loyalty Rewards Board */}
      <section className="loyalty-card-gradient rounded-2xl p-6 text-white relative overflow-hidden shadow-xl">
        <div className="absolute -right-10 -top-10 opacity-[0.03]">
          <Award className="w-48 h-48 text-egg-yolk" />
        </div>
        
        <div className="relative z-10 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-sans text-[9px] font-bold text-egg-yolk tracking-[0.25em] uppercase mb-1">
                EGG REWARDS BALANCE
              </p>
              <h3 className="font-display text-3xl font-medium italic text-white flex items-baseline gap-1.5">
                {userProfile.points} <span className="text-egg-yolk text-xs font-sans tracking-wide uppercase font-bold">Points</span>
              </h3>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15">
              <Award className="w-5 h-5 text-egg-yolk" />
            </div>
          </div>

          {/* Progress Goal */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-white/70 font-semibold tracking-wide">
              <span>{userProfile.tier} Level</span>
              {pointsRemaining > 0 ? (
                <span>{pointsRemaining} points to Gold Member</span>
              ) : (
                <span>Unlocked Chef Tier Gold!</span>
              )}
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-egg-yolk rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button 
              onClick={() => triggerFeedback('Earned rewards points cannot be split online. Redeem code in stores!')}
              className="bg-egg-yolk text-[#0F0F0F] font-sans text-xs uppercase tracking-wider font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all outline-none cursor-pointer"
            >
              Redeem Points
            </button>
            <button 
              onClick={() => setIsQrOpen(true)}
              className="bg-white/5 hover:bg-white/10 border border-white/15 text-white font-sans text-xs uppercase tracking-wider font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all outline-none cursor-pointer"
            >
              <QrCode className="w-4.5 h-4.5 text-egg-yolk" />
              <span>Scan In-Cafe</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. Recent bookings / Active Reservations list */}
      {reservations.length > 0 && (
        <section className="space-y-3.5">
          <span className="text-[9px] uppercase tracking-[0.25em] text-egg-yolk font-semibold block">RESERVATIONS COUNTER</span>
          <h3 className="font-display font-medium italic text-base text-white">Active Table Bookings</h3>
          <div className="space-y-3">
            {reservations.map((res) => (
              <div 
                key={res.id}
                className="bg-[#161616] p-4 rounded-xl border border-white/10 flex items-center justify-between text-[#E5E5E5]"
              >
                <div className="space-y-1.5 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-egg-yolk">{res.id}</span>
                    <span className="bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {res.status}
                    </span>
                  </div>
                  <p className="font-sans text-xs font-semibold text-[#E5E5E5]">
                    {res.date} at {res.timeSlot}
                  </p>
                  <p className="font-sans text-[10px] text-white/50">Party for {res.guests} Guests</p>
                </div>
                <div className="text-right">
                  <span className="text-[#DFBA73] material-symbols-outlined text-2xl">event_available</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. Recent Cravings List */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <h3 className="font-display font-medium italic text-base text-white">Recent Cravings</h3>
          <button 
            onClick={() => triggerFeedback('All historic transactions are loaded.')}
            className="font-sans text-xs uppercase tracking-wider font-semibold text-egg-yolk hover:opacity-85"
          >
            View All
          </button>
        </div>

        <div className="space-y-3">
          {RECENT_CRAVINGS.map((item) => (
            <div 
              key={item.id} 
              className="bg-[#161616] border border-white/5 p-4 rounded-xl flex items-center gap-4 hover:border-white/10 transition-all text-white"
            >
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-12 h-12 rounded-lg object-cover bg-[#1E1E1E] border border-white/5 mix-blend-luminosity" 
              />
              <div className="flex-grow text-left">
                <div className="flex justify-between items-start">
                  <h4 className="font-display font-medium text-sm text-[#E5E5E5] italic">{item.name}</h4>
                  <span className="font-display font-normal text-egg-yolk text-xs italic">₹{item.price}</span>
                </div>
                <p className="font-sans text-[9px] uppercase tracking-wider text-white/40 mt-1">
                  {item.status} • {item.date}
                </p>
              </div>
              <button 
                onClick={() => handleReorderClick(item.name, item.price, item.image)}
                title="Reorder item"
                className="bg-[#1e1e1e] hover:bg-egg-yolk border border-white/5 text-white hover:text-[#0F0F0F] rounded-full p-2 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                aria-label={`Reorder ${item.name}`}
              >
                <RotateCcw className="w-4 h-4 stroke-[2.5px]" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Mock Settings Options Links list */}
      <section className="space-y-2">
        <button 
          onClick={handleSettings}
          className="w-full flex items-center justify-between p-4 bg-[#161616] rounded-xl border border-white/5 hover:border-white/10 transition-all group text-left cursor-pointer outline-none"
        >
          <div className="flex items-center gap-3">
            <div className="bg-white/5 p-2 rounded-lg text-white/60 group-hover:text-egg-yolk transition-colors">
              <Settings className="w-4.5 h-4.5" />
            </div>
            <span className="font-sans text-xs font-semibold text-white/80">Settings & Privacy</span>
          </div>
          <ChevronRight className="w-4 h-4 text-white/30" />
        </button>

        <button 
          onClick={handleCustomerSupport}
          className="w-full flex items-center justify-between p-4 bg-[#161616] rounded-xl border border-white/5 hover:border-white/10 transition-all group text-left cursor-pointer outline-none"
        >
          <div className="flex items-center gap-3">
            <div className="bg-white/5 p-2 rounded-lg text-white/60 group-hover:text-egg-yolk transition-colors">
              <HelpCircle className="w-4.5 h-4.5" />
            </div>
            <span className="font-sans text-xs font-semibold text-white/80">Customer Support</span>
          </div>
          <ChevronRight className="w-4 h-4 text-white/30" />
        </button>

        <button 
          onClick={handleAddresses}
          className="w-full flex items-center justify-between p-4 bg-[#161616] rounded-xl border border-white/5 hover:border-white/10 transition-all group text-left cursor-pointer outline-none"
        >
          <div className="flex items-center gap-3">
            <div className="bg-white/5 p-2 rounded-lg text-white/60 group-hover:text-egg-yolk transition-colors">
              <MapPin className="w-4.5 h-4.5" />
            </div>
            <span className="font-sans text-xs font-semibold text-white/80">Delivery Addresses</span>
          </div>
          <ChevronRight className="w-4 h-4 text-white/30" />
        </button>
      </section>

      {/* 6. Sign out */}
      <button 
        onClick={() => triggerFeedback('Sign Out action mocked. Staying logged-in for offline-first preservation.')}
        className="w-full py-3 text-spiced-red font-sans text-xs uppercase tracking-widest font-extrabold flex items-center justify-center gap-2 hover:bg-white/5 rounded-xl transition-colors cursor-pointer outline-none"
      >
        <LogOut className="w-4 h-4 text-spiced-red group-hover:translate-x-1" />
        <span>Sign Out</span>
      </button>

    </div>
  );
}
