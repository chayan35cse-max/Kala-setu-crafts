import express from 'express';
import { getAllCrafts, getCraftById, getAIRelatedCrafts } from '../data/store.js';

const router = express.Router();

// GET /api/crafts - List crafts with optional filters (state, category, material, giOnly, search)
router.get('/', async (req, res) => {
  try {
    const { state, category, material, giOnly, search, preservationStatus } = req.query;
    const crafts = await getAllCrafts({ state, category, material, giOnly, search, preservationStatus });
    res.json({
      success: true,
      count: crafts.length,
      data: crafts
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/crafts/meta - Get list of states, categories, and materials for filters
router.get('/meta/filters', async (req, res) => {
  try {
    const crafts = await getAllCrafts({});
    const states = [...new Set(crafts.map(c => c.state))].sort();
    const categories = [...new Set(crafts.map(c => c.category))].sort();
    const allMaterials = crafts.flatMap(c => c.materials || []);
    const materials = [...new Set(allMaterials.map(m => m.split('(')[0].trim()))].slice(0, 15);

    res.json({
      success: true,
      data: {
        states,
        categories,
        materials,
        totalCrafts: crafts.length,
        totalGITagged: crafts.filter(c => c.giTagged).length
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/crafts/:id - Single craft details
router.get('/:id', async (req, res) => {
  try {
    const craft = await getCraftById(req.params.id);
    if (!craft) {
      return res.status(404).json({ success: false, message: 'Craft not found' });
    }
    const related = await getAIRelatedCrafts(req.params.id);
    res.json({
      success: true,
      data: {
        ...craft,
        relatedCrafts: related
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
