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
  Info
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

// State markers mapped precisely to the exact image coordinates (% from top-left)
const STATE_MARKERS = [
  {
    id: "pashmina-kashmir",
    stateName: "Jammu and Kashmir",
    craftName: "Kashmiri Pashmina & Kani Shawls",
    nativeName: "کٲشُر پشمینہ",
    category: "Textiles & Weaving",
    giTagged: true,
    giYear: 2008,
    top: "10.5%",
    left: "30.5%",
    region: "north"
  },
  {
    id: "himachal-craft",
    stateName: "Himachal Pradesh",
    craftName: "Kullu Shawls & Chamba Rumal",
    nativeName: "कुल्लू शॉल",
    category: "Textiles & Weaving",
    giTagged: true,
    giYear: 2005,
    top: "19%",
    left: "33%",
    region: "north"
  },
  {
    id: "phulkari-punjab",
    stateName: "Punjab",
    craftName: "Phulkari Embroidery",
    nativeName: "ਫੁਲਕਾਰੀ",
    category: "Textiles & Embroidery",
    giTagged: true,
    giYear: 2011,
    top: "22%",
    left: "26%",
    region: "north"
  },
  {
    id: "uttarakhand-craft",
    stateName: "Uttarakhand",
    craftName: "Aipan Folk Art & Ringal Craft",
    nativeName: "ऐपण कला",
    category: "Folk Painting",
    giTagged: true,
    giYear: 2021,
    top: "25%",
    left: "38%",
    region: "north"
  },
  {
    id: "haryana-craft",
    stateName: "Haryana",
    craftName: "Punja Durries & Terracotta",
    nativeName: "पंजा दरी",
    category: "Textiles & Weaving",
    giTagged: false,
    top: "28%",
    left: "29%",
    region: "north"
  },
  {
    id: "jaipur-blue-pottery",
    stateName: "Rajasthan",
    craftName: "Jaipur Blue Pottery & Kathputli",
    nativeName: "जयपुर ब्लू पॉटरी",
    category: "Pottery & Ceramics",
    giTagged: true,
    giYear: 2008,
    top: "35%",
    left: "19.5%",
    region: "west"
  },
  {
    id: "up-craft",
    stateName: "Uttar Pradesh",
    craftName: "Varanasi Brocades & Chikankari",
    nativeName: "बनारसी साड़ी एवं चिकनकारी",
    category: "Textiles & Weaving",
    giTagged: true,
    giYear: 2009,
    top: "35.5%",
    left: "44%",
    region: "north"
  },
  {
    id: "madhubani-painting",
    stateName: "Bihar",
    craftName: "Madhubani (Mithila) Painting",
    nativeName: "मिथिला / मधुबनी चित्रकला",
    category: "Folk Painting",
    giTagged: true,
    giYear: 2007,
    top: "39%",
    left: "60.5%",
    region: "east"
  },
  {
    id: "sikkim-craft",
    stateName: "Sikkim",
    craftName: "Thangka Sacred Scroll Painting",
    nativeName: "थंगका चित्रकला",
    category: "Sacred Classical Painting",
    giTagged: true,
    giYear: 2020,
    top: "32%",
    left: "70.5%",
    region: "northeast"
  },
  {
    id: "arunachal-craft",
    stateName: "Arunachal Pradesh",
    craftName: "Wancho Wood Carving & Handloom",
    nativeName: "वांचो काष्ठ कला",
    category: "Woodcraft & Toys",
    giTagged: true,
    giYear: 2024,
    top: "29%",
    left: "91%",
    region: "northeast"
  },
  {
    id: "assam-bamboo-craft",
    stateName: "Assam",
    craftName: "Assam Bamboo & Japi Craft",
    nativeName: "অসমৰ বাঁহ আৰু জাপি",
    category: "Eco-Bamboo & Cane",
    giTagged: true,
    giYear: 2024,
    top: "35.5%",
    left: "81%",
    region: "northeast"
  },
  {
    id: "nagaland-craft",
    stateName: "Nagaland",
    craftName: "Naga Traditional Shawls & Crafts",
    nativeName: "नागा शॉल",
    category: "Textiles & Weaving",
    giTagged: true,
    giYear: 2008,
    top: "36%",
    left: "91.5%",
    region: "northeast"
  },
  {
    id: "meghalaya-craft",
    stateName: "Meghalaya",
    craftName: "Ryndia Eri Silk & Cane Weaving",
    nativeName: "एरी सिल्क",
    category: "Textiles & Weaving",
    giTagged: true,
    giYear: 2023,
    top: "39%",
    left: "80%",
    region: "northeast"
  },
  {
    id: "manipur-craft",
    stateName: "Manipur",
    craftName: "Kauna Reed Craft & Shaphee Lanphee",
    nativeName: "কৌনা শিল্প",
    category: "Eco-Bamboo & Cane",
    giTagged: true,
    giYear: 2014,
    top: "41%",
    left: "90%",
    region: "northeast"
  },
  {
    id: "tripura-craft",
    stateName: "Tripura",
    craftName: "Tripura Bamboo & Risa Textile",
    nativeName: "ত্রিপুরা বাঁশ শিল্প",
    category: "Eco-Bamboo & Cane",
    giTagged: true,
    giYear: 2024,
    top: "44.5%",
    left: "82%",
    region: "northeast"
  },
  {
    id: "mizoram-craft",
    stateName: "Mizoram",
    craftName: "Puan Handloom Weaving",
    nativeName: "Puan Weaving",
    category: "Textiles & Weaving",
    giTagged: true,
    giYear: 2019,
    top: "45.5%",
    left: "87%",
    region: "northeast"
  },
  {
    id: "jharkhand-craft",
    stateName: "Jharkhand",
    craftName: "Sohrai & Khovar Murals",
    nativeName: "सोहराय एवं कोहबर कला",
    category: "Folk Painting",
    giTagged: true,
    giYear: 2020,
    top: "45%",
    left: "59%",
    region: "east"
  },
  {
    id: "bankura-terracotta",
    stateName: "West Bengal",
    craftName: "Bankura Terracotta & Panchmura Horse",
    nativeName: "বাঁকুড়া পোড়ামাটির ঘোড়া",
    category: "Pottery & Terracotta",
    giTagged: true,
    giYear: 2018,
    top: "46.5%",
    left: "68%",
    region: "east"
  },
  {
    id: "rogan-art-gujarat",
    stateName: "Gujarat",
    craftName: "Rogan Art of Nirona & Kutch Weave",
    nativeName: "રોગન આર્ટ / रोगन कला",
    category: "Oil Paint Textile Art",
    giTagged: true,
    giYear: 2024,
    top: "47%",
    left: "11%",
    region: "west"
  },
  {
    id: "mp-craft",
    stateName: "Madhya Pradesh",
    craftName: "Chanderi Saree & Gond Tribal Art",
    nativeName: "चंदेरी एवं गोंड कला",
    category: "Textiles & Weaving",
    giTagged: true,
    giYear: 2005,
    top: "47.5%",
    left: "35%",
    region: "north"
  },
  {
    id: "bastar-dhokra-craft",
    stateName: "Chhattisgarh",
    craftName: "Bastar Dhokra Lost-Wax Metal Craft",
    nativeName: "बस्तर ढोकरा शिल्प",
    category: "Metal Casting",
    giTagged: true,
    giYear: 2008,
    top: "54%",
    left: "48.5%",
    region: "east"
  },
  {
    id: "pattachitra-odisha",
    stateName: "Odisha (Orissa)",
    craftName: "Raghurajpur Pattachitra & Palm Leaf",
    nativeName: "ପଟ୍ଟଚିତ୍ର",
    category: "Folk Painting & Engraving",
    giTagged: true,
    giYear: 2008,
    top: "54.5%",
    left: "57.5%",
    region: "east"
  },
  {
    id: "warli-folk-painting",
    stateName: "Maharashtra",
    craftName: "Warli Tribal Folk Painting",
    nativeName: "वारली चित्रकला",
    category: "Tribal Painting",
    giTagged: true,
    giYear: 2014,
    top: "59%",
    left: "25%",
    region: "west"
  },
  {
    id: "telangana-craft",
    stateName: "Telangana",
    craftName: "Pochampally Ikat & Cheriyal Scrolls",
    nativeName: "పోచంపల్లి ఇక్కత్",
    category: "Textiles & Weaving",
    giTagged: true,
    giYear: 2005,
    top: "63.5%",
    left: "38%",
    region: "south"
  },
  {
    id: "kalamkari-andhra",
    stateName: "Andhra Pradesh",
    craftName: "Srikalahasti Kalamkari Pen Art",
    nativeName: "శ్రీకాళహస్తి కలంకారీ",
    category: "Textiles & Painting",
    giTagged: true,
    giYear: 2006,
    top: "73%",
    left: "36%",
    region: "south"
  },
  {
    id: "goa-craft",
    stateName: "Goa",
    craftName: "Goan Terracotta & Coconut Shell",
    nativeName: "गोंय माती कला",
    category: "Pottery & Terracotta",
    giTagged: false,
    top: "72.5%",
    left: "19%",
    region: "west"
  },
  {
    id: "channapatna-toys",
    stateName: "Karnataka",
    craftName: "Channapatna Toys & Bidriware",
    nativeName: "ಚನ್ನಪಟ್ಟಣ ಗೊಂಬೆಗಳು",
    category: "Woodcraft & Toys",
    giTagged: true,
    giYear: 2006,
    top: "75%",
    left: "26.5%",
    region: "south"
  },
  {
    id: "tanjore-painting",
    stateName: "Tamil Nadu",
    craftName: "Thanjavur (Tanjore) 22K Gold Painting",
    nativeName: "தஞ்சாவூர் ஓவியம்",
    category: "Sacred Classical Painting",
    giTagged: true,
    giYear: 2007,
    top: "86%",
    left: "35%",
    region: "south"
  },
  {
    id: "kerala-craft",
    stateName: "Kerala",
    craftName: "Aranmula Metal Mirror & Bell Metal",
    nativeName: "ആറന്മുളക്കണ്ണാടി",
    category: "Metal Casting",
    giTagged: true,
    giYear: 2005,
    top: "88%",
    left: "28%",
    region: "south"
  }
];

export default function IndiaCraftMap({
  crafts = [],
  selectedCraft = null,
  onSelectCraft,
  targetRegion = 'all',
  onRegionChange
}) {
  const { t } = useTranslation();
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [activeModalCraft, setActiveModalCraft] = useState(null);
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

  // Find full craft record from API data if available, or fall back to marker data
  const getFullCraftData = (marker) => {
    const found = crafts.find(c => c.id === marker.id || c.state.toLowerCase().includes(marker.stateName.toLowerCase()));
    if (found) return found;

    return {
      id: marker.id,
      name: marker.craftName,
      nativeName: marker.nativeName,
      state: marker.stateName,
      category: marker.category,
      giTagged: marker.giTagged,
      giYear: marker.giYear,
      thumbnailUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80',
      description: `Authentic traditional handicraft heritage protected under Geographical Indications in ${marker.stateName}.`,
      sellers: [{ name: `${marker.stateName} Master Artisan Guild`, verified: true }]
    };
  };

  // Filter markers based on selected region
  const visibleMarkers = STATE_MARKERS.filter(m => {
    if (targetRegion && targetRegion !== 'all' && m.region !== targetRegion) return false;
    return true;
  });

  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-stone-800 bg-[#fdfbf7] select-none">
      {/* Top Header Controls Bar */}
      <div className="absolute top-4 left-4 right-4 z-30 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Regional Quick Jump Controls */}
        <div className="flex flex-wrap gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl shadow-xl border border-stone-300 text-xs pointer-events-auto">
          <div className="flex items-center px-2 text-stone-700 font-bold space-x-1">
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            <span className="hidden sm:inline">Filter Regions:</span>
          </div>
          {[
            { id: 'all', label: 'All States (28+)' },
            { id: 'north', label: 'North (J&K / Punjab / UP)' },
            { id: 'south', label: 'South (TN / KA / AP)' },
            { id: 'east', label: 'East (Bengal / Bihar)' },
            { id: 'west', label: 'West (Rajasthan / Gujarat)' },
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
            onClick={() => setZoomScale(prev => Math.min(prev + 0.2, 2.2))}
            className="p-1.5 hover:bg-stone-100 text-stone-700 rounded-lg"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomScale(prev => Math.max(prev - 0.2, 0.9))}
            className="p-1.5 hover:bg-stone-100 text-stone-700 rounded-lg"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={resetView}
            className="p-1.5 hover:bg-stone-100 text-stone-700 rounded-lg"
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

          {/* Interactive State Craft Markers Overlay */}
          {visibleMarkers.map((marker) => {
            const isHovered = hoveredMarker === marker.id;
            const fullCraft = getFullCraftData(marker);

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
                <div className="absolute inset-0 -m-2 rounded-full bg-orange-500 opacity-60 animate-ping pointer-events-none"></div>

                {/* Cultural Location Pin */}
                <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-amber-700 via-orange-600 to-amber-500 border-2 border-white shadow-xl flex items-center justify-center text-white transform group-hover:scale-125 transition-transform duration-200">
                  <MapPin className="w-4 h-4 text-white fill-white" />
                  {marker.giTagged && (
                    <span className="absolute -top-1 -right-1 bg-amber-400 text-stone-950 text-[8px] font-black px-1 rounded-full border border-white">
                      GI
                    </span>
                  )}
                </div>

                {/* Hover Tooltip Label */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap bg-stone-950/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-xl border border-amber-500/40 z-30">
                  <span>{marker.stateName}: {marker.craftName.split(' ')[0]}</span>
                  <div className="w-2 h-2 bg-stone-950 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Popup Modal when clicking any State Marker */}
        {activeModalCraft && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-full max-w-sm bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-amber-900/30 p-5 animate-fadeIn">
            <button
              onClick={() => setActiveModalCraft(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-3">
              {/* Craft Thumbnail */}
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
                {activeModalCraft.giTagged && (
                  <div className="absolute top-2.5 right-2.5 bg-amber-500 text-stone-950 text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center space-x-1 shadow-md">
                    <Award className="w-3 h-3 text-stone-950" />
                    <span>GI Tagged ({activeModalCraft.giYear || 'Protected'})</span>
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

              {/* Navigate to Full Craft Detail Action */}
              <button
                onClick={() => {
                  onSelectCraft(activeModalCraft);
                  setActiveModalCraft(null);
                }}
                className="w-full bg-gradient-to-r from-amber-700 via-orange-600 to-amber-600 hover:from-amber-800 hover:to-orange-700 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-amber-700/30 transition-all cursor-pointer"
              >
                <span>{t('map.seeDetails')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Map Legend Bar */}
      <div className="p-3.5 bg-stone-950 text-stone-300 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-amber-900/30">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-bold text-amber-400">Interactive State Markers:</span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
            <span>All 28 Indian States & UTs</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span>GI Tag Certified Traditions</span>
          </span>
        </div>

        <div className="flex items-center space-x-2 text-amber-300 font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Click any pin to explore traditional craft masterclasses & verified sellers</span>
        </div>
      </div>
    </div>
  );
}
