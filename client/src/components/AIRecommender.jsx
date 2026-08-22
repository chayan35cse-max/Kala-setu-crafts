import React, { useState } from 'react';
import { Sparkles, Brain, ArrowRight, Tag, Loader, Layers, CheckCircle2 } from 'lucide-react';
import { analyzeAITagging, searchAI } from '../services/api';

export default function AIRecommender({ onSelectCraft }) {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setLoading(true);
    try {
      // 1. Tag & Theme analysis
      const tagData = await analyzeAITagging({ text: inputText });
      // 2. Semantic query matching
      const searchData = await searchAI(inputText);

      setAiResult(tagData.data);
      setSearchResults(searchData.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    "Vibrant blue glazed non-clay pottery with Persian floral motifs",
    "Lost-wax tribal bronze casting from ancient Indus lineage",
    "Hand-drawn cloth paintings using tamarind twig and natural indigo",
    "Non-toxic eco-friendly wooden toys shaped on high speed lathe"
  ];

  return (
    <div className="bg-gradient-to-br from-stone-900 via-stone-900 to-amber-950 text-stone-100 rounded-3xl p-6 sm:p-8 shadow-2xl border border-amber-500/30 my-10">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
          <Brain className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-xl font-bold text-white font-serif">AI Cultural Search & Semantic Tagging</h3>
            <span className="text-[10px] bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-black px-2 py-0.5 rounded-full">
              HuggingFace / NLP
            </span>
          </div>
          <p className="text-xs text-stone-400">
            Describe motifs, raw materials, historical eras, or techniques in natural language.
          </p>
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleAnalyze} className="space-y-3">
        <div className="relative">
          <textarea
            rows={2}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="e.g., 'Looking for natural vegetable-dyed silk textiles or terracotta statues with ancient temple connections...'"
            className="w-full bg-stone-950/80 border border-stone-700 rounded-2xl p-3.5 pr-28 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 resize-none"
          />
          <button
            type="submit"
            disabled={loading || !inputText.trim()}
            className="absolute right-3 bottom-3.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 disabled:opacity-50 text-white font-semibold text-xs px-4 py-2 rounded-xl flex items-center space-x-1.5 shadow-lg shadow-amber-600/30 transition-all cursor-pointer"
          >
            {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>Analyze</span>
          </button>
        </div>

        {/* Sample Prompt Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-stone-400 font-medium">Try asking:</span>
          {samplePrompts.map((prompt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setInputText(prompt);
              }}
              className="text-[11px] bg-stone-800/80 hover:bg-stone-700 text-amber-200/90 px-2.5 py-1 rounded-lg border border-stone-700/60 transition-colors cursor-pointer truncate max-w-[280px]"
            >
              "{prompt}"
            </button>
          ))}
        </div>
      </form>

      {/* AI Analysis Result */}
      {aiResult && (
        <div className="mt-6 pt-6 border-t border-stone-800/80 space-y-4 animate-fadeIn">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center space-x-1.5 mb-2">
              <Tag className="w-3.5 h-3.5" />
              <span>AI Detected Cultural Tags</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {aiResult.suggestedTags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs bg-amber-500/15 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {aiResult.culturalInsights && aiResult.culturalInsights.length > 0 && (
            <div className="bg-stone-950/60 rounded-2xl p-4 border border-stone-800 space-y-2">
              <span className="text-xs font-semibold text-stone-300">Anthropological Connection:</span>
              {aiResult.culturalInsights.map((insight, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-400">{insight.theme}:</strong> {insight.detail}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Semantic Matched Crafts */}
          {searchResults.length > 0 && (
            <div className="space-y-3 pt-2">
              <span className="text-xs font-semibold text-stone-300">
                Matching Traditional Craft Traditions ({searchResults.length}):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {searchResults.slice(0, 3).map((craft) => (
                  <div
                    key={craft.id}
                    onClick={() => onSelectCraft && onSelectCraft(craft)}
                    className="p-3.5 rounded-xl bg-stone-950/90 border border-stone-800 hover:border-amber-500/60 transition-all cursor-pointer group flex space-x-3 items-center"
                  >
                    <img
                      src={craft.thumbnailUrl}
                      alt={craft.name}
                      className="w-14 h-14 rounded-lg object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-bold text-white group-hover:text-amber-400 truncate">
                        {craft.name}
                      </h5>
                      <p className="text-[11px] text-stone-400 truncate">{craft.state}</p>
                      <span className="text-[10px] text-amber-500 font-medium">
                        {craft.category}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-amber-400 transform group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
