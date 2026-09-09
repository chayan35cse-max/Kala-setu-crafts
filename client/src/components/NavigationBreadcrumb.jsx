import React from 'react';
import { ArrowLeft, Home, ChevronRight, RotateCcw } from 'lucide-react';

export const PAGE_TITLES = {
  'home': 'Home Explorer',
  'map': 'India Sovereign Map',
  'state-map': 'State Craft Map',
  'detail': 'Craft Cultural Profile',
  '3d': '3D WebGL Studio',
  'archive': 'Cultural Masterclass Archive',
  'artisans': 'Artisans & Guilds Directory',
  'orders': 'Orders & Speed Post Tracking',
  'corporate-gifting': 'Corporate Gifting Hampers',
  'researcher-portal': 'Contribute Non-GI Research',
  'seller-portal': 'Artisan Registration & Portal'
};

export default function NavigationBreadcrumb({
  activePage,
  previousPageName,
  onGoBack,
  onGoHome,
  craftTitle = null
}) {
  if (activePage === 'home') return null;

  const currentLabel = craftTitle || PAGE_TITLES[activePage] || 'Current Page';
  const prevLabel = previousPageName || 'Previous Page';

  return (
    <div className="bg-white/95 backdrop-blur-md border-b border-stone-200/80 sticky top-20 z-40 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left Side: Dynamic Go Back Button */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={onGoBack}
            className="flex items-center space-x-2 bg-stone-900 hover:bg-black text-amber-300 hover:text-amber-200 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm border border-stone-800 cursor-pointer transform hover:-translate-x-0.5 active:translate-x-0 group"
            title={`Return to ${prevLabel}`}
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>← Previous Page</span>
            <span className="hidden sm:inline opacity-75 font-normal text-[11px] text-stone-300">
              ({prevLabel})
            </span>
          </button>

          {/* Quick Home Link */}
          <button
            onClick={onGoHome}
            className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
            title="Go to Home"
          >
            <Home className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Side: Breadcrumb Trail */}
        <div className="flex items-center space-x-1.5 text-xs text-stone-500 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={onGoHome}
            className="hover:text-amber-800 transition-colors font-medium cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3 h-3 text-stone-400 flex-shrink-0" />
          <button
            onClick={onGoBack}
            className="hover:text-amber-800 transition-colors font-medium truncate max-w-[140px] sm:max-w-[200px] cursor-pointer"
          >
            {prevLabel}
          </button>
          <ChevronRight className="w-3 h-3 text-stone-400 flex-shrink-0" />
          <span className="text-amber-800 font-bold truncate max-w-[150px] sm:max-w-[260px]">
            {currentLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
