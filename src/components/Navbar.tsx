import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Phone, Clock, Wheat, ShieldCheck } from 'lucide-react';
import { BAKERY_INFO } from '../data/mockData';

interface NavbarProps {
  activeTab: 'home' | 'products' | 'about' | 'order' | 'contact' | 'admin';
  setActiveTab: (tab: 'home' | 'products' | 'about' | 'order' | 'contact' | 'admin') => void;
  cartCount: number;
  onOpenCart: () => void;
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  isAdmin,
  setIsAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: 'home' | 'products' | 'about' | 'order' | 'contact'; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'about', label: 'About Us' },
    { id: 'order', label: 'Order' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: 'home' | 'products' | 'about' | 'order' | 'contact' | 'admin') => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#faf7f2]/95 backdrop-blur-md border-b border-amber-900/10 transition-all duration-200">
      {/* Top micro announcement bar */}
      <div className="bg-amber-950 text-amber-100 text-xs px-4 py-1.5 flex flex-wrap justify-between items-center text-center sm:text-left">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-[13px]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-amber-300 font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>Oven hot batches at {BAKERY_INFO.morningBatchTime} & {BAKERY_INFO.afternoonBatchTime} daily</span>
            </span>
            <span className="hidden md:inline text-amber-400/50">•</span>
            <span className="hidden md:inline text-amber-200/90">Ho, Volta Region & Accra Dispatch</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a
              href={`tel:${BAKERY_INFO.phone}`}
              className="flex items-center gap-1 hover:text-amber-300 transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>Call: {BAKERY_INFO.phone}</span>
            </a>
            <button
              onClick={() => {
                setIsAdmin(!isAdmin);
                if (!isAdmin) {
                  setActiveTab('admin');
                } else if (activeTab === 'admin') {
                  setActiveTab('home');
                }
              }}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                isAdmin ? 'bg-amber-600 text-white' : 'bg-amber-900/60 hover:bg-amber-800 text-amber-200'
              }`}
              title="Toggle Baker Admin View"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>{isAdmin ? 'Baker View Active' : 'Baker Login'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-800 flex items-center justify-center text-white shadow-md shadow-amber-900/10 group-hover:scale-105 transition-transform duration-200">
              <Wheat className="w-7 h-7 text-amber-100" />
            </div>
            <div>
              <span className="block font-serif text-2xl font-bold tracking-tight text-amber-950 group-hover:text-amber-800 transition-colors">
                GOLDEN LOAF
              </span>
              <span className="block text-[11px] font-semibold tracking-widest uppercase text-amber-700">
                Bakery • Ghana
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-150 relative cursor-pointer ${
                    isActive
                      ? 'text-amber-950 bg-amber-200/50 shadow-xs'
                      : 'text-stone-700 hover:text-amber-900 hover:bg-amber-100/50'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-amber-700 rounded-full" />
                  )}
                </button>
              );
            })}

            {isAdmin && (
              <button
                onClick={() => handleNavClick('admin')}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer ${
                  activeTab === 'admin'
                    ? 'text-amber-950 bg-amber-300 shadow-xs'
                    : 'text-amber-800 bg-amber-100/70 hover:bg-amber-200/70'
                }`}
              >
                Dashboard
              </button>
            )}
          </nav>

          {/* Cart & Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-amber-900 text-amber-50 hover:bg-amber-800 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer group"
              aria-label="View shopping cart"
            >
              <ShoppingBag className="w-5 h-5 text-amber-300 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-sm font-medium">Cart</span>
              {cartCount > 0 ? (
                <span className="bg-amber-400 text-amber-950 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              ) : (
                <span className="text-amber-300/80 text-xs">0</span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl text-stone-700 hover:text-amber-950 hover:bg-amber-100/60 focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#faf7f2] border-b border-amber-900/10 px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                activeTab === link.id
                  ? 'bg-amber-200/70 text-amber-950 font-bold'
                  : 'text-stone-700 hover:bg-amber-100/40'
              }`}
            >
              {link.label}
            </button>
          ))}

          {isAdmin && (
            <button
              onClick={() => handleNavClick('admin')}
              className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                activeTab === 'admin'
                  ? 'bg-amber-300 text-amber-950 font-bold'
                  : 'text-amber-900 bg-amber-100/50'
              }`}
            >
              Admin Dashboard
            </button>
          )}

          <div className="pt-3 border-t border-amber-900/10 text-xs text-stone-600 flex justify-between items-center">
            <span>Fast orders: {BAKERY_INFO.phone}</span>
            <span className="font-semibold text-amber-800">Fresh Every Morning</span>
          </div>
        </div>
      )}
    </header>
  );
};
