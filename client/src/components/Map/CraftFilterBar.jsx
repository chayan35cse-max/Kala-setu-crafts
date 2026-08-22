import React from 'react';
import { Filter, Award, Sparkles, X, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function CraftFilterBar({
  states = [],
  categories = [],
  selectedState,
  selectedCategory,
  giOnly,
  searchTerm,
  onStateChange,
  onCategoryChange,
  onGIChange,
  onSearchChange,
  onReset,
  totalMatching = 0
}) {
  const { t } = useTranslation();

  const hasActiveFilters = selectedState !== 'All' || selectedCategory !== 'All' || giOnly || searchTerm.trim() !== '';

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-amber-900/10 mb-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Search Input */}
        <div className="flex-1 min-w-[240px] relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t('nav.searchPlaceholder')}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 transition-all"
          />
          <Sparkles className="w-4 h-4 text-amber-600 absolute left-3.5 top-3.5" />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-3 text-stone-400 hover:text-stone-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* State Filter Dropdown */}
        <div className="w-full sm:w-auto min-w-[180px]">
          <select
            value={selectedState}
            onChange={(e) => onStateChange(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 cursor-pointer"
          >
            <option value="All">{t('map.allStates')}</option>
            {states.map(st => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>

        {/* Category Filter Dropdown */}
        <div className="w-full sm:w-auto min-w-[180px]">
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 cursor-pointer"
          >
            <option value="All">{t('map.allCategories')}</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* GI Tagged Toggle Button */}
        <button
          onClick={() => onGIChange(!giOnly)}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
            giOnly
              ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30 ring-2 ring-amber-600/50'
              : 'bg-stone-50 text-stone-700 border border-stone-200 hover:bg-stone-100'
          }`}
        >
          <Award className={`w-4 h-4 ${giOnly ? 'text-amber-200' : 'text-amber-600'}`} />
          <span>{t('map.giOnly')}</span>
        </button>

        {/* Reset Filters */}
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center space-x-1.5 px-3 py-2.5 rounded-xl text-sm text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Filter Stats bar */}
      <div className="flex items-center justify-between text-xs text-stone-500 pt-1 border-t border-stone-100">
        <div className="flex items-center space-x-2">
          <MapPin className="w-3.5 h-3.5 text-amber-600" />
          <span>
            Showing <strong className="text-amber-800 font-semibold">{totalMatching}</strong> traditional crafts on map
          </span>
        </div>
        {hasActiveFilters && (
          <span className="text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
            Filters Active
          </span>
        )}
      </div>
    </div>
  );
}
