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
  Layers
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

// State markers mapped precisely to the exact India map image coordinates
const STATE_MARKERS = [
  // 🟢 GI-TAGGED CRAFTS (GREEN)
  {
    id: "pashmina-kashmir",
    stateName: "Jammu and Kashmir",
    craftName: "Kashmiri Pashmina & Kani Shawls",
    nativeName: "کٲشُر پشمینہ",
    category: "Textiles & Weaving",
    GI_tagged: true,
    giTagged: true,
    giYear: 2008,
    status: "active",
    verification_source: "GI Registry of India",
    top: "10.5%",
    left: "30.5%",
    region: "north"
  },
  {
    id: "jaipur-blue-pottery",
    stateName: "Rajasthan",
    craftName: "Jaipur Blue Pottery",
    nativeName: "जयपुर ब्लू पॉटरी",
    category: "Pottery & Ceramics",
    GI_tagged: true,
    giTagged: true,
    giYear: 2008,
    status: "active",
    verification_source: "GI Registry of India",
    top: "35%",
    left: "19.5%",
    region: "west"
  },
  {
    id: "madhubani-painting",
    stateName: "Bihar",
    craftName: "Madhubani (Mithila) Painting",
    nativeName: "मिथिला / मधुबनी चित्रकला",
    category: "Folk Painting",
    GI_tagged: true,
    giTagged: true,
    giYear: 2007,
    status: "active",
    verification_source: "GI Registry of India",
    top: "39%",
    left: "60.5%",
    region: "east"
  },
  {
    id: "channapatna-toys",
    stateName: "Karnataka",
    craftName: "Channapatna Wooden Toys",
    nativeName: "ಚನ್ನಪಟ್ಟಣ ಗೊಂಬೆಗಳು",
    category: "Woodcraft & Toys",
    GI_tagged: true,
    giTagged: true,
    giYear: 2006,
    status: "active",
    verification_source: "GI Registry of India",
    top: "75%",
    left: "26.5%",
    region: "south"
  },
  {
    id: "bastar-dhokra-craft",
    stateName: "Chhattisgarh",
    craftName: "Bastar Dhokra Bronze Figurine",
    nativeName: "बस्तर ढोकरा शिल्प",
    category: "Metal Casting",
    GI_tagged: true,
    giTagged: true,
    giYear: 2008,
    status: "active",
    verification_source: "GI Registry of India",
    top: "54%",
    left: "48.5%",
    region: "east"
  },
  {
    id: "tanjore-painting",
    stateName: "Tamil Nadu",
    craftName: "Thanjavur (Tanjore) 22K Gold Painting",
    nativeName: "தஞ்சாவூர் ஓவியம்",
    category: "Sacred Classical Painting",
    GI_tagged: true,
    giTagged: true,
    giYear: 2007,
    status: "active",
    verification_source: "GI Registry of India",
    top: "86%",
    left: "35%",
    region: "south"
  },

  // 🔴 NON-GI ENDANGERED CRAFTS (RED)
  {
    id: "rogan-art-gujarat",
    stateName: "Gujarat",
    craftName: "Rogan Art of Nirona",
    nativeName: "રોગન આર્ટ / रोगन कला",
    category: "Oil Paint Textile Art",
    GI_tagged: false,
    giTagged: false,
    status: "endangered",
    verification_source: "Dastkar NGO Documentation & AIACA Research",
    top: "47%",
    left: "11%",
    region: "west"
  },
  {
    id: "toda-embroidery-tn",
    stateName: "Tamil Nadu",
    craftName: "Toda Tribal Pugur Embroidery",
    nativeName: "தோடா எம்பிராய்டரி (Pugur)",
    category: "Textiles & Embroidery",
    GI_tagged: false,
    giTagged: false,
    status: "endangered",
    verification_source: "Tribal Research Centre (TRC) Ooty Study",
    top: "84%",
    left: "31%",
    region: "south"
  },
  {
    id: "sikki-grass-bihar",
    stateName: "Bihar",
    craftName: "Sikki Golden Grass Weaving",
    nativeName: "सिकी घास शिल्प",
    category: "Eco-Bamboo & Cane",
    GI_tagged: false,
    giTagged: false,
    status: "endangered",
    verification_source: "Craft Revival Trust Academic Field Report",
    top: "37%",
    left: "64%",
    region: "east"
  },

  // 🔵 NON-GI ACTIVE RESEARCHED CRAFTS (BLUE)
  {
    id: "aipan-art-uttarakhand",
    stateName: "Uttarakhand",
    craftName: "Aipan Ritual Folk Art",
    nativeName: "ऐपण कला",
    category: "Folk Painting",
    GI_tagged: false,
    giTagged: false,
    status: "active",
    verification_source: "National Institute of Design (NID) Documentation",
    top: "25%",
    left: "38%",
    region: "north"
  },
  {
    id: "punja-durrie-haryana",
    stateName: "Haryana",
    craftName: "Punja Durrie Weaving",
    nativeName: "पंजा दरी",
    category: "Textiles & Weaving",
    GI_tagged: false,
    giTagged: false,
    status: "active",
    verification_source: "All India Handicrafts Board Field Archive",
    top: "28%",
    left: "29%",
    region: "north"
  },
  {
    id: "assam-bamboo-craft",
    stateName: "Assam",
    craftName: "Assam Bamboo & Japi Craft",
    nativeName: "অসমৰ বাঁহ আৰু জাপি",
    category: "Eco-Bamboo & Cane",
    GI_tagged: false,
    giTagged: false,
    status: "active",
    verification_source: "NEDFi North East Cultural Documentation",
    top: "35.5%",
    left: "81%",
    region: "northeast"
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
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [activeModalCraft, setActiveModalCraft] = useState(null);
  const [giFilterType, setGiFilterType] = useState('all'); // 'all' | 'gi' | 'non-gi' | 'endangered'
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

  // Find full craft record from backend or fallback to marker data
  const getFullCraftData = (marker) => {
    const found = crafts.find(c => c.id === marker.id || c.state.toLowerCase().includes(marker.stateName.toLowerCase()));
    if (found) return found;

    return {
      id: marker.id,
      name: marker.craftName,
      nativeName: marker.nativeName,
      state: marker.stateName,
      category: marker.category,
      GI_tagged: marker.GI_tagged,
      giTagged: marker.giTagged,
      giYear: marker.giYear,
      status: marker.status,
      verification_source: marker.verification_source || 'NGO & Academic Research Study',
      sellerContact: '+91 98765 43210 (Artisan Collective)',
      onlineStoreLink: 'https://kala-setu.example.com',
      thumbnailUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80',
      description: `Researched and verified traditional handicraft heritage in ${marker.stateName}.`,
      sellers: [{ name: `${marker.stateName} Master Artisan Guild`, verified: true }]
    };
  };

  // 3-Color Pin System Logic
  // 🟢 Green -> GI crafts
  // 🔴 Red -> Non-GI endangered crafts
  // 🔵 Blue -> Non-GI active crafts
  const getMarkerVisuals = (marker) => {
    const fullCraft = getFullCraftData(marker);
    const isGI = fullCraft.GI_tagged || fullCraft.giTagged;
    const isEndangered = fullCraft.status === 'endangered';

    if (isGI) {
      return {
        bgGradient: 'from-emerald-700 via-green-600 to-emerald-500',
        pingColor: 'bg-emerald-500',
        badgeText: 'GI',
        badgeBg: 'bg-amber-400 text-stone-950',
        borderColor: 'border-emerald-200',
        categoryLabel: 'GI Tagged Certified',
        dotColor: '#16a34a'
      };
    }

    if (isEndangered) {
      return {
        bgGradient: 'from-red-700 via-rose-600 to-red-500',
        pingColor: 'bg-red-500',
        badgeText: 'Endangered',
        badgeBg: 'bg-red-950 text-red-200',
        borderColor: 'border-red-200',
        categoryLabel: 'Non-GI (Endangered Heritage)',
        dotColor: '#dc2626'
      };
    }

    // Non-GI Active
    return {
      bgGradient: 'from-blue-700 via-sky-600 to-blue-500',
      pingColor: 'bg-blue-500',
      badgeText: 'Researched',
      badgeBg: 'bg-sky-950 text-sky-200',
      borderColor: 'border-blue-200',
      categoryLabel: 'Non-GI (Active Researched)',
      dotColor: '#2563eb'
    };
  };

  // Filter markers based on GI/Non-GI filter and region
  const visibleMarkers = STATE_MARKERS.filter(m => {
    const fullCraft = getFullCraftData(m);
    const isGI = fullCraft.GI_tagged || fullCraft.giTagged;
    const isEndangered = fullCraft.status === 'endangered';

    // GI Filter
    if (giFilterType === 'gi' && !isGI) return false;
    if (giFilterType === 'non-gi' && isGI) return false;
    if (giFilterType === 'endangered' && !isEndangered) return false;

    // Region Filter
    if (targetRegion && targetRegion !== 'all' && m.region !== targetRegion) return false;

    return true;
  });

  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-stone-800 bg-[#fdfbf7] select-none">
      {/* Top Header Controls Bar */}
      <div className="absolute top-4 left-4 right-4 z-30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pointer-events-none">
        {/* GI / Non-GI View Mode Switcher */}
        <div className="flex flex-wrap gap-1.5 bg-stone-950/90 backdrop-blur-md p-1.5 rounded-2xl shadow-2xl border border-stone-700 text-xs pointer-events-auto">
          <div className="flex items-center px-2 text-stone-300 font-bold space-x-1">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">View:</span>
          </div>

          <button
            onClick={() => setGiFilterType('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              giFilterType === 'all'
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            All Crafts
          </button>

          <button
            onClick={() => setGiFilterType('gi')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
              giFilterType === 'gi'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-emerald-400 hover:bg-emerald-950/50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>GI Crafts Only</span>
          </button>

          <button
            onClick={() => setGiFilterType('non-gi')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
              giFilterType === 'non-gi'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-sky-400 hover:bg-sky-950/50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-sky-400"></span>
            <span>Non-GI Crafts Only</span>
          </button>

          <button
            onClick={() => setGiFilterType('endangered')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
              giFilterType === 'endangered'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-red-400 hover:bg-red-950/50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-400"></span>
            <span>Endangered Crafts</span>
          </button>
        </div>

        {/* Zoom & Reset Controls */}
        <div className="flex items-center self-end sm:self-auto space-x-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl shadow-xl border border-stone-300 pointer-events-auto">
          <button
            onClick={() => setZoomScale(prev => Math.min(prev + 0.2, 2.2))}
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
            title="Reset Map"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Interactive Map Container with Exact Image Background */}
      <div
        className="w-full h-[760px] relative overflow-hidden cursor-grab active:cursor-grabbing bg-white flex items-center justify-center"
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
          {/* Exact Provided Official Indian Map Image */}
          <img
            src="/india-map-exact.png"
            alt="Official Political Map of India"
            className="w-full h-full object-contain pointer-events-none select-none drop-shadow-md"
            onError={(e) => {
              e.target.src = 'https://raw.githubusercontent.com/chayan35cse-max/Kala-setu-crafts/main/client/public/india-map-exact.png';
            }}
          />

          {/* Interactive State Craft Markers with 3-Color Coding */}
          {visibleMarkers.map((marker) => {
            const isHovered = hoveredMarker === marker.id;
            const fullCraft = getFullCraftData(marker);
            const visuals = getMarkerVisuals(marker);

            return (
              <div
                key={marker.id}
                style={{ top: marker.top, left: marker.left }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveModalCraft(fullCraft);
                }}
                onMouseEnter={() => setHoveredMarker(marker.id)}
                onMouseLeave={() => setHoveredMarker(null)}
              >
                {/* Glowing Pulse Ring */}
                <div className={`absolute inset-0 -m-2 rounded-full ${visuals.pingColor} opacity-60 animate-ping pointer-events-none`}></div>

                {/* Cultural Location Pin */}
                <div className={`relative w-8 h-8 rounded-full bg-gradient-to-tr ${visuals.bgGradient} border-2 border-white shadow-xl flex items-center justify-center text-white transform group-hover:scale-125 transition-transform duration-200`}>
                  <MapPin className="w-4 h-4 text-white fill-white" />
                  
                  {/* GI / Status Badge */}
                  <span className={`absolute -top-1 -right-1.5 ${visuals.badgeBg} text-[8px] font-black px-1 py-0.2 rounded-full border border-white shadow-sm`}>
                    {visuals.badgeText === 'GI' ? 'GI' : visuals.badgeText === 'Endangered' ? '⚠️' : '✓'}
                  </span>
                </div>

                {/* Hover Tooltip Label */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-11 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap bg-stone-950/95 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-2xl border border-stone-700 z-30">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: visuals.dotColor }}></span>
                    <span className="text-stone-300">{marker.stateName}:</span>
                    <span className="text-white">{marker.craftName.split(' ')[0]}</span>
                  </div>
                  <div className="w-2 h-2 bg-stone-950 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Popup Modal when clicking any State Marker */}
        {activeModalCraft && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-full max-w-sm bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-amber-900/30 p-5 animate-fadeIn">
            <button
              onClick={() => setActiveModalCraft(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-3">
              {/* Craft Thumbnail & Badges */}
              <div className="relative w-full h-36 rounded-2xl overflow-hidden bg-stone-100 shadow-inner">
                <img
                  src={activeModalCraft.thumbnailUrl}
                  alt={activeModalCraft.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                <div className="absolute top-2.5 left-2.5 bg-stone-950/85 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  {activeModalCraft.state}
                </div>
                
                {/* Dynamic Status Badge (GI vs Non-GI) */}
                {activeModalCraft.GI_tagged || activeModalCraft.giTagged ? (
                  <div className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center space-x-1 shadow-md">
                    <Award className="w-3 h-3" />
                    <span>GI Tagged ({activeModalCraft.giYear || 'Certified'})</span>
                  </div>
                ) : activeModalCraft.status === 'endangered' ? (
                  <div className="absolute top-2.5 right-2.5 bg-red-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center space-x-1 shadow-md">
                    <AlertTriangle className="w-3 h-3" />
                    <span>Non-GI Endangered</span>
                  </div>
                ) : (
                  <div className="absolute top-2.5 right-2.5 bg-blue-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center space-x-1 shadow-md">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Non-GI Researched</span>
                  </div>
                )}
              </div>

              {/* Title & Native Script */}
              <div>
                <h4 className="font-bold text-stone-900 text-base leading-snug">
                  {activeModalCraft.name}
                </h4>
                {activeModalCraft.nativeName && (
                  <p className="text-amber-700 font-bold text-xs mt-0.5 font-serif">
                    {activeModalCraft.nativeName}
                  </p>
                )}
              </div>

              {/* Verification Source for Non-GI */}
              {(!activeModalCraft.GI_tagged && !activeModalCraft.giTagged) && activeModalCraft.verification_source && (
                <div className="bg-sky-50 border border-sky-200 text-sky-900 text-[11px] px-2.5 py-1.5 rounded-xl flex items-start space-x-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-sky-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Verification Source: </span>
                    <span>{activeModalCraft.verification_source}</span>
                  </div>
                </div>
              )}

              <p className="text-stone-600 text-xs line-clamp-2 leading-relaxed">
                {activeModalCraft.tagline || activeModalCraft.description}
              </p>

              <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100">
                <span className="font-semibold bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md">
                  {activeModalCraft.category}
                </span>
                <span className="text-emerald-700 font-bold flex items-center space-x-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>{activeModalCraft.sellers?.length || 1} Verified Studios</span>
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {onOpenInsights && (
                  <button
                    onClick={() => {
                      onOpenInsights(activeModalCraft);
                      setActiveModalCraft(null);
                    }}
                    className="bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center space-x-1 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    <span>Know More</span>
                  </button>
                )}
                
                <button
                  onClick={() => {
                    onSelectCraft(activeModalCraft);
                    setActiveModalCraft(null);
                  }}
                  className={`bg-gradient-to-r from-amber-700 via-orange-600 to-amber-600 hover:from-amber-800 hover:to-orange-700 text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center space-x-1.5 shadow-lg shadow-amber-700/25 transition-all cursor-pointer ${
                    !onOpenInsights ? 'col-span-2' : ''
                  }`}
                >
                  <span>{t('map.seeDetails')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3-Color Legend Bar */}
      <div className="p-3.5 bg-stone-950 text-stone-300 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-amber-900/30">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-bold text-amber-400">Map Legend:</span>
          
          <span className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-emerald-300/30"></span>
            <span className="font-semibold text-emerald-300">Green: GI Crafts</span>
          </span>

          <span className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500 ring-2 ring-red-300/30"></span>
            <span className="font-semibold text-red-300">Red: Non-GI Endangered</span>
          </span>

          <span className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-blue-500 ring-2 ring-blue-300/30"></span>
            <span className="font-semibold text-sky-300">Blue: Non-GI Active</span>
          </span>
        </div>

        <div className="flex items-center space-x-2 text-amber-300 font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Click any marker for details, AI insights, and verified artisan studios</span>
        </div>
      </div>
    </div>
  );
}
