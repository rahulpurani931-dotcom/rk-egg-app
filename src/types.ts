/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'Signature' | 'Breakfast' | 'Snacks' | 'Egg Curries' | 'Beverages';
  tags?: string[];
  isMostLoved?: boolean;
}

export interface CartItem {
  id: string;
  item: MenuItem;
  quantity: number;
}

export interface Reservation {
  id: string;
  guests: string;
  date: string;
  timeSlot: string;
  specialRequests?: string;
  createdAt: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}

export interface UserProfile {
  name: string;
  email: string;
  memberSince: string;
  points: number;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  avatar: string;
}

export type TabType = 'home' | 'menu' | 'book' | 'profile';
