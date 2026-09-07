import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { GalleryView } from './views/GalleryView';
import { HowItWorksView } from './views/HowItWorksView';
import { PricingView } from './views/PricingView';
import { FaqView } from './views/FaqView';
import { ContactView } from './views/ContactView';
import { OrderTracker } from './components/OrderTracker';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CartItem, CategoryType, SizeTier } from './types';
import { SAMPLE_CART_ITEMS } from './data/mockData';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>(SAMPLE_CART_ITEMS);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [activeTrackingNumber, setActiveTrackingNumber] = useState<string>('MM-84920');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => [item, ...prev]);
    setIsCartOpen(true);
    showToast(`Added "${item.title}" to commissions cart`);
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (orderNumber: string) => {
    setActiveTrackingNumber(orderNumber);
    setCartItems([]);
    showToast(`Commission #${orderNumber} successfully booked!`);
  };

  const handleSelectSizeFromPricing = (size: SizeTier) => {
    setCurrentView('home');
    setTimeout(() => {
      const configEl = document.getElementById('create');
      if (configEl) {
        configEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleConfigureCategory = (category: CategoryType) => {
    setCurrentView('home');
    setTimeout(() => {
      const configEl = document.getElementById('create');
      if (configEl) {
        configEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F6F2] text-[#111111] selection:bg-[#FF6801] selection:text-white font-body relative">
      {/* Sticky Navigation Header */}
      <Navigation
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddToCart={handleAddToCart}
            onSelectGalleryItem={() => setCurrentView('gallery')}
          />
        )}

        {currentView === 'gallery' && (
          <GalleryView onConfigureCategory={handleConfigureCategory} />
        )}

        {currentView === 'how-it-works' && (
          <HowItWorksView
            onNavigateToCreate={() => {
              setCurrentView('home');
              setTimeout(() => {
                const el = document.getElementById('create');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
          />
        )}

        {currentView === 'pricing' && (
          <PricingView onSelectSize={handleSelectSizeFromPricing} />
        )}

        {currentView === 'faq' && (
          <FaqView
            onNavigateToContact={() => setCurrentView('contact')}
            onNavigateToCreate={() => {
              setCurrentView('home');
              setTimeout(() => {
                const el = document.getElementById('create');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
          />
        )}

        {currentView === 'orders' && (
          <div className="pt-24 pb-16">
            <OrderTracker initialOrderNumber={activeTrackingNumber} />
          </div>
        )}

        {currentView === 'contact' && <ContactView />}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Sliding Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={handleProceedToCheckout}
        onNavigateToCreate={() => {
          setIsCartOpen(false);
          setCurrentView('home');
          setTimeout(() => {
            const el = document.getElementById('create');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={(orderNum) => {
          handleOrderSuccess(orderNum);
          setCurrentView('orders');
        }}
      />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111111] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/15 text-xs font-bold font-brand flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF6801] animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
