import React, { useState, useEffect } from 'react';
import {
  Award,
  MapPin,
  Clock,
  Layers,
  Store,
  ExternalLink,
  Volume2,
  Play,
  ShieldCheck,
  Phone,
  Mail,
  Navigation,
  Sparkles,
  ArrowLeft,
  Calendar,
  CheckCircle,
  Share2,
  Box,
  Video,
  Info
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Craft3DViewer from '../components/ThreeD/Craft3DViewer';
import { getCraftById } from '../services/api';

export default function CraftDetailPage({ craftId, onBack, onSelectCraft }) {
  const { t } = useTranslation();
  const [craft, setCraft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'technique' | '3d' | 'sellers' | 'video'

  useEffect(() => {
    window.scrollTo(0, 0);
    async function loadData() {
      setLoading(true);
      try {
        const res = await getCraftById(craftId);
        if (res.data) setCraft(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (craftId) loadData();
  }, [craftId]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-stone-600 font-medium text-sm">Retrieving cultural archive records...</p>
      </div>
    );
  }

  if (!craft) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-stone-800">Craft Record Not Found</h2>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-amber-600 text-white rounded-xl font-medium"
        >
          Return to Map Explorer
        </button>
      </div>
    );
  }

  const playAudioStory = () => {
    setIsPlayingAudio(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToSpeak = `${craft.name}. ${craft.audioStory || craft.culturalSignificance}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.9;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlayingAudio(false), 3000);
    }
  };

  const tabs = [
    { id: 'overview', label: 'History & Culture', icon: Info },
    { id: 'technique', label: 'Making Process', icon: Layers },
    { id: '3d', label: '3D Model Viewer', icon: Box },
    { id: 'sellers', label: 'Verified Sellers & Stores', icon: Store },
    { id: 'video', label: 'Video Masterclass', icon: Video }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Top Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-sm font-semibold text-stone-600 hover:text-amber-700 transition-colors bg-white px-4 py-2 rounded-xl shadow-sm border border-stone-200 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Map Explorer</span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={playAudioStory}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer ${
              isPlayingAudio
                ? 'bg-amber-600 text-white animate-pulse'
                : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
            }`}
          >
            <Volume2 className="w-4 h-4 text-amber-600" />
            <span>{isPlayingAudio ? 'Playing Oral Tradition...' : t('craftDetail.audioStory')}</span>
          </button>
        </div>
      </div>

      {/* Hero Header Section */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-stone-950 text-white border border-stone-800">
        <div className="absolute inset-0">
          <img
            src={craft.thumbnailUrl}
            alt={craft.name}
            className="w-full h-full object-cover opacity-35 filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent"></div>
        </div>

        <div className="relative z-10 p-6 sm:p-10 lg:p-12 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-amber-600/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {craft.state}
            </span>
            <span className="bg-stone-800/80 backdrop-blur-md text-amber-300 text-xs font-semibold px-3 py-1 rounded-full border border-amber-500/30">
              {craft.category}
            </span>
            {craft.giTagged && (
              <span className="bg-amber-500 text-stone-950 text-xs font-black px-3 py-1 rounded-full flex items-center space-x-1.5 shadow-lg">
                <Award className="w-3.5 h-3.5" />
                <span>GI Tagged ({craft.giYear})</span>
              </span>
            )}
            <span className="bg-emerald-900/80 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-500/30">
              Status: {craft.preservationStatus}
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight">
              {craft.name}
            </h1>
            {craft.nativeName && (
              <p className="text-xl sm:text-2xl text-amber-400 font-medium font-serif">
                {craft.nativeName}
              </p>
            )}
          </div>

          <p className="text-sm sm:text-base text-stone-300 max-w-3xl leading-relaxed">
            {craft.tagline || craft.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-stone-800/80 text-xs text-stone-400">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>{craft.region}</span>
            </div>
            {craft.era && (
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-amber-500" />
                <span>{craft.era}</span>
              </div>
            )}
            {craft.artisanGroup && (
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span>{craft.artisanGroup}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 p-1.5 bg-white rounded-2xl shadow-sm border border-stone-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Section */}
      <div className="space-y-8">
        {/* 1. OVERVIEW & HISTORY TAB */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-200 space-y-4">
                <h3 className="text-xl font-bold text-stone-900 font-serif border-b border-stone-100 pb-3">
                  Historical Lineage & Evolution
                </h3>
                <p className="text-stone-700 leading-relaxed text-sm sm:text-base">
                  {craft.history || craft.description}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-200 space-y-4">
                <h3 className="text-xl font-bold text-stone-900 font-serif border-b border-stone-100 pb-3">
                  Cultural & Anthropological Significance
                </h3>
                <p className="text-stone-700 leading-relaxed text-sm sm:text-base">
                  {craft.culturalSignificance || craft.description}
                </p>
              </div>
            </div>

            {/* Sidebar: Raw Materials & GI Specs */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200/60 shadow-sm space-y-4">
                <h4 className="text-base font-bold text-amber-900 flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-amber-700" />
                  <span>Key Raw Materials</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(craft.materials || []).map((mat, i) => (
                    <span
                      key={i}
                      className="bg-white text-stone-800 text-xs font-semibold px-3 py-1.5 rounded-lg border border-amber-200 shadow-2xs"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              {craft.images && craft.images.length > 0 && (
                <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm space-y-3">
                  <h4 className="text-xs font-bold uppercase text-stone-500 tracking-wider">
                    Visual Archive
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {craft.images.slice(0, 4).map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`${craft.name} ${idx}`}
                        className="w-full h-24 object-cover rounded-lg hover:opacity-90 transition-opacity"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. MAKING PROCESS & TECHNIQUE TAB */}
        {activeTab === 'technique' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-200 space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-stone-900 font-serif">
                Master Craft Technique & Making Process
              </h3>
              <p className="text-sm text-stone-600 mt-1">
                {craft.technique}
              </p>
            </div>

            <div className="space-y-6 pt-4 border-t border-stone-100">
              {(craft.makingProcess || []).map((step) => (
                <div key={step.step} className="flex items-start space-x-4 sm:space-x-6 group">
                  <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white font-bold flex items-center justify-center text-sm shadow-md shadow-amber-600/30 shrink-0">
                    {step.step}
                  </div>
                  <div className="flex-1 bg-stone-50 group-hover:bg-amber-50/40 rounded-2xl p-5 border border-stone-200 group-hover:border-amber-300 transition-all">
                    <h4 className="text-base font-bold text-stone-900 mb-1">
                      {step.title}
                    </h4>
                    <p className="text-stone-700 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. INTERACTIVE 3D CRAFT MODEL TAB */}
        {activeTab === '3d' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-stone-900 font-serif">
                  Interactive 3D Craft Model Inspector
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  Inspect the physical curves, glazes, and textures rendered in real-time with WebGL Three.js.
                </p>
              </div>
              <span className="text-xs bg-amber-100 text-amber-900 px-3 py-1 rounded-full font-bold">
                Model: {craft.model3DType || 'pottery'}
              </span>
            </div>

            <Craft3DViewer
              initialModel={craft.model3DType || 'pottery'}
              height="580px"
              showSelector={true}
            />
          </div>
        )}

        {/* 4. VERIFIED OFFLINE SELLERS & ONLINE STORES TAB */}
        {activeTab === 'sellers' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-2xl font-bold text-stone-900 font-serif">
                Verified Master Studios, Artisans & Online Portals
              </h3>
              <p className="text-sm text-stone-600 mt-1">
                Every artisan studio listed here is cross-verified against official Government Pehchan artisan databases, GI registries, or certified NGO cooperatives.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(craft.sellers || []).map((seller) => (
                <div
                  key={seller.id}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200 hover:border-amber-500/50 hover:shadow-md transition-all space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-lg font-bold text-stone-900">
                          {seller.name}
                        </h4>
                        {seller.verified && (
                          <ShieldCheck className="w-5 h-5 text-emerald-600" />
                        )}
                      </div>
                      <p className="text-xs font-medium text-amber-700">
                        {seller.artisanName}
                      </p>
                    </div>
                    {seller.badge && (
                      <span className="text-[11px] bg-amber-50 text-amber-900 border border-amber-300 font-bold px-2.5 py-1 rounded-full">
                        {seller.badge}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 text-xs text-stone-600 pt-2 border-t border-stone-100">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>{seller.address}</span>
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
                    {seller.workshopVisits && (
                      <div className="flex items-start space-x-2 text-emerald-800 bg-emerald-50 p-2.5 rounded-xl">
                        <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Visits:</strong> {seller.workshopVisits}</span>
                      </div>
                    )}
                  </div>

                  {seller.onlineStoreUrl && (
                    <div className="pt-2">
                      <a
                        href={seller.onlineStoreUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center space-x-2 shadow-md shadow-amber-600/20 transition-all"
                      >
                        <Store className="w-4 h-4" />
                        <span>Visit Verified Online Store / Orders</span>
                        <ExternalLink className="w-3.5 h-3.5 ml-1" />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. VIDEO MASTERCLASS & TUTORIAL TAB */}
        {activeTab === 'video' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-200 space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-stone-900 font-serif">
                Multimedia Tutorial & Artisan Masterclass
              </h3>
              <p className="text-sm text-stone-600 mt-1">
                Documentary footage and master tutorials capturing the generational wisdom behind {craft.name}.
              </p>
            </div>

            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg bg-stone-950 border border-stone-800">
              <iframe
                src={craft.videoUrl || 'https://www.youtube.com/embed/g2J03fK08Q0'}
                title={`${craft.name} Tutorial`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>

      {/* AI Cultural Connections / Related Crafts Section */}
      {craft.relatedCrafts && craft.relatedCrafts.length > 0 && (
        <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-800 space-y-6 mt-12">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-xl font-bold text-white font-serif">
                AI Cultural Connections
              </h3>
              <p className="text-xs text-stone-400">
                Sister traditional crafts sharing related raw materials, techniques, or regional affinities.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {craft.relatedCrafts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectCraft && onSelectCraft(rel)}
                className="bg-stone-950/90 rounded-2xl p-4 border border-stone-800 hover:border-amber-500/60 transition-all cursor-pointer group space-y-3"
              >
                <div className="h-32 rounded-xl overflow-hidden bg-stone-900 relative">
                  <img
                    src={rel.thumbnailUrl}
                    alt={rel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-2 left-2 bg-stone-950/80 text-[10px] text-white font-medium px-2 py-0.5 rounded">
                    {rel.state}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-white group-hover:text-amber-400 truncate">
                    {rel.name}
                  </h4>
                  <p className="text-xs text-amber-300 font-medium">
                    {rel.sharedReason}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
