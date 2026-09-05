import mongoose from 'mongoose';

const trackingStepSchema = new mongoose.Schema({
  status: { type: String, required: true },
  location: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  description: { type: String, required: true }
});

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true, index: true },
  trackingId: { type: String, required: true, unique: true, index: true }, // e.g. EB982341765IN (India Post Speed Post)
  buyerName: { type: String, required: true },
  buyerEmail: { type: String, required: true },
  buyerPhone: { type: String },
  shippingAddress: { type: String, required: true },
  
  craftId: { type: String, required: true, index: true },
  craftName: { type: String, required: true },
  craftImage: { type: String },
  artisanId: { type: String },
  artisanName: { type: String },
  
  amount: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
  courier: { type: String, default: 'India Post Speed Post' },
  
  // Real-time tracking status
  trackingStatus: {
    type: String,
    enum: [
      'Order Confirmed',
      'Shipped',
      'In Transit',
      'Out for Delivery',
      'Delivered',
      'Return Requested',
      'Returned'
    ],
    default: 'Order Confirmed',
    index: true
  },
  
  orderDate: { type: Date, default: Date.now },
  shippedDate: { type: Date },
  deliveryDate: { type: Date },
  returnDeadline: { type: Date }, // Exactly 10 days from deliveryDate
  
  // 10-Day Return Workflow
  returnStatus: {
    type: String,
    enum: ['none', 'requested', 'approved', 'returned', 'rejected'],
    default: 'none'
  },
  returnReason: { type: String },
  returnRequestedDate: { type: Date },
  
  // Reviews and ratings
  buyerRating: { type: Number, min: 1, max: 5 },
  buyerReview: { type: String },
  
  trackingTimeline: [trackingStepSchema]
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
