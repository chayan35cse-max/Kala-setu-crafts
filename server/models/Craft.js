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
  rating: { type: Number, default: 4.5 },
  reviewCount: { type: Number, default: 0 },
  onlineStoreUrl: { type: String },
  workshopVisits: { type: String }
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
  giTagged: { type: Boolean, default: false, index: true },
  giYear: { type: Number },
  preservationStatus: { type: String, default: 'Thriving' },
  era: { type: String },
  tagline: { type: String },
  description: { type: String, required: true },
  history: { type: String },
  culturalSignificance: { type: String },
  makingProcess: [makingProcessStepSchema],
  model3DType: { type: String, default: 'pottery' },
  thumbnailUrl: { type: String },
  images: [{ type: String }],
  videoUrl: { type: String },
  audioStory: { type: String },
  artisanGroup: { type: String },
  sellers: [sellerRefSchema],
  tags: [{ type: String, index: true }]
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
  state: 'text'
});

const Craft = mongoose.model('Craft', craftSchema);
export default Craft;
