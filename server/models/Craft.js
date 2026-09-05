import mongoose from 'mongoose';

const makingProcessStepSchema = new mongoose.Schema({
  step: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
});

const sellerRefSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  artisanName: { type: String },
  phone: { type: String },
  email: { type: String },
  address: { type: String },
  location: { type: String },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number }
  },
  verified: { type: Boolean, default: false },
  badge: { type: String },
  rating: { type: Number, default: 4.8 },
  reviewCount: { type: Number, default: 0 },
  onlineStoreUrl: { type: String },
  workshopVisits: { type: String }
});

const reviewSchema = new mongoose.Schema({
  id: { type: String },
  buyerName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  verifiedPurchase: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const craftSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true, index: true },
  nativeName: { type: String },
  state: { type: String, required: true, index: true },
  region: { type: String, required: true },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  category: { type: String, required: true, index: true },
  materials: [{ type: String }],
  technique: { type: String },
  
  // GI Protection Status (Dual supported for GI_tagged & giTagged)
  GI_tagged: { type: Boolean, default: false, index: true },
  giTagged: { type: Boolean, default: false, index: true },
  giYear: { type: Number },
  
  // Preservation & Verification Status
  status: { 
    type: String, 
    enum: ['active', 'endangered', 'extinct', 'Thriving', 'Revived'], 
    default: 'active',
    index: true 
  },
  preservationStatus: { type: String, default: 'active' },
  verification_source: { type: String }, // e.g. "Dastkar NGO Documentation", "National Institute of Design (NID) Study"
  verification_status: { 
    type: String, 
    enum: ['verified', 'pending_verification', 'rejected'], 
    default: 'verified',
    index: true 
  },
  
  // Contact & Commerce
  sellerContact: { type: String },
  onlineStoreLink: { type: String },
  priceEstimate: { type: Number, default: 1450 },
  
  // Historical & Cultural Content
  era: { type: String },
  tagline: { type: String },
  description: { type: String, required: true },
  history: { type: String },
  culturalSignificance: { type: String },
  makingProcess: [makingProcessStepSchema],
  
  // Multimedia
  model3DType: { type: String, default: 'pottery' },
  thumbnailUrl: { type: String },
  images: [{ type: String }],
  videoUrl: { type: String },
  audioStory: { type: String },
  multimedia: {
    images: [{ type: String }],
    videos: [{ type: String }],
    model3DType: { type: String, default: 'pottery' }
  },
  
  artisanGroup: { type: String },
  sellers: [sellerRefSchema],
  tags: [{ type: String, index: true }],
  
  // Ratings and Reviews
  rating: { type: Number, default: 4.8 },
  reviewCount: { type: Number, default: 12 },
  reviews: [reviewSchema]
}, {
  timestamps: true
});

// Text index for fast multi-field search
craftSchema.index({
  name: 'text',
  description: 'text',
  materials: 'text',
  technique: 'text',
  tags: 'text',
  region: 'text',
  state: 'text',
  verification_source: 'text'
});

const Craft = mongoose.model('Craft', craftSchema);
export default Craft;
