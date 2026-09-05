import React from 'react';
import { Award, ShieldCheck, X, Printer, Download, QrCode, CheckCircle2, Feather, Sparkles } from 'lucide-react';

export default function ProvenanceCertificateModal({ craft, order, onClose }) {
  const certId = order?.orderId ? `KS-CERT-${order.orderId.replace('ORD-', '')}` : `KS-CERT-2026-${Math.floor(100000 + Math.random() * 900000)}`;
  const dateStr = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn print:p-0 print:bg-white">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border-4 border-amber-900/30 relative max-h-[95vh] flex flex-col print:shadow-none print:border-none print:max-w-full">
        {/* Close Button (Hidden when printing) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 cursor-pointer print:hidden z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Container with Royal Heritage Border */}
        <div className="p-8 sm:p-12 space-y-6 text-center bg-[#fffdf9] relative overflow-y-auto">
          {/* Ornate Gold Border Inner */}
          <div className="border-4 border-double border-amber-800/40 rounded-2xl p-6 sm:p-8 space-y-6 relative bg-gradient-to-b from-amber-50/30 via-white to-amber-50/20">
            
            {/* Top Emblem */}
            <div className="space-y-1">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-700 via-orange-600 to-amber-500 text-white flex items-center justify-center mx-auto shadow-md border-2 border-amber-300">
                <Feather className="w-7 h-7" />
              </div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-amber-900 pt-2">
                Republic of India • Cultural Heritage Sovereign Registry
              </h2>
              <h1 className="text-2xl sm:text-3xl font-serif font-black text-stone-900 tracking-tight">
                Certificate of Provenance & Authenticity
              </h1>
              <p className="text-[11px] text-amber-800/90 font-serif italic">
                Issued under the KalaSetu National Craft Heritage Protocol
              </p>
            </div>

            {/* Certificate ID & Issue Date */}
            <div className="flex items-center justify-between text-xs text-stone-500 border-y border-amber-900/20 py-2.5 font-mono">
              <span>CERTIFICATE NO: <strong className="text-stone-900">{certId}</strong></span>
              <span>ISSUED ON: <strong className="text-stone-900">{dateStr}</strong></span>
            </div>

            {/* Recipient & Craft Attestation */}
            <div className="space-y-3 text-stone-800 text-xs sm:text-sm leading-relaxed">
              <p className="italic text-stone-600">
                This is to officially certify that the handcrafted artifact titled:
              </p>
              
              <div className="bg-white border-2 border-amber-700/20 rounded-xl p-4 shadow-sm space-y-1">
                <h3 className="text-xl sm:text-2xl font-serif font-black text-amber-950">
                  {craft?.name || order?.craftName || 'Traditional Masterpiece'}
                </h3>
                {craft?.nativeName && (
                  <p className="text-xs font-serif font-bold text-amber-800">{craft.nativeName}</p>
                )}
                <p className="text-xs text-stone-500 font-medium">
                  Geographic Lineage: <span className="font-bold text-stone-800">{craft?.state || 'India'}</span>
                </p>
              </div>

              <p className="text-stone-600 text-xs text-justify sm:text-center leading-relaxed">
                has been rigorously verified as an authentic, 100% handmade traditional creation. Crafted using indigenous raw materials and ancient manual techniques, certified free of industrial machine-replication.
              </p>
            </div>

            {/* Verification Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-left text-[11px] bg-amber-50/50 p-4 rounded-xl border border-amber-200/60">
              <div>
                <span className="text-stone-400 block font-bold">GI / LEGAL STATUS</span>
                <span className="font-bold text-emerald-800">
                  {craft?.GI_tagged || craft?.giTagged ? `GI Certified (GI-${craft.giYear || 'Official'})` : `Researched Non-GI (${craft?.status || 'Active'})`}
                </span>
              </div>
              <div>
                <span className="text-stone-400 block font-bold">MASTER ARTISAN</span>
                <span className="font-bold text-stone-800">{craft?.sellers?.[0]?.name || order?.artisanName || 'Heritage Guild Master'}</span>
              </div>
              <div>
                <span className="text-stone-400 block font-bold">PEHCHAN ID</span>
                <span className="font-bold font-mono text-amber-900">PEH-2026-9821</span>
              </div>
            </div>

            {/* Signatures & QR Seal */}
            <div className="pt-4 flex items-center justify-between">
              {/* Seal */}
              <div className="text-left space-y-1">
                <div className="w-12 h-12 rounded-xl bg-stone-900 text-white flex items-center justify-center font-bold text-xs shadow-md">
                  <QrCode className="w-8 h-8" />
                </div>
                <span className="text-[9px] font-mono text-stone-400 block">Scan to Verify Provenance</span>
              </div>

              {/* Gold Ribbon */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-500 text-stone-950 flex items-center justify-center font-bold text-xs shadow-xl border-2 border-white ring-2 ring-amber-400">
                  <ShieldCheck className="w-7 h-7 text-amber-950" />
                </div>
                <span className="text-[9px] font-bold text-amber-900 mt-1 uppercase">100% Authentic</span>
              </div>

              {/* Signature */}
              <div className="text-right space-y-1">
                <div className="font-serif italic text-base text-stone-800 font-bold border-b border-stone-400 pb-0.5">
                  K. S. Prajapati
                </div>
                <span className="text-[9px] text-stone-500 block">Registrar of Traditional Crafts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Print / Download Buttons (Hidden when printing) */}
        <div className="bg-stone-50 border-t border-stone-200 p-4 flex items-center justify-between flex-shrink-0 print:hidden">
          <span className="text-xs text-stone-500">Official KalaSetu Digital Provenance Document</span>
          
          <button
            onClick={handlePrint}
            className="bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center space-x-2 transition-all cursor-pointer shadow-md shadow-amber-700/20"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF Certificate</span>
          </button>
        </div>
      </div>
    </div>
  );
}
