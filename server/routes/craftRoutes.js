import express from 'express';
import { getAllCrafts, getCraftById, createCraft, getCraftInsights } from '../data/store.js';

const router = express.Router();

// GET /api/crafts - Get all crafts with support for GI_tagged=false, status=endangered, search, category, region
router.get('/', async (req, res) => {
  try {
    const { search, category, region, state, giTagged, GI_tagged, status, verification_status } = req.query;
    
    const crafts = await getAllCrafts({
      search,
      category,
      region,
      state,
      giTagged,
      GI_tagged,
      status,
      verification_status
    });

    res.json({
      success: true,
      count: crafts.length,
      data: crafts
    });
  } catch (err) {
    console.error('Error fetching crafts:', err);
    res.status(500).json({ success: false, error: 'Server error fetching crafts' });
  }
});

// GET /api/crafts/meta/filters - Metadata for filtering
router.get('/meta/filters', async (req, res) => {
  try {
    const all = await getAllCrafts();
    const categories = [...new Set(all.map(c => c.category).filter(Boolean))];
    const states = [...new Set(all.map(c => c.state).filter(Boolean))].sort();
    const regions = ['North', 'South', 'East', 'West', 'North-East'];
    const statuses = ['active', 'endangered', 'extinct'];

    res.json({
      success: true,
      data: {
        categories,
        states,
        regions,
        statuses,
        total: all.length,
        giCount: all.filter(c => c.GI_tagged || c.giTagged).length,
        nonGiCount: all.filter(c => !c.GI_tagged && !c.giTagged).length,
        endangeredCount: all.filter(c => c.status === 'endangered').length
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/crafts/:id/insights - Fetch AI-generated craft insights
router.get('/:id/insights', async (req, res) => {
  try {
    const insights = await getCraftInsights(req.params.id);
    if (!insights.success) {
      return res.status(404).json(insights);
    }
    res.json(insights);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/crafts/:id - Get single craft by ID
router.get('/:id', async (req, res) => {
  try {
    const craft = await getCraftById(req.params.id);
    if (!craft) {
      return res.status(404).json({ success: false, error: 'Craft not found' });
    }
    res.json({ success: true, data: craft });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/crafts - Add new researched craft with verification workflow
router.post('/', async (req, res) => {
  try {
    const {
      name,
      region,
      state,
      description,
      GI_tagged,
      giTagged,
      status,
      verification_source,
      sellerContact,
      onlineStoreLink,
      multimedia,
      materials,
      technique
    } = req.body;

    if (!name || !description || (!state && !region)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide craft name, state/region, and description.'
      });
    }

    const newCraft = await createCraft({
      name,
      state: state || region,
      region: region || 'North',
      coordinates: req.body.coordinates || { lat: 20.5937, lng: 78.9629 },
      category: req.body.category || 'Traditional Folk Art',
      description,
      GI_tagged: GI_tagged !== undefined ? GI_tagged : (giTagged !== undefined ? giTagged : false),
      giTagged: GI_tagged !== undefined ? GI_tagged : (giTagged !== undefined ? giTagged : false),
      status: status || 'active',
      verification_source: verification_source || 'Academic Research & Field Study',
      verification_status: 'pending_verification',
      sellerContact: sellerContact || 'Artisan Liaison Officer',
      onlineStoreLink: onlineStoreLink || '',
      materials: materials || ['Organic Traditional Materials'],
      technique: technique || 'Generational Hand Technique',
      multimedia: multimedia || { images: [req.body.thumbnailUrl || 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80'] },
      thumbnailUrl: req.body.thumbnailUrl || 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80'
    });

    res.status(201).json({
      success: true,
      message: 'Craft submitted successfully for verification review.',
      data: newCraft
    });
  } catch (err) {
    console.error('Error creating craft:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
