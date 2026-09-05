import React, { useState } from 'react';
import { Box, Camera, X, Sparkles, CheckCircle2, RotateCw, Eye, Smartphone, Ruler } from 'lucide-react';
import Craft3DViewer from './ThreeD/Craft3DViewer';

export default function ARViewModal({ craft, onClose }) {
  const [arBackdrop, setArBackdrop] = useState('table'); // 'table' | 'living-room' | 'pedestal'
  const [showDimensions, setShowDimensions] = useState(true);

  const backdrops = {
    'table': 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    'living-room': 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    'pedestal': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-stone-950 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-stone-800 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4.5 bg-stone-900 border-b border-stone-800 text-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center">
              <Box className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-white">Augmented Reality & Room Scale Preview</h3>
              <p className="text-[11px] text-stone-400">1:1 Physical Scale Simulation • {craft?.name || 'Craft'}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AR Viewer Stage with Backdrop Simulation */}
        <div className="relative flex-1 min-h-[420px] bg-stone-900 overflow-hidden flex items-center justify-center">
          {/* Room Environment Photo Backdrop */}
          <img
            src={backdrops[arBackdrop]}
            alt="Room Environment"
            className="absolute inset-0 w-full h-full object-cover opacity-35 filter blur-[1px]"
          />

          {/* 3D Model Overlay */}
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <Craft3DViewer modelType={craft?.model3DType || 'pottery'} craftName={craft?.name} height="420px" />
          </div>

          {/* Scale Rulers Overlay */}
          {showDimensions && (
            <div className="absolute top-4 left-4 z-20 bg-stone-900/90 backdrop-blur-md border border-stone-700 rounded-2xl p-3.5 text-xs text-white space-y-1.5 shadow-xl pointer-events-none">
              <div className="flex items-center space-x-1.5 text-amber-400 font-bold text-[11px] uppercase">
                <Ruler className="w-3.5 h-3.5" />
                <span>Physical Scale Metrics</span>
              </div>
              <p>Height: <strong className="text-amber-300">24.5 cm (9.6 in)</strong></p>
              <p>Base Diameter: <strong className="text-amber-300">14.0 cm (5.5 in)</strong></p>
              <p>Net Weight: <strong className="text-amber-300">850 grams</strong></p>
            </div>
          )}

          {/* Mobile WebXR Activation Pill */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-stone-900/90 backdrop-blur-md border border-amber-500/40 px-4 py-2 rounded-full text-xs font-bold text-amber-300 shadow-xl flex items-center space-x-2">
            <Smartphone className="w-4 h-4 text-amber-400" />
            <span>Open on Mobile Phone to Place in Live Camera View</span>
          </div>
        </div>

        {/* Controls Footer */}
        <div className="p-4 bg-stone-900 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs flex-shrink-0">
          <div className="flex items-center space-x-2 text-stone-300">
            <span className="font-bold">Environment:</span>
            {[
              { id: 'table', label: 'Coffee Table' },
              { id: 'living-room', label: 'Living Room' },
              { id: 'pedestal', label: 'Gallery Pedestal' }
            ].map(b => (
              <button
                key={b.id}
                onClick={() => setArBackdrop(b.id)}
                className={`px-3 py-1 rounded-xl font-semibold transition-colors cursor-pointer ${
                  arBackdrop === b.id ? 'bg-amber-600 text-white' : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowDimensions(!showDimensions)}
            className="text-stone-300 hover:text-white font-bold cursor-pointer"
          >
            {showDimensions ? 'Hide Scale Rulers' : 'Show Scale Rulers'}
          </button>
        </div>
      </div>
    </div>
  );
}
