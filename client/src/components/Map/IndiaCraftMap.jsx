import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Award, ArrowRight, Compass, Users, Sparkles, MapPin, Layers, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { indiaStatesGeoJson } from '../../data/india_states_optimized';
import { INDIAN_STATES_DATA, INDIA_BOUNDS, INDIA_CENTER } from '../../data/indiaGeoData';

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

// Pastel State Palette matching official Survey of India political map
const STATE_PALETTE = {
  'Jammu and Kashmir': '#fee2e2', // Soft Rose Pink
  'Ladakh': '#fef3c7',           // Warm Amber
  'Himachal Pradesh': '#e0e7ff', // Soft Periwinkle
  'Punjab': '#f3e8ff',           // Soft Lavender
  'Uttarakhand': '#ccfbf1',      // Soft Teal
  'Haryana': '#dcfce7',          // Mint
  'Delhi': '#fef08a',            // Gold
  'Rajasthan': '#ffedd5',        // Desert Peach
  'Uttar Pradesh': '#fef9c3',    // Pale Yellow
  'Bihar': '#dcfce7',            // Soft Green
  'Gujarat': '#fef08a',          // Sunny Yellow
  'Madhya Pradesh': '#e0e7ff',   // Classic Blue
  'Jharkhand': '#f3e8ff',        // Violet
  'West Bengal': '#fef3c7',      // Warm Cream
  'Odisha': '#dbeafe',           // Sky Blue
  'Chhattisgarh': '#ffe4e6',     // Coral Pink
  'Maharashtra': '#e0e7ff',      // Lavender Blue
  'Telangana': '#dcfce7',        // Light Green
  'Andhra Pradesh': '#e0f2fe',   // Ocean Cyan
  'Goa': '#fed7aa',              // Orange
  'Karnataka': '#dcfce7',        // Lime Green
  'Kerala': '#fef08a',           // Golden Yellow
  'Tamil Nadu': '#fed7aa',       // Temple Peach
  'Assam': '#fef3c7',            // Cream
  'Arunachal Pradesh': '#fed7aa',// Warm Peach
  'Meghalaya': '#ccfbf1',        // Teal
  'Nagaland': '#e0e7ff',         // Periwinkle
  'Manipur': '#fce7f3',          // Pink
  'Tripura': '#fef9c3',          // Pale Yellow
  'Mizoram': '#dcfce7',          // Light Green
  'Sikkim': '#e0e7ff'            // Periwinkle
};

function getStateFillColor(name = '') {
  for (const [key, color] of Object.entries(STATE_PALETTE)) {
    if (name.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(name.toLowerCase())) {
      return color;
    }
  }
  return '#fef3c7';
}

// Create a custom Indian cultural pin marker for Leaflet
function createCraftMarkerIcon(craft, isSelected) {
  const color = CATEGORY_COLORS[craft.category] || '#ea580c';
  const giBadge = craft.giTagged ? `<span style="position:absolute;top:-6px;right:-6px;background:#f59e0b;color:#78350f;border-radius:9999px;font-size:9px;font-weight:bold;padding:1px 4px;box-shadow:0 2px 4px rgba(0,0,0,0.3);border:1px solid #ffffff;">GI</span>` : '';

  const html = `
    <div class="marker-pin-wrapper" style="position:relative; width:38px; height:46px;">
      ${isSelected ? `<div class="pulse-ring"></div>` : ''}
      <svg viewBox="0 0 36 46" width="38" height="46" style="filter: drop-shadow(0 4px 8px rgba(0,0,0,0.4));">
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

// Custom Indian State & Union Territory label icon for Leaflet
function createStateLabelIcon(stateName, isUT = false) {
  return L.divIcon({
    className: 'state-label-icon',
    html: `<div style="font-size:${isUT ? '10px' : '11px'}; font-weight:800; color:${isUT ? '#991b1b' : '#1e3a8a'}; background:rgba(255,255,255,0.88); backdrop-filter:blur(4px); padding:2px 6px; border-radius:6px; border:1px solid ${isUT ? 'rgba(220,38,38,0.4)' : 'rgba(30,58,138,0.3)'}; pointer-events:none; white-space:nowrap; box-shadow:0 2px 4px rgba(0,0,0,0.1);">${stateName}</div>`,
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
        north: { center: [33.5, 76.5], zoom: 6 },
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

  // GeoJSON style handler for each official Indian State polygon
  const geoJsonStyle = (feature) => {
    const stateName = feature?.properties?.name || '';
    const fillColor = getStateFillColor(stateName);
    const isSpecialUT = stateName.toLowerCase().includes('kashmir') || stateName.toLowerCase().includes('ladakh');

    return {
      fillColor: fillColor,
      weight: isSpecialUT ? 2.5 : 1.5,
      opacity: 1,
      color: isSpecialUT ? '#b91c1c' : '#78350f',
      dashArray: 'none',
      fillOpacity: 0.45
    };
  };

  const onEachFeature = (feature, layer) => {
    const stateName = feature?.properties?.name || 'Indian State';
    layer.bindTooltip(
      `<div style="font-weight:bold; font-size:12px; color:#78350f;">${stateName}</div>`,
      { sticky: true, className: 'state-tooltip' }
    );

    layer.on({
      mouseover: (e) => {
        const l = e.target;
        l.setStyle({
          weight: 3,
          color: '#ea580c',
          fillOpacity: 0.7
        });
      },
      mouseout: (e) => {
        const l = e.target;
        l.setStyle(geoJsonStyle(feature));
      }
    });
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-stone-300 bg-stone-50">
      {/* Top Header Controls Bar */}
      <div className="absolute top-4 left-4 right-4 z-[400] flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Regional Quick Jump Controls */}
        <div className="flex flex-wrap gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl shadow-xl border border-stone-200 text-xs pointer-events-auto">
          <div className="flex items-center px-2 text-stone-700 font-bold space-x-1">
            <Compass className="w-3.5 h-3.5 text-amber-700" />
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
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                targetRegion === r.id
                  ? 'bg-amber-700 text-white shadow-md'
                  : 'text-stone-800 hover:bg-stone-100'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Official Sovereign Territorial Badge */}
        <div className="flex items-center space-x-2 pointer-events-auto">
          <div className="flex items-center space-x-1.5 bg-amber-50/95 text-amber-950 border border-amber-300 px-3 py-1.5 rounded-xl text-xs font-bold shadow-md backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>Official Government-Compliant GeoJSON • Complete J&K & Ladakh</span>
          </div>
        </div>
      </div>

      {/* Leaflet Map Canvas */}
      <div className="h-[680px] w-full">
        <MapContainer
          center={INDIA_CENTER}
          zoom={5}
          minZoom={4.5}
          maxZoom={14}
          maxBounds={INDIA_BOUNDS}
          maxBoundsViscosity={0.9}
          scrollWheelZoom={true}
          className="w-full h-full"
          ref={mapRef}
        >
          {/* OpenStreetMap Tile Layer */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors • Survey of India Alignment'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Official Government-Compliant GeoJSON Layer (State-by-State with Full J&K and Ladakh) */}
          <GeoJSON
            data={indiaStatesGeoJson}
            style={geoJsonStyle}
            onEachFeature={onEachFeature}
          />

          <MapViewUpdater
            selectedCraft={selectedCraft}
            targetRegion={targetRegion}
          />

          {/* Indian States and Union Territories Indicators */}
          {INDIAN_STATES_DATA.map((st) => (
            <Marker
              key={st.id}
              position={st.center}
              icon={createStateLabelIcon(st.name, st.id === 'JK' || st.id === 'LA' || st.id === 'DL')}
              interactive={false}
            />
          ))}

          {/* Interactive Craft Pin Markers across India */}
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
                      className="w-full mt-1 bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-800 hover:to-orange-800 text-white font-semibold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center space-x-1.5 shadow-md shadow-amber-700/25 transition-all cursor-pointer"
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

      {/* Bottom Map Legend Bar */}
      <div className="p-3 bg-stone-950 text-stone-300 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-amber-900/30">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-semibold text-amber-400">Official Administrative Map:</span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span>Jammu & Kashmir</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span>Ladakh (Undivided)</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            <span>All 28 States & 8 UTs</span>
          </span>
        </div>

        <div className="flex items-center space-x-2 text-stone-400">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Government-Compliant Boundary Polygons • DataMeet & Survey of India</span>
        </div>
      </div>
    </div>
  );
}
