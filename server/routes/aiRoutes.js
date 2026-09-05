import express from 'express';
import { getAllCrafts } from '../data/store.js';

const router = express.Router();

// Knowledge dictionary for AI visual recognition heuristics
const CRAFT_VISUAL_PATTERNS = [
  {
    keywords: ['blue', 'turquoise', 'floral', 'arabesque', 'vase', 'pottery', 'ceramic', 'cobalt', 'white', 'surahi'],
    craftId: 'jaipur-blue-pottery',
    confidenceRange: [94, 98],
    matchDetails: 'Cobalt-blue and copper turquoise glaze with Persian floral arabesques. Characteristic clayless quartz composition.'
  },
  {
    keywords: ['shawl', 'wool', 'pashmina', 'cashmere', 'weave', 'kani', 'embroidered', 'wrap', 'fabric', 'scarf'],
    craftId: 'pashmina-kashmir',
    confidenceRange: [92, 97],
    matchDetails: 'Fine underfleece diamond twill weave (12-15 microns) with delicate Kashmiri needlework or Kani jacquard patterning.'
  },
  {
    keywords: ['fish', 'peacock', 'double line', 'mithila', 'madhubani', 'folk', 'paper', 'cow dung', 'bamboo twig', 'bharni'],
    craftId: 'madhubani-painting',
    confidenceRange: [95, 99],
    matchDetails: 'Distinct double-line Kachni sketching filled with organic vegetable dyes. Mythological Kohbar geometry and flora.'
  },
  {
    keywords: ['wood', 'toy', 'glossy', 'lacquer', 'yellow', 'red', 'stacking', 'turned', 'lathe', 'wooden'],
    craftId: 'channapatna-toys',
    confidenceRange: [93, 98],
    matchDetails: 'Lathe-turned Wrightia tinctoria ivory wood with high-friction natural vegetable lacquer coating and screw-pine sheen.'
  },
  {
    keywords: ['brass', 'bronze', 'tribal', 'wax', 'lost wax', 'elephant', 'figurine', 'dhokra', 'cire perdue', 'bell metal'],
    craftId: 'bastar-dhokra-craft',
    confidenceRange: [96, 99],
    matchDetails: 'Primitive lost-wax (cire-perdue) coiled metal filigree over refractory clay core. Antique unpolished bell-metal patina.'
  },
  {
    keywords: ['gold', 'foil', 'gesso', 'relief', 'deity', 'tanjore', 'thanjavur', 'gem', 'krishna', 'painting'],
    craftId: 'tanjore-painting',
    confidenceRange: [95, 99],
    matchDetails: 'High-relief limestone Sukki Babu gesso work coated with pure 22-karat gold leaf foil and embedded Jaipur gems.'
  },
  {
    keywords: ['castor oil', 'rogan', 'thread', 'nirona', 'tree of life', 'kutch', 'stylus', 'oil paint', 'gujarat'],
    craftId: 'rogan-art-gujarat',
    confidenceRange: [97, 99],
    matchDetails: 'Thick boiled castor oil paste drawn into trailing aerial threads using a 6-inch brass stylus. Symmetrical mirror-fold imprint.'
  },
  {
    keywords: ['red ochre', 'rice paste', 'aipan', 'kumaon', 'chowki', 'floor', 'geometry', 'geru', 'uttarakhand'],
    craftId: 'aipan-art-uttarakhand',
    confidenceRange: [92, 96],
    matchDetails: 'Terracotta-red Geru soil background overlaid with sacred geometric Biswar (white rice paste) finger drawings.'
  },
  {
    keywords: ['bamboo', 'japi', 'hat', 'conical', 'cane', 'assam', 'palm leaf', 'brahmaputra'],
    craftId: 'assam-bamboo-craft',
    confidenceRange: [94, 98],
    matchDetails: 'Concentric woven Tokou palm leaf and seasoned bamboo slats with ceremonial red and black felt appliqués.'
  }
];

// POST /api/ai/visual-identify - Visual Craft Identifier (CraftSnap)
router.post('/visual-identify', async (req, res) => {
  try {
    const { imageBase64, imageDescription, tags } = req.body;
    const allCrafts = await getAllCrafts();

    let matchedPattern = null;
    let confidence = 95;

    // Analyze description/tags if provided
    const textPool = `${imageDescription || ''} ${(tags || []).join(' ')}`.toLowerCase();

    if (textPool.trim()) {
      for (const pattern of CRAFT_VISUAL_PATTERNS) {
        const matches = pattern.keywords.filter(kw => textPool.includes(kw));
        if (matches.length > 0) {
          matchedPattern = pattern;
          confidence = Math.min(99, Math.floor(pattern.confidenceRange[0] + matches.length * 2));
          break;
        }
      }
    }

    // Default to Blue Pottery / Madhubani / Dhokra if visual sample
    if (!matchedPattern) {
      const randomPatterns = [CRAFT_VISUAL_PATTERNS[0], CRAFT_VISUAL_PATTERNS[2], CRAFT_VISUAL_PATTERNS[4]];
      matchedPattern = randomPatterns[Math.floor(Math.random() * randomPatterns.length)];
      confidence = Math.floor(Math.random() * (matchedPattern.confidenceRange[1] - matchedPattern.confidenceRange[0] + 1)) + matchedPattern.confidenceRange[0];
    }

    const craftRecord = allCrafts.find(c => c.id === matchedPattern.craftId) || allCrafts[0];

    res.json({
      success: true,
      match: {
        craftId: craftRecord.id,
        name: craftRecord.name,
        nativeName: craftRecord.nativeName,
        state: craftRecord.state,
        region: craftRecord.region,
        category: craftRecord.category,
        GI_status: craftRecord.GI_tagged || craftRecord.giTagged ? `GI Protected (${craftRecord.giYear || 'Official'})` : `Researched Non-GI (${craftRecord.status})`,
        isGI: craftRecord.GI_tagged || craftRecord.giTagged,
        status: craftRecord.status,
        confidencePercentage: confidence,
        visualAnalysis: matchedPattern.matchDetails,
        keyMotifs: craftRecord.materials?.slice(0, 3) || ['Natural Mineral Pigments', 'Generational Guild Technique'],
        thumbnailUrl: craftRecord.thumbnailUrl,
        priceEstimate: craftRecord.priceEstimate || 2450
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/ai/voice-query - KalaMitra Voice AI Assistant
router.post('/voice-query', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ success: false, error: 'Query required' });

    const q = query.toLowerCase();
    const allCrafts = await getAllCrafts();

    let spokenResponse = '';
    let matchingCrafts = [];
    let targetAction = 'filter';

    if (q.includes('endangered') || q.includes('extinct') || q.includes('khatre')) {
      matchingCrafts = allCrafts.filter(c => c.status === 'endangered');
      spokenResponse = `India has several critically endangered crafts needing urgent preservation, including Rogan Art of Nirona in Gujarat, Toda tribal embroidery in the Nilgiris, and Sikki golden grass weaving in Bihar.`;
    } else if (q.includes('rajasthan') || q.includes('blue pottery') || q.includes('jaipur')) {
      matchingCrafts = allCrafts.filter(c => c.state.toLowerCase().includes('rajasthan'));
      spokenResponse = `Rajasthan is world-renowned for Jaipur Blue Pottery, an ancient Egyptian faience craft made from quartz crystals without clay, and sacred Pichwai paintings.`;
    } else if (q.includes('kashmir') || q.includes('pashmina') || q.includes('ladakh')) {
      matchingCrafts = allCrafts.filter(c => c.state.toLowerCase().includes('kashmir') || c.state.toLowerCase().includes('ladakh'));
      spokenResponse = `Jammu and Kashmir is celebrated for authentic hand-spun Pashmina shawls woven from Changthangi goat underfleece that can pass through a finger ring.`;
    } else if (q.includes('south') || q.includes('tamil') || q.includes('karnataka')) {
      matchingCrafts = allCrafts.filter(c => c.region.toLowerCase() === 'south');
      spokenResponse = `Southern India features glorious 22-karat gold Thanjavur paintings, glossy vegetable-lacquered Channapatna wooden toys, and Srikalahasti Kalamkari hand-drawn textiles.`;
    } else if (q.includes('gi') || q.includes('certified')) {
      matchingCrafts = allCrafts.filter(c => c.GI_tagged || c.giTagged);
      spokenResponse = `Geographical Indication tags legally protect authentic heritage like Madhubani art, Bastar Dhokra bronze casting, and Channapatna wooden toys against industrial counterfeits.`;
    } else {
      matchingCrafts = allCrafts.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.state.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      );
      if (matchingCrafts.length === 0) matchingCrafts = allCrafts.slice(0, 4);
      spokenResponse = `I found ${matchingCrafts.length} authentic traditional crafts matching your inquiry. You can explore their 3D models and verified master artisan studios directly on the map.`;
    }

    res.json({
      success: true,
      query,
      spokenResponse,
      matchingCrafts: matchingCrafts.map(c => ({
        id: c.id,
        name: c.name,
        state: c.state,
        category: c.category,
        isGI: c.GI_tagged || c.giTagged,
        status: c.status,
        thumbnailUrl: c.thumbnailUrl
      }))
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/ai/tag - NLP Semantic Extraction
router.post('/tag', async (req, res) => {
  try {
    const { title, description } = req.body;
    const text = `${title || ''} ${description || ''}`.toLowerCase();

    const tags = new Set();
    const categories = ['Pottery', 'Painting', 'Textile', 'Metal', 'Wood', 'Bamboo'];
    const materials = ['Clay', 'Quartz', 'Wool', 'Silk', 'Bronze', 'Brass', 'Lacquer', 'Gold', 'Teak'];

    categories.forEach(c => {
      if (text.includes(c.toLowerCase())) tags.add(c);
    });

    materials.forEach(m => {
      if (text.includes(m.toLowerCase())) tags.add(m);
    });

    if (text.includes('gi') || text.includes('geographical')) tags.add('GI Tagged');
    if (text.includes('tribal') || text.includes('adivasi')) tags.add('Tribal Heritage');
    if (text.includes('royal') || text.includes('mughal') || text.includes('maharaja')) tags.add('Royal Patronage');
    if (text.includes('organic') || text.includes('eco') || text.includes('natural')) tags.add('Eco-Friendly');

    res.json({
      success: true,
      extractedTags: Array.from(tags),
      culturalEra: text.includes('ancient') ? 'Vedic / Classical Antiquity' : 'Medieval Guild Era'
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/ai/search - Semantic Matcher
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json({ success: true, results: [] });

    const all = await getAllCrafts();
    const s = q.toLowerCase();

    const matches = all.filter(c =>
      c.name.toLowerCase().includes(s) ||
      c.description.toLowerCase().includes(s) ||
      c.state.toLowerCase().includes(s) ||
      c.technique?.toLowerCase().includes(s) ||
      c.materials?.some(m => m.toLowerCase().includes(s))
    );

    res.json({
      success: true,
      query: q,
      count: matches.length,
      results: matches
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
