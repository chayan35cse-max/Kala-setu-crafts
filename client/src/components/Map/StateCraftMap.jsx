import React, { useState } from 'react';
import {
  ArrowLeft,
  Award,
  Sparkles,
  MapPin,
  ShieldCheck,
  AlertTriangle,
  BookOpen,
  Users,
  ExternalLink,
  ChevronRight,
  Info,
  Clock,
  Layers,
  Feather,
  X,
  ArrowRight,
  Eye,
  CheckCircle2,
  Filter,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

// State-level craft cluster definitions with district coordinates on the state map
export const STATE_CRAFT_DATA = {
  'west-bengal': {
    name: 'West Bengal',
    nativeName: 'পশ্চিমবঙ্গ',
    tagline: 'Land of Bengal Jamdani, Terracotta Horses, Baluchari Silk & Chhau Masks',
    region: 'East',
    capital: 'Kolkata',
    craftCount: 6,
    accentColor: '#b45309',
    svgViewBox: '0 0 500 700',
    description: 'West Bengal is a legendary global cradle of handloom textiles, terracotta sculpture, folk masks, and lost-wax metallurgy, celebrated for UNESCO-recognized Bengal Jamdani weaving and the iconic Bankura Panchmura terracotta horse.',
    districts: [
      { id: 'nadia', name: 'Nadia (Phulia & Shantipur)', craft: 'Bengal Jamdani & Tangail Weaving' },
      { id: 'bardhaman', name: 'Purba Bardhaman (Kalna)', craft: 'Jamdani Handloom Cluster & Dokra' },
      { id: 'bankura', name: 'Bankura (Panchmura & Bishnupur)', craft: 'Terracotta Horse & Baluchari Silk' },
      { id: 'purulia', name: 'Purulia (Charida)', craft: 'Purulia Chhau Martial Dance Masks' },
      { id: 'birbhum', name: 'Birbhum (Bolpur & Shantiniketan)', craft: 'Shantiniketan Embossed Leather' },
      { id: 'hooghly', name: 'Hooghly (Dhaniakhali)', craft: 'Dhaniakhali Jamdani Weaving' }
    ],
    craftMarkers: [
      {
        id: 'bengal-jamdani-weaving',
        craftName: 'Bengal Jamdani Weaving',
        nativeName: 'বাংলার ঐতিহ্যবাহী জামদানি বয়ন',
        district: 'Nadia (Phulia & Shantipur) / Bardhaman (Kalna)',
        category: 'Handloom & Muslin Weaving',
        GI_tagged: true,
        giTagged: true,
        giYear: 2013,
        status: 'active',
        verification_source: 'UNESCO Intangible Cultural Heritage & GI Registry (#582)',
        top: '55%',
        left: '68%',
        highlight: true,
        clusterNote: 'Centres: Phulia, Shantipur, Kalna & Dhaniakhali along Hooghly river'
      },
      {
        id: 'bankura-terracotta-horse',
        craftName: 'Bankura Panchmura Terracotta Horse',
        nativeName: 'বাঁকুড়া টেরাকোটা ঘোড়া',
        district: 'Bankura (Panchmura Village)',
        category: 'Terracotta & Clay Sculpture',
        GI_tagged: true,
        giTagged: true,
        giYear: 2018,
        status: 'active',
        verification_source: 'GI Registry of India (#584)',
        top: '60%',
        left: '42%',
        clusterNote: 'National Handicraft Logo of India with modular hollow wheel-thrown parts'
      },
      {
        id: 'baluchari-saree-bengal',
        craftName: 'Baluchari Silk Saree',
        nativeName: 'বালুচরী সিল্ক শাড়ি',
        district: 'Bankura (Bishnupur Malla Dynasty Hub)',
        category: 'Handloom Silk & Jacquard',
        GI_tagged: true,
        giTagged: true,
        giYear: 2011,
        status: 'active',
        verification_source: 'GI Registry of India (#173)',
        top: '56%',
        left: '49%',
        clusterNote: 'Pure mulberry silk with Ramayana & Mahabharata narrative woven pallus'
      },
      {
        id: 'purulia-chhau-mask',
        craftName: 'Purulia Chhau Dance Mask',
        nativeName: 'পুরুলিয়া ছৌ মুখোশ',
        district: 'Purulia (Charida Village, Baghmundi)',
        category: 'Folk Mask & Ritual Art',
        GI_tagged: true,
        giTagged: true,
        giYear: 2018,
        status: 'active',
        verification_source: 'GI Registry of India (#585)',
        top: '54%',
        left: '26%',
        clusterNote: 'Theatrical papier-mâché masks for acrobatic martial Chhau dance'
      },
      {
        id: 'shantiniketan-leather-craft',
        craftName: 'Shantiniketan Embossed Leather Goods',
        nativeName: 'শান্তিনিকেতনী খোদাই করা চামড়ার শিল্প',
        district: 'Birbhum (Bolpur & Shantiniketan)',
        category: 'Embossed Leather Craft',
        GI_tagged: true,
        giTagged: true,
        giYear: 2008,
        status: 'active',
        verification_source: 'GI Registry of India (#69)',
        top: '44%',
        left: '55%',
        clusterNote: 'Tagore Visva-Bharati rural reconstruction craft with touch-dyed embossed motifs'
      },
      {
        id: 'bastar-dhokra-craft',
        craftName: 'Bengal Dokra Metal Casting',
        nativeName: 'বেঙ্গল ডোকরা শিল্প (বিকনা ও দরিয়াপুর)',
        district: 'Bankura (Bikna) & Purba Bardhaman (Dariapur)',
        category: 'Lost-Wax Metallurgy',
        GI_tagged: true,
        giTagged: true,
        giYear: 2018,
        status: 'active',
        verification_source: 'GI Registry of India (#586)',
        top: '51%',
        left: '46%',
        clusterNote: '4,000-year-old cire perdue non-ferrous bronze casting by Dhokra Damar clans'
      }
    ]
  },
  'rajasthan': {
    name: 'Rajasthan',
    nativeName: 'राजस्थान',
    tagline: 'Desert Kingdom of Cobalt Blue Pottery, Pichwai Paintings & Block Prints',
    region: 'West',
    capital: 'Jaipur',
    craftCount: 4,
    accentColor: '#c2410c',
    description: 'Rajasthan is world-famous for its royal durbars, quartz-based clayless blue pottery in Jaipur, and generational artisan guilds.',
    craftMarkers: [
      {
        id: 'jaipur-blue-pottery',
        craftName: 'Jaipur Blue Pottery',
        nativeName: 'जयपुर ब्लू पॉटरी',
        district: 'Jaipur (Amer & Potters Colony)',
        category: 'Pottery & Ceramics',
        GI_tagged: true,
        giTagged: true,
        giYear: 2008,
        status: 'active',
        verification_source: 'GI Registry of India (#2)',
        top: '42%',
        left: '58%',
        clusterNote: 'Clayless Egyptian faience quartz paste with cobalt oxide arabesques'
      }
    ]
  },
  'gujarat': {
    name: 'Gujarat',
    nativeName: 'ગુજરાત',
    tagline: 'Homeland of Endangered Rogan Castor Thread Art & Patan Patola Double Ikat',
    region: 'West',
    capital: 'Gandhinagar',
    craftCount: 3,
    accentColor: '#b91c1c',
    description: 'Gujarat preserves some of India’s most endangered craft lineages, notably the 300-year-old Rogan castor oil art practiced by a single surviving master family in Nirona, Kutch.',
    craftMarkers: [
      {
        id: 'rogan-art-gujarat',
        craftName: 'Rogan Art of Nirona',
        nativeName: 'રોગન આર્ટ (નીરોના)',
        district: 'Kutch (Nirona Village, Nakhatrana)',
        category: 'Oil Paint Textile Art',
        GI_tagged: false,
        giTagged: false,
        status: 'endangered',
        verification_source: 'Dastkar NGO Documentation & AIACA Research',
        top: '38%',
        left: '30%',
        clusterNote: 'Endangered boiled castor oil thread art manipulated with a brass stylus mid-air'
      }
    ]
  },
  'tamil-nadu': {
    name: 'Tamil Nadu',
    nativeName: 'தமிழ்நாடு',
    tagline: 'Sanctuary of 22K Gold Thanjavur Paintings & Toda Tribal Embroidery',
    region: 'South',
    capital: 'Chennai',
    craftCount: 3,
    accentColor: '#4338ca',
    description: 'Tamil Nadu showcases sublime sacred arts, from 22-karat gold embossed Tanjore temple paintings to the endangered count-thread reversible Pugur embroidery of Nilgiri Toda pastoral clans.',
    craftMarkers: [
      {
        id: 'tanjore-painting',
        craftName: 'Thanjavur (Tanjore) 22K Gold Painting',
        nativeName: 'தஞ்சாவூர் ஓவியம்',
        district: 'Thanjavur & Tiruchirappalli',
        category: 'Sacred Classical Painting',
        GI_tagged: true,
        giTagged: true,
        giYear: 2007,
        status: 'active',
        verification_source: 'GI Registry of India (#22)',
        top: '56%',
        left: '60%',
        clusterNote: 'High-relief limestone Sukki Babu gesso work with pure 22K gold leaf and gems'
      },
      {
        id: 'toda-embroidery-tn',
        craftName: 'Toda Tribal Pugur Embroidery',
        nativeName: 'தோடா எம்பிராய்டரி (Pugur)',
        district: 'Nilgiris (Ooty High Hills)',
        category: 'Textiles & Embroidery',
        GI_tagged: false,
        giTagged: false,
        status: 'endangered',
        verification_source: 'Tribal Research Centre (TRC) Ooty Study',
        top: '42%',
        left: '28%',
        clusterNote: 'Reversible geometric darning counted on unbleached cloth by Toda buffalo clan women'
      }
    ]
  },
  'bihar': {
    name: 'Bihar',
    nativeName: 'बिहार',
    tagline: 'Land of Mithila Madhubani Double-Line Folk Art & Sikki Golden Grass',
    region: 'East',
    capital: 'Patna',
    craftCount: 3,
    accentColor: '#15803d',
    description: 'Bihar boasts ancient folk ritual traditions, including double-line Kachni and Bharni Madhubani paintings and endangered golden Sikki wild reed weaving.',
    craftMarkers: [
      {
        id: 'madhubani-painting',
        craftName: 'Madhubani (Mithila) Painting',
        nativeName: 'मिथिला / मधुबनी चित्रकला',
        district: 'Madhubani (Jitwarpur & Ranti)',
        category: 'Folk Painting',
        GI_tagged: true,
        giTagged: true,
        giYear: 2007,
        status: 'active',
        verification_source: 'GI Registry of India (#105)',
        top: '32%',
        left: '65%',
        clusterNote: 'Double-line geometric storytelling painted with bamboo twigs and organic mineral dyes'
      },
      {
        id: 'sikki-grass-bihar',
        craftName: 'Sikki Golden Grass Weaving',
        nativeName: 'सिकी घास शिल्प',
        district: 'Darbhanga & Sitamarhi',
        category: 'Eco-Bamboo & Cane',
        GI_tagged: false,
        giTagged: false,
        status: 'endangered',
        verification_source: 'Craft Revival Trust Field Report',
        top: '40%',
        left: '54%',
        clusterNote: 'Wild wetland golden reeds coiled with a Takua needle into dowry boxes and figurines'
      }
    ]
  },
  'karnataka': {
    name: 'Karnataka',
    nativeName: 'ಕರ್ನಾಟಕ',
    tagline: 'Cradle of Channapatna Lacquered Wooden Toys & Mysore Silk Inlays',
    region: 'South',
    capital: 'Bengaluru',
    craftCount: 2,
    accentColor: '#0369a1',
    description: 'Karnataka is renowned for organic child-safe lathe-turned wooden toys dyed with natural vegetable lacquers in the town of Channapatna.',
    craftMarkers: [
      {
        id: 'channapatna-toys',
        craftName: 'Channapatna Wooden Toys',
        nativeName: 'ಚನ್ನಪಟ್ಟಣ ಗೊಂಬೆಗಳು',
        district: 'Ramanagara (Channapatna Gombegala Ooru)',
        category: 'Woodcraft & Lacquerware',
        GI_tagged: true,
        giTagged: true,
        giYear: 2006,
        status: 'active',
        verification_source: 'GI Registry of India (#11)',
        top: '68%',
        left: '54%',
        clusterNote: 'Turned Wrightia tinctoria wood polished with natural vegetable-dyed lac'
      }
    ]
  },
  'jammu-and-kashmir': {
    name: 'Jammu and Kashmir',
    nativeName: 'جموں و کشمیر',
    tagline: 'Crown of Pashmina Cashmere Weaving, Kani Shawls & Walnut Wood Carvings',
    region: 'North',
    capital: 'Srinagar',
    craftCount: 2,
    accentColor: '#0f766e',
    description: 'The Kashmir valley is globally revered for fine Pashmina shawls woven from high-altitude Changthangi goat down underfleece and Kani wooden spool jacquards.',
    craftMarkers: [
      {
        id: 'pashmina-kashmir',
        craftName: 'Kashmiri Pashmina & Kani Shawls',
        nativeName: 'کٲشُر پشمینہ',
        district: 'Srinagar (Zadibal & Old City) / Budgam',
        category: 'Textiles & Fine Cashmere',
        GI_tagged: true,
        giTagged: true,
        giYear: 2008,
        status: 'active',
        verification_source: 'GI Registry of India (#46)',
        top: '48%',
        left: '42%',
        clusterNote: 'Micro-fine 12-micron Changthangi goat underfleece handwoven on traditional looms'
      }
    ]
  },
  'uttarakhand': {
    name: 'Uttarakhand',
    nativeName: 'उत्तराखंड',
    tagline: 'Sacred Himalayan Aipan Ritual Geometry & Kumaon Woodcraft',
    region: 'North',
    capital: 'Dehradun',
    craftCount: 2,
    accentColor: '#7c2d12',
    description: 'Uttarakhand’s Kumaon region is famed for Aipan ritual folk art drawn using white rice paste on terracotta Geru soil floors.',
    craftMarkers: [
      {
        id: 'aipan-art-uttarakhand',
        craftName: 'Aipan Ritual Folk Art',
        nativeName: 'ऐपण कला',
        district: 'Almora & Nainital (Kumaon)',
        category: 'Folk Painting',
        GI_tagged: false,
        giTagged: false,
        status: 'active',
        verification_source: 'National Institute of Design (NID) Study',
        top: '54%',
        left: '60%',
        clusterNote: 'Sacred geometric Biswar rice paste finger-drawn over red Geru ochre'
      }
    ]
  },
  'assam': {
    name: 'Assam',
    nativeName: 'অসম',
    tagline: 'Valley of Brahmaputra Bamboo Craft, Tokou Japi & Golden Muga Silk',
    region: 'Northeast',
    capital: 'Guwahati',
    craftCount: 2,
    accentColor: '#166534',
    description: 'Assam excels in sustainable bamboo and cane ecology, creating iconic woven Japi farmer hats and shimmering golden Muga silk.',
    craftMarkers: [
      {
        id: 'assam-bamboo-craft',
        craftName: 'Assam Bamboo & Japi Craft',
        nativeName: 'অসমৰ বাঁহ আৰু জাপি',
        district: 'Nalbari & Barpeta',
        category: 'Eco-Bamboo & Cane',
        GI_tagged: false,
        giTagged: false,
        status: 'active',
        verification_source: 'NEDFi Cultural Documentation',
        top: '44%',
        left: '48%',
        clusterNote: 'Concentric woven Tokou palm leaf and seasoned bamboo with ceremonial appliqués'
      }
    ]
  },
  'chhattisgarh': {
    name: 'Chhattisgarh',
    nativeName: 'छत्तीसगढ़',
    tagline: 'Forest Heartland of Bastar 4,000-Year Lost-Wax Dhokra Bronze Metallurgy',
    region: 'East',
    capital: 'Raipur',
    craftCount: 2,
    accentColor: '#854d0e',
    description: 'Chhattisgarh’s Bastar forest region is home to the Ghadwa tribal metallurgy clans who preserve unbroken 4,000-year-old lost-wax bell metal casting.',
    craftMarkers: [
      {
        id: 'bastar-dhokra-craft',
        craftName: 'Bastar Dhokra Bronze Figurine',
        nativeName: 'बस्तर ढोकरा शिल्प',
        district: 'Bastar (Kondagaon & Jagdalpur)',
        category: 'Metal Casting',
        GI_tagged: true,
        giTagged: true,
        giYear: 2008,
        status: 'active',
        verification_source: 'GI Registry of India (#83)',
        top: '68%',
        left: '48%',
        clusterNote: 'Primitive wax-thread filigree coiled over clay core and cast in brass/bronze'
      }
    ]
  }
};

export default function StateCraftMap({
  selectedStateKey = 'west-bengal',
  onBackToNationalMap,
  onSelectCraft,
  onOpenInsights,
  allCrafts = []
}) {
  const { t } = useTranslation();
  const [currentKey, setCurrentKey] = useState(selectedStateKey);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [activeModalMarker, setActiveModalMarker] = useState(null);
  const [filterType, setFilterType] = useState('all'); // 'all' | 'gi' | 'non-gi'
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

  const stateData = STATE_CRAFT_DATA[currentKey] || STATE_CRAFT_DATA['west-bengal'];
  const isWestBengal = currentKey === 'west-bengal';

  // Get full craft payload from database or marker
  const getFullCraftData = (marker) => {
    if (!marker) return {};
    const craftsList = Array.isArray(allCrafts) ? allCrafts : [];
    const found = craftsList.find(c => {
      if (!c) return false;
      if (c.id && marker.id && c.id === marker.id) return true;
      if (c.name && marker.craftName && c.name.toLowerCase().includes(marker.craftName.toLowerCase())) return true;
      return false;
    });
    if (found) return found;

    return {
      id: marker.id || 'craft-detail',
      name: marker.craftName || 'Traditional Craft',
      nativeName: marker.nativeName || '',
      state: stateData?.name || 'West Bengal',
      district: marker.district || '',
      category: marker.category || 'Handloom & Handicrafts',
      GI_tagged: !!marker.GI_tagged,
      giTagged: !!marker.giTagged,
      giYear: marker.giYear || 2013,
      status: marker.status || 'active',
      verification_source: marker.verification_source || 'GI Registry of India',
      sellerContact: '+91 94340 56789 (District Master Artisan Cooperative)',
      onlineStoreLink: 'https://kala-setu.example.com',
      thumbnailUrl: marker.id === 'bengal-jamdani-weaving'
        ? 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80'
        : marker.id === 'bankura-terracotta-horse'
        ? 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=600&q=80'
        : marker.id === 'baluchari-saree-bengal'
        ? 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80'
        : marker.id === 'purulia-chhau-mask'
        ? 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80'
        : 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80',
      description: `${marker.craftName || 'Craft'} is an authentic traditional heritage craft preserved in ${marker.district || ''}, ${stateData?.name || 'India'}. ${marker.clusterNote || ''}`,
      history: `${marker.craftName || 'This craft'} has flourished for centuries under master artisan lineages in ${stateData?.name || 'India'}.`,
      sellers: [{ name: `${marker.district || 'District'} Master Artisan Cooperative`, verified: true }]
    };
  };

  const visibleMarkers = (stateData?.craftMarkers || []).filter(m => {
    if (!m) return false;
    if (filterType === 'gi' && !m.GI_tagged) return false;
    if (filterType === 'non-gi' && m.GI_tagged) return false;
    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Breadcrumb & Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-3xl border border-stone-200 shadow-md">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBackToNationalMap}
            className="flex items-center space-x-2 bg-stone-900 hover:bg-black text-amber-300 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-md shadow-stone-900/20"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Back to India Sovereign Map</span>
          </button>

          <div className="hidden sm:flex items-center space-x-1.5 text-xs text-stone-500 font-medium">
            <span>India</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-amber-800 font-bold">{stateData.name} Heritage Atlas</span>
          </div>
        </div>

        {/* Quick State Switcher Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-1">
          {Object.keys(STATE_CRAFT_DATA).map(key => {
            const st = STATE_CRAFT_DATA[key];
            const isActive = currentKey === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setCurrentKey(key);
                  setActiveModalMarker(null);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-amber-700 text-white shadow-md'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {st.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* State Hero Banner */}
      <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-900/30 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold px-3 py-1 rounded-full">
              📍 State Map Explorer
            </span>
            <span className="bg-white/10 text-stone-200 text-xs font-semibold px-3 py-1 rounded-full">
              Capital: {stateData.capital}
            </span>
            {isWestBengal && (
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1">
                <Award className="w-3.5 h-3.5" />
                <span>UNESCO Intangible Heritage Hub</span>
              </span>
            )}
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight">
            {stateData.name} ({stateData.nativeName})
          </h2>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            {stateData.description}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-amber-200 font-semibold">
            <span>✨ {stateData.craftMarkers.length} Traditional Craft Clusters Mapped</span>
            <span>•</span>
            <span>Click any location marker on the state map below to inspect regional craft alchemy</span>
          </div>
        </div>
      </div>

      {/* Visual State Map Container */}
      <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-stone-800 bg-[#fbf9f4]">
        {/* Map Header & Filter */}
        <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
          <div className="bg-stone-950/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-stone-700 shadow-xl text-white pointer-events-auto flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold">{stateData.name} Regional Craft Map</span>
          </div>

          <div className="flex items-center space-x-1.5 bg-stone-950/90 backdrop-blur-md p-1.5 rounded-2xl border border-stone-700 shadow-xl text-xs pointer-events-auto">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                filterType === 'all' ? 'bg-amber-600 text-white' : 'text-stone-300 hover:bg-stone-800'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('gi')}
              className={`px-3 py-1 rounded-xl font-bold transition-all cursor-pointer flex items-center space-x-1 ${
                filterType === 'gi' ? 'bg-emerald-600 text-white' : 'text-emerald-400 hover:bg-emerald-950/50'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>GI Only</span>
            </button>
            <button
              onClick={() => setFilterType('non-gi')}
              className={`px-3 py-1 rounded-xl font-bold transition-all cursor-pointer flex items-center space-x-1 ${
                filterType === 'non-gi' ? 'bg-blue-600 text-white' : 'text-sky-400 hover:bg-sky-950/50'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Non-GI</span>
            </button>
          </div>
        </div>

        {/* State Map Graphic Canvas with District Pins */}
        <div
          className="relative w-full h-[660px] bg-gradient-to-b from-stone-100 via-amber-50/40 to-stone-200 flex items-center justify-center p-4 overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Zoom & Reset Controls */}
          <div className="absolute bottom-4 right-4 z-30 flex items-center space-x-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl shadow-xl border border-stone-300">
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
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Scalable & Pannable Map Picture Container */}
          <div
            className="relative max-w-full max-h-full aspect-[4/5] h-full flex items-center justify-center"
            style={{
              transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoomScale})`,
              transformOrigin: 'center center',
              transition: isDragging ? 'none' : 'transform 0.2s ease-out'
            }}
          >
            {isWestBengal ? (
              /* Exact Uploaded District Political Map Picture of West Bengal */
              <img
                src="/west-bengal-map.png"
                alt="Official District Map of West Bengal"
                className="w-full h-full object-contain pointer-events-none select-none drop-shadow-2xl"
                onError={(e) => {
                  e.target.src = 'https://raw.githubusercontent.com/chayan35cse-max/Kala-setu-crafts/main/client/public/west-bengal-map.png';
                }}
              />
            ) : (
              /* Generalized State Silhouette */
              <div className="w-full h-full max-h-[520px] rounded-3xl bg-amber-100/70 border-4 border-amber-700/40 shadow-inner flex flex-col items-center justify-center p-8 text-center space-y-3">
                <div className="w-24 h-24 rounded-full bg-amber-600/20 text-amber-800 flex items-center justify-center text-4xl font-serif font-black">
                  {stateData.name[0]}
                </div>
                <h3 className="text-2xl font-serif font-bold text-stone-900">{stateData.name} Craft Territory</h3>
                <p className="text-xs text-stone-600 max-w-md">{stateData.tagline}</p>
                <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-300">
                  {stateData.craftMarkers.length} Traditional Guild Clusters
                </span>
              </div>
            )}

            {/* Interactive Location Markers Positioned over District Coordinates */}
            {visibleMarkers.map((marker) => {
              const fullCraft = getFullCraftData(marker);
              const isGI = marker.GI_tagged;
              const isEndangered = marker.status === 'endangered';
              const isSelected = activeModalMarker?.id === marker.id;

              return (
                <div
                  key={marker.id}
                  style={{ top: marker.top, left: marker.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                  onClick={() => setActiveModalMarker(marker)}
                  onMouseEnter={() => setHoveredMarker(marker.id)}
                  onMouseLeave={() => setHoveredMarker(null)}
                >
                  {/* Glowing Animation Ring */}
                  <div
                    className={`absolute inset-0 -m-2 rounded-full ${
                      isGI ? 'bg-emerald-500' : isEndangered ? 'bg-red-500' : 'bg-blue-500'
                    } opacity-75 animate-ping pointer-events-none`}
                  />

                  {/* Cultural Pin */}
                  <div
                    className={`relative w-9 h-9 rounded-full bg-gradient-to-tr ${
                      isGI
                        ? 'from-emerald-700 via-green-600 to-emerald-500'
                        : isEndangered
                        ? 'from-red-700 via-rose-600 to-red-500'
                        : 'from-blue-700 via-sky-600 to-blue-500'
                    } border-2 border-white shadow-2xl flex items-center justify-center text-white transform transition-transform duration-200 ${
                      isSelected || hoveredMarker === marker.id ? 'scale-125 ring-4 ring-amber-400' : 'group-hover:scale-115'
                    }`}
                  >
                    <MapPin className="w-4 h-4 text-white fill-white" />
                    <span className="absolute -top-1 -right-1 bg-amber-400 text-stone-950 text-[8px] font-black px-1 py-0.2 rounded-full border border-white">
                      {isGI ? 'GI' : isEndangered ? '⚠️' : '✓'}
                    </span>
                  </div>

                  {/* Pin Tooltip */}
                  <div className="absolute left-1/2 -translate-x-1/2 -top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap bg-stone-950/95 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-2xl border border-stone-700 z-30">
                    <div className="flex items-center space-x-1.5">
                      <span className={`w-2 h-2 rounded-full ${isGI ? 'bg-emerald-400' : isEndangered ? 'bg-red-400' : 'bg-sky-400'}`} />
                      <span>{marker.craftName}</span>
                    </div>
                    <span className="text-[9px] text-amber-300 block">{marker.district}</span>
                    <div className="w-2 h-2 bg-stone-950 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Modal Popup on Marker Click */}
          {activeModalMarker && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-full max-w-sm bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-amber-800/40 p-5 animate-fadeIn">
              <button
                onClick={() => setActiveModalMarker(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {(() => {
                const craft = getFullCraftData(activeModalMarker);
                return (
                  <div className="space-y-3">
                    <div className="relative w-full h-36 rounded-2xl overflow-hidden bg-stone-100 shadow-inner">
                      <img
                        src={craft.thumbnailUrl}
                        alt={craft.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-stone-950/85 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        📍 {craft.district || craft.state}
                      </div>

                      {craft.GI_tagged ? (
                        <div className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center space-x-1 shadow-md">
                          <Award className="w-3 h-3" />
                          <span>GI Tagged ({craft.giYear || 'Certified'})</span>
                        </div>
                      ) : (
                        <div className="absolute top-2.5 right-2.5 bg-blue-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full">
                          Researched Non-GI
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="font-bold text-stone-900 text-base leading-snug">
                        {craft.name}
                      </h4>
                      {craft.nativeName && (
                        <p className="text-amber-800 font-bold text-xs mt-0.5 font-serif">
                          {craft.nativeName}
                        </p>
                      )}
                    </div>

                    <p className="text-stone-600 text-xs line-clamp-3 leading-relaxed">
                      {craft.tagline || craft.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100">
                      <span className="font-semibold bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md">
                        {craft.category}
                      </span>
                      <span className="text-emerald-700 font-bold flex items-center space-x-1">
                        <Users className="w-3.5 h-3.5" />
                        <span>Verified Artisan Guild</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      {onOpenInsights && (
                        <button
                          onClick={() => {
                            onOpenInsights(craft);
                            setActiveModalMarker(null);
                          }}
                          className="bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center space-x-1 transition-all cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                          <span>Know More</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          if (onSelectCraft) {
                            onSelectCraft(craft);
                          }
                          setActiveModalMarker(null);
                        }}
                        className={`bg-gradient-to-r from-amber-700 via-orange-600 to-amber-600 hover:from-amber-800 hover:to-orange-700 text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center space-x-1.5 shadow-lg shadow-amber-700/25 transition-all cursor-pointer ${
                          !onOpenInsights ? 'col-span-2' : ''
                        }`}
                      >
                        <span>See Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>

        {/* Legend Bar */}
        <div className="p-3.5 bg-stone-950 text-stone-300 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-amber-900/30">
          <div className="flex items-center space-x-4">
            <span className="font-bold text-amber-400">Map Pin Key:</span>
            <span className="flex items-center space-x-1.5 text-emerald-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>GI Tagged Certified</span>
            </span>
            <span className="flex items-center space-x-1.5 text-red-300">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span>Non-GI Endangered</span>
            </span>
            <span className="flex items-center space-x-1.5 text-sky-300">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span>Non-GI Active</span>
            </span>
          </div>
          <span className="text-amber-200">Click any marker to see district artisan guild and making techniques</span>
        </div>
      </div>

      {/* Special Spotlight: Deep Dive into Bengal Jamdani Weaving (When West Bengal is active) */}
      {isWestBengal && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-100">
            <div>
              <div className="inline-flex items-center space-x-2 text-amber-700 font-bold text-xs uppercase tracking-widest">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Special Focus • UNESCO Intangible Cultural Heritage</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-black text-stone-900 mt-1">
                Bengal Jamdani Weaving: 700 Years of Sheer Muslin Alchemy
              </h3>
            </div>

            <button
              onClick={() => {
                const marker = stateData?.craftMarkers?.[0];
                const jamdani = getFullCraftData(marker || {
                  id: 'bengal-jamdani-weaving',
                  craftName: 'Bengal Jamdani Weaving',
                  nativeName: 'বাংলার ঐতিহ্যবাহী জামদানি বয়ন',
                  district: 'Nadia (Phulia & Shantipur) / Bardhaman (Kalna)',
                  category: 'Handloom & Muslin Weaving',
                  GI_tagged: true,
                  giTagged: true
                });
                if (onSelectCraft) {
                  onSelectCraft(jamdani);
                }
              }}
              className="bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center space-x-1.5 shadow-md shadow-amber-700/20 cursor-pointer"
            >
              <span>Explore Full Jamdani Saree Archive</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 1. History & Centers */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 space-y-4 text-xs text-stone-700 leading-relaxed">
              <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 space-y-2">
                <h4 className="font-serif font-bold text-amber-950 text-sm flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-amber-700" />
                  <span>Documented History & Mughal Patronage</span>
                </h4>
                <p>
                  Jamdani weaving from the Bengal delta has a documented history of at least <strong>700 years</strong>, combining traditional Bengal weaving with 14th-century muslin techniques. It reached its peak of royal patronage under <strong>Mughal Emperor Jahangir (1605–1627)</strong>, who adorned himself with intricate floral Jamdani swatches.
                </p>
                <p>
                  After the 1947 Partition of India, master weavers migrated from East Bengal (Dhaka region) to <strong>West Bengal</strong>, settling along the Hooghly river in <strong>Phulia and Shantipur (Nadia district)</strong> and <strong>Kalna (Purba Bardhaman district)</strong>, preserving this living wonder on Indian soil.
                </p>
              </div>

              {/* Regional Variants */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                  <span className="font-bold text-stone-900 block text-xs">Shantipur Jamdani</span>
                  <p className="text-[11px] text-stone-600 mt-1">
                    Closely resembles original Tangail styles, renowned for its gossamer fine texture and delicate striped motifs.
                  </p>
                </div>
                <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                  <span className="font-bold text-stone-900 block text-xs">Dhaniakhali Jamdani</span>
                  <p className="text-[11px] text-stone-600 mt-1">
                    Features a tighter structural weave, rich bold colors, and signature dark contrasting border bands.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. The "Engineering" — How It's Made */}
            <div className="lg:col-span-5 bg-gradient-to-br from-stone-900 to-amber-950 text-white p-5 rounded-2xl space-y-3 shadow-xl">
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">
                The Engineering • 5 Technical Marvels
              </span>

              <div className="space-y-2.5 text-xs text-stone-200">
                <div className="flex items-start space-x-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                  <div>
                    <strong className="text-amber-200">Base Fabric:</strong> Fine unbleached cotton warped on pit looms to form a sheer, transparent background.
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                  <div>
                    <strong className="text-amber-200">Discontinuous Weft:</strong> Supplementary design thread inserted only where a motif appears and then cut off, leaving the base transparent.
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                  <div>
                    <strong className="text-amber-200">Hand Tool (Kandul):</strong> Weavers use a horn tool called a <em>kandul</em> to individually lift specific warp threads without stencils or machinery.
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                  <div>
                    <strong className="text-amber-200">Motif Building:</strong> Design and cloth are built simultaneously by hand and eye, making every piece unique.
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">5</span>
                  <div>
                    <strong className="text-amber-200">Time Investment:</strong> Requires from <strong>3 months to nearly 1 year</strong> of continuous master craftsmanship per saree.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
