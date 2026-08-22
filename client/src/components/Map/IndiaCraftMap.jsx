import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Award, ArrowRight, Compass, Users, Sparkles, MapPin, Layers, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { OFFICIAL_INDIA_POLYGON, INDIAN_STATES_DATA, INDIA_BOUNDS, INDIA_CENTER } from '../../data/indiaGeoData';

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

// Custom State label icon (Clean Indian State Labels)
function createStateLabelIcon(stateName) {
  return L.divIcon({
    className: 'state-label-icon',
    html: `<div style="font-size:11px; font-weight:700; color:#78350f; background:rgba(255,255,255,0.75); backdrop-filter:blur(4px); padding:2px 6px; border-radius:6px; border:1px solid rgba(217,119,6,0.3); pointer-events:none; white-space:nowrap; text-shadow:0 1px 2px rgba(255,255,255,0.8);">${stateName}</div>`,
    iconSize: [60, 20],
    iconAnchor: [30, 10]
  });
}

// Helper to pan & zoom map when region or selected craft changes
function MapViewUpdater({ selectedCraft, targetRegion }) {
  const map = useMap();

  useEffect(() => {
    if (selectedCraft && selectedCraft.coordinates) {
      map.flyTo([selectedCraft.coordinates.lat, selectedCraft.coordinates.lng], 8.5, {
        duration: 1.5
      });
    } else if (targetRegion) {
      const regionCoords = {
        north: { center: [32.0, 76.5], zoom: 6 },
        south: { center: [13.0, 78.0], zoom: 6 },
        east: { center: [23.5, 86.5], zoom: 6 },
        west: { center: [23.0, 72.5], zoom: 6 },
        northeast: { center: [26.2, 92.5], zoom: 6 },
        all: { center: INDIA_CENTER, zoom: 5 }
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
  const [mapStyle, setMapStyle] = useState('clean'); // 'clean' | 'warm' | 'satellite'
  const [showStateLabels, setShowStateLabels] = useState(true);

  // Clean basemaps with NO foreign / disputed city labels
  const tileUrls = {
    // Clean CartoDB light with zero foreign labels (no Islamabad / disputed borders)
    clean: 'https://{s}.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}{r}.png',
    // Warm tone clean basemap
    warm: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png',
    // Clean OpenStreetMap style
    terrain: 'https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}{r}.png'
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-amber-900/20 bg-stone-50">
      {/* Top Header Controls Bar */}
      <div className="absolute top-4 left-4 right-4 z-[400] flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Regional Quick Jump Controls */}
        <div className="flex flex-wrap gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl shadow-lg border border-amber-900/10 text-xs pointer-events-auto">
          <div className="flex items-center px-2 text-stone-600 font-bold space-x-1">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">Regions:</span>
          </div>
          {[
            { id: 'all', label: 'All India' },
            { id: 'north', label: 'North (J&K / Ladakh / Punjab)' },
            { id: 'south', label: 'South' },
            { id: 'east', label: 'East' },
            { id: 'west', label: 'West' },
            { id: 'northeast', label: 'North-East' }
          ].map(r => (
            <button
              key={r.id}
              onClick={() => onRegionChange && onRegionChange(r.id)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                targetRegion === r.id
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Map Style & Official Territory Badge */}
        <div className="flex items-center space-x-2 pointer-events-auto">
          <div className="hidden md:flex items-center space-x-1.5 bg-amber-50/95 text-amber-900 border border-amber-300/80 px-3 py-1.5 rounded-xl text-xs font-bold shadow-md backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>Official Sovereign Boundary of India</span>
          </div>

          <div className="bg-white/95 backdrop-blur-md p-1 rounded-xl shadow-lg border border-stone-200 flex items-center space-x-1 text-xs">
            <button
              onClick={() => setMapStyle(mapStyle === 'clean' ? 'warm' : 'clean')}
              className="px-2.5 py-1 rounded-lg text-stone-700 font-medium hover:bg-stone-100 transition-colors"
            >
              {mapStyle === 'clean' ? 'Warm Map' : 'Clean Map'}
            </button>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="h-[650px] w-full">
        <MapContainer
          center={INDIA_CENTER}
          zoom={5}
          minZoom={4.5}
          maxZoom={12}
          maxBounds={INDIA_BOUNDS}
          maxBoundsViscosity={0.9}
          scrollWheelZoom={true}
          className="w-full h-full"
          ref={mapRef}
        >
          {/* Clean basemap tiles with ZERO foreign labels */}
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a> &amp; KalaSetu Sovereign India Atlas'
            url={tileUrls[mapStyle] || tileUrls.clean}
          />

          {/* Official Sovereign Indian Territory Highlight Boundary */}
          <Polygon
            positions={OFFICIAL_INDIA_POLYGON}
            pathOptions={{
              color: '#d97706',
              weight: 3,
              opacity: 0.9,
              fillColor: '#ea580c',
              fillOpacity: 0.04,
              dashArray: 'none'
            }}
          >
            <Tooltip sticky className="custom-india-tooltip">
              <span className="font-bold text-amber-950 font-serif">Republic of India</span>
            </Tooltip>
          </Polygon>

          <MapViewUpdater
            selectedCraft={selectedCraft}
            targetRegion={targetRegion}
          />

          {/* State Territorial Name Indicators (Clean Indian States) */}
          {showStateLabels && INDIAN_STATES_DATA.map((st) => (
            <Marker
              key={st.id}
              position={st.center}
              icon={createStateLabelIcon(st.name)}
              interactive={false}
            />
          ))}

          {/* Craft Pin Markers across India */}
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
                      <div className="absolute bottom-2 left-2 bg-stone-950/80 backdrop-blur-md text-white text-[11px] font-medium px-2 py-0.5 rounded-md">
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
      <div className="p-3 bg-stone-950 text-stone-300 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-amber-900/30">
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
            <span>Folk & Sacred Art</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-green-600"></span>
            <span>Wood & Cane</span>
          </span>
        </div>

        <div className="flex items-center space-x-2 text-stone-400">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>India Sovereign Cultural Map • All J&K, Ladakh & States Unified</span>
        </div>
      </div>
    </div>
  );
}
