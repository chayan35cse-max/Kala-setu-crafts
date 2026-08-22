import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Award,
  Building2,
  Clock,
  Sparkles,
  ArrowRight,
  UserCheck,
  Lock
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import confetti from 'canvas-confetti';
import { registerSeller, getSellers, verifySeller, getCrafts } from '../services/api';

export default function SellerPortalPage({ onNavigateToCraft }) {
  const { t } = useTranslation();
  const [craftsList, setCraftsList] = useState([]);
  const [sellersList, setSellersList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successData, setSuccessData] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    artisanName: '',
    businessName: '',
    craftId: 'jaipur-blue-pottery',
    craftName: 'Jaipur Blue Pottery',
    state: 'Rajasthan',
    pehchanCardNo: '',
    aadhaarMasked: '',
    phone: '',
    email: '',
    address: '',
    ngoEndorsement: '',
    experienceYears: '15',
    onlineStoreUrl: ''
  });

  const [simulatedFiles, setSimulatedFiles] = useState([
    { name: 'artisan_pehchan_card.pdf', size: '1.4 MB', type: 'Pehchan Artisan ID' },
    { name: 'gi_authenticity_cert.pdf', size: '2.1 MB', type: 'GI Registry Certificate' }
  ]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [craftsRes, sellersRes] = await Promise.all([
        getCrafts({}),
        getSellers({})
      ]);
      if (craftsRes.data) setCraftsList(craftsRes.data);
      if (sellersRes.data) setSellersList(sellersRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleCraftChange = (e) => {
    const selected = craftsList.find(c => c.id === e.target.value);
    setFormData(prev => ({
      ...prev,
      craftId: e.target.value,
      craftName: selected ? selected.name : '',
      state: selected ? selected.state : prev.state
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = {
        ...formData,
        simulatedDocs: JSON.stringify(simulatedFiles.map(f => ({
          type: f.type,
          fileName: f.name,
          verified: false
        })))
      };

      const res = await registerSeller(payload);
      if (res.success) {
        setSuccessData(res.data);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        loadData();
      }
    } catch (err) {
      console.error(err);
      alert('Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickVerify = async (sellerId) => {
    try {
      await verifySeller(sellerId, 'verified', 'GI Certified Master Artisan');
      loadData();
      confetti({ particleCount: 60, spread: 60 });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-900 to-amber-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-amber-500/30 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>National Artisan Registry & Trust Shield</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight">
            Artisan Verification & Seller Portal
          </h1>
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
            Eliminate exploitative middlemen. Verify your generational craft legacy, obtain the prestigious <strong>GI Protected Artisan Badge</strong>, and sell directly to verified buyers worldwide.
          </p>
        </div>
      </div>

      {/* 4-Tier Trust Workflow Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            step: '01',
            title: 'Document Upload',
            desc: 'Submit Pehchan Artisan Card, Aadhaar, or GI User Certificate for authenticity check.'
          },
          {
            step: '02',
            title: 'Cross-Verification',
            desc: 'Validated against Ministry of Textiles, Tribes India, or State Handicrafts Board records.'
          },
          {
            step: '03',
            title: 'Community Endorsement',
            desc: 'Validated by registered craft cooperatives or master artisan guilds.'
          },
          {
            step: '04',
            title: 'Verified Badge Grant',
            desc: 'Receive official Verified Master Craftsman badge and priority directory listing.'
          }
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200 hover:border-amber-400 transition-all space-y-3"
          >
            <span className="text-3xl font-black text-amber-600/30 font-serif">
              {item.step}
            </span>
            <h4 className="font-bold text-stone-900 text-base">
              {item.title}
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Registration Form & Status Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left 2 Cols: Form */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-stone-200 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-stone-900 font-serif">
              Artisan Onboarding Application
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Please enter official details corresponding to your artisan identification records.
            </p>
          </div>

          {successData ? (
            <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-6 text-center space-y-4 animate-fadeIn">
              <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-emerald-950 font-serif">
                Application Submitted Successfully!
              </h3>
              <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                Your application for <strong>{successData.businessName}</strong> ({successData.craftName}) has been assigned ID <code>{successData.id}</code> and is now pending government / NGO cross-verification.
              </p>
              <button
                onClick={() => setSuccessData(null)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs px-6 py-2.5 rounded-xl shadow cursor-pointer"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Master Artisan Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.artisanName}
                    onChange={e => setFormData({ ...formData, artisanName: e.target.value })}
                    placeholder="e.g. Rameshwar Lal Prajapati"
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Studio / Cooperative Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. Sanganer Heritage Pottery Guild"
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Traditional Craft Specialty *
                  </label>
                  <select
                    value={formData.craftId}
                    onChange={handleCraftChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  >
                    {craftsList.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.state})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    State / Region
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={e => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Artisan Pehchan Card Number
                  </label>
                  <input
                    type="text"
                    value={formData.pehchanCardNo}
                    onChange={e => setFormData({ ...formData, pehchanCardNo: e.target.value })}
                    placeholder="e.g. RJ-JPR-2024-5921"
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm font-mono focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Aadhaar Last 4 Digits
                  </label>
                  <input
                    type="text"
                    maxLength={4}
                    value={formData.aadhaarMasked}
                    onChange={e => setFormData({ ...formData, aadhaarMasked: e.target.value })}
                    placeholder="e.g. 7842"
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm font-mono focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="artisan.studio@gmail.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Workshop Physical Address *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Plot 14, Potters Colony, Main Bazaar, Amer, Rajasthan 302028"
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Document Upload Simulation Box */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Verification Documents (Uploaded for Cross-Check)
                </label>
                <div className="border-2 border-dashed border-stone-300 rounded-2xl p-4 sm:p-6 bg-stone-50 text-center space-y-2">
                  <UploadCloud className="w-8 h-8 text-amber-600 mx-auto" />
                  <p className="text-xs font-semibold text-stone-800">
                    PDF, JPG, PNG or Government DigiLocker e-Certificates
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 pt-2">
                    {simulatedFiles.map((f, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center space-x-1.5 bg-white border border-stone-300 text-stone-700 text-xs px-3 py-1.5 rounded-xl shadow-2xs"
                      >
                        <FileText className="w-3.5 h-3.5 text-amber-600" />
                        <span>{f.name} ({f.size})</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-xl shadow-amber-600/30 flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>{submitting ? 'Submitting Application...' : 'Submit Artisan Verification Application'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Col: Live Directory & Interactive Demo Reviewer */}
        <div className="space-y-6">
          <div className="bg-stone-900 text-white rounded-3xl p-6 shadow-xl border border-stone-800 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-sm text-white">
                  Live Artisan Applications ({sellersList.length})
                </h3>
              </div>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                Live Sync
              </span>
            </div>

            <div className="space-y-3 max-h-[560px] overflow-y-auto pr-1">
              {sellersList.map((seller) => (
                <div
                  key={seller.id}
                  className="bg-stone-950/80 rounded-2xl p-4 border border-stone-800 hover:border-amber-500/50 transition-all space-y-2.5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white">
                        {seller.businessName}
                      </h4>
                      <p className="text-[11px] text-amber-300 font-medium">
                        {seller.artisanName}
                      </p>
                      <p className="text-[10px] text-stone-400">
                        {seller.craftName}
                      </p>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        seller.verificationStatus === 'verified'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}
                    >
                      {seller.verificationStatus.toUpperCase()}
                    </span>
                  </div>

                  <div className="text-[10px] text-stone-400 font-mono">
                    Pehchan: {seller.pehchanCardNo || 'PENDING'}
                  </div>

                  {seller.verificationStatus !== 'verified' && (
                    <button
                      onClick={() => handleQuickVerify(seller.id)}
                      className="w-full bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/30 font-semibold text-[11px] py-1.5 rounded-xl flex items-center justify-center space-x-1 transition-all cursor-pointer"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Simulate Govt Verification</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
