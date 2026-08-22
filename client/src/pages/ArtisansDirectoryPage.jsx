import React, { useState, useEffect } from 'react';
import {
  Users,
  ShieldCheck,
  Award,
  MapPin,
  Phone,
  Mail,
  Store,
  ExternalLink,
  Search,
  Filter,
  Sparkles,
  Clock
} from 'lucide-react';
import { getSellers, getCrafts } from '../services/api';

export default function ArtisansDirectoryPage({ onSelectCraftById }) {
  const [sellers, setSellers] = useState([]);
  const [crafts, setCrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('All');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [sellersRes, craftsRes] = await Promise.all([
          getSellers({}),
          getCrafts({})
        ]);
        if (sellersRes.data) setSellers(sellersRes.data);
        if (craftsRes.data) setCrafts(craftsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const states = [...new Set(sellers.map(s => s.state))].filter(Boolean);

  const filtered = sellers.filter(s => {
    if (selectedState !== 'All' && s.state !== selectedState) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      const match = (s.artisanName && s.artisanName.toLowerCase().includes(q)) ||
        (s.businessName && s.businessName.toLowerCase().includes(q)) ||
        (s.craftName && s.craftName.toLowerCase().includes(q)) ||
        (s.state && s.state.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fadeIn">
      {/* Header */}
      <div className="bg-stone-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-stone-800 space-y-4">
        <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold">
          <Users className="w-4 h-4 text-amber-400" />
          <span>National Master Craftsmen Registry</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight">
          Living Masters & Artisan Cooperatives
        </h1>
        <p className="text-sm sm:text-base text-stone-300 max-w-3xl leading-relaxed">
          Connect directly with national awardees, Padma Shri laureates, and certified tribal cooperatives across India without intermediary markups.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-[260px] relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by artisan name, studio, craft, or state..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
        </div>

        <div className="w-full sm:w-auto min-w-[180px]">
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 text-sm font-medium focus:ring-2 focus:ring-amber-500 cursor-pointer"
          >
            <option value="All">All States ({sellers.length})</option>
            {states.map(st => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Artisans Grid */}
      {loading ? (
        <div className="py-20 text-center text-stone-500 font-medium">
          Loading verified artisan records...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((seller) => (
            <div
              key={seller.id}
              className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 hover:border-amber-500/60 hover:shadow-lg transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-stone-900 leading-tight">
                      {seller.businessName}
                    </h3>
                    <p className="text-xs font-semibold text-amber-700 mt-0.5">
                      {seller.artisanName}
                    </p>
                  </div>
                  {seller.trustBadge && (
                    <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full border border-amber-300 shrink-0">
                      {seller.trustBadge}
                    </span>
                  )}
                </div>

                <div className="inline-block bg-stone-100 text-stone-700 text-xs font-medium px-2.5 py-1 rounded-lg">
                  {seller.craftName}
                </div>

                <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-100">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{seller.address || seller.state}</span>
                  </div>

                  {seller.phone && (
                    <div className="flex items-center space-x-2">
                      <Phone className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <a href={`tel:${seller.phone}`} className="hover:text-amber-700 font-mono">
                        {seller.phone}
                      </a>
                    </div>
                  )}

                  {seller.email && (
                    <div className="flex items-center space-x-2">
                      <Mail className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <a href={`mailto:${seller.email}`} className="hover:text-amber-700">
                        {seller.email}
                      </a>
                    </div>
                  )}

                  {seller.pehchanCardNo && (
                    <div className="text-[11px] font-mono text-stone-500 pt-1">
                      Pehchan ID: {seller.pehchanCardNo}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center gap-2">
                {seller.craftId && (
                  <button
                    onClick={() => onSelectCraftById(seller.craftId)}
                    className="flex-1 bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold text-xs py-2 px-3 rounded-xl border border-amber-200 transition-colors text-center cursor-pointer"
                  >
                    View Craft Archive
                  </button>
                )}
                {seller.onlineStoreUrl && (
                  <a
                    href={seller.onlineStoreUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs p-2.5 rounded-xl shadow transition-colors flex items-center justify-center"
                    title="Direct Store"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
