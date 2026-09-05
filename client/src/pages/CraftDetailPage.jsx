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
  Info,
  Star,
  ShoppingBag,
  RotateCcw,
  BookOpen,
  AlertTriangle,
  MessageSquare,
  X
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Craft3DViewer from '../components/ThreeD/Craft3DViewer';
import CraftInsightsModal from '../components/CraftInsightsModal';
import ProvenanceCertificateModal from '../components/ProvenanceCertificateModal';
import ARViewModal from '../components/ARViewModal';
import { getCraftById, createOrder, submitReview } from '../services/api';
import confetti from 'canvas-confetti';

export default function CraftDetailPage({ craftId, onBack, onSelectCraft, onNavigateToOrders }) {
  const { t } = useTranslation();
  const [craft, setCraft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'technique' | '3d' | 'sellers' | 'reviews' | 'video'
  const [showInsightsModal, setShowInsightsModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showARModal, setShowARModal] = useState(false);
  
  // Direct Buy / Order Modal State
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [buyerName, setBuyerName] = useState('Chayan Sharma');
  const [buyerEmail, setBuyerEmail] = useState('chayan@example.com');
  const [buyerPhone, setBuyerPhone] = useState('+91 98765 43210');
  const [shippingAddress, setShippingAddress] = useState('Flat 402, Heritage Residency, Indiranagar, Bengaluru - 560038');
  const [ordering, setOrdering] = useState(false);

  // Review Form State
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getCraftById(craftId);
      if (res.data) setCraft(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
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
          className="px-4 py-2 bg-amber-600 text-white rounded-xl font-medium cursor-pointer"
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

  // Handle Buy / Place Order
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setOrdering(true);
    try {
      const itemPrice = craft.priceEstimate || 2450;
      const totalAmount = itemPrice * orderQuantity;

      const res = await createOrder({
        craftId: craft.id,
        craftName: craft.name,
        craftImage: craft.thumbnailUrl,
        artisanId: craft.sellers?.[0]?.id || 's-1',
        artisanName: craft.sellers?.[0]?.name || `${craft.state} Master Artisan Guild`,
        amount: totalAmount,
        quantity: orderQuantity,
        buyerName,
        buyerEmail,
        buyerPhone,
        shippingAddress
      });

      if (res.success) {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
        setShowOrderModal(false);
        if (onNavigateToOrders) {
          onNavigateToOrders();
        } else {
          alert(`Order Placed! India Post Tracking ID: ${res.data.trackingId}`);
        }
      }
    } catch (err) {
      alert('Error creating order');
    } finally {
      setOrdering(false);
    }
  };

  // Handle Review Submission
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReviewComment.trim()) return;

    setReviewSubmitting(true);
    try {
      const res = await submitReview({
        craftId: craft.id,
        sellerId: craft.sellers?.[0]?.id,
        buyerName: newReviewAuthor || 'Art Patron',
        rating: newReviewRating,
        comment: newReviewComment
      });

      if (res.success) {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
        setReviewSuccess(true);
        loadData();
        setTimeout(() => {
          setReviewSuccess(false);
          setNewReviewComment('');
          setNewReviewAuthor('');
        }, 2500);
      }
    } catch (err) {
      alert('Error submitting review');
    } finally {
      setReviewSubmitting(false);
    }
  };

  const isGI = craft.GI_tagged || craft.giTagged;
  const isEndangered = craft.status === 'endangered';

  const tabs = [
    { id: 'overview', label: 'History & Culture', icon: Info },
    { id: 'technique', label: 'Making Process', icon: Layers },
    { id: '3d', label: '3D Model Viewer', icon: Box },
    { id: 'sellers', label: 'Verified Sellers & Stores', icon: Store },
    { id: 'reviews', label: `Patron Reviews (${craft.reviewCount || craft.reviews?.length || 0})`, icon: Star },
    { id: 'video', label: 'Video Masterclass', icon: Video }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-sm font-semibold text-stone-600 hover:text-amber-700 transition-colors bg-white px-4 py-2.5 rounded-xl shadow-sm border border-stone-200 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sovereign Map</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {/* AI Know More Insights Button */}
          <button
            onClick={() => setShowInsightsModal(true)}
            className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold shadow-md bg-gradient-to-r from-purple-800 to-indigo-800 hover:from-purple-900 hover:to-indigo-900 text-white transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
            <span>✨ AI Insights</span>
          </button>

          {/* AR View in Room Button */}
          <button
            onClick={() => setShowARModal(true)}
            className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-stone-900 hover:bg-black text-amber-300 border border-stone-800 transition-all cursor-pointer shadow-md"
          >
            <Box className="w-3.5 h-3.5" />
            <span>View in AR</span>
          </button>

          {/* Certificate of Authenticity Button */}
          <button
            onClick={() => setShowCertificateModal(true)}
            className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 transition-all cursor-pointer shadow-sm"
          >
            <Award className="w-3.5 h-3.5 text-amber-700" />
            <span>Provenance Certificate</span>
          </button>

          {/* Voice Folk Story Player */}
          <button
            onClick={playAudioStory}
            className={`flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer ${
              isPlayingAudio
                ? 'bg-amber-600 text-white animate-pulse'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5 text-amber-600" />
            <span>{isPlayingAudio ? 'Oral Story...' : 'Folk Story'}</span>
          </button>

          {/* Buy Direct Button */}
          <button
            onClick={() => setShowOrderModal(true)}
            className="flex items-center space-x-2 px-4.5 py-2.5 rounded-xl text-xs font-bold shadow-lg bg-gradient-to-r from-amber-700 via-orange-600 to-amber-600 hover:from-amber-800 hover:to-orange-700 text-white transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Buy Authentic (₹{craft.priceEstimate?.toLocaleString('en-IN') || '2,450'})</span>
          </button>
        </div>
      </div>

      {/* Hero Showcase Card */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200 grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Visual Banner (5 Cols) */}
        <div className="lg:col-span-5 relative h-80 lg:h-auto min-h-[380px] bg-stone-900">
          <img
            src={craft.thumbnailUrl}
            alt={craft.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>

          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-stone-900/90 text-amber-300 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md">
                📍 {craft.state} ({craft.region || 'India'})
              </span>
              <span className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-md">
                {craft.category}
              </span>
            </div>

            <h1 className="text-3xl font-serif font-black">{craft.name}</h1>
            {craft.nativeName && (
              <p className="text-amber-300 text-sm font-semibold">{craft.nativeName}</p>
            )}
          </div>
        </div>

        {/* Right Information Details (7 Cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* GI Status Badge & Verification Source */}
            <div className="flex flex-wrap items-center gap-2">
              {isGI ? (
                <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-2">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>Geographical Indication (GI Tagged • Certified {craft.giYear || 'Official'})</span>
                </div>
              ) : isEndangered ? (
                <div className="bg-red-50 border border-red-300 text-red-900 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>Non-GI Endangered Traditional Heritage</span>
                </div>
              ) : (
                <div className="bg-blue-50 border border-blue-300 text-blue-900 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Non-GI Researched & Verified Heritage</span>
                </div>
              )}

              {/* Aggregated Rating Badge */}
              <div className="bg-amber-50 border border-amber-200 text-amber-900 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>{craft.rating || 4.9} ({craft.reviewCount || craft.reviews?.length || 12} reviews)</span>
              </div>
            </div>

            {/* Non-GI Verification Source Notice */}
            {!isGI && craft.verification_source && (
              <div className="bg-sky-50 border border-sky-200 rounded-2xl p-3.5 text-xs text-sky-950 flex items-start space-x-2.5 shadow-sm">
                <BookOpen className="w-4 h-4 text-sky-700 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-sky-900">Documented & Verified By: </span>
                  <span className="font-medium text-sky-800">{craft.verification_source}</span>
                </div>
              </div>
            )}

            <p className="text-stone-700 text-sm leading-relaxed">
              {craft.description}
            </p>

            {/* Material & Technique Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="bg-stone-50 rounded-xl p-3 border border-stone-200">
                <span className="text-[11px] font-bold text-stone-500 uppercase block mb-1">Authentic Materials</span>
                <p className="text-xs font-semibold text-stone-800">
                  {craft.materials && craft.materials.length > 0 ? craft.materials.join(', ') : 'Natural Traditional Ingredients'}
                </p>
              </div>

              <div className="bg-stone-50 rounded-xl p-3 border border-stone-200">
                <span className="text-[11px] font-bold text-stone-500 uppercase block mb-1">Craft Alchemy / Technique</span>
                <p className="text-xs font-semibold text-stone-800">
                  {craft.technique || 'Generational manual craftsmanship'}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Commerce & Direct Artisan Contact Bar */}
          <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600">
            <div>
              <span className="font-bold text-stone-900">Artisan Guild / Contact: </span>
              <span>{craft.sellerContact || craft.artisanGroup || 'All India Master Artisan Network'}</span>
            </div>

            {craft.onlineStoreLink && (
              <a
                href={craft.onlineStoreLink}
                target="_blank"
                rel="noreferrer"
                className="text-amber-700 hover:text-amber-900 font-bold flex items-center space-x-1"
              >
                <span>Visit Online Guild Store</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Tabs Menu */}
      <div className="flex border-b border-stone-200 overflow-x-auto no-scrollbar space-x-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-3.5 px-4 font-bold text-xs border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'border-amber-700 text-amber-800 bg-amber-50/50 rounded-t-xl'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview & History */}
      {activeTab === 'overview' && (
        <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm space-y-6">
          <div className="space-y-3">
            <h3 className="text-xl font-serif font-bold text-stone-900 flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-amber-700" />
              <span>Historical Lineage & Evolution</span>
            </h3>
            <p className="text-stone-700 text-sm leading-relaxed">
              {craft.history || 'This craft has flourished for centuries under indigenous community guardianship, passing through guru-shishya lineages and village guilds.'}
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-stone-100">
            <h3 className="text-xl font-serif font-bold text-stone-900 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-700" />
              <span>Cultural Significance & Ritual Lore</span>
            </h3>
            <p className="text-stone-700 text-sm leading-relaxed">
              {craft.culturalSignificance || 'Traditional items play central roles in regional festivals, sacred rites, and domestic ceremonies, celebrating the living bond between ecology and craft.'}
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Making Process */}
      {activeTab === 'technique' && (
        <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm space-y-6">
          <h3 className="text-xl font-serif font-bold text-stone-900 flex items-center space-x-2">
            <Layers className="w-5 h-5 text-amber-700" />
            <span>Master Artisan Step-by-Step Technique</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {craft.makingProcess && craft.makingProcess.length > 0 ? (
              craft.makingProcess.map((step) => (
                <div key={step.step} className="bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-2">
                  <div className="flex items-center space-x-3">
                    <span className="w-7 h-7 rounded-full bg-amber-700 text-white font-bold text-xs flex items-center justify-center">
                      {step.step}
                    </span>
                    <h4 className="font-bold text-stone-900 text-sm">{step.title}</h4>
                  </div>
                  <p className="text-stone-600 text-xs leading-relaxed pl-10">
                    {step.description}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-stone-500 text-xs">Technique steps being archived by the master artisan guild.</p>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: 3D Model Studio */}
      {activeTab === '3d' && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-serif font-bold text-stone-900 flex items-center space-x-2">
              <Box className="w-5 h-5 text-amber-700" />
              <span>Interactive 3D Craft Studio</span>
            </h3>
            <span className="text-xs text-stone-500">WebGL GPU Acceleration</span>
          </div>

          <Craft3DViewer modelType={craft.model3DType || 'pottery'} craftName={craft.name} />
        </div>
      )}

      {/* Tab 4: Verified Sellers & Studios */}
      {activeTab === 'sellers' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-serif font-bold text-stone-900 flex items-center space-x-2">
              <Store className="w-5 h-5 text-amber-700" />
              <span>Verified Artisan Studios & Cooperatives</span>
            </h3>
            <span className="text-xs text-stone-500">100% Direct Fair-Trade</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {craft.sellers && craft.sellers.length > 0 ? (
              craft.sellers.map((seller) => (
                <div key={seller.id} className="bg-white rounded-2xl p-6 border border-stone-200 shadow-md space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-stone-900 text-base">{seller.name}</h4>
                      {seller.artisanName && (
                        <p className="text-xs text-stone-500">Lead Master Craftsman: <span className="font-semibold text-stone-800">{seller.artisanName}</span></p>
                      )}
                    </div>
                    {seller.verified && (
                      <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-200 flex items-center space-x-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>Verified</span>
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5 text-xs text-stone-600">
                    <p className="flex items-center space-x-2">
                      <MapPin className="w-3.5 h-3.5 text-amber-700" />
                      <span>{seller.address || seller.location}</span>
                    </p>
                    {seller.phone && (
                      <p className="flex items-center space-x-2">
                        <Phone className="w-3.5 h-3.5 text-amber-700" />
                        <span>{seller.phone}</span>
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setShowOrderModal(true)}
                        className="bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs py-2 px-4 rounded-xl transition-all cursor-pointer shadow-sm"
                      >
                        Buy Direct from Studio
                      </button>

                      <a
                        href={`https://wa.me/${(seller.phone || '919829012345').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Namaste! Inquiring about ${craft.name} on KalaSetu.`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 px-3 rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer shadow-sm"
                        title="Chat with Artisan on WhatsApp"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>

                    {seller.onlineStoreUrl && (
                      <a
                        href={seller.onlineStoreUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-stone-700 hover:text-amber-800 font-bold text-xs flex items-center space-x-1"
                      >
                        <span>Visit Website</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 bg-white rounded-2xl p-8 text-center text-stone-500 text-xs">
                Verified artisan studios directory updating. Contact the regional craft council for direct orders.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 5: Patron Ratings & Reviews */}
      {activeTab === 'reviews' && (
        <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-100">
            <div>
              <h3 className="text-xl font-serif font-bold text-stone-900 flex items-center space-x-2">
                <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                <span>Patron Authenticity Reviews & Ratings</span>
              </h3>
              <p className="text-xs text-stone-500">Direct feedback from verified art collectors across the globe.</p>
            </div>

            <div className="flex items-center space-x-3 bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-2xl">
              <div className="text-3xl font-black text-amber-900">{craft.rating || 4.9}</div>
              <div className="text-xs">
                <div className="flex items-center text-amber-500">
                  {'★★★★★'}
                </div>
                <span className="text-stone-500 font-medium">Based on {craft.reviewCount || craft.reviews?.length || 12} reviews</span>
              </div>
            </div>
          </div>

          {/* Write a Review Form */}
          <form onSubmit={handleReviewSubmit} className="bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-4">
            <h4 className="font-bold text-stone-900 text-sm flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-amber-700" />
              <span>Leave a Verified Patron Review</span>
            </h4>

            {reviewSuccess ? (
              <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-200 text-xs font-bold">
                Thank you! Your review has been added and aggregated into the craft's authentic rating score.
              </div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Sen"
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-800 focus:ring-2 focus:ring-amber-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Star Rating</label>
                    <div className="flex items-center space-x-1.5 pt-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setNewReviewRating(s)}
                          className="cursor-pointer"
                        >
                          <Star className={`w-5 h-5 ${s <= newReviewRating ? 'fill-amber-400 text-amber-500' : 'text-stone-300'}`} />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-stone-700 ml-2">{newReviewRating} Stars</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Your Review</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe the craft's texture, artistic depth, and authenticity..."
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    className="w-full p-3 bg-white border border-stone-300 rounded-xl text-xs text-stone-800 focus:ring-2 focus:ring-amber-700"
                  />
                </div>

                <button
                  type="submit"
                  disabled={reviewSubmitting || !newReviewComment.trim()}
                  className="bg-amber-700 hover:bg-amber-800 disabled:opacity-50 text-white font-bold text-xs py-2.5 px-5 rounded-xl transition-all cursor-pointer shadow-md shadow-amber-700/20"
                >
                  {reviewSubmitting ? 'Publishing...' : 'Publish Patron Review'}
                </button>
              </div>
            )}
          </form>

          {/* Reviews List */}
          <div className="space-y-3">
            {craft.reviews && craft.reviews.length > 0 ? (
              craft.reviews.map((rev, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-4.5 border border-stone-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-stone-900 text-xs">{rev.buyerName}</span>
                      {rev.verifiedPurchase && (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.2 rounded-full">
                          Verified Art Patron
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-amber-500 text-xs">
                      {'★'.repeat(rev.rating)}
                    </div>
                  </div>
                  <p className="text-stone-600 text-xs leading-relaxed">{rev.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-stone-400 text-xs text-center py-4">Be the first art patron to review this craft!</p>
            )}
          </div>
        </div>
      )}

      {/* Tab 6: Video Masterclass */}
      {activeTab === 'video' && (
        <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm space-y-4">
          <h3 className="text-xl font-serif font-bold text-stone-900 flex items-center space-x-2">
            <Video className="w-5 h-5 text-amber-700" />
            <span>Living Technique Video Documentary</span>
          </h3>

          <div className="aspect-video w-full max-w-4xl mx-auto rounded-2xl overflow-hidden bg-black shadow-xl">
            <iframe
              src={craft.videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ'}
              title={`${craft.name} Masterclass`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* AI Insights Modal */}
      {showInsightsModal && (
        <CraftInsightsModal
          craft={craft}
          onClose={() => setShowInsightsModal(false)}
        />
      )}

      {/* Provenance Authenticity Certificate Modal */}
      {showCertificateModal && (
        <ProvenanceCertificateModal
          craft={craft}
          onClose={() => setShowCertificateModal(false)}
        />
      )}

      {/* 1:1 Scale AR Preview Modal */}
      {showARModal && (
        <ARViewModal
          craft={craft}
          onClose={() => setShowARModal(false)}
        />
      )}

      {/* Direct Buy / Checkout Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 border border-stone-200 shadow-2xl relative">
            <button
              onClick={() => setShowOrderModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start space-x-3">
              <img
                src={craft.thumbnailUrl}
                alt={craft.name}
                className="w-16 h-16 rounded-xl object-cover border border-stone-200 bg-stone-100"
              />
              <div>
                <span className="text-[10px] font-bold text-amber-700 uppercase">Direct Artisan Purchase</span>
                <h3 className="text-lg font-bold text-stone-900 leading-snug">{craft.name}</h3>
                <p className="text-xs text-stone-500">{craft.state} Master Artisan Guild</p>
              </div>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={orderQuantity}
                    onChange={(e) => setOrderQuantity(Number(e.target.value))}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Shipping Address (India Post Delivery)</label>
                <textarea
                  rows={2}
                  required
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-800"
                />
              </div>

              {/* Price & India Post Guarantee Note */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-3.5 space-y-1 text-xs">
                <div className="flex items-center justify-between font-bold text-stone-900">
                  <span>Total Amount:</span>
                  <span className="text-base text-amber-800">
                    ₹{((craft.priceEstimate || 2450) * orderQuantity).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-emerald-800 text-[11px] font-semibold pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Free India Post Speed Post Shipping • 10-Day Return Guarantee</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={ordering}
                className="w-full bg-gradient-to-r from-amber-700 via-orange-600 to-amber-600 hover:from-amber-800 hover:to-orange-700 text-white font-bold text-xs py-3.5 rounded-xl shadow-lg shadow-amber-700/30 transition-all cursor-pointer disabled:opacity-50"
              >
                {ordering ? 'Registering Consignment with India Post...' : 'Confirm Order & Generate Speed Post Tracking'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
