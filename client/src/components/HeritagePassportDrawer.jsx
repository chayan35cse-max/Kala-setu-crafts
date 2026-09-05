import React from 'react';
import { Award, ShieldCheck, X, CheckCircle2, Sparkles, MapPin, Feather, Star } from 'lucide-react';

const HERITAGE_STAMPS = [
  { state: 'Rajasthan', craft: 'Jaipur Blue Pottery', icon: '🏺', unlocked: true, badge: 'Desert Quartz Master' },
  { state: 'Jammu & Kashmir', craft: 'Pashmina Shawls', icon: '🧣', unlocked: true, badge: 'Himalayan Silk Explorer' },
  { state: 'Chhattisgarh', craft: 'Bastar Dhokra Bronze', icon: '🐘', unlocked: true, badge: 'Bronze Age Guardian' },
  { state: 'Karnataka', craft: 'Channapatna Wooden Toys', icon: '🧸', unlocked: true, badge: 'Lacquered Wood Connoisseur' },
  { state: 'Tamil Nadu', craft: 'Thanjavur 22K Gold Painting', icon: '👑', unlocked: true, badge: 'Sacred Gold Patron' },
  { state: 'Bihar', craft: 'Madhubani Painting', icon: '🎨', unlocked: true, badge: 'Mithila Folk Historian' },
  { state: 'Gujarat', craft: 'Rogan Art of Nirona', icon: '🪡', unlocked: false, badge: 'Castor Thread Seeker' },
  { state: 'Uttarakhand', craft: 'Aipan Ritual Art', icon: '🌾', unlocked: false, badge: 'Kumaon Sacred Artist' }
];

export default function HeritagePassportDrawer({ onClose, onSelectCraftState }) {
  const unlockedCount = HERITAGE_STAMPS.filter(s => s.unlocked).length;
  const progressPercent = Math.round((unlockedCount / HERITAGE_STAMPS.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#fffcf7] rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border-4 border-amber-900/30 flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white p-6 relative flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" />
            <span>KalaSetu Heritage Explorer Passport</span>
          </div>

          <h3 className="text-2xl font-serif font-black">Your Cultural Stamp Book</h3>
          <p className="text-xs text-stone-300 mt-1">
            Collect authentic state stamps as you explore India's geographical handicraft traditions.
          </p>

          {/* Progress Bar */}
          <div className="mt-4 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-amber-200">
              <span>{unlockedCount} of {HERITAGE_STAMPS.length} Heritage Stamps Collected</span>
              <span>{progressPercent}% Complete</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Stamps Grid */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {HERITAGE_STAMPS.map((stamp, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-3.5 text-center border-2 transition-all relative ${
                  stamp.unlocked
                    ? 'border-amber-600/50 bg-amber-50/50 shadow-sm'
                    : 'border-stone-200 bg-stone-100/50 opacity-60'
                }`}
              >
                {/* Stamp Icon */}
                <div className="text-3xl mb-1">{stamp.icon}</div>
                <h5 className="font-serif font-black text-stone-900 text-xs truncate">{stamp.state}</h5>
                <p className="text-[10px] text-stone-500 font-medium truncate">{stamp.craft}</p>

                {stamp.unlocked ? (
                  <div className="mt-2 inline-flex items-center space-x-1 bg-emerald-100 text-emerald-800 text-[9px] font-black px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Stamped</span>
                  </div>
                ) : (
                  <div className="mt-2 text-[9px] text-stone-400 font-bold uppercase">
                    🔒 Locked
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-stone-50 border-t border-stone-200 p-4 text-center text-xs text-stone-500 flex-shrink-0">
          <span>Click any marker on the map of India to stamp your cultural passport!</span>
        </div>
      </div>
    </div>
  );
}
