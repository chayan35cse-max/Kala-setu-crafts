import React, { useState } from 'react';
import { Sparkles, Globe, Map, BookOpen, Box, Users, ShieldCheck, Search, Menu, X, Feather, Truck, PlusCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Navbar({ activePage, setActivePage, onSearchSelect }) {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' }
  ];

  const handleLanguageChange = (code) => {
    i18n.changeLanguage(code);
    setLangMenuOpen(false);
  };

  const navItems = [
    { id: 'map', label: t('nav.map'), icon: Map },
    { id: '3d', label: t('nav.3dViewer'), icon: Box },
    { id: 'archive', label: t('nav.archive'), icon: BookOpen },
    { id: 'artisans', label: t('nav.artisans'), icon: Users },
    { id: 'orders', label: 'Orders & Tracking', icon: Truck },
    { id: 'researcher-portal', label: '+ Contribute Research', icon: PlusCircle },
    { id: 'seller-portal', label: t('nav.sellerPortal'), icon: ShieldCheck, highlight: true }
  ];

  return (
    <header className="sticky top-0 z-50 bg-stone-950/90 backdrop-blur-md border-b border-amber-900/30 text-stone-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div
            onClick={() => setActivePage('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-600/30 group-hover:scale-105 transition-transform">
              <Feather className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-2xl font-black tracking-tight text-white font-serif">
                  Kala<span className="text-amber-500">Setu</span>
                </span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.5 rounded border border-amber-500/40">
                  INDIA
                </span>
              </div>
              <p className="text-[11px] text-amber-200/70 font-medium tracking-wide">
                Cultural Archive & Marketplace
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    item.highlight
                      ? isActive
                        ? 'bg-amber-500 text-stone-950 font-bold shadow-lg shadow-amber-500/30'
                        : 'bg-amber-600/20 text-amber-300 hover:bg-amber-600/30 border border-amber-500/30'
                      : isActive
                        ? 'bg-stone-800 text-amber-400 font-bold shadow-inner'
                        : 'text-stone-300 hover:bg-stone-850 hover:text-white'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Side: Language Selector & CTA */}
          <div className="flex items-center space-x-3">
            {/* Quick Orders Button on Tablet/Mobile */}
            <button
              onClick={() => setActivePage('orders')}
              className="lg:hidden p-2 rounded-xl bg-stone-900 border border-stone-800 text-amber-400 hover:text-white"
              title="Track Orders"
            >
              <Truck className="w-5 h-5" />
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-700 text-stone-200 text-xs font-medium transition-all cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-amber-500" />
                <span className="uppercase font-semibold">{i18n.language || 'EN'}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-stone-900 border border-stone-800 rounded-xl shadow-2xl py-1 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-stone-800 transition-colors ${
                        i18n.language === lang.code ? 'text-amber-400 font-bold bg-amber-950/40' : 'text-stone-300'
                      }`}
                    >
                      <span>{lang.native}</span>
                      <span className="text-[10px] text-stone-500 uppercase">{lang.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-stone-900 text-stone-300 hover:text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-950 border-b border-stone-800 px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-600 text-white'
                    : 'text-stone-300 hover:bg-stone-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
