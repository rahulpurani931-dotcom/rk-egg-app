/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import CartDrawer from './components/CartDrawer';
import HomeTab from './components/HomeTab';
import MenuTab from './components/MenuTab';
import BookTab from './components/BookTab';
import ProfileTab from './components/ProfileTab';

import { MenuItem, CartItem, Reservation, TabType } from './types';
import { MENU_ITEMS, MOCK_PROFILE } from './data';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [userPoints, setUserPoints] = useState<number>(MOCK_PROFILE.points);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cart Handlers
  const handleAddToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existing = prevCart.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prevCart.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prevCart, { id: item.id, item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((ci) => {
          if (ci.id === itemId) {
            const nextQty = ci.quantity + delta;
            return { ...ci, quantity: nextQty };
          }
          return ci;
        })
        .filter((ci) => ci.quantity > 0);
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleCheckoutPointsRefund = () => {
    // Loyalty logic: Earn 10% points of subtotal
    const subtotal = cart.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
    const earned = Math.round(subtotal * 0.1);
    setUserPoints((prev) => prev + earned);
    
    // Clear cart after checkout with 1.5s delay inside drawer (handled in CartDrawer visual state, we reset the items array afterward)
    setTimeout(() => {
      setCart([]);
    }, 1200);
  };

  // Reordering Handler
  const handleReorder = (itemName: string, price: number, image: string) => {
    const match = MENU_ITEMS.find((i) => i.name === itemName || i.price === price);
    if (match) {
      handleAddToCart(match);
    } else {
      // Create dynamically if not found
      const pseudoItem: MenuItem = {
        id: itemName.toLowerCase().replace(/ /g, '-'),
        name: itemName,
        description: 'Your favorite repeat delicious premium preparation.',
        price: price,
        image: image,
        category: 'Signature'
      };
      handleAddToCart(pseudoItem);
    }
  };

  // Reservation Handlers
  const handleAddReservation = (res: Reservation) => {
    setReservations((prevRes) => [res, ...prevRes]);
  };

  // Derived quantity
  const cartItemsCount = useMemo(() => {
    return cart.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [cart]);

  return (
    <div className="min-h-screen bg-cream-surface pb-28 md:pb-6 flex flex-col font-sans">
      {/* 1. Universal Top Navigation Header */}
      <Header 
        cartCount={cartItemsCount} 
        onCartClick={() => setIsCartOpen(true)} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* 2. Primary Layout Tab views */}
      <main className="flex-1 mt-20 px-4 max-w-7xl mx-auto w-full">
        {activeTab === 'home' && (
          <HomeTab 
            onOrderNowClick={() => setActiveTab('menu')}
            onExploreMenuClick={() => setActiveTab('menu')}
            onQuickAdd={(itemId) => {
              const matchedItem = MENU_ITEMS.find(item => item.id === itemId);
              if (matchedItem) handleAddToCart(matchedItem);
            }}
          />
        )}

        {activeTab === 'menu' && (
          <MenuTab 
            onAddToCart={handleAddToCart}
            cart={cart}
            onViewCart={() => setIsCartOpen(true)}
          />
        )}

        {activeTab === 'book' && (
          <BookTab 
            onAddReservation={handleAddReservation}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileTab 
            reservations={reservations}
            userPoints={userPoints}
            onReorder={handleReorder}
          />
        )}
      </main>

      {/* 3. Sliding Shopping Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={handleUpdateQuantity}
        clearCart={handleClearCart}
        checkout={handleCheckoutPointsRefund}
      />

      {/* 4. Responsive Handset Bottom Navigation view */}
      <BottomNav 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
    </div>
  );
}

