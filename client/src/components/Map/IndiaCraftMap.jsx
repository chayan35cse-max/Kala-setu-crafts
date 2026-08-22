import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Award, ArrowRight, Compass, Users, Sparkles, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Fix for default Leaflet icon assets
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Category Colors for Custom Pin Badges
const CATEGORY_COLORS = {
  'Pottery & Ceramics': '#0284c7',
  'Folk Painting': '#ea580c',
  'Woodcraft & Toys': '#15803d',
  'Metal Casting': '#b45309',
  'Metal Inlay': '#4338ca',
  'Textiles & Weaving': '#be185d',
  'Textiles & Embroidery': '#9333ea',
  'Sacred Classical Painting': '#d97706',
  'Pottery & Terracotta': '#c2410c',
  'Tribal Painting': '#c2410c',
  'Textiles & Painting': '#059669',
  'Oil Paint Textile Art': '#d97706',
  'Folk Painting & Engraving': '#2563eb',
  'Eco-Bamboo & Cane': '#0d9488',
};

// Create a custom Indian cultural pin marker
function createCraftMarkerIcon(craft, isSelected) {
  const color = CATEGORY_COLORS[craft.category] || '#ea580c';
  const giBadge = craft.giTagged ? `<span style="position:absolute;top:-6px;right:-6px;background:#f59e0b;color:#78350f;border-radius:9999px;font-size:9px;font-weight:bold;padding:1px 4px;box-shadow:0 2px 4px rgba(0,0,0,0.2);border:1px solid #ffffff;">GI</span>` : '';

  const html = `
    <div class="marker-pin-wrapper" style="position:relative; width:38px; height:46px;">
      ${isSelected ? `<div class="pulse-ring"></div>` : ''}
      <svg viewBox="0 0 36 46" width="38" height="46" style="filter: drop-shadow(0 4px 8px rgba(0,0,0,0.35));">
        <path d="M18 0 C8.06 0 0 8.06 0 18 C0 31.5 18 46 18 46 C18 46 36 31.5 36 18 C36 8.06 27.94 0 18 0 Z" fill="${color}" stroke="#ffffff" stroke-width="2"/>
        <circle cx="18" cy="17" r="10" fill="#ffffff"/>
      </svg>
      <div style="position:absolute; top:7px; left:8px; width:20px; height:20px; border-radius:50%; overflow:hidden; display:flex; align-items:center; justify-content:center; background:${color}; color:#fff; font-size:10px; font-weight:bold;">
        ${craft.name.charAt(0)}
      </div>
      ${giBadge}
    </div>
  `;

  return L.divIcon({
    className: 'custom-craft-icon',
    html,
    iconSize: [38, 46],
    iconAnchor: [19, 46],
    popupAnchor: [0, -42]
  });
}

// Helper to pan & zoom map when region or selected craft changes
function MapViewUpdater({ crafts, selectedCraft, targetRegion }) {
  const map = useMap();

  useEffect(() => {
    if (selectedCraft && selectedCraft.coordinates) {
      map.flyTo([selectedCraft.coordinates.lat, selectedCraft.coordinates.lng], 9, {
        duration: 1.5
      });
    } else if (targetRegion) {
      const regionCoords = {
        north: { center: [30.5, 76.5], zoom: 6 },
        south: { center: [13.0, 78.0], zoom: 6 },
        east: { center: [23.5, 86.5], zoom: 6 },
        west: { center: [23.0, 72.5], zoom: 6 },
        northeast: { center: [26.2, 92.5], zoom: 6 },
        all: { center: [22.5937, 78.9629], zoom: 5 }
      };
      const reg = regionCoords[targetRegion] || regionCoords.all;
      map.flyTo(reg.center, reg.zoom, { duration: 1.2 });
    }
  }, [selectedCraft, targetRegion, map]);

  return null;
}

export default function IndiaCraftMap({
  crafts = [],
  selectedCraft = null,
  onSelectCraft,
  targetRegion = 'all',
  onRegionChange
}) {
  const { t } = useTranslation();
  const mapRef = useRef(null);

  const indiaCenter = [22.5937, 78.9629];

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-stone-200 bg-stone-50">
      {/* Regional Quick Jump Controls */}
      <div className="absolute top-4 left-14 z-[400] flex flex-wrap gap-1.5 bg-white/90 backdrop-blur-md p-1.5 rounded-xl shadow-md border border-stone-200 text-xs">
        <div className="flex items-center px-2 text-stone-500 font-semibold space-x-1">
          <Compass className="w-3.5 h-3.5 text-amber-600" />
          <span className="hidden sm:inline">Regions:</span>
        </div>
        {[
          { id: 'all', label: 'All India' },
          { id: 'north', label: 'North' },
          { id: 'south', label: 'South' },
          { id: 'east', label: 'East' },
          { id: 'west', label: 'West' },
          { id: 'northeast', label: 'North-East' }
        ].map(r => (
          <button
            key={r.id}
            onClick={() => onRegionChange && onRegionChange(r.id)}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              targetRegion === r.id
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Map Container */}
      <div className="h-[620px] w-full">
        <MapContainer
          center={indiaCenter}
          zoom={5}
          minZoom={4}
          maxZoom={14}
          scrollWheelZoom={true}
          className="w-full h-full"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a> &amp; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          <MapViewUpdater
            crafts={crafts}
            selectedCraft={selectedCraft}
            targetRegion={targetRegion}
          />

          {crafts.map(craft => {
            if (!craft.coordinates || !craft.coordinates.lat || !craft.coordinates.lng) return null;
            const isSelected = selectedCraft && selectedCraft.id === craft.id;
            const icon = createCraftMarkerIcon(craft, isSelected);

            return (
              <Marker
                key={craft.id}
                position={[craft.coordinates.lat, craft.coordinates.lng]}
                icon={icon}
              >
                <Popup className="custom-popup" maxWidth={320} minWidth={280}>
                  <div className="p-1 space-y-2.5 text-stone-900">
                    {/* Thumbnail */}
                    <div className="relative w-full h-32 rounded-xl overflow-hidden bg-stone-100 shadow-inner">
                      <img
                        src={craft.thumbnailUrl}
                        alt={craft.name}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80';
                        }}
                      />
                      {craft.giTagged && (
                        <div className="absolute top-2 right-2 bg-amber-500/90 backdrop-blur-md text-stone-950 font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center space-x-1 shadow-md">
                          <Award className="w-3 h-3 text-stone-950" />
                          <span>GI Tag {craft.giYear || ''}</span>
                        </div>
                      )}
                      <div className="absolute bottom-2 left-2 bg-stone-950/70 backdrop-blur-md text-white text-[11px] font-medium px-2 py-0.5 rounded-md">
                        {craft.state}
                      </div>
                    </div>

                    {/* Title & Native script */}
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm leading-tight">
                        {craft.name}
                      </h4>
                      {craft.nativeName && (
                        <p className="text-amber-700 font-medium text-xs">
                          {craft.nativeName}
                        </p>
                      )}
                    </div>

                    {/* Tagline / Category */}
                    <p className="text-stone-600 text-xs line-clamp-2 leading-relaxed">
                      {craft.tagline || craft.description}
                    </p>

                    {/* Info Badges */}
                    <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-100">
                      <span className="font-medium bg-stone-100 text-stone-700 px-2 py-0.5 rounded">
                        {craft.category}
                      </span>
                      {craft.sellers && craft.sellers.length > 0 && (
                        <span className="flex items-center text-emerald-700 font-semibold space-x-1">
                          <Users className="w-3 h-3" />
                          <span>{craft.sellers.length} Verified Studios</span>
                        </span>
                      )}
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => onSelectCraft(craft)}
                      className="w-full mt-1 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs py-2 px-3 rounded-xl flex items-center justify-center space-x-1.5 shadow-md shadow-amber-600/25 transition-all cursor-pointer"
                    >
                      <span>{t('map.seeDetails')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      {/* Bottom Map Legend */}
      <div className="p-3 bg-stone-900 text-stone-300 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-stone-800">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-semibold text-amber-400">Craft Disciplines:</span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            <span>Pottery & Clay</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-600"></span>
            <span>Textiles & Weaves</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
            <span>Metal & Lost-Wax</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
            <span>Folk & Temple Art</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-green-600"></span>
            <span>Wood & Cane</span>
          </span>
        </div>

        <div className="flex items-center space-x-2 text-stone-400">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Click any marker to open preview popup</span>
        </div>
      </div>
    </div>
  );
}
