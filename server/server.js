import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';
import craftRoutes from './routes/craftRoutes.js';
import sellerRoutes from './routes/sellerRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import { setMongoConnected, seedDatabaseIfEmpty, getAllSellers, getAllCrafts, getAllOrders } from './data/store.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable formatted (pretty-printed) JSON output in browser
app.set('json spaces', 2);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded documents
const uploadsDir = path.resolve('uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use('/uploads', express.static(uploadsDir));

// Connect to MongoDB if available, otherwise use resilient memory fallback
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kalasetu';

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 2000
}).then(() => {
  console.log('✅ Connected to MongoDB at:', MONGODB_URI);
  setMongoConnected(true);
  seedDatabaseIfEmpty();
}).catch((err) => {
  console.log('ℹ️ MongoDB not connected (running in high-performance embedded mode with pre-seeded crafts).');
  setMongoConnected(false);
});

// API Routes
app.use('/api/crafts', craftRoutes);
app.use('/api/sellers', sellerRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);

// Visual Admin / Registry Dashboard endpoint
app.get(['/admin', '/dashboard', '/api/sellers/view'], async (req, res) => {
  try {
    const sellers = await getAllSellers();
    const crafts = await getAllCrafts();
    const orders = await getAllOrders();

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KalaSetu - National Artisan & Crafts Registry</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; }
    .cinzel { font-family: 'Cinzel', serif; }
  </style>
</head>
<body class="bg-stone-950 text-stone-100 min-h-screen">
  <!-- Top Navigation -->
  <header class="border-b border-amber-900/30 bg-stone-900/80 backdrop-blur sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <span class="text-2xl">🏛️</span>
        <div>
          <h1 class="cinzel text-lg sm:text-xl font-bold text-amber-400">KalaSetu Registry Portal</h1>
          <p class="text-[10px] text-amber-200/60 uppercase tracking-widest">National Master Artisan & Crafts Database</p>
        </div>
      </div>
      <div class="flex items-center space-x-3 text-xs">
        <a href="http://localhost:5173" target="_blank" class="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-lg transition-all shadow-md">
          Open Web App (5173) ↗
        </a>
        <a href="/api/sellers" target="_blank" class="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-amber-300 font-mono rounded-lg border border-amber-500/20">
          Raw JSON ↗
        </a>
      </div>
    </div>
  </header>

  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-stone-900/60 border border-amber-900/20 p-5 rounded-2xl">
        <p class="text-xs text-amber-400 font-bold uppercase tracking-wider">Registered Artisans</p>
        <p class="text-3xl font-black text-amber-200 mt-2">${sellers.length}</p>
        <p class="text-xs text-stone-400 mt-1">Verified & Active Guilds</p>
      </div>
      <div class="bg-stone-900/60 border border-amber-900/20 p-5 rounded-2xl">
        <p class="text-xs text-emerald-400 font-bold uppercase tracking-wider">Archived Crafts</p>
        <p class="text-3xl font-black text-emerald-200 mt-2">${crafts.length}</p>
        <p class="text-xs text-stone-400 mt-1">GI Tagged & Folk Heritage</p>
      </div>
      <div class="bg-stone-900/60 border border-amber-900/20 p-5 rounded-2xl">
        <p class="text-xs text-blue-400 font-bold uppercase tracking-wider">Active Orders</p>
        <p class="text-3xl font-black text-blue-200 mt-2">${orders.length}</p>
        <p class="text-xs text-stone-400 mt-1">India Post Speed Post</p>
      </div>
      <div class="bg-stone-900/60 border border-amber-900/20 p-5 rounded-2xl">
        <p class="text-xs text-amber-400 font-bold uppercase tracking-wider">Storage Mode</p>
        <p class="text-lg font-bold text-amber-300 mt-3">${mongoose.connection.readyState === 1 ? '🟢 MongoDB Live' : '📁 Persistent Disk File'}</p>
        <p class="text-xs text-stone-400 mt-1">Auto-synced on disk</p>
      </div>
    </div>

    <!-- Search & Filters -->
    <div class="flex flex-col sm:flex-row gap-4 items-center justify-between bg-stone-900/40 p-4 rounded-2xl border border-stone-800">
      <div class="w-full sm:w-80">
        <input 
          id="searchInput"
          type="text" 
          placeholder="Search artisan, craft, or district..." 
          onkeyup="filterTable()"
          class="w-full bg-stone-950 border border-stone-700 text-stone-200 px-4 py-2 rounded-xl text-sm focus:outline-none focus:border-amber-500"
        />
      </div>
      <div class="text-xs text-stone-400">
        Showing <span id="visibleCount" class="font-bold text-amber-400">${sellers.length}</span> artisans
      </div>
    </div>

    <!-- Table of Registered Artisans -->
    <div class="bg-stone-900/50 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm" id="artisanTable">
          <thead class="bg-stone-900/90 text-amber-400 text-xs uppercase tracking-wider border-b border-stone-800">
            <tr>
              <th class="p-4">Artisan & Studio</th>
              <th class="p-4">Craft Tradition</th>
              <th class="p-4">Region / State</th>
              <th class="p-4">Pehchan / Aadhaar</th>
              <th class="p-4">Contact Info</th>
              <th class="p-4">Verification</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-800/60">
            ${sellers.map(s => `
              <tr class="hover:bg-stone-800/30 transition-colors">
                <td class="p-4">
                  <div class="font-bold text-stone-100">${s.artisanName || 'Master Craftsman'}</div>
                  <div class="text-xs text-amber-300/80 font-medium">${s.businessName || 'Guild Studio'}</div>
                  <div class="text-[11px] text-stone-400 mt-0.5">${s.experienceYears || 15}+ years exp.</div>
                </td>
                <td class="p-4">
                  <span class="inline-block px-2.5 py-1 bg-amber-950/60 text-amber-300 border border-amber-800/40 rounded-lg text-xs font-semibold">
                    ${s.craftName || s.craftId}
                  </span>
                </td>
                <td class="p-4">
                  <div class="text-stone-200">${s.state || 'India'}</div>
                  <div class="text-[11px] text-stone-400 max-w-[180px] truncate" title="${s.address || ''}">${s.address || 'Workshop Cluster'}</div>
                </td>
                <td class="p-4 font-mono text-xs">
                  <div class="text-amber-200">${s.pehchanCardNo || 'PEH-PENDING'}</div>
                  <div class="text-stone-400 text-[11px]">${s.aadhaarMasked || 'XXXX-XXXX-8921'}</div>
                </td>
                <td class="p-4 text-xs">
                  <div class="text-stone-300">📞 ${s.phone || 'N/A'}</div>
                  <div class="text-stone-400 text-[11px]">✉️ ${s.email || 'N/A'}</div>
                </td>
                <td class="p-4">
                  <span class="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                    s.verificationStatus === 'verified' 
                      ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/50' 
                      : 'bg-amber-950/80 text-amber-400 border border-amber-800/50'
                  }">
                    <span>${s.verificationStatus === 'verified' ? '✓ Verified' : '⏳ Pending'}</span>
                  </span>
                  <div class="text-[10px] text-stone-400 mt-1">${s.trustBadge || 'Guild Member'}</div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </main>

  <script>
    function filterTable() {
      const input = document.getElementById('searchInput').value.toLowerCase();
      const rows = document.querySelectorAll('#artisanTable tbody tr');
      let count = 0;
      rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        if (text.includes(input)) {
          row.style.display = '';
          count++;
        } else {
          row.style.display = 'none';
        }
      });
      document.getElementById('visibleCount').innerText = count;
    }
  </script>
</body>
</html>
    `;
    res.send(html);
  } catch (err) {
    res.status(500).send('Error loading dashboard: ' + err.message);
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'KalaSetu Traditional Crafts API',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'MongoDB Live' : 'Embedded Datastore (Active)'
  });
});

// Serve frontend static build in production
const clientDistPath = path.resolve('../client/dist');
const localDistPath = path.resolve('client/dist');
const distPath = fs.existsSync(clientDistPath) ? clientDistPath : fs.existsSync(localDistPath) ? localDistPath : null;

if (distPath) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api') && !req.path.startsWith('/uploads') && !req.path.startsWith('/admin')) {
      res.sendFile(path.join(distPath, 'index.html'));
    }
  });
}

app.listen(PORT, () => {
  console.log(`✨ KalaSetu Server running smoothly on http://localhost:${PORT}`);
});
