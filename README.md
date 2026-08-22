# KalaSetu: Indian Traditional Crafts Cultural Archive & Artisan Marketplace

> **Preserving Timeless Heritage, Empowering Living Masters.**

**KalaSetu** is an interactive digital cultural archive and verified marketplace connecting India's traditional artisans directly to cultural researchers, connoisseurs, and conscious buyers worldwide.

---

## 🎨 Key Features & Architecture

### 1. 🗺️ Interactive India Craft Map (Leaflet.js)
- **Geographic Exploration**: Centered on India with precise coordinates for traditional craft clusters across Northern, Southern, Eastern, Western, and North-Eastern states.
- **Custom Cultural Markers**: Color-coded by craft category (Pottery, Textiles, Metalwork, Sacred Art, Woodcraft, Eco-Bamboo) with glowing selection rings and GI Tag badges.
- **Rich Preview Popups**: Craft thumbnails, native script names, state badges, verified artisan counts, and direct **"See More Details"** action.
- **Faceted Filters**: Real-time filtering by Indian State, Craft Discipline, Raw Materials, and GI Protection status.

### 2. 🏛️ Dedicated Cultural Archive & Details Pages
- **Historical & Anthropological Lineage**: Royal patronages (Mughals, Nayakas, Malla Dynasty, Tipu Sultan), temple rituals, and mythological origins.
- **Master Techniques & Making Process**: Interactive stepped workflows breaking down age-old techniques (Dough-molding without clay, Cire perdue lost-wax, Gesso 22K gold embossing, Reverse darning stitch, Castor oil gel trailing).
- **Verified Offline Seller Directory**: Physical addresses, phone numbers, GPS map links, and workshop visiting guidelines for master craftsmen and cooperatives.
- **Direct Online Stores**: Verified links to official cooperative portals (Tribes India, ONDC, Lepakshi, Biswa Bangla).
- **Oral Tradition Audio Player**: Listen to authentic folk stories and native pronunciations.

### 3. 🏺 3D Craft Model Inspector (Three.js / WebGL)
- **High-Fidelity 3D Procedural Models**:
  - **Jaipur Blue Pottery**: Ornate traditional Surahi vase with Persian cobalt arabesques, turquoise glazes, and gold neck accents.
  - **Channapatna Lacquered Wooden Toy**: Lathe-turned Ivory wood segments colored with all-natural non-toxic vegetable lacquers.
  - **Bastar Dhokra Lost-Wax Figurine**: Rustic bronze bell-metal tribal casting with antique patina and wax-wire textures.
  - **Bankura Terracotta Sacred Vessel**: Earthy alluvial clay texture, incised geometric patterns, and flared rosetted rim.
- **Interactive Controls**: 360° Orbit controls, Studio / Temple Warmth / Sunset Gold lighting modes, Wireframe structural inspection, and auto-rotation toggle.

### 4. 🛡️ Artisan Onboarding & Trust Verification System
- **4-Tier Trust Workflow**:
  1. *Document Submission*: Pehchan Artisan Card, masked Aadhaar, and GI Authenticity Certificates.
  2. *Official Cross-Validation*: Verification against Ministry of Textiles / Tribes India databases.
  3. *Cooperative & NGO Endorsements*: Validation by master artisan guilds.
  4. *Verified Badge Grant*: Official GI Master Craftsman badge and priority marketplace directory placement.
- **Interactive Review Simulation**: Ability to test and simulate approval workflows in real time.

### 5. 🤖 AI Cultural Assistant & Multilingual Localization (i18n)
- **HuggingFace / NLP Tagging Assistant**: Semantic tagging and anthropological analysis from natural language descriptions.
- **AI Cultural Recommender**: Suggests companion traditional crafts sharing natural materials, dyeing techniques, or historical eras.
- **Indian Language Localization**: Seamless multi-language toggle for **English**, **Hindi (हिंदी)**, **Tamil (தமிழ்)**, and **Bengali (বাংলা)**.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS v4, Leaflet.js (`react-leaflet`), Three.js (`@react-three/fiber`, `@react-three/drei`), `i18next`, `lucide-react`, `canvas-confetti`, `axios`.
- **Backend**: Node.js, Express.js, Mongoose, Multer, CORS, Dotenv.
- **Database**: MongoDB (with high-performance embedded fallback datastore with 15+ pre-seeded authentic Indian crafts).

---

## 🚀 Quick Start Guide

### 1. Start the Backend API Server
```bash
cd server
npm install
npm start
# API runs on http://localhost:5000
```

### 2. Start the Frontend Application
```bash
cd client
npm install
npm run dev
# Web app runs on http://localhost:5173
```

---

## 📡 REST API Endpoints

- `GET /api/crafts` - List all traditional crafts with optional filtering (`state`, `category`, `material`, `giOnly`, `search`)
- `GET /api/crafts/:id` - Fetch comprehensive craft record with sellers, history, and AI-related sister crafts
- `GET /api/crafts/meta/filters` - Fetch available states, categories, and materials
- `GET /api/sellers` - Directory of verified master artisans and cooperatives
- `POST /api/sellers/register` - Submit artisan registration with document upload simulation
- `PUT /api/sellers/:id/verify` - Update artisan verification status and assign trust badges
- `POST /api/ai/tag` - AI semantic tagging and cultural insights
- `GET /api/ai/search` - Smart semantic search query processor
- `GET /api/health` - Backend and MongoDB live health status
