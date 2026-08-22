import React from 'react';
import { Feather, Heart, Shield, Award, ExternalLink, Globe, Sparkles } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-amber-900/30 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center">
                <Feather className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white font-serif">
                Kala<span className="text-amber-500">Setu</span>
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              India's premier digital cultural archive and verified artisan marketplace. Preserving ancient crafts, protecting GI traditions, and empowering living masters with ethical commerce.
            </p>
            <div className="flex items-center space-x-2 text-xs text-amber-400">
              <Shield className="w-4 h-4" />
              <span>100% Verified Artisan Collective Registry</span>
            </div>
          </div>

          {/* Col 2: Exploration */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-b border-stone-800 pb-2">
              Exploration
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={() => onNavigate('map')} className="hover:text-amber-400 transition-colors">
                  Interactive India Craft Map
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('3d')} className="hover:text-amber-400 transition-colors">
                  3D Interactive Craft Models (Three.js)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('archive')} className="hover:text-amber-400 transition-colors">
                  Cultural Archive & Making Masterclasses
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('artisans')} className="hover:text-amber-400 transition-colors">
                  Verified Master Artisans Directory
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Traditional Craft Hubs */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-b border-stone-800 pb-2">
              Iconic GI Traditions
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li className="flex items-center justify-between">
                <span>Jaipur Blue Pottery</span>
                <span className="text-[10px] text-amber-500 font-mono">Rajasthan</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Mithila Madhubani Art</span>
                <span className="text-[10px] text-amber-500 font-mono">Bihar</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Channapatna Wooden Toys</span>
                <span className="text-[10px] text-amber-500 font-mono">Karnataka</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Bastar Dhokra Lost-Wax</span>
                <span className="text-[10px] text-amber-500 font-mono">Chhattisgarh</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Kashmiri Pashmina Shawls</span>
                <span className="text-[10px] text-amber-500 font-mono">J&K</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Institutional Recognition */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-b border-stone-800 pb-2">
              Official Partners & Portals
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href="https://www.tribesindia.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:border-amber-600 transition-all"
              >
                <span>TRIFED / Tribes India</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-500" />
              </a>
              <a
                href="https://ondc.org"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:border-amber-600 transition-all"
              >
                <span>ONDC Open Network</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-500" />
              </a>
              <button
                onClick={() => onNavigate('seller-portal')}
                className="w-full mt-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-2 px-3 rounded-lg text-xs flex items-center justify-center space-x-1.5 shadow-lg shadow-amber-600/20"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Artisan Verification Onboarding</span>
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 KalaSetu Cultural Heritage Initiative. All rights reserved.</p>
          <div className="flex items-center space-x-1">
            <span>Crafted with reverence for India's 7+ million indigenous artisans</span>
            <Heart className="w-3.5 h-3.5 text-red-500 inline fill-red-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
