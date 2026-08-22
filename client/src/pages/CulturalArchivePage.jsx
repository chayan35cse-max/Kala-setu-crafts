import React, { useState } from 'react';
import {
  BookOpen,
  Video,
  Sparkles,
  Flame,
  Droplet,
  Layers,
  Award,
  Clock,
  ExternalLink,
  ChevronRight,
  Bookmark
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function CulturalArchivePage({ onSelectCraftById }) {
  const { t } = useTranslation();
  const [activeMasterclass, setActiveMasterclass] = useState(0);

  const masterclasses = [
    {
      id: 'natural-dyes',
      title: 'Ancient Natural Dye Chemistry & Indigo Vats',
      discipline: 'Textiles & Natural Alchemy',
      region: 'Kutch (Gujarat) & Srikalahasti (Andhra)',
      craftId: 'kalamkari-andhra',
      icon: Droplet,
      color: 'from-blue-600 to-indigo-900',
      duration: '45 mins tutorial',
      summary: 'Explore how master artisans ferment wild Indigofera tinctoria, myrobalan nuts, and pomegranate rinds into brilliant, light-fast organic dyes that last centuries.',
      steps: [
        { title: 'The Living Indigo Vat', desc: 'Fermenting indigo cakes with jaggery and slaked lime in subterranean terracotta jars for 14 days to activate anaerobic bacteria.' },
        { title: 'Myrobalan (Karakkaya) Mordanting', desc: 'Pre-treating handloom kada cotton in crushed harda fruit extract and buffalo milk to bind tannin particles.' },
        { title: 'Alum & Madder Red Boiling', desc: 'Using root of Rubia cordifolia (Indian Madder) over open wood fires to yield deep royal crimson.' }
      ],
      videoUrl: 'https://www.youtube.com/embed/jZ189Gz_3s0'
    },
    {
      id: 'lost-wax',
      title: 'Cire Perdue (Lost-Wax) Metallurgical Casting',
      discipline: 'Bronze & Bell Metal Metallurgy',
      region: 'Bastar (Chhattisgarh) & Bankura',
      craftId: 'bastar-dhokra-craft',
      icon: Flame,
      color: 'from-amber-600 to-amber-950',
      duration: '60 mins masterclass',
      summary: 'Documenting the 4,500-year-old metallurgical lineage directly descending from the Indus Valley Dancing Girl, cast by the Ghadwa tribal community.',
      steps: [
        { title: 'Ant-Hill Clay Core Modeling', desc: 'Sculpting inner cores using clay sifted with paddy chaff and termite hill earth for thermal expansion resistance.' },
        { title: 'Pure Beeswax Filament Pulling', desc: 'Rolling dammar tree resin and beeswax into hair-thin strands to wrap detailed filigree surface designs.' },
        { title: 'Charcoal Pit Furnace Smelting', desc: 'Blowing hand bellows to achieve 1,100°C furnace heat, melting brass scrap into the hollow clay mold.' }
      ],
      videoUrl: 'https://www.youtube.com/embed/tZ5X9M8V3o8'
    },
    {
      id: 'tanjore-gold',
      title: '22K Gold Leaf Gesso Relief & Temple Iconography',
      discipline: 'Sacred Classical Painting',
      region: 'Thanjavur (Tamil Nadu)',
      craftId: 'tanjore-painting',
      icon: Sparkles,
      color: 'from-amber-500 to-yellow-900',
      duration: '40 mins masterclass',
      summary: 'The sacred technique of preparing limestone gesso relief paste, setting uncut Jaipur gemstones, and applying 22-carat gold foil that never tarnishes.',
      steps: [
        { title: 'Mukhyaprana Board Preparation', desc: 'Mounting unbleached cotton over Jackwood planks using natural tamarind seed paste adhesive.' },
        { title: 'Sukku Gesso Paste Modeling', desc: 'Applying limestone powder and Arabic gum paste in three sequential layers to create high-relief arches and crowns.' },
        { title: 'Gold Leaf Burnishing', desc: 'Delicately rubbing pure 22K gold foil (Varak) with smooth agate stones to generate enduring celestial radiance.' }
      ],
      videoUrl: 'https://www.youtube.com/embed/z3k49_fL5pE'
    },
    {
      id: 'channapatna-turning',
      title: 'Lathe Woodturning & Vegetable Lacquerware',
      discipline: 'Sustainable Eco-Woodcraft',
      region: 'Channapatna (Karnataka)',
      craftId: 'channapatna-toys',
      icon: Layers,
      color: 'from-emerald-600 to-green-950',
      duration: '35 mins masterclass',
      summary: 'Tipu Sultan-era lathe woodcraft transforming Wrightia tinctoria (ivory wood) with all-natural non-toxic vegetable lacquers and kewda leaf polishing.',
      steps: [
        { title: 'Moisture Curing of Aale Mara', desc: 'Seasoning soft Wrightia logs for 3 months to prevent splitting during high-speed lathe turning.' },
        { title: 'Friction Melting of Lac', desc: 'Pressing solid natural lac colored with turmeric and indigo against spinning wood, bonding pigment organically.' },
        { title: 'Kewda Leaf High Sheen Buffing', desc: 'Polishing the toy with dried aromatic kewda leaves to seal a brilliant waterproof crystal gloss.' }
      ],
      videoUrl: 'https://www.youtube.com/embed/v9qL57X8wXw'
    }
  ];

  const current = masterclasses[activeMasterclass];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fadeIn">
      {/* Header */}
      <div className="bg-stone-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-stone-800 space-y-4">
        <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold">
          <BookOpen className="w-4 h-4 text-amber-400" />
          <span>Cultural Archive & Anthropological Repository</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight">
          Living Masterclasses & Technique Archive
        </h1>
        <p className="text-sm sm:text-base text-stone-300 max-w-3xl leading-relaxed">
          Preserving the unwritten generational metallurgical, botanical, and sculpting formulas passed down through oral guru-shishya lineages across India.
        </p>
      </div>

      {/* Interactive Masterclass Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Masterclass Selector (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
            Technique Masterclasses
          </h3>
          {masterclasses.map((m, idx) => {
            const Icon = m.icon;
            const isSelected = activeMasterclass === idx;
            return (
              <div
                key={m.id}
                onClick={() => setActiveMasterclass(idx)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                  isSelected
                    ? 'bg-amber-600 text-white border-amber-500 shadow-lg shadow-amber-600/30 scale-[1.02]'
                    : 'bg-white text-stone-800 border-stone-200 hover:border-amber-300 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                  }`}>
                    {m.discipline}
                  </span>
                  <span className={`text-xs font-mono ${isSelected ? 'text-amber-200' : 'text-stone-400'}`}>
                    {m.duration}
                  </span>
                </div>
                <h4 className="font-bold text-sm leading-snug">
                  {m.title}
                </h4>
                <p className={`text-xs ${isSelected ? 'text-amber-100' : 'text-stone-500'}`}>
                  {m.region}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Column: Detailed Masterclass Player & Steps (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                {current.discipline}
              </span>
              <h2 className="text-2xl font-bold text-stone-900 font-serif">
                {current.title}
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Tradition Hub: {current.region}
              </p>
            </div>

            <button
              onClick={() => onSelectCraftById(current.craftId)}
              className="flex items-center space-x-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold px-4 py-2.5 rounded-xl border border-amber-200 transition-colors cursor-pointer"
            >
              <span>Explore Full Craft Record</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Embedded Video */}
          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-stone-950 shadow-md">
            <iframe
              src={current.videoUrl}
              title={current.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <p className="text-stone-700 text-sm leading-relaxed">
            {current.summary}
          </p>

          {/* Stepped Breakdown */}
          <div className="space-y-4 pt-2">
            <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Generational Technique Breakdown:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {current.steps.map((st, i) => (
                <div key={i} className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-1.5">
                  <div className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </div>
                  <h5 className="font-bold text-stone-900 text-xs">
                    {st.title}
                  </h5>
                  <p className="text-[11px] text-stone-600 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
