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
  Info,
  X
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  STATE_PATHS,
  CRAFT_MAP_COORDINATES,
  INDIA_POLITICAL_MAP_CONFIG
} from '../../data/indiaPoliticalMapSvg';

export default function IndiaCraftMap({
  crafts = [],
  selectedCraft = null,
  onSelectCraft,
  targetRegion = 'all',
  onRegionChange
}) {
  const { t } = useTranslation();
  const [hoveredState, setHoveredState] = useState(null);
  const [hoveredCraft, setHoveredCraft] = useState(null);
  const [activePopupCraft, setActivePopupCraft] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPanOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const resetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // Find craft data for pin
  const getCraftData = (craftId) => {
    return crafts.find(c => c.id === craftId) || null;
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-stone-800 bg-[#fbfdfa] select-none">
      {/* Top Header Controls Bar */}
      <div className="absolute top-4 left-4 right-4 z-30 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Regional Quick Filters */}
        <div className="flex flex-wrap gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl shadow-xl border border-stone-300 text-xs pointer-events-auto">
          <div className="flex items-center px-2 text-stone-700 font-bold space-x-1">
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            <span className="hidden sm:inline">Regions:</span>
          </div>
          {[
            { id: 'all', label: 'All India' },
            { id: 'north', label: 'North (J&K / Ladakh / Punjab)' },
            { id: 'south', label: 'South' },
            { id: 'east', label: 'East' },
            { id: 'west', label: 'West' },
            { id: 'northeast', label: 'North-East' }
          ].map(r => (
            <button
              key={r.id}
              onClick={() => onRegionChange && onRegionChange(r.id)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                targetRegion === r.id
                  ? 'bg-amber-700 text-white shadow-md'
                  : 'text-stone-800 hover:bg-stone-100'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Zoom & Reset Controls */}
        <div className="flex items-center space-x-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl shadow-xl border border-stone-300 pointer-events-auto">
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2.5))}
            className="p-1.5 hover:bg-stone-100 text-stone-700 rounded-lg"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 0.8))}
            className="p-1.5 hover:bg-stone-100 text-stone-700 rounded-lg"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={resetView}
            className="p-1.5 hover:bg-stone-100 text-stone-700 rounded-lg"
            title="Reset Map View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main SVG Interactive Map Canvas */}
      <div
        className="w-full h-[720px] relative overflow-hidden cursor-grab active:cursor-grabbing bg-[#eef7fd]"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <svg
          viewBox={INDIA_POLITICAL_MAP_CONFIG.viewBox}
          className="w-full h-full"
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
            transformOrigin: '50% 50%',
            transition: isDragging ? 'none' : 'transform 0.2s ease-out'
          }}
        >
          {/* Background Oceanic Shading */}
          <rect width="1000" height="1150" fill="#eaf4fb" />

          {/* Official Map Title Box (Top Center-Right matching Reference) */}
          <g transform="translate(420, 25)" pointerEvents="none">
            <text x="0" y="32" fontSize="42" fontWeight="900" fontFamily="serif" fill="#111827" letterSpacing="4">
              INDIA
            </text>
            <text x="2" y="58" fontSize="16" fontWeight="800" fill="#b91c1c" letterSpacing="2">
              STATES & UTs POLITICAL MAP
            </text>
            <text x="2" y="76" fontSize="11" fontWeight="700" fill="#065f46" letterSpacing="1">
              OFFICIAL SOVEREIGN CULTURAL ARCHIVE
            </text>
          </g>

          {/* Neighboring Reference Labels */}
          <g fontSize="13" fontWeight="800" fill="#64748b" opacity="0.75" pointerEvents="none" letterSpacing="3">
            <text x="45" y="180" transform="rotate(-65, 45, 180)">AFGHANISTAN</text>
            <text x="60" y="330" transform="rotate(-55, 60, 330)">PAKISTAN</text>
            <text x="450" y="270" transform="rotate(-20, 450, 270)">TIBET AUTONOMOUS REGION</text>
            <text x="560" y="240">CHINA</text>
            <text x="490" y="345" transform="rotate(-25, 490, 345)">NEPAL</text>
            <text x="695" y="350">BHUTAN</text>
            <text x="680" y="445">BANGLADESH</text>
            <text x="830" y="540">MYANMAR</text>
            <text x="405" y="940">SRI LANKA</text>
          </g>

          {/* Oceans & Seas */}
          <g fontSize="22" fontWeight="900" fill="#0284c7" opacity="0.65" pointerEvents="none" letterSpacing="5">
            <text x="25" y="640">ARABIAN</text>
            <text x="45" y="670">SEA</text>
            <text x="620" y="650">BAY OF</text>
            <text x="605" y="680">BENGAL</text>
            <text x="220" y="990" letterSpacing="8">INDIAN OCEAN</text>
          </g>

          {/* Island Territories */}
          {/* Lakshadweep */}
          <g transform="translate(170, 800)" pointerEvents="none">
            <text x="0" y="0" fontSize="10" fontWeight="800" fill="#dc2626" transform="rotate(75)">
              LAKSHADWEEP
            </text>
            <ellipse cx="15" cy="40" rx="3" ry="8" fill="#15803d" />
            <ellipse cx="20" cy="65" rx="3" ry="10" fill="#15803d" />
          </g>

          {/* Andaman & Nicobar */}
          <g transform="translate(800, 780)" pointerEvents="none">
            <text x="0" y="0" fontSize="11" fontWeight="800" fill="#dc2626" transform="rotate(75)">
              ANDAMAN & NICOBAR ISLANDS
            </text>
            <ellipse cx="25" cy="40" rx="4" ry="18" fill="#15803d" />
            <ellipse cx="32" cy="95" rx="5" ry="24" fill="#15803d" />
            <circle cx="45" cy="35" r="3" fill="#dc2626" stroke="#fff" strokeWidth="1" />
            <text x="52" y="38" fontSize="9" fontWeight="700" fill="#111827">Port Blair</text>
          </g>

          {/* State Polygons with Distinct Political Pastel Colors */}
          {STATE_PATHS.map((st) => {
            const isHovered = hoveredState === st.id;
            return (
              <g key={st.id}>
                <path
                  d={st.d}
                  fill={isHovered ? '#fed7aa' : st.color}
                  stroke="#334155"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  className="transition-colors duration-150 cursor-pointer"
                  onMouseEnter={() => setHoveredState(st.id)}
                  onMouseLeave={() => setHoveredState(null)}
                />
              </g>
            );
          })}

          {/* State Names and Capital Dots */}
          {STATE_PATHS.map((st) => (
            <g key={`labels-${st.id}`} pointerEvents="none">
              {/* State Name */}
              <text
                x={st.labelCoords.x}
                y={st.labelCoords.y}
                fontSize={st.type === 'UT' ? '12' : '11.5'}
                fontWeight="800"
                fontFamily="sans-serif"
                fill={st.type === 'UT' ? '#b91c1c' : '#1e3a8a'}
                textAnchor="middle"
                style={{ textShadow: '0 1px 3px rgba(255,255,255,0.95), 0 0 5px #fff' }}
              >
                {st.name.toUpperCase()}
              </text>

              {/* Capital City Dot & Label */}
              {st.capitalCoords && (
                <g>
                  <circle
                    cx={st.capitalCoords.x}
                    cy={st.capitalCoords.y}
                    r="3.5"
                    fill="#dc2626"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                  <text
                    x={st.capitalCoords.x + 6}
                    y={st.capitalCoords.y + 3.5}
                    fontSize="9.5"
                    fontWeight="700"
                    fill="#111827"
                    style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9)' }}
                  >
                    {st.capital}
                  </text>
                </g>
              )}
            </g>
          ))}

          {/* Interactive Traditional Craft Pin Markers */}
          {Object.entries(CRAFT_MAP_COORDINATES).map(([craftId, pos]) => {
            const craftData = getCraftData(craftId);
            if (!craftData) return null;

            const isSelected = selectedCraft && selectedCraft.id === craftId;
            const isHovered = hoveredCraft === craftId;

            return (
              <g
                key={craftId}
                transform={`translate(${pos.x}, ${pos.y})`}
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePopupCraft(craftData);
                }}
                onMouseEnter={() => setHoveredCraft(craftId)}
                onMouseLeave={() => setHoveredCraft(null)}
              >
                {/* Pulsing ring on selection or hover */}
                {(isSelected || isHovered) && (
                  <circle r="22" fill="#ea580c" opacity="0.3" className="animate-ping" />
                )}

                {/* Cultural Pin Body */}
                <path
                  d="M 0 -28 C -9 -28 -16 -21 -16 -12 C -16 -2 0 6 0 6 C 0 6 16 -2 16 -12 C 16 -21 9 -28 0 -28 Z"
                  fill="#c2410c"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  filter="drop-shadow(0 3px 6px rgba(0,0,0,0.4))"
                />
                <circle cx="0" cy="-14" r="8.5" fill="#ffffff" />
                <circle cx="0" cy="-14" r="6" fill="#ea580c" />

                {/* GI Tag Badge Flag */}
                {craftData.giTagged && (
                  <g transform="translate(8, -32)">
                    <rect width="18" height="11" rx="3" fill="#f59e0b" stroke="#ffffff" strokeWidth="1" />
                    <text x="9" y="8" fontSize="7.5" fontWeight="900" fill="#78350f" textAnchor="middle">GI</text>
                  </g>
                )}

                {/* Quick Craft Label */}
                <g transform="translate(0, 16)" pointerEvents="none">
                  <rect
                    x="-45"
                    y="-3"
                    width="90"
                    height="16"
                    rx="4"
                    fill="rgba(15, 23, 42, 0.85)"
                    stroke="rgba(251, 191, 36, 0.6)"
                    strokeWidth="0.8"
                  />
                  <text
                    x="0"
                    y="9"
                    fontSize="9"
                    fontWeight="800"
                    fill="#fef3c7"
                    textAnchor="middle"
                  >
                    {craftData.name.split(' ')[0]}
                  </text>
                </g>
              </g>
            );
          })}

          {/* Official Map Key / Legend Box (Bottom Left matching MapmyIndia Reference) */}
          <g transform="translate(15, 730)" pointerEvents="none">
            <rect width="175" height="190" fill="rgba(255,255,255,0.92)" stroke="#1e293b" strokeWidth="1.5" rx="6" />
            <rect width="175" height="24" fill="#0f172a" rx="4" />
            <text x="87" y="16" fontSize="11" fontWeight="900" fill="#ffffff" textAnchor="middle" letterSpacing="1">
              KEY TO MAP
            </text>

            <g transform="translate(10, 35)" fontSize="9" fontWeight="700" fill="#1e293b">
              {/* Country Boundary */}
              <line x1="0" y1="6" x2="30" y2="6" stroke="#0f172a" strokeWidth="2.5" />
              <text x="38" y="10">Int'l Boundary</text>

              {/* State Boundary */}
              <line x1="0" y1="26" x2="30" y2="26" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 2" />
              <text x="38" y="30">State Boundary</text>

              {/* Capital City */}
              <circle cx="15" cy="46" r="4" fill="#dc2626" stroke="#fff" strokeWidth="1" />
              <text x="38" y="50">State Capital</text>

              {/* GI Protected Craft */}
              <circle cx="15" cy="68" r="5" fill="#ea580c" stroke="#fff" strokeWidth="1.5" />
              <text x="38" y="72" fill="#c2410c" fontWeight="900">GI Craft Cluster</text>
            </g>

            {/* Scale / Legal disclaimer */}
            <line x1="10" y1="130" x2="165" y2="130" stroke="#cbd5e1" strokeWidth="1" />
            <text x="12" y="145" fontSize="7.5" fontWeight="700" fill="#475569">
              • Complete Jammu, Kashmir & Ladakh
            </text>
            <text x="12" y="158" fontSize="7.5" fontWeight="700" fill="#475569">
              • All 28 States & 8 UTs of India
            </text>
            <text x="12" y="172" fontSize="7" fontWeight="600" fill="#64748b">
              Survey of India Sovereign Alignment
            </text>
          </g>
        </svg>

        {/* Interactive Popup Modal when clicking a Craft Marker */}
        {activePopupCraft && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-amber-900/20 p-5 animate-fadeIn">
            <button
              onClick={() => setActivePopupCraft(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-3">
              {/* Thumbnail */}
              <div className="relative w-full h-36 rounded-2xl overflow-hidden bg-stone-100">
                <img
                  src={activePopupCraft.thumbnailUrl}
                  alt={activePopupCraft.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                <div className="absolute top-2.5 left-2.5 bg-stone-950/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  {activePopupCraft.state}
                </div>
                {activePopupCraft.giTagged && (
                  <div className="absolute top-2.5 right-2.5 bg-amber-500 text-stone-950 text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center space-x-1 shadow-md">
                    <Award className="w-3 h-3" />
                    <span>GI Tagged ({activePopupCraft.giYear})</span>
                  </div>
                )}
              </div>

              {/* Title & Native name */}
              <div>
                <h4 className="font-bold text-stone-900 text-base leading-snug">
                  {activePopupCraft.name}
                </h4>
                {activePopupCraft.nativeName && (
                  <p className="text-amber-700 font-semibold text-xs mt-0.5">
                    {activePopupCraft.nativeName}
                  </p>
                )}
              </div>

              <p className="text-stone-600 text-xs line-clamp-2 leading-relaxed">
                {activePopupCraft.tagline || activePopupCraft.description}
              </p>

              <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100">
                <span className="font-medium bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md">
                  {activePopupCraft.category}
                </span>
                <span className="text-emerald-700 font-bold">
                  {activePopupCraft.sellers?.length || 1} Verified Studios
                </span>
              </div>

              <button
                onClick={() => {
                  onSelectCraft(activePopupCraft);
                  setActivePopupCraft(null);
                }}
                className="w-full bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-800 hover:to-orange-800 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-amber-700/25 transition-all cursor-pointer"
              >
                <span>{t('map.seeDetails')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Map Legend */}
      <div className="p-3 bg-stone-950 text-stone-300 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-amber-900/30">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-semibold text-amber-400">Official Indian Atlas:</span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span>28 States & 8 Union Territories</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
            <span>Undivided J&K, Ladakh & Aksai Chin</span>
          </span>
        </div>

        <div className="flex items-center space-x-2 text-amber-400 font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Click any craft marker to view cultural heritage & verified artisan studios</span>
        </div>
      </div>
    </div>
  );
}
