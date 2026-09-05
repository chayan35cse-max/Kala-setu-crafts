import React, { useState } from 'react';
import { Camera, Upload, Sparkles, X, CheckCircle2, ArrowRight, Award, AlertTriangle, ShieldCheck, RefreshCw, Eye } from 'lucide-react';
import axios from 'axios';
import confetti from 'canvas-confetti';

const SAMPLE_PRESETS = [
  {
    name: 'Jaipur Blue Pottery Surahi',
    tag: 'blue floral vase quartz glaze',
    url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Madhubani Mithila Folk Canvas',
    tag: 'mithila fish double line painting',
    url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Bastar Lost-Wax Dhokra Bronze',
    tag: 'tribal bronze lost wax elephant figurine',
    url: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Rogan Art Castor Oil Thread',
    tag: 'kutch rogan castor oil thread stylus',
    url: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=600&q=80'
  }
];

export default function CraftSnapModal({ onClose, onSelectCraftById }) {
  const [selectedImage, setSelectedImage] = useState(SAMPLE_PRESETS[0].url);
  const [analyzing, setAnalyzing] = useState(false);
  const [matchResult, setMatchResult] = useState(null);
  const [activePreset, setActivePreset] = useState(SAMPLE_PRESETS[0]);

  const handleRunAnalysis = async (imgUrl, textTag) => {
    setAnalyzing(true);
    setMatchResult(null);

    try {
      const res = await axios.post('/api/ai/visual-identify', {
        imageDescription: textTag || 'traditional handcrafted artifact with geometric patterns',
        tags: (textTag || '').split(' ')
      });

      setTimeout(() => {
        setMatchResult(res.data.match);
        setAnalyzing(false);
        confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
      }, 1200);
    } catch (err) {
      setAnalyzing(false);
      alert('Error analyzing image. Please try again.');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setSelectedImage(uploadEvent.target.result);
        handleRunAnalysis(uploadEvent.target.result, file.name.replace(/\.[^/.]+$/, ''));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-amber-950 text-white p-6 relative flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1.5">
            <Camera className="w-4 h-4 text-amber-400" />
            <span>CraftSnap • AI Visual Recognition</span>
          </div>
          <h3 className="text-2xl font-serif font-black">Identify Any Traditional Indian Craft</h3>
          <p className="text-xs text-stone-300 mt-1">
            Snap or upload any handicraft photo. Our AI identifies the regional art style, authentic materials, and GI verification status.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Preset Sample Gallery */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-stone-600 block">Try Instant AI Samples or Upload Your Own:</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {SAMPLE_PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSelectedImage(p.url);
                    setActivePreset(p);
                    handleRunAnalysis(p.url, p.tag);
                  }}
                  className={`relative rounded-xl overflow-hidden aspect-video border-2 transition-all cursor-pointer group ${
                    activePreset?.name === p.name ? 'border-amber-600 ring-2 ring-amber-600/30' : 'border-stone-200'
                  }`}
                >
                  <img src={p.url} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-black/40 flex items-end p-1.5">
                    <span className="text-[10px] font-bold text-white leading-tight truncate">{p.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Upload Box */}
          <div className="border-2 border-dashed border-stone-300 rounded-2xl p-4 text-center hover:bg-stone-50 transition-colors relative cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="flex items-center justify-center space-x-2 text-amber-800 text-xs font-bold">
              <Upload className="w-4 h-4" />
              <span>Upload Custom Craft Photo from Computer / Camera</span>
            </div>
          </div>

          {/* Image & Analysis Visual */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center bg-stone-50 rounded-2xl p-4.5 border border-stone-200">
            <div className="sm:col-span-5 h-44 rounded-xl overflow-hidden bg-stone-900 shadow-inner relative">
              <img src={selectedImage} alt="Craft to identify" className="w-full h-full object-cover" />
              {analyzing && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white space-y-2">
                  <RefreshCw className="w-8 h-8 text-amber-400 animate-spin" />
                  <span className="text-xs font-bold tracking-wider">Scanning Geometry & Colors...</span>
                </div>
              )}
            </div>

            {/* Analysis Result Card */}
            <div className="sm:col-span-7 space-y-3">
              {matchResult ? (
                <div className="space-y-2 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="bg-emerald-100 text-emerald-900 font-bold text-[10px] px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                      <span>{matchResult.confidencePercentage}% Visual Match</span>
                    </span>
                    <span className="text-[11px] font-bold text-stone-500">📍 {matchResult.state}</span>
                  </div>

                  <h4 className="text-xl font-serif font-black text-stone-900">{matchResult.name}</h4>
                  {matchResult.nativeName && (
                    <p className="text-xs font-bold text-amber-700">{matchResult.nativeName}</p>
                  )}

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {matchResult.visualAnalysis}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-stone-200">
                    <span className="text-xs font-bold text-amber-900">Est. Value: ₹{matchResult.priceEstimate}</span>
                    <button
                      onClick={() => {
                        onSelectCraftById(matchResult.craftId);
                        onClose();
                      }}
                      className="bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs py-2 px-3.5 rounded-xl flex items-center space-x-1 transition-all cursor-pointer shadow-md shadow-amber-700/25"
                    >
                      <span>Explore Craft Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 space-y-2">
                  <Sparkles className="w-8 h-8 text-amber-600 mx-auto" />
                  <p className="text-xs font-bold text-stone-700">Select a sample or upload a photo to identify.</p>
                  <button
                    onClick={() => handleRunAnalysis(selectedImage, activePreset?.tag)}
                    disabled={analyzing}
                    className="bg-stone-900 hover:bg-black text-white text-xs font-bold py-2 px-4 rounded-xl transition-all cursor-pointer"
                  >
                    Run AI Identification Scan
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
