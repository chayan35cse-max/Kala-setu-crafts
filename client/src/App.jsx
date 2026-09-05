import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CraftDetailPage from './pages/CraftDetailPage';
import CulturalArchivePage from './pages/CulturalArchivePage';
import SellerPortalPage from './pages/SellerPortalPage';
import ArtisansDirectoryPage from './pages/ArtisansDirectoryPage';
import OrdersTrackingPage from './pages/OrdersTrackingPage';
import ResearcherSubmissionPage from './pages/ResearcherSubmissionPage';
import Craft3DViewer from './components/ThreeD/Craft3DViewer';
import CraftInsightsModal from './components/CraftInsightsModal';
import './i18n';

export default function App() {
  const [activePage, setActivePage] = useState('home'); // 'home' | 'map' | 'detail' | '3d' | 'archive' | 'artisans' | 'seller-portal' | 'orders' | 'researcher-portal'
  const [selectedCraftId, setSelectedCraftId] = useState('jaipur-blue-pottery');
  const [insightsModalCraft, setInsightsModalCraft] = useState(null);

  const handleSelectCraft = (craft) => {
    if (craft && craft.id) {
      setSelectedCraftId(craft.id);
      setActivePage('detail');
      window.scrollTo(0, 0);
    }
  };

  const handleSelectCraftById = (craftId) => {
    setSelectedCraftId(craftId);
    setActivePage('detail');
    window.scrollTo(0, 0);
  };

  const handleNavigate = (page) => {
    setActivePage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-stone-900 selection:bg-amber-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        onSearchSelect={handleSelectCraft}
      />

      {/* Main Dynamic Content Area */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            onSelectCraft={handleSelectCraft}
            onNavigate={handleNavigate}
            onOpenInsights={(craft) => setInsightsModalCraft(craft)}
          />
        )}

        {activePage === 'map' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h1 className="text-3xl sm:text-4xl font-black font-serif text-stone-900">
                Interactive Sovereign Map of India
              </h1>
              <p className="text-xs sm:text-sm text-stone-600">
                Explore official distributions of India's GI & Researched Non-GI traditions. 🟢 Green: GI, 🔴 Red: Non-GI Endangered, 🔵 Blue: Non-GI Active.
              </p>
            </div>
            <HomePage
              onSelectCraft={handleSelectCraft}
              onNavigate={handleNavigate}
              onOpenInsights={(craft) => setInsightsModalCraft(craft)}
            />
          </div>
        )}

        {activePage === 'detail' && (
          <CraftDetailPage
            craftId={selectedCraftId}
            onBack={() => setActivePage('home')}
            onSelectCraft={handleSelectCraft}
            onNavigateToOrders={() => setActivePage('orders')}
          />
        )}

        {activePage === 'orders' && (
          <OrdersTrackingPage
            onNavigateToCraft={handleSelectCraftById}
          />
        )}

        {activePage === 'researcher-portal' && (
          <ResearcherSubmissionPage
            onCraftCreated={(craft) => {
              setSelectedCraftId(craft.id);
            }}
          />
        )}

        {activePage === '3d' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
            <div className="bg-stone-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-stone-800 space-y-4">
              <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold">
                <span>WebGL 3D Digital Archive</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight">
                3D Craft Model Laboratory
              </h1>
              <p className="text-sm sm:text-base text-stone-300 max-w-3xl leading-relaxed">
                Interact in 360-degrees with high-fidelity procedural 3D models representing traditional Indian pottery, woodturning, lost-wax bronze, and terracotta metallurgy.
              </p>
            </div>

            <Craft3DViewer initialModel="pottery" height="640px" showSelector={true} />
          </div>
        )}

        {activePage === 'archive' && (
          <CulturalArchivePage
            onSelectCraftById={handleSelectCraftById}
          />
        )}

        {activePage === 'artisans' && (
          <ArtisansDirectoryPage
            onSelectCraftById={handleSelectCraftById}
          />
        )}

        {activePage === 'seller-portal' && (
          <SellerPortalPage
            onNavigateToCraft={handleSelectCraftById}
          />
        )}
      </main>

      {/* Global AI Insights Modal */}
      {insightsModalCraft && (
        <CraftInsightsModal
          craft={insightsModalCraft}
          onClose={() => setInsightsModalCraft(null)}
        />
      )}

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
