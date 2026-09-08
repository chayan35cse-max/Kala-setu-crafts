import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NavigationBreadcrumb, { PAGE_TITLES } from './components/NavigationBreadcrumb';
import HomePage from './pages/HomePage';
import CraftDetailPage from './pages/CraftDetailPage';
import CulturalArchivePage from './pages/CulturalArchivePage';
import SellerPortalPage from './pages/SellerPortalPage';
import ArtisansDirectoryPage from './pages/ArtisansDirectoryPage';
import OrdersTrackingPage from './pages/OrdersTrackingPage';
import ResearcherSubmissionPage from './pages/ResearcherSubmissionPage';
import CorporateGiftingPage from './pages/CorporateGiftingPage';
import Craft3DViewer from './components/ThreeD/Craft3DViewer';
import CraftInsightsModal from './components/CraftInsightsModal';
import CraftSnapModal from './components/CraftSnapModal';
import HeritageQuizModal from './components/HeritageQuizModal';
import HeritagePassportDrawer from './components/HeritagePassportDrawer';
import KalaMitraVoiceAssistant from './components/KalaMitraVoiceAssistant';
import { ArrowLeft } from 'lucide-react';
import './i18n';

export default function App() {
  const [history, setHistory] = useState([
    { page: 'home', craftId: null, craftName: null, label: 'Home Explorer' }
  ]);
  const [activePage, setActivePage] = useState('home'); // 'home' | 'map' | 'detail' | '3d' | 'archive' | 'artisans' | 'seller-portal' | 'orders' | 'researcher-portal' | 'corporate-gifting'
  const [selectedCraftId, setSelectedCraftId] = useState('bengal-jamdani-weaving');
  const [selectedCraftName, setSelectedCraftName] = useState(null);
  const [insightsModalCraft, setInsightsModalCraft] = useState(null);
  
  // Modals & Drawers
  const [showCraftSnap, setShowCraftSnap] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showPassport, setShowPassport] = useState(false);

  // Unified Navigate with History Stack Tracking
  const navigateTo = (page, craftId = null, craftName = null) => {
    setActivePage(page);
    if (craftId) setSelectedCraftId(craftId);
    if (craftName) setSelectedCraftName(craftName);

    setHistory(prev => {
      const current = prev[prev.length - 1];
      if (current && current.page === page && current.craftId === craftId) {
        return prev;
      }
      return [
        ...prev,
        {
          page,
          craftId,
          craftName,
          label: craftName || PAGE_TITLES[page] || page
        }
      ];
    });

    try {
      window.history.pushState({ page, craftId, craftName }, '', window.location.pathname);
    } catch (e) {
      // ignore
    }

    window.scrollTo(0, 0);
  };

  const handleSelectCraft = (craft) => {
    if (craft && craft.id) {
      navigateTo('detail', craft.id, craft.name);
    }
  };

  const handleSelectCraftById = (craftId, craftName = null) => {
    navigateTo('detail', craftId, craftName);
  };

  const handleNavigate = (page) => {
    navigateTo(page);
  };

  // Return to Previous Page
  const handleGoBack = () => {
    if (history.length > 1) {
      const updatedHistory = [...history];
      updatedHistory.pop(); // remove current
      const prevEntry = updatedHistory[updatedHistory.length - 1];
      setHistory(updatedHistory);
      setActivePage(prevEntry.page);
      if (prevEntry.craftId) {
        setSelectedCraftId(prevEntry.craftId);
      }
      if (prevEntry.craftName) {
        setSelectedCraftName(prevEntry.craftName);
      }
      window.scrollTo(0, 0);
    } else {
      setActivePage('home');
      setHistory([{ page: 'home', craftId: null, craftName: null, label: 'Home Explorer' }]);
      window.scrollTo(0, 0);
    }
  };

  const handleGoHome = () => {
    navigateTo('home');
  };

  // Synchronize with Browser Native Back/Forward Navigation
  useEffect(() => {
    const handlePopState = (e) => {
      if (e.state && e.state.page) {
        setActivePage(e.state.page);
        if (e.state.craftId) setSelectedCraftId(e.state.craftId);
        if (e.state.craftName) setSelectedCraftName(e.state.craftName);
      } else {
        handleGoBack();
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [history]);

  const previousEntry = history.length > 1 ? history[history.length - 2] : null;
  const previousPageName = previousEntry
    ? (previousEntry.craftName || PAGE_TITLES[previousEntry.page] || previousEntry.page)
    : 'Home Explorer';

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-stone-900 selection:bg-amber-500 selection:text-white relative">
      {/* Top Navigation Bar */}
      <Navbar
        activePage={activePage}
        setActivePage={handleNavigate}
        onGoBack={handleGoBack}
        previousPageName={previousPageName}
        onSearchSelect={handleSelectCraft}
        onOpenCraftSnap={() => setShowCraftSnap(true)}
        onOpenQuiz={() => setShowQuiz(true)}
        onOpenPassport={() => setShowPassport(true)}
      />

      {/* Global Previous Page Breadcrumb Navigation (Visible on all non-home views) */}
      <NavigationBreadcrumb
        activePage={activePage}
        previousPageName={previousPageName}
        onGoBack={handleGoBack}
        onGoHome={handleGoHome}
        craftTitle={activePage === 'detail' ? selectedCraftName : null}
      />

      {/* Main Dynamic Content Area */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            onSelectCraft={handleSelectCraft}
            onNavigate={handleNavigate}
            onOpenInsights={(craft) => setInsightsModalCraft(craft)}
            onOpenCraftSnap={() => setShowCraftSnap(true)}
            onOpenQuiz={() => setShowQuiz(true)}
            onOpenPassport={() => setShowPassport(true)}
          />
        )}

        {activePage === 'map' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 sm:p-6 rounded-3xl border border-stone-200 shadow-md">
              <button
                onClick={handleGoBack}
                className="flex items-center space-x-2 bg-stone-900 hover:bg-black text-amber-300 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-md"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>← Back to {previousPageName}</span>
              </button>

              <div className="text-right">
                <h1 className="text-xl sm:text-2xl font-black font-serif text-stone-900">
                  Interactive Sovereign Map of India
                </h1>
                <p className="text-xs text-stone-600">
                  Explore district-level craft alchemy and master artisan guilds across India
                </p>
              </div>
            </div>

            <HomePage
              onSelectCraft={handleSelectCraft}
              onNavigate={handleNavigate}
              onOpenInsights={(craft) => setInsightsModalCraft(craft)}
              onOpenCraftSnap={() => setShowCraftSnap(true)}
              onOpenQuiz={() => setShowQuiz(true)}
              onOpenPassport={() => setShowPassport(true)}
            />
          </div>
        )}

        {activePage === 'detail' && (
          <CraftDetailPage
            craftId={selectedCraftId}
            onBack={handleGoBack}
            previousPageName={previousPageName}
            onSelectCraft={handleSelectCraft}
            onNavigateToOrders={() => handleNavigate('orders')}
          />
        )}

        {activePage === 'orders' && (
          <OrdersTrackingPage
            onNavigateToCraft={handleSelectCraftById}
            onBack={handleGoBack}
            previousPageName={previousPageName}
          />
        )}

        {activePage === 'researcher-portal' && (
          <ResearcherSubmissionPage
            onCraftCreated={handleSelectCraft}
            onBack={handleGoBack}
            previousPageName={previousPageName}
          />
        )}

        {activePage === 'corporate-gifting' && (
          <CorporateGiftingPage
            onBack={handleGoBack}
            previousPageName={previousPageName}
          />
        )}

        {activePage === '3d' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
            <div className="bg-stone-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-stone-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={handleGoBack}
                  className="flex items-center space-x-2 bg-stone-900 hover:bg-stone-800 text-amber-300 border border-amber-500/30 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>← Back to {previousPageName}</span>
                </button>

                <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold">
                  <span>WebGL 3D Digital Archive</span>
                </div>
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
            onBack={handleGoBack}
            previousPageName={previousPageName}
          />
        )}

        {activePage === 'artisans' && (
          <ArtisansDirectoryPage
            onSelectCraftById={handleSelectCraftById}
            onBack={handleGoBack}
            previousPageName={previousPageName}
          />
        )}

        {activePage === 'seller-portal' && (
          <SellerPortalPage
            onNavigateToCraft={handleSelectCraftById}
            onBack={handleGoBack}
            previousPageName={previousPageName}
          />
        )}
      </main>

      {/* Floating Quick Back Button when scrolled down */}
      {activePage !== 'home' && (
        <button
          onClick={handleGoBack}
          className="fixed bottom-6 left-6 z-40 bg-stone-950/95 hover:bg-black text-amber-300 hover:text-amber-200 px-4 py-2.5 rounded-2xl text-xs font-bold shadow-2xl border border-amber-500/40 backdrop-blur-md flex items-center space-x-2 transition-all cursor-pointer transform hover:scale-105 active:scale-95 group"
          title={`Return to ${previousPageName}`}
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>← Back to {previousPageName}</span>
        </button>
      )}

      {/* Global AI Insights Modal */}
      {insightsModalCraft && (
        <CraftInsightsModal
          craft={insightsModalCraft}
          onClose={() => setInsightsModalCraft(null)}
        />
      )}

      {/* CraftSnap AI Visual Recognition Modal */}
      {showCraftSnap && (
        <CraftSnapModal
          onClose={() => setShowCraftSnap(false)}
          onSelectCraftById={handleSelectCraftById}
        />
      )}

      {/* Cultural Heritage Soulmate Quiz Modal */}
      {showQuiz && (
        <HeritageQuizModal
          onClose={() => setShowQuiz(false)}
          onSelectCraftById={handleSelectCraftById}
        />
      )}

      {/* Virtual Heritage Passport Drawer */}
      {showPassport && (
        <HeritagePassportDrawer
          onClose={() => setShowPassport(false)}
          onSelectCraftState={() => {
            handleNavigate('map');
            setShowPassport(false);
          }}
        />
      )}

      {/* Multilingual Voice AI Assistant (KalaMitra) */}
      <KalaMitraVoiceAssistant
        onSelectCraftById={handleSelectCraftById}
      />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

