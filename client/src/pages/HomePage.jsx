import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Award,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Feather,
  Compass,
  Box,
  Layers,
  BookOpen,
  Users,
  CheckCircle2
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import IndiaCraftMap from '../components/Map/IndiaCraftMap';
import CraftFilterBar from '../components/Map/CraftFilterBar';
import Craft3DViewer from '../components/ThreeD/Craft3DViewer';
import AIRecommender from '../components/AIRecommender';
import { getCrafts, getFilterMeta } from '../services/api';

export default function HomePage({ onSelectCraft, onNavigate }) {
  const { t } = useTranslation();
  const [crafts, setCrafts] = useState([]);
  const [filterMeta, setFilterMeta] = useState({ states: [], categories: [], materials: [] });
  const [loading, setLoading] = useState(true);

  // Filter state
  const [selectedState, setSelectedState] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [giOnly, setGiOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [targetRegion, setTargetRegion] = useState('all');

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [craftsRes, metaRes] = await Promise.all([
        getCrafts({}),
        getFilterMeta()
      ]);
      if (craftsRes.data) setCrafts(craftsRes.data);
      if (metaRes.data) setFilterMeta(metaRes.data);
    } catch (err) {
      console.error('Failed to load initial data:', err);
    } finally {
      setLoading(false);
    }
  }

  // Filter logic
  const filteredCrafts = crafts.filter(c => {
    if (selectedState !== 'All' && c.state.toLowerCase() !== selectedState.toLowerCase()) return false;
    if (selectedCategory !== 'All' && c.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
    if (giOnly && !c.giTagged) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      const match = c.name.toLowerCase().includes(q) ||
        (c.nativeName && c.nativeName.toLowerCase().includes(q)) ||
        c.state.toLowerCase().includes(q) ||
        c.region.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        (c.materials && c.materials.some(m => m.toLowerCase().includes(q))) ||
        (c.tags && c.tags.some(t => t.toLowerCase().includes(q)));
      if (!match) return false;
    }
    return true;
  });

  const handleResetFilters = () => {
    setSelectedState('All');
    setSelectedCategory('All');
    setGiOnly(false);
    setSearchTerm('');
    setTargetRegion('all');
  };

  return (
    <div className="space-y-16 pb-12">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8 border-b border-amber-900/30">
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="relative max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center space-x-2 bg-amber-500/15 border border-amber-500/30 px-4 py-1.5 rounded-full text-xs font-bold text-amber-300 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('hero.tagline')}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black font-serif tracking-tight leading-tight text-stone-100">
            {t('hero.title')}
          </h1>

          <p className="text-base sm:text-lg text-stone-300 max-w-3xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#map-section"
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold px-7 py-3.5 rounded-2xl shadow-xl shadow-amber-600/30 flex items-center space-x-2 transition-all transform hover:-translate-y-0.5"
            >
              <Compass className="w-5 h-5" />
              <span>{t('hero.exploreMap')}</span>
            </a>

            <button
              onClick={() => onNavigate('archive')}
              className="bg-stone-800/90 hover:bg-stone-750 text-stone-200 hover:text-white font-semibold px-6 py-3.5 rounded-2xl border border-stone-700 backdrop-blur-md flex items-center space-x-2 transition-all cursor-pointer"
            >
              <BookOpen className="w-5 h-5 text-amber-400" />
              <span>{t('hero.viewArchive')}</span>
            </button>

            <button
              onClick={() => onNavigate('seller-portal')}
              className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold px-6 py-3.5 rounded-2xl border border-amber-500/40 backdrop-blur-md flex items-center space-x-2 transition-all cursor-pointer"
            >
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <span>{t('hero.registerArtisan')}</span>
            </button>
          </div>
        </div>

        {/* Heritage Stats Banner */}
        <div className="max-w-6xl mx-auto mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
          {[
            { label: 'Living Traditional Crafts', value: '16+', icon: Feather },
            { label: 'GI Tagged Heritage', value: '100%', icon: Award },
            { label: 'Indian States Mapped', value: '14+', icon: MapPin },
            { label: 'Verified Guilds & Masters', value: '4,000+', icon: Users }
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="bg-stone-900/60 backdrop-blur-md border border-stone-800 rounded-2xl p-5 text-center space-y-1"
              >
                <Icon className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                <div className="text-2xl sm:text-3xl font-black text-white font-serif">
                  {stat.value}
                </div>
                <div className="text-xs text-stone-400 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. INTERACTIVE INDIA MAP SECTION */}
      <section id="map-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center space-x-2 text-amber-700 font-bold text-xs uppercase tracking-widest">
            <Compass className="w-4 h-4" />
            <span>Geographic Heritage Atlas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-serif text-stone-900">
            {t('map.title')}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {t('map.subtitle')}
          </p>
        </div>

        {/* Filter Controls Bar */}
        <CraftFilterBar
          states={filterMeta.states}
          categories={filterMeta.categories}
          selectedState={selectedState}
          selectedCategory={selectedCategory}
          giOnly={giOnly}
          searchTerm={searchTerm}
          onStateChange={setSelectedState}
          onCategoryChange={setSelectedCategory}
          onGIChange={setGiOnly}
          onSearchChange={setSearchTerm}
          onReset={handleResetFilters}
          totalMatching={filteredCrafts.length}
        />

        {/* Leaflet Map */}
        <IndiaCraftMap
          crafts={filteredCrafts}
          onSelectCraft={onSelectCraft}
          targetRegion={targetRegion}
          onRegionChange={setTargetRegion}
        />
      </section>

      {/* 3. THREE.JS 3D CRAFT INSPECTOR SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-amber-700 font-bold text-xs uppercase tracking-widest">
              <Box className="w-4 h-4" />
              <span>Interactive Digital Preservation</span>
            </div>
            <h2 className="text-3xl font-black font-serif text-stone-900 mt-1">
              3D Craft Model Inspector (Three.js)
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Examine traditional Indian glazes, lost-wax bronze castings, and lathe-turned woodwork in 360 degrees.
            </p>
          </div>

          <button
            onClick={() => onNavigate('3d')}
            className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center space-x-1 cursor-pointer"
          >
            <span>Open Dedicated 3D Studio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <Craft3DViewer initialModel="pottery" height="520px" showSelector={true} />
      </section>

      {/* 4. AI CULTURAL SEARCH & SEMANTIC ASSISTANT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AIRecommender onSelectCraft={onSelectCraft} />
      </section>

      {/* 5. FEATURED CRAFTS EXPLORER GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black font-serif text-stone-900">
              Iconic Geographical Indication Traditions
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Explore authentic traditional crafts officially protected under the GI Act.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {crafts.slice(0, 6).map((craft) => (
            <div
              key={craft.id}
              onClick={() => onSelectCraft(craft)}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-stone-200 hover:border-amber-500/60 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden bg-stone-100">
                  <img
                    src={craft.thumbnailUrl}
                    alt={craft.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {craft.state}
                  </div>
                  {craft.giTagged && (
                    <div className="absolute top-3 right-3 bg-amber-500 text-stone-950 text-[11px] font-black px-2.5 py-1 rounded-full flex items-center space-x-1 shadow-md">
                      <Award className="w-3.5 h-3.5" />
                      <span>GI Tagged</span>
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="px-6 space-y-2">
                  <div className="flex items-center justify-between text-xs text-amber-700 font-bold">
                    <span>{craft.category}</span>
                    {craft.giYear && <span>Est. {craft.giYear}</span>}
                  </div>

                  <h3 className="text-xl font-bold text-stone-900 group-hover:text-amber-700 font-serif leading-tight transition-colors">
                    {craft.name}
                  </h3>

                  {craft.nativeName && (
                    <p className="text-xs font-medium text-stone-500">
                      {craft.nativeName}
                    </p>
                  )}

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed pt-1">
                    {craft.tagline || craft.description}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-amber-700">
                <span>{craft.sellers?.length || 1} Verified Master Studios</span>
                <div className="flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>{t('map.seeDetails')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
