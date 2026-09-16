import express from 'express';
import { addReview, getReviews } from '../data/store.js';

const router = express.Router();

// GET /api/reviews - Get reviews (optionally filtered by craftId)
router.get('/', async (req, res) => {
  try {
    const { craftId } = req.query;
    const reviews = await getReviews(craftId);
    res.json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/reviews/:craftId - Get reviews for specific craft
router.get('/:craftId', async (req, res) => {
  try {
    const reviews = await getReviews(req.params.craftId);
    res.json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/reviews - Submit a rating and review
router.post('/', async (req, res) => {
  try {
    const { craftId, sellerId, buyerName, rating, comment, reviewText, orderId } = req.body;

    if (!craftId || !rating || (!comment && !reviewText)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide craftId, rating (1-5), and review comment.'
      });
    }

    const review = await addReview({
      craftId,
      sellerId,
      buyerName: buyerName || 'Verified Connoisseur',
      rating: Number(rating),
      comment: comment || reviewText,
      orderId
    });

    res.status(201).json({
      success: true,
      message: 'Review submitted and aggregated successfully!',
      data: review
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
