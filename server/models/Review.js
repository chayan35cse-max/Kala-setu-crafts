import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  craftId: { type: String, required: true, index: true },
  sellerId: { type: String, index: true },
  buyerName: { type: String, required: true },
  buyerEmail: { type: String },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  verifiedPurchase: { type: Boolean, default: true },
  orderId: { type: String }
}, {
  timestamps: true
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
