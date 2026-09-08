import React, { useState } from 'react';
import {
  Award,
  ArrowRight,
  Compass,
  Users,
  Sparkles,
  MapPin,
  ShieldCheck,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  Eye,
  Info,
  AlertTriangle,
  BookOpen,
  Filter,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import StateCraftMap, { STATE_CRAFT_DATA } from './StateCraftMap';

// National state exploration nodes placed on the India map
const INDIA_STATE_NODES = [
  {
    key: 'west-bengal',
    name: 'West Bengal',
    nativeName: 'পশ্চিমবঙ্গ',
    craftCount: 6,
    featuredCraft: 'Bengal Jamdani Weaving & Terracotta Horse',
    top: '46%',
    left: '68%',
    region: 'east',
    color: '#b45309',
    badge: 'UNESCO Heritage'
  },
  {
    key: 'rajasthan',
    name: 'Rajasthan',
    nativeName: 'राजस्थान',
    craftCount: 4,
    featuredCraft: 'Jaipur Blue Pottery',
    top: '35%',
    left: '21%',
    region: 'west',
    color: '#c2410c'
  },
  {
    key: 'gujarat',
    name: 'Gujarat',
    nativeName: 'ગુજરાત',
    craftCount: 3,
    featuredCraft: 'Rogan Art of Nirona (Endangered)',
    top: '47%',
    left: '12%',
    region: 'west',
    color: '#b91c1c',
    badge: 'Endangered Arts'
  },
  {
    key: 'tamil-nadu',
    name: 'Tamil Nadu',
    nativeName: 'தமிழ்நாடு',
    craftCount: 3,
    featuredCraft: 'Thanjavur 22K Gold Painting & Toda Weaving',
    top: '85%',
    left: '35%',
    region: 'south',
    color: '#4338ca'
  },
  {
    key: 'bihar',
    name: 'Bihar',
    nativeName: 'बिहार',
    craftCount: 3,
    featuredCraft: 'Madhubani Painting & Sikki Grass',
    top: '38%',
    left: '60%',
    region: 'east',
    color: '#15803d'
  },
  {
    key: 'karnataka',
    name: 'Karnataka',
    nativeName: 'ಕರ್ನಾಟಕ',
    craftCount: 2,
    featuredCraft: 'Channapatna Wooden Toys',
    top: '74%',
    left: '26%',
    region: 'south',
    color: '#0369a1'
  },
  {
    key: 'jammu-and-kashmir',
    name: 'Jammu & Kashmir',
    nativeName: 'جموں و کشمیر',
    craftCount: 2,
    featuredCraft: 'Kashmiri Pashmina & Kani Shawls',
    top: '12%',
    left: '30%',
    region: 'north',
    color: '#0f766e'
  },
  {
    key: 'uttarakhand',
    name: 'Uttarakhand',
    nativeName: 'उत्तराखंड',
    craftCount: 2,
    featuredCraft: 'Aipan Ritual Folk Art',
    top: '25%',
    left: '38%',
    region: 'north',
    color: '#7c2d12'
  },
  {
    key: 'assam',
    name: 'Assam',
    nativeName: 'অসম',
    craftCount: 2,
    featuredCraft: 'Assam Bamboo & Japi Craft',
    top: '35%',
    left: '82%',
    region: 'northeast',
    color: '#166534'
  },
  {
    key: 'chhattisgarh',
    name: 'Chhattisgarh',
    nativeName: 'छत्तीसगढ़',
    craftCount: 2,
    featuredCraft: 'Bastar Dhokra Bronze Casting',
    top: '54%',
    left: '48%',
    region: 'east',
    color: '#854d0e'
  }
];

export default function IndiaCraftMap({
  crafts = [],
  selectedCraft = null,
  onSelectCraft,
  targetRegion = 'all',
  onRegionChange,
  onOpenInsights = null
}) {
  const { t } = useTranslation();
  const [selectedStateKey, setSelectedStateKey] = useState(null); // null = All India Map View, string = State Map View
  const [hoveredStateKey, setHoveredStateKey] = useState(null);
  const [zoomScale, setZoomScale] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPanPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const resetView = () => {
    setZoomScale(1);
    setPanPosition({ x: 0, y: 0 });
  };

  // If a specific state map is selected, render the dedicated StateCraftMap view
  if (selectedStateKey) {
    return (
      <StateCraftMap
        selectedStateKey={selectedStateKey}
        onBackToNationalMap={() => setSelectedStateKey(null)}
        onSelectCraft={onSelectCraft}
        onOpenInsights={onOpenInsights}
        allCrafts={crafts}
      />
    );
  }

  // Filter visible states based on region filter
  const visibleStates = INDIA_STATE_NODES.filter(st => {
    if (targetRegion && targetRegion !== 'all' && st.region !== targetRegion) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* State Atlas Navigation Grid */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-lg space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-amber-800 text-xs font-bold uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              <span>Interactive State Explorer</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-black text-stone-900 mt-0.5">
              Click Any State to Enter its Regional Craft Map
            </h3>
            <p className="text-xs text-stone-600">
              Explore district-level craft clusters, making processes, and verified artisan guilds for every state.
            </p>
          </div>

          {/* West Bengal Highlight Button */}
          <button
            onClick={() => setSelectedStateKey('west-bengal')}
            className="bg-gradient-to-r from-amber-700 via-orange-600 to-amber-600 hover:from-amber-800 hover:to-orange-700 text-white font-bold text-xs px-4 py-2.5 rounded-2xl shadow-lg shadow-amber-700/20 flex items-center space-x-2 transition-all cursor-pointer transform hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
            <span>Open West Bengal State Map (Jamdani, Terracotta & More)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* State Quick-Select Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-2">
          {INDIA_STATE_NODES.map((st) => (
            <button
              key={st.key}
              onClick={() => setSelectedStateKey(st.key)}
              onMouseEnter={() => setHoveredStateKey(st.key)}
              onMouseLeave={() => setHoveredStateKey(null)}
              className={`p-3.5 rounded-2xl text-left border-2 transition-all cursor-pointer group flex flex-col justify-between space-y-2 ${
                st.key === 'west-bengal'
                  ? 'border-amber-600 bg-amber-50/70 hover:bg-amber-100/70 shadow-md ring-2 ring-amber-600/20'
                  : 'border-stone-200 hover:border-amber-400 bg-stone-50/60 hover:bg-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black font-serif text-stone-900 group-hover:text-amber-800">
                    {st.name}
                  </span>
                  {st.badge && (
                    <span className="text-[9px] font-black bg-amber-200 text-amber-950 px-1.5 py-0.2 rounded-full">
                      {st.badge}
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-stone-500 font-medium truncate mt-0.5">{st.nativeName}</p>
              </div>

              <div className="pt-1 border-t border-stone-200/60 flex items-center justify-between text-[10px] font-bold text-amber-700">
                <span>{st.craftCount} Crafts Mapped</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main National Political Map Container */}
      <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-stone-800 bg-[#fdfbf7] select-none">
        {/* Top Floating Help Bar */}
        <div className="absolute top-4 left-4 right-4 z-30 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
          <div className="bg-stone-950/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-stone-700 text-white text-xs font-bold pointer-events-auto flex items-center space-x-2">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>National Sovereignty Atlas • Click any State Node to Zoom In</span>
          </div>

          <div className="flex items-center space-x-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl shadow-xl border border-stone-300 pointer-events-auto">
            <button
              onClick={() => setZoomScale(prev => Math.min(prev + 0.2, 2.0))}
              className="p-1.5 hover:bg-stone-100 text-stone-700 rounded-lg cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomScale(prev => Math.max(prev - 0.2, 0.9))}
              className="p-1.5 hover:bg-stone-100 text-stone-700 rounded-lg cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={resetView}
              className="p-1.5 hover:bg-stone-100 text-stone-700 rounded-lg cursor-pointer"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Clean National Map Picture Canvas */}
        <div
          className="w-full h-[740px] relative overflow-hidden cursor-grab active:cursor-grabbing bg-white flex items-center justify-center"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            className="relative max-w-full max-h-full aspect-[4/5] h-full"
            style={{
              transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoomScale})`,
              transformOrigin: 'center center',
              transition: isDragging ? 'none' : 'transform 0.2s ease-out'
            }}
          >
            {/* Official Sovereign Map of India Picture */}
            <img
              src="/india-map-exact.png"
              alt="Official Political Map of India"
              className="w-full h-full object-contain pointer-events-none select-none drop-shadow-md"
              onError={(e) => {
                e.target.src = 'https://raw.githubusercontent.com/chayan35cse-max/Kala-setu-crafts/main/client/public/india-map-exact.png';
              }}
            />

            {/* Clickable State Badges on Map */}
            {visibleStates.map((stateNode) => {
              const isHovered = hoveredStateKey === stateNode.key;
              const isWB = stateNode.key === 'west-bengal';

              return (
                <div
                  key={stateNode.key}
                  style={{ top: stateNode.top, left: stateNode.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedStateKey(stateNode.key);
                  }}
                  onMouseEnter={() => setHoveredStateKey(stateNode.key)}
                  onMouseLeave={() => setHoveredStateKey(null)}
                >
                  {/* Glowing Pulse Ring for States */}
                  <div
                    className={`absolute inset-0 -m-3 rounded-full ${
                      isWB ? 'bg-amber-500' : 'bg-orange-500'
                    } opacity-70 animate-ping pointer-events-none`}
                  />

                  {/* Interactive State Button */}
                  <div
                    className={`relative px-3.5 py-1.5 rounded-2xl bg-gradient-to-r ${
                      isWB
                        ? 'from-amber-700 via-orange-600 to-amber-600 text-white ring-4 ring-amber-400/40 shadow-2xl scale-110'
                        : 'from-stone-900 to-stone-800 text-white border border-stone-600 shadow-xl'
                    } flex items-center space-x-1.5 transform group-hover:scale-125 transition-transform duration-200`}
                  >
                    <MapPin className={`w-3.5 h-3.5 ${isWB ? 'text-amber-300' : 'text-amber-400'}`} />
                    <span className="text-xs font-black tracking-tight">{stateNode.name}</span>
                    <span className="bg-white/20 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                      {stateNode.craftCount}
                    </span>
                  </div>

                  {/* Hover Tooltip Card */}
                  <div className="absolute left-1/2 -translate-x-1/2 -top-16 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap bg-stone-950/95 backdrop-blur-md text-white text-xs font-bold px-3.5 py-2 rounded-2xl shadow-2xl border border-amber-600/40 z-30 space-y-0.5">
                    <div className="flex items-center space-x-1.5 text-amber-300">
                      <span>{stateNode.name} Craft Territory</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                    <p className="text-[10px] text-stone-300 font-medium">{stateNode.featuredCraft}</p>
                    <div className="w-2.5 h-2.5 bg-stone-950 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Legend & Guidance */}
        <div className="p-4 bg-stone-950 text-stone-300 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-amber-900/30">
          <div className="flex items-center space-x-2 text-amber-300 font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Click any state on the map or select from the top grid to open its high-resolution regional craft atlas</span>
          </div>

          <button
            onClick={() => setSelectedStateKey('west-bengal')}
            className="text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer"
          >
            Explore West Bengal Jamdani & Terracotta ➔
          </button>
        </div>
      </div>
    </div>
  );
}
