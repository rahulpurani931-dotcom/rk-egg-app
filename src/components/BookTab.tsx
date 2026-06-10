/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, Users, Clock, CheckCircle2, ChevronLeft, ChevronRight, Droplet } from 'lucide-react';
import { ATMOSPHERE_IMAGE, TIME_SLOTS, PARTY_GUEST_OPTIONS } from '../data';
import { Reservation } from '../types';

interface BookTabProps {
  onAddReservation: (res: Reservation) => void;
}

export default function BookTab({ onAddReservation }: BookTabProps) {
  const [guests, setGuests] = useState('2');
  const [selectedTime, setSelectedTime] = useState('19:00');
  const [specialRequests, setSpecialRequests] = useState('');
  
  // Custom Inline Date Picker representing a sliding week
  // Let's generate dates for the next 10 days starting from today June 10, 2026
  const startDay = new Date(2026, 5, 10); // June 10, 2026
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);

  const datesList = Array.from({ length: 9 }).map((_, i) => {
    const d = new Date(startDay);
    d.setDate(startDay.getDate() + i);
    return {
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: d.getDate(),
      monthName: d.toLocaleDateString('en-US', { month: 'short' }),
      formatted: d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
    };
  });

  const [reservationSuccess, setReservationSuccess] = useState<Reservation | null>(null);

  const handleConfirmReservation = () => {
    const formattedDate = datesList[selectedDateIndex].formatted;
    const bookingId = 'RKB-' + Math.floor(200000 + Math.random() * 800000);
    
    const newBooking: Reservation = {
      id: bookingId,
      guests,
      date: formattedDate,
      timeSlot: selectedTime,
      specialRequests: specialRequests.trim() || undefined,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Confirmed'
    };

    onAddReservation(newBooking);
    setReservationSuccess(newBooking);
    
    // Reset state
    setSpecialRequests('');
  };

  const handleCloseSuccess = () => {
    setReservationSuccess(null);
  };

  return (
    <div className="space-y-8 pb-32 max-w-2xl mx-auto text-left relative">
      
      {/* Receipts Success Modal Overlay */}
      {reservationSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[#0F0F0F]/90 backdrop-blur-md" onClick={handleCloseSuccess} />
          <div className="bg-[#161616] border border-white/10 rounded-2xl p-6 sm:p-8 w-full max-w-md relative z-10 text-center shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-egg-yolk/10 rounded-full flex items-center justify-center mb-6 mx-auto">
              <CheckCircle2 className="w-10 h-10 text-egg-yolk" />
            </div>
            
            <h3 className="text-xl font-display font-medium italic text-white mb-1">Table Reserved!</h3>
            <p className="text-xs text-[#E2B53E] border border-[#E2B53E]/25 font-sans font-semibold uppercase tracking-widest bg-white/5 px-3.5 py-1 rounded-full w-fit mx-auto mb-6">
              Confirmed Reservation
            </p>

            <div className="bg-[#0F0F0F] border border-white/10 rounded-xl p-5 mb-6 text-left space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                <span className="text-[10px] text-white/50 font-semibold tracking-wider uppercase">Reservation ID</span>
                <span className="font-mono text-sm font-semibold text-egg-yolk">{reservationSuccess.id}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[9px] text-white/40 uppercase font-bold tracking-wider">Date</span>
                  <p className="font-sans text-xs font-semibold text-white">{reservationSuccess.date}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] text-white/40 uppercase font-bold tracking-wider">Time Slot</span>
                  <p className="font-sans text-xs font-semibold text-white">{reservationSuccess.timeSlot}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] text-white/40 uppercase font-bold tracking-wider">Total Guests</span>
                  <p className="font-sans text-xs font-semibold text-white">{reservationSuccess.guests} Guest(s)</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] text-white/40 uppercase font-bold tracking-wider">Status</span>
                  <p className="text-xs font-semibold text-emerald-500">Guaranteed</p>
                </div>
              </div>

              {reservationSuccess.specialRequests && (
                <div className="pt-2 border-t border-white/5">
                  <span className="text-[9px] text-white/40 uppercase font-bold tracking-wider block mb-1">
                    Your Special Notes
                  </span>
                  <p className="text-xs italic text-white/75">"{reservationSuccess.specialRequests}"</p>
                </div>
              )}
            </div>

            <p className="text-[11px] text-white/50 mb-6 leading-relaxed">
              We look forward to serving you! Please show this confirmation receipt on arrival.
            </p>

            <button 
              onClick={handleCloseSuccess}
              className="w-full bg-egg-yolk text-[#0F0F0F] font-sans font-bold h-12 rounded-xl transition-all active:scale-95 cursor-pointer hover:opacity-95"
            >
              Okay, Great!
            </button>
          </div>
        </div>
      )}

      {/* Hero Atmosphere Image banner */}
      <section className="relative h-64 w-full rounded-2xl overflow-hidden shadow-xs mb-6">
        <img 
          alt="Restaurant cozy atmosphere table setting" 
          className="w-full h-full object-cover opacity-90 mix-blend-luminosity" 
          src={ATMOSPHERE_IMAGE} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/90 to-transparent flex flex-col justify-end p-6">
          <h2 className="font-display text-2xl sm:text-3xl font-medium italic text-white mb-1">Book Your Table</h2>
          <p className="font-sans text-xs text-white/85">Redefine your gourmet street egg experience with luxury seating.</p>
        </div>
      </section>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#161616] p-4 rounded-xl border border-white/5 flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-full bg-egg-yolk/10 flex items-center justify-center mb-2.5">
            <Droplet className="w-5 h-5 text-egg-yolk" />
          </div>
          <h3 className="font-display text-xs font-medium italic text-[#E5E5E5] mb-1">Alkaline Purified Kitchen</h3>
          <p className="text-[10px] text-on-surface-variant opacity-75 max-w-[180px] leading-tight">
            We exclusively boil and slow-simmer all spice gravies in pure medical grade alkaline water.
          </p>
        </div>

        <div className="bg-[#161616] p-4 rounded-xl border border-white/5 flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-full bg-spiced-red/10 flex items-center justify-center mb-2.5">
            <CheckCircle2 className="w-5 h-5 text-spiced-red" />
          </div>
          <h3 className="font-display text-xs font-medium italic text-[#E5E5E5] mb-1">5-Star Hygiene Promised</h3>
          <p className="text-[10px] text-on-surface-variant opacity-75 max-w-[180px] leading-tight">
            Comprehensive daily sanitization of iron tawas and strictly bio-degradable handles.
          </p>
        </div>
      </div>

      {/* Booking Form Sections */}
      <div className="space-y-8 bg-[#161616] p-6 rounded-2xl border border-white/10 shadow-xs">
        
        {/* 1. Guests selection */}
        <div className="space-y-3">
          <label className="font-sans text-xs uppercase tracking-widest font-semibold text-white/70 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-egg-yolk" /> How many guests?
          </label>
          <div className="flex gap-2.5 overflow-x-auto hide-scrollbar pb-1">
            {PARTY_GUEST_OPTIONS.map((gObj) => (
              <button
                key={gObj.id}
                onClick={() => setGuests(gObj.val)}
                className={`py-3 px-5 text-xs font-sans font-semibold border rounded-full transition-all cursor-pointer ${
                  guests === gObj.val
                    ? 'bg-egg-yolk text-[#0F0F0F] border-egg-yolk font-bold'
                    : 'bg-[#1E1E1E] border-white/10 text-white hover:bg-white/5'
                }`}
              >
                {gObj.val}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Dynamic Calendar Date Selection */}
        <div className="space-y-3">
          <label className="font-sans text-xs uppercase tracking-widest font-semibold text-white/70 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-egg-yolk" /> Select Date
          </label>
          <div className="border border-white/10 rounded-xl p-4 bg-[#0F0F0F]/50">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
              <span className="font-display text-xs italic text-white/90">June 2026</span>
              <div className="flex gap-1.5 text-white/40">
                <ChevronLeft className="w-4 h-4 cursor-not-allowed opacity-40" />
                <ChevronRight className="w-4 h-4 cursor-not-allowed opacity-40" />
              </div>
            </div>
            
            {/* Inline Days Layout */}
            <div className="flex gap-2 justify-between overflow-x-auto hide-scrollbar">
              {datesList.map((dt, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedDateIndex(idx)}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl min-w-14 transition-all cursor-pointer ${
                    selectedDateIndex === idx
                      ? 'bg-egg-yolk text-[#0F0F0F] shadow-md font-semibold'
                      : 'bg-[#1E1E1E] hover:bg-white/5 border border-white/5'
                  }`}
                >
                  <span className={`text-[9px] uppercase font-bold tracking-wider opacity-60 mb-0.5 ${selectedDateIndex === idx ? 'text-[#0F0F0F]' : 'text-white'}`}>{dt.dayName}</span>
                  <span className="font-display font-medium text-sm">{dt.dayNumber}</span>
                  <span className={`text-[8px] opacity-70 mt-0.5 ${selectedDateIndex === idx ? 'text-[#0F0F0F]/70' : 'text-white/70'}`}>{dt.monthName}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Time Slots */}
        <div className="space-y-3">
          <label className="font-sans text-xs uppercase tracking-widest font-semibold text-white/70 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-egg-yolk" /> Available Time Slots
          </label>
          <div className="grid grid-cols-3 gap-3">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedTime(slot)}
                className={`py-3 text-center rounded-xl border text-xs font-sans font-semibold transition-all cursor-pointer ${
                  selectedTime === slot
                    ? 'bg-egg-yolk text-[#0F0F0F] border-egg-yolk shadow-sm font-bold'
                    : 'bg-[#1E1E1E] border-white/5 text-white hover:bg-white/5'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Special Requests */}
        <div className="space-y-3">
          <label className="font-sans text-xs uppercase tracking-widest font-semibold text-white/70 block">
            Special Requests <span className="text-white/40 font-normal lowercase">(optional)</span>
          </label>
          <textarea
            rows={3}
            className="w-full bg-[#1E1E1E] border border-white/10 rounded-xl p-4 focus:ring-1 focus:ring-egg-yolk focus:border-egg-yolk outline-none text-xs font-sans placeholder-white/20 text-white"
            placeholder="E.g., birthday anniversary celebrations, food allergy notices, low salt prep, window-side table requests..."
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
          />
        </div>

        {/* 5. Trigger reservation */}
        <button
          onClick={handleConfirmReservation}
          className="w-full bg-egg-yolk text-[#0F0F0F] font-sans text-xs uppercase tracking-widest font-bold h-14 rounded-xl shadow-md active:scale-98 transition-transform flex items-center justify-center gap-2 group cursor-pointer hover:opacity-95"
        >
          <span>Confirm Booking</span>
          <ChevronRight className="w-4 h-4 text-[#0F0F0F] transition-transform group-hover:translate-x-1" />
        </button>

      </div>
    </div>
  );
}
