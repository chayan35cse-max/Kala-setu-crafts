import React, { useState } from 'react';
import { Sparkles, X, ArrowRight, Award, RefreshCw, Heart, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const QUIZ_QUESTIONS = [
  {
    question: '1. What aesthetic vibe defines your sacred living space?',
    options: [
      { text: 'Royal Regal & Symmetrical (Palace arches, cobalt glazes)', craftId: 'jaipur-blue-pottery', score: 'pottery' },
      { text: 'Earthy, Raw & Primordial (Ancient tribal metal, antique bronze)', craftId: 'bastar-dhokra-craft', score: 'dhokra' },
      { text: 'Vibrant, Playful & Eco-Friendly (Glossy vegetable-lacquered wood)', craftId: 'channapatna-toys', score: 'toys' },
      { text: 'Divine, Luminous & Sacred (Embossed 22K gold foil & gems)', craftId: 'tanjore-painting', score: 'tanjore' }
    ]
  },
  {
    question: '2. Which primordial element calls deeply to your spirit?',
    options: [
      { text: 'Earth & Mineral Quartz (Moulded without ordinary clay)', craftId: 'jaipur-blue-pottery' },
      { text: 'Fire & Molten Bronze (Ancient 4,000-year lost-wax casting)', craftId: 'bastar-dhokra-craft' },
      { text: 'Forest Wood & Natural Lacquer (Ivory wood turned on lathes)', craftId: 'channapatna-toys' },
      { text: 'Cosmic Gold & Sacred Gesso (Limestone relief with pure gold)', craftId: 'tanjore-painting' }
    ]
  },
  {
    question: '3. What color palette awakens your senses?',
    options: [
      { text: 'Cobalt Blue, Ocean Turquoise & Crisp Porcelain White', craftId: 'jaipur-blue-pottery' },
      { text: 'Antique Dark Patina, Raw Brass & Earthy Soil Ochres', craftId: 'bastar-dhokra-craft' },
      { text: 'Turmeric Yellow, Saffron Vermilion & Emerald Green', craftId: 'channapatna-toys' },
      { text: 'Radiant 22K Gold, Ruby Reds & Temple Sandalwood', craftId: 'tanjore-painting' }
    ]
  }
];

const SOULMATE_PROFILES = {
  'jaipur-blue-pottery': {
    name: 'Jaipur Blue Pottery',
    state: 'Rajasthan',
    title: 'The Royal Turquoise Alchemist',
    description: 'Your soul thrives on Persian symmetry, royal elegance, and the luminous transparency of quartz crystal glazes.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80'
  },
  'bastar-dhokra-craft': {
    name: 'Bastar Dhokra Bronze',
    state: 'Chhattisgarh',
    title: 'The Primordial Metallurgical Mystic',
    description: 'You are deeply grounded in nature, ancient tribal history, and the raw, unbroken magic of 4,000-year-old lost-wax casting.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=600&q=80'
  },
  'channapatna-toys': {
    name: 'Channapatna Wooden Toys',
    state: 'Karnataka',
    title: 'The Eco-Friendly Playful Spirit',
    description: 'You cherish joyful vibrancy, organic child-safe materials, and the smooth tactile warmth of vegetable-dyed turned wood.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=600&q=80'
  },
  'tanjore-painting': {
    name: 'Thanjavur 22K Gold Painting',
    state: 'Tamil Nadu',
    title: 'The Sacred Golden Devotee',
    description: 'Your heart is drawn to transcendental divine relief, glittering 22-karat gold foil, and masterfully sculpted spiritual iconography.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80'
  }
};

export default function HeritageQuizModal({ onClose, onSelectCraftById }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [resultCraftId, setResultCraftId] = useState(null);

  const handleSelectOption = (craftId) => {
    const updated = [...selectedAnswers, craftId];
    setSelectedAnswers(updated);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate most frequent craftId
      const tally = {};
      updated.forEach(id => { tally[id] = (tally[id] || 0) + 1; });
      let bestId = updated[0];
      let maxCount = 0;
      Object.entries(tally).forEach(([id, count]) => {
        if (count > maxCount) {
          maxCount = count;
          bestId = id;
        }
      });

      setResultCraftId(bestId);
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setSelectedAnswers([]);
    setResultCraftId(null);
  };

  const soulmate = resultCraftId ? SOULMATE_PROFILES[resultCraftId] || SOULMATE_PROFILES['jaipur-blue-pottery'] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-amber-900/30 flex flex-col relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-amber-700 via-orange-600 to-amber-600 text-white p-6 relative">
          <div className="flex items-center space-x-2 text-amber-200 text-xs font-bold uppercase tracking-wider mb-1">
            <Heart className="w-4 h-4 fill-amber-300 text-amber-300" />
            <span>Cultural Soulmate Quiz</span>
          </div>
          <h3 className="text-2xl font-serif font-black">Discover Your Craft Soulmate</h3>
          <p className="text-xs text-amber-100/90 mt-1">
            3 simple questions to connect you with your traditional Indian heritage craft.
          </p>

          {!resultCraftId && (
            <div className="mt-3 flex items-center space-x-1.5">
              {[0, 1, 2].map((idx) => (
                <div
                  key={idx}
                  className={`h-1.5 flex-1 rounded-full transition-all ${
                    idx <= currentStep ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-6">
          {soulmate ? (
            /* Result Showcase */
            <div className="space-y-4 text-center animate-fadeIn">
              <div className="relative w-36 h-36 mx-auto rounded-full overflow-hidden border-4 border-amber-500 shadow-xl">
                <img src={soulmate.thumbnailUrl} alt={soulmate.name} className="w-full h-full object-cover" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">
                  {soulmate.title}
                </span>
                <h4 className="text-2xl font-serif font-black text-stone-900">{soulmate.name}</h4>
                <p className="text-xs text-stone-500 font-semibold">📍 Origin: {soulmate.state}</p>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed bg-amber-50/50 p-4 rounded-2xl border border-amber-200">
                {soulmate.description}
              </p>

              <div className="pt-2 flex items-center justify-center space-x-3">
                <button
                  onClick={handleRestart}
                  className="bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold py-3 px-4 rounded-xl transition-colors cursor-pointer"
                >
                  Retake Quiz
                </button>

                <button
                  onClick={() => {
                    onSelectCraftById(resultCraftId);
                    onClose();
                  }}
                  className="bg-gradient-to-r from-amber-700 to-orange-700 text-white text-xs font-bold py-3 px-5 rounded-xl shadow-lg shadow-amber-700/30 flex items-center space-x-2 transition-all cursor-pointer"
                >
                  <span>Explore Your Craft</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Question Step */
            <div className="space-y-4">
              <h4 className="font-serif font-bold text-stone-900 text-base">
                {QUIZ_QUESTIONS[currentStep].question}
              </h4>

              <div className="space-y-2.5">
                {QUIZ_QUESTIONS[currentStep].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectOption(opt.craftId)}
                    className="w-full text-left p-4 rounded-2xl border border-stone-200 bg-stone-50/60 hover:bg-amber-50 hover:border-amber-400 text-xs font-semibold text-stone-800 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <span>{opt.text}</span>
                    <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-amber-700 flex-shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
