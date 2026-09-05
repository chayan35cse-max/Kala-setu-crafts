import React, { useState } from 'react';
import { Gift, ShieldCheck, Users, Send, CheckCircle2, Award, Heart, Sparkles, Building2, Download } from 'lucide-react';
import confetti from 'canvas-confetti';

const CORPORATE_HAMPERS = [
  {
    id: 'hamp-1',
    name: 'The Royal Jaipur Cobalt & Gilded Hamper',
    price: 3850,
    minQty: 15,
    craftsIncluded: 'Hand-painted Blue Pottery Surahi + Pure Brass Diya + Organic Saffron Tea',
    originState: 'Rajasthan',
    impactStory: 'Each hamper provides 8 days of guaranteed fair-wage artisan employment to Amer potters.',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'hamp-2',
    name: 'The Bastar Tribal Lost-Wax Bronze Suite',
    price: 4900,
    minQty: 10,
    craftsIncluded: 'Lost-Wax Cast Bronze Elephant Figurine + Handmade Bell-Metal Coasters',
    originState: 'Chhattisgarh',
    impactStory: 'Supports 22 Ghadwa tribal metallurgy households in Kondagaon forest villages.',
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'hamp-3',
    name: 'The Brahmaputra Zero-Carbon Eco-Bamboo Kit',
    price: 2200,
    minQty: 25,
    craftsIncluded: 'Assam Woven Bamboo Desk Organizer + Cane Flask + Tokou Bookmark',
    originState: 'Assam',
    impactStory: '100% biodegradable and zero-plastic, empowering women weavers in Nalbari.',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'hamp-4',
    name: 'The Kashmir Royal Silk & Pashmina Stole Box',
    price: 8500,
    minQty: 10,
    craftsIncluded: 'Handwoven Kashmiri Pashmina Stole + Walnut Wood Carved Keepsake Box',
    originState: 'Jammu & Kashmir',
    impactStory: 'Direct fair-trade procurement preserving handloom charkha spinning in Zadibal.',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=600&q=80'
  }
];

export default function CorporateGiftingPage() {
  const [selectedHamper, setSelectedHamper] = useState(CORPORATE_HAMPERS[0]);
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [quantity, setQuantity] = useState(25);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitInquiry = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({ particleCount: 80, spread: 75, origin: { y: 0.6 } });
    setTimeout(() => {
      setSubmitted(false);
      setCompanyName('');
      setContactPerson('');
      setEmail('');
      alert('Corporate inquiry sent! Our artisan cooperative manager will contact you within 4 business hours with custom engraving options.');
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fadeIn">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-amber-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-300 border border-amber-400/30 px-3.5 py-1.5 rounded-full text-xs font-bold">
            <Building2 className="w-4 h-4" />
            <span>B2B Institutional & Corporate Gifting</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight">
            Sustainable Artisan Gifting with Real Social Impact
          </h1>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Replace mass-produced plastic corporate gifts with certified Indian handcrafted treasures. Direct from master artisan guilds with custom corporate logo engraving and verified impact certificates.
          </p>
        </div>

        <div className="absolute right-6 -bottom-8 opacity-10 pointer-events-none hidden md:block">
          <Gift className="w-72 h-72 text-amber-500" />
        </div>
      </div>

      {/* Hampers Catalog */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-serif font-black text-stone-900">
            Curated Traditional Heritage Hampers
          </h2>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            100% Direct Fair-Trade Proceeds
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {CORPORATE_HAMPERS.map((hamp) => (
            <div
              key={hamp.id}
              onClick={() => setSelectedHamper(hamp)}
              className={`bg-white rounded-3xl p-5 border-2 transition-all cursor-pointer shadow-md flex flex-col justify-between space-y-3 ${
                selectedHamper.id === hamp.id ? 'border-amber-700 ring-4 ring-amber-700/20 shadow-xl' : 'border-stone-200 hover:border-amber-400'
              }`}
            >
              <div className="space-y-3">
                <div className="h-44 rounded-2xl overflow-hidden bg-stone-100 relative">
                  <img src={hamp.image} alt={hamp.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2.5 left-2.5 bg-stone-950/80 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    {hamp.originState}
                  </div>
                </div>

                <div>
                  <h4 className="font-serif font-bold text-stone-900 text-base leading-snug">{hamp.name}</h4>
                  <p className="text-[11px] text-stone-500 mt-1">{hamp.craftsIncluded}</p>
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-stone-100 text-xs">
                <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-100 text-[11px] text-emerald-900 leading-tight font-medium">
                  🌱 {hamp.impactStory}
                </div>

                <div className="flex items-center justify-between font-bold pt-1">
                  <span className="text-amber-900 text-sm">₹{hamp.price} / unit</span>
                  <span className="text-stone-400 text-[10px]">Min. {hamp.minQty} units</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Corporate Quotation Request Form */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 space-y-4">
          <div className="inline-flex items-center space-x-1.5 text-amber-700 text-xs font-bold uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Custom Logo & Packaging</span>
          </div>

          <h3 className="text-2xl font-serif font-black text-stone-900">
            Request Instant Corporate Quotation
          </h3>

          <p className="text-xs text-stone-600 leading-relaxed">
            Selected Set: <strong className="text-stone-900">{selectedHamper.name}</strong>. We provide custom silk-screen corporate logos, custom handwritten parchment notes from the artisan, and nationwide shipping.
          </p>

          <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-1">
            <span className="font-bold block">Corporate Assurance:</span>
            <p>• Authenticity Certificate with every hamper.</p>
            <p>• GST invoice & ESG social impact audit report included.</p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <form onSubmit={handleSubmitInquiry} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Company / Organization Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tata Consultancy Services"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:ring-2 focus:ring-amber-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Contact Person</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sanya Kapoor (Head of HR)"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:ring-2 focus:ring-amber-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Corporate Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="sanya.k@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:ring-2 focus:ring-amber-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Estimated Quantity (Units)</label>
                <input
                  type="number"
                  min="10"
                  max="5000"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:ring-2 focus:ring-amber-700"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="w-full bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-800 hover:to-orange-800 text-white font-bold text-xs py-3.5 rounded-xl shadow-lg shadow-amber-700/25 transition-all cursor-pointer disabled:opacity-50"
            >
              {submitted ? 'Generating Custom B2B Quotation...' : `Request Quote for ${quantity} Units (Est. ₹${(selectedHamper.price * quantity).toLocaleString('en-IN')})`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
