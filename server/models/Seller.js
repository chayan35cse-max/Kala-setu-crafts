import mongoose from 'mongoose';

const verificationDocSchema = new mongoose.Schema({
  type: { type: String, required: true },
  fileName: { type: String, required: true },
  fileUrl: { type: String },
  verified: { type: Boolean, default: false },
  uploadedAt: { type: Date, default: Date.now }
});

const sellerSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  artisanName: { type: String, required: true },
  businessName: { type: String, required: true },
  craftId: { type: String, required: true, index: true },
  craftName: { type: String, required: true },
  state: { type: String, required: true },
  pehchanCardNo: { type: String },
  aadhaarMasked: { type: String },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  verificationStatus: {
    type: String,
    enum: ['pending', 'under_review', 'verified', 'rejected'],
    default: 'pending',
    index: true
  },
  verificationDocuments: [verificationDocSchema],
  ngoEndorsement: { type: String },
  trustBadge: { type: String, default: 'Applicant Artisan' },
  experienceYears: { type: Number, default: 1 },
  rating: { type: Number, default: 5.0 },
  reviews: { type: Number, default: 0 },
  onlineStoreUrl: { type: String }
}, {
  timestamps: true
});

const Seller = mongoose.model('Seller', sellerSchema);
export default Seller;
