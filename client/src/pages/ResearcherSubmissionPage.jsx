import React, { useState } from 'react';
import {
  BookOpen,
  Send,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Upload,
  CheckCircle2,
  Users,
  MapPin,
  ExternalLink,
  Info
} from 'lucide-react';
import { submitResearchedCraft } from '../services/api';
import confetti from 'canvas-confetti';

export default function ResearcherSubmissionPage({ onCraftCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    nativeName: '',
    state: 'Rajasthan',
    region: 'North',
    category: 'Folk Painting',
    status: 'endangered',
    verification_source: '',
    description: '',
    history: '',
    technique: '',
    materials: '',
    sellerContact: '',
    onlineStoreLink: '',
    thumbnailUrl: '',
    GI_tagged: false
  });

  const [submitting, setSubmitting] = useState(false);
  const [successSubmission, setSuccessSubmission] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.verification_source) {
      alert('Please fill all required fields including the verification source.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        materials: formData.materials.split(',').map(m => m.trim()).filter(Boolean),
        GI_tagged: false,
        giTagged: false,
        verification_status: 'pending_verification'
      };

      const res = await submitResearchedCraft(payload);
      if (res.success) {
        confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
        setSuccessSubmission(res.data);
        if (onCraftCreated) onCraftCreated(res.data);
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Error submitting research');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSuccessSubmission(null);
    setFormData({
      name: '',
      nativeName: '',
      state: 'Rajasthan',
      region: 'North',
      category: 'Folk Painting',
      status: 'endangered',
      verification_source: '',
      description: '',
      history: '',
      technique: '',
      materials: '',
      sellerContact: '',
      onlineStoreLink: '',
      thumbnailUrl: '',
      GI_tagged: false
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-900 to-purple-950 text-white rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3.5 py-1 rounded-full text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Academic & NGO Field Contribution Portal</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight">
            Contribute Non-GI Craft Research
          </h1>

          <p className="text-blue-100/90 text-sm leading-relaxed">
            Help document and safeguard India's endangered and active traditional crafts. Your verified field data enables cultural preservation, public awareness, and ethical market linkages.
          </p>
        </div>

        <div className="absolute right-6 -bottom-6 opacity-10 pointer-events-none hidden md:block">
          <BookOpen className="w-64 h-64 text-blue-400" />
        </div>
      </div>

      {/* Submission Success Confirmation */}
      {successSubmission ? (
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-emerald-200 shadow-xl space-y-6 text-center animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h3 className="text-2xl font-serif font-black text-stone-900">
              Research Contribution Submitted!
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Thank you for documenting <span className="font-bold text-stone-900">{successSubmission.name}</span>. Your submission is now marked as <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">Pending Verification</span> and will be reviewed by the cultural advisory committee.
            </p>
          </div>

          {/* Submitted Summary Card */}
          <div className="max-w-md mx-auto bg-stone-50 rounded-2xl p-5 border border-stone-200 text-left text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-900">{successSubmission.name}</span>
              <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full text-[10px]">
                {successSubmission.status === 'endangered' ? '🔴 Non-GI Endangered' : '🔵 Non-GI Active'}
              </span>
            </div>
            <p className="text-stone-500 line-clamp-2">{successSubmission.description}</p>
            <div className="pt-2 border-t border-stone-200 text-[11px] text-stone-600">
              <span className="font-semibold">Source: </span> {successSubmission.verification_source}
            </div>
          </div>

          <button
            onClick={handleReset}
            className="bg-stone-900 hover:bg-black text-white text-xs font-bold px-6 py-3 rounded-xl transition-colors cursor-pointer"
          >
            Submit Another Craft Field Study
          </button>
        </div>
      ) : (
        /* Submission Form */
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-xl space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h3 className="text-lg font-serif font-bold text-stone-900 flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-700" />
              <span>Craft Metadata & Anthropological Details</span>
            </h3>
            <p className="text-xs text-stone-500">
              All submissions undergo rigorous archival verification before being marked as fully verified in the sovereign atlas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Craft Name */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Craft Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Sanjhi Paper Stencil Art"
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:ring-2 focus:ring-blue-700"
              />
            </div>

            {/* Native Name */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Native Script Name</label>
              <input
                type="text"
                name="nativeName"
                value={formData.nativeName}
                onChange={handleChange}
                placeholder="e.g. साँझी कला"
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:ring-2 focus:ring-blue-700"
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">State / Union Territory <span className="text-red-500">*</span></label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:ring-2 focus:ring-blue-700"
              >
                {['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Region */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Geographical Region <span className="text-red-500">*</span></label>
              <select
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:ring-2 focus:ring-blue-700"
              >
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="East">East</option>
                <option value="West">West</option>
                <option value="North-East">North-East</option>
              </select>
            </div>

            {/* Preservation Status */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Preservation Status <span className="text-red-500">*</span></label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:ring-2 focus:ring-blue-700"
              >
                <option value="endangered">🔴 Endangered (Critical need of preservation)</option>
                <option value="active">🔵 Active (Practiced by active craft clusters)</option>
                <option value="extinct">⚫ Extinct / Historical Reference</option>
              </select>
            </div>

            {/* Verification Source */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Verification Source (NGO / Academic / Guild) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="verification_source"
                required
                value={formData.verification_source}
                onChange={handleChange}
                placeholder="e.g. Dastkar NGO Documentation, NID Academic Field Report"
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:ring-2 focus:ring-blue-700"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Anthropological Summary & Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              required
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the craft's cultural lineage, community identity, and regional significance..."
              className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:ring-2 focus:ring-blue-700"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Technique */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Technique & Craft Chemistry</label>
              <input
                type="text"
                name="technique"
                value={formData.technique}
                onChange={handleChange}
                placeholder="e.g. Lost-wax casting, Natural madder dye fermentation"
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:ring-2 focus:ring-blue-700"
              />
            </div>

            {/* Materials */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Materials (Comma-separated)</label>
              <input
                type="text"
                name="materials"
                value={formData.materials}
                onChange={handleChange}
                placeholder="e.g. Teakwood, Bell Metal, Organic Indigo, Beeswax"
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:ring-2 focus:ring-blue-700"
              />
            </div>

            {/* Artisan Contact */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Artisan Liaison / Contact</label>
              <input
                type="text"
                name="sellerContact"
                value={formData.sellerContact}
                onChange={handleChange}
                placeholder="e.g. +91 98765 43210 (Village Craft Society)"
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:ring-2 focus:ring-blue-700"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Image / Photo URL</label>
              <input
                type="url"
                name="thumbnailUrl"
                value={formData.thumbnailUrl}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:ring-2 focus:ring-blue-700"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
            <span className="text-xs text-stone-500">
              Submissions are archived under open cultural access licenses.
            </span>

            <button
              type="submit"
              disabled={submitting}
              className="bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-bold text-xs py-3.5 px-6 rounded-xl flex items-center space-x-2 shadow-lg shadow-blue-700/25 transition-all cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Submitting Field Study...' : 'Submit Non-GI Research'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
