import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Center, Float } from '@react-three/drei';
import { Box, Sun, Moon, Sparkles, RefreshCw, Eye, Info, Layers } from 'lucide-react';
import PotteryModel from './PotteryModel';
import ChannapatnaModel from './ChannapatnaModel';
import DhokraModel from './DhokraModel';
import TerracottaModel from './TerracottaModel';

const CRAFT_MODELS = {
  pottery: {
    id: 'pottery',
    name: 'Jaipur Blue Pottery Vase',
    origin: 'Jaipur, Rajasthan',
    component: PotteryModel,
    material: 'Quartz Powder, Cullet Glass & Cobalt Glaze',
    technique: 'Non-clay Egyptian Paste Molding & Single Kiln Firing',
    description: 'Fired at 850°C with signature Iranian cobalt and copper turquoise oxides, producing a semi-translucent impervious glaze.'
  },
  channapatna: {
    id: 'channapatna',
    name: 'Channapatna Lacquered Toy',
    origin: 'Ramanagara, Karnataka',
    component: ChannapatnaModel,
    material: 'Wrightia Tinctoria (Ivory Wood) & Natural Vegetable Lac',
    technique: 'High-speed Lathe Turning & Friction Lacquer Application',
    description: '100% natural, non-toxic organic resin melted by rotational friction against seasoned soft wood, polished with dried kewda leaves.'
  },
  dhokra: {
    id: 'dhokra',
    name: 'Bastar Dhokra Lost-Wax Figurine',
    origin: 'Bastar, Chhattisgarh',
    component: DhokraModel,
    material: 'Bell Metal (Bronze/Brass) & Beeswax Dammar Resin',
    technique: 'Cire Perdue (Lost-Wax) Metallurgy with Clay Core',
    description: '4,500-year-old metallurgical lineage directly connected to the Mohenjo-daro Dancing Girl. Each hollow casting breaks the mold.'
  },
  terracotta: {
    id: 'terracotta',
    name: 'Bankura Terracotta Sacred Vessel',
    origin: 'Panchmura, West Bengal',
    component: TerracottaModel,
    material: 'Alluvial Riverbed Clay & Natural Ochre Slip',
    technique: 'Wheel-thrown hollow sections with hand-sculpted rosettes',
    description: 'Traditional votive vessel fired in wood-and-leaf subterranean pits to achieve the warm earthy reddish-orange tone.'
  }
};

export default function Craft3DViewer({ initialModel = 'pottery', height = '520px', showSelector = true }) {
  const [activeModelKey, setActiveModelKey] = useState(initialModel);
  const [wireframe, setWireframe] = useState(false);
  const [lighting, setLighting] = useState('studio'); // 'studio' | 'temple' | 'sunset'
  const [autoRotate, setAutoRotate] = useState(true);
  const [showInfo, setShowInfo] = useState(true);

  const activeCraft = CRAFT_MODELS[activeModelKey] || CRAFT_MODELS.pottery;
  const ActiveComponent = activeCraft.component;

  const getLightingParams = () => {
    switch (lighting) {
      case 'temple':
        return {
          ambientIntensity: 0.6,
          dirColor: '#fbbf24',
          dirIntensity: 2.2,
          bg: '#1c130d'
        };
      case 'sunset':
        return {
          ambientIntensity: 0.5,
          dirColor: '#f97316',
          dirIntensity: 2.5,
          bg: '#181216'
        };
      case 'studio':
      default:
        return {
          ambientIntensity: 0.8,
          dirColor: '#ffffff',
          dirIntensity: 1.8,
          bg: '#0f172a'
        };
    }
  };

  const lightConfig = getLightingParams();

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-amber-900/30 bg-stone-900 text-stone-100">
      {/* Top Bar / Model Selector */}
      {showSelector && (
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-stone-950/80 border-b border-stone-800 backdrop-blur-md z-10 relative">
          <div className="flex items-center space-x-2">
            <Box className="w-5 h-5 text-amber-500" />
            <span className="font-semibold text-stone-200 text-sm tracking-wide">3D CRAFT INSPECTOR</span>
            <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/30">Three.js Engine</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {Object.values(CRAFT_MODELS).map(m => (
              <button
                key={m.id}
                onClick={() => setActiveModelKey(m.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeModelKey === m.id
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30 scale-105'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                {m.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3D Canvas Area */}
      <div style={{ height }} className="w-full relative cursor-grab active:cursor-grabbing">
        <Canvas
          shadows
          camera={{ position: [0, 1.5, 4.2], fov: 45 }}
          style={{ background: lightConfig.bg }}
        >
          <ambientLight intensity={lightConfig.ambientIntensity} />
          <directionalLight
            position={[5, 8, 5]}
            intensity={lightConfig.dirIntensity}
            color={lightConfig.dirColor}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <directionalLight position={[-5, 3, -5]} intensity={0.5} color="#38bdf8" />
          <pointLight position={[0, -2, 2]} intensity={0.4} color="#f59e0b" />

          <Suspense fallback={null}>
            <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
              <Center>
                <ActiveComponent wireframe={wireframe} />
              </Center>
            </Float>
          </Suspense>

          <OrbitControls
            enablePan={false}
            minDistance={2.5}
            maxDistance={7}
            autoRotate={autoRotate}
            autoRotateSpeed={1.5}
            maxPolarAngle={Math.PI / 2 + 0.1}
          />
        </Canvas>

        {/* Floating Controls Overlay */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 z-10">
          {/* Wireframe Mode */}
          <button
            onClick={() => setWireframe(!wireframe)}
            title="Toggle Wireframe Structural Mesh"
            className={`p-2.5 rounded-xl backdrop-blur-md border transition-all ${
              wireframe
                ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold shadow-lg shadow-amber-500/30'
                : 'bg-stone-900/80 text-stone-300 border-stone-700 hover:bg-stone-800'
            }`}
          >
            <Layers className="w-4 h-4" />
          </button>

          {/* Lighting Presets */}
          <button
            onClick={() => {
              const modes = ['studio', 'temple', 'sunset'];
              const next = modes[(modes.indexOf(lighting) + 1) % modes.length];
              setLighting(next);
            }}
            title={`Current Lighting: ${lighting.toUpperCase()}`}
            className="p-2.5 rounded-xl bg-stone-900/80 text-amber-400 border border-stone-700 hover:bg-stone-800 backdrop-blur-md transition-all"
          >
            {lighting === 'studio' && <Sun className="w-4 h-4" />}
            {lighting === 'temple' && <Sparkles className="w-4 h-4" />}
            {lighting === 'sunset' && <Moon className="w-4 h-4" />}
          </button>

          {/* Auto-Rotation Toggle */}
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            title="Toggle 360 Auto-Rotation"
            className={`p-2.5 rounded-xl backdrop-blur-md border transition-all ${
              autoRotate
                ? 'bg-amber-600/90 text-white border-amber-500'
                : 'bg-stone-900/80 text-stone-400 border-stone-700 hover:bg-stone-800'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          </button>

          {/* Info Toggle */}
          <button
            onClick={() => setShowInfo(!showInfo)}
            title="Toggle Craft Material Specs"
            className={`p-2.5 rounded-xl backdrop-blur-md border transition-all ${
              showInfo
                ? 'bg-stone-800 text-amber-400 border-amber-500/50'
                : 'bg-stone-900/80 text-stone-400 border-stone-700 hover:bg-stone-800'
            }`}
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

        {/* Interaction Hint */}
        <div className="absolute bottom-4 left-4 pointer-events-none flex items-center space-x-2 bg-stone-950/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-stone-800 text-xs text-stone-400">
          <Eye className="w-3.5 h-3.5 text-amber-400" />
          <span>Click and drag to rotate • Scroll to zoom</span>
        </div>

        {/* Craft Material Info Card */}
        {showInfo && (
          <div className="absolute bottom-4 right-4 max-w-sm bg-stone-950/85 backdrop-blur-md border border-amber-900/40 rounded-xl p-4 shadow-xl text-xs space-y-1.5 transition-all animate-fadeIn">
            <div className="flex items-center justify-between text-amber-400 font-semibold border-b border-stone-800 pb-1">
              <span>{activeCraft.name}</span>
              <span className="text-[10px] text-stone-400">{activeCraft.origin}</span>
            </div>
            <p className="text-stone-300 leading-relaxed pt-1">
              <strong className="text-amber-300">Material:</strong> {activeCraft.material}
            </p>
            <p className="text-stone-300 leading-relaxed">
              <strong className="text-amber-300">Technique:</strong> {activeCraft.technique}
            </p>
            <p className="text-stone-400 text-[11px] italic leading-tight pt-1">
              {activeCraft.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
