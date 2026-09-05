import express from 'express';
import { addReview } from '../data/store.js';

const router = express.Router();

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
