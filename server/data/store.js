import Craft from '../models/Craft.js';
import Seller from '../models/Seller.js';
import Order from '../models/Order.js';
import Review from '../models/Review.js';
import { initialCrafts, initialOrders } from './craftsSeed.js';

let isMongoConnected = false;
let memCrafts = [...initialCrafts];
let memSellers = [];
let memOrders = [...initialOrders];
let memReviews = [];

// Initialize initial sellers from crafts
initialCrafts.forEach(craft => {
  if (craft.sellers && craft.sellers.length > 0) {
    craft.sellers.forEach(s => {
      if (!memSellers.find(ms => ms.id === s.id)) {
        memSellers.push({
          id: s.id,
          artisanName: s.artisanName || s.name,
          businessName: s.name,
          craftId: craft.id,
          craftName: craft.name,
          state: craft.state,
          pehchanCardNo: `PEH-${Math.floor(100000 + Math.random() * 900000)}`,
          aadhaarMasked: 'XXXX-XXXX-8921',
          phone: s.phone || '+91 98765 43210',
          email: s.email || 'artisan@craftsguild.in',
          address: s.address || s.location,
          verificationStatus: s.verified ? 'verified' : 'pending',
          trustBadge: s.badge || 'Verified Master Artisan',
          experienceYears: 15,
          rating: s.rating || 4.9,
          reviewCount: s.reviewCount || 10,
          createdAt: new Date()
        });
      }
    });
  }
});

export const setMongoConnected = (status) => {
  isMongoConnected = status;
};

export const getStoreStatus = () => ({
  mode: isMongoConnected ? 'mongodb-live' : 'embedded-datastore',
  craftCount: memCrafts.length,
  sellerCount: memSellers.length,
  orderCount: memOrders.length
});

// Seed data to MongoDB if connected
export const seedDatabaseIfEmpty = async () => {
  if (!isMongoConnected) return;
  try {
    const craftCount = await Craft.countDocuments();
    if (craftCount === 0) {
      console.log('Seeding initial crafts to MongoDB...');
      await Craft.insertMany(initialCrafts);
    }
    const sellerCount = await Seller.countDocuments();
    if (sellerCount === 0 && memSellers.length > 0) {
      console.log('Seeding initial sellers to MongoDB...');
      await Seller.insertMany(memSellers);
    }
    const orderCount = await Order.countDocuments();
    if (orderCount === 0 && initialOrders.length > 0) {
      console.log('Seeding initial orders to MongoDB...');
      await Order.insertMany(initialOrders);
    }
  } catch (err) {
    console.error('Error during MongoDB seeding:', err.message);
  }
};

// ==========================================
// 🎨 CRAFTS QUERIES & MUTATIONS
// ==========================================
export const getAllCrafts = async (filters = {}) => {
  const { search, category, region, state, giTagged, GI_tagged, status, verification_status } = filters;

  if (isMongoConnected) {
    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { state: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }
    if (category) query.category = category;
    if (region && region !== 'all') query.region = { $regex: new RegExp(`^${region}$`, 'i') };
    if (state) query.state = state;
    
    // Support both GI_tagged and giTagged filter params
    if (GI_tagged !== undefined) {
      query.GI_tagged = GI_tagged === 'true' || GI_tagged === true;
    } else if (giTagged !== undefined) {
      query.GI_tagged = giTagged === 'true' || giTagged === true;
    }
    
    if (status) query.status = status;
    if (verification_status) query.verification_status = verification_status;

    return await Craft.find(query).sort({ createdAt: -1 });
  }

  // In-Memory store filtering
  let results = [...memCrafts];

  if (search) {
    const s = search.toLowerCase();
    results = results.filter(c =>
      c.name.toLowerCase().includes(s) ||
      c.description.toLowerCase().includes(s) ||
      c.state.toLowerCase().includes(s) ||
      (c.tags && c.tags.some(t => t.toLowerCase().includes(s)))
    );
  }

  if (category) results = results.filter(c => c.category === category);
  if (region && region !== 'all') results = results.filter(c => c.region.toLowerCase() === region.toLowerCase());
  if (state) results = results.filter(c => c.state === state);

  if (GI_tagged !== undefined) {
    const isGI = GI_tagged === 'true' || GI_tagged === true;
    results = results.filter(c => (c.GI_tagged === isGI || c.giTagged === isGI));
  } else if (giTagged !== undefined) {
    const isGI = giTagged === 'true' || giTagged === true;
    results = results.filter(c => (c.GI_tagged === isGI || c.giTagged === isGI));
  }

  if (status) results = results.filter(c => c.status === status);
  if (verification_status) results = results.filter(c => c.verification_status === verification_status);

  return results;
};

export const getCraftById = async (id) => {
  if (isMongoConnected) {
    return await Craft.findOne({ id });
  }
  return memCrafts.find(c => c.id === id) || null;
};

export const createCraft = async (craftData) => {
  const newCraft = {
    ...craftData,
    id: craftData.id || `craft-${Date.now()}`,
    GI_tagged: craftData.GI_tagged || craftData.giTagged || false,
    giTagged: craftData.GI_tagged || craftData.giTagged || false,
    status: craftData.status || 'active',
    preservationStatus: craftData.status || 'active',
    verification_status: craftData.verification_status || 'pending_verification',
    rating: craftData.rating || 5.0,
    reviewCount: craftData.reviewCount || 0,
    reviews: craftData.reviews || [],
    createdAt: new Date(),
    updatedAt: new Date()
  };

  if (isMongoConnected) {
    return await Craft.create(newCraft);
  }

  memCrafts.unshift(newCraft);
  return newCraft;
};

// ==========================================
// 📦 ORDERS & INDIA POST TRACKING
// ==========================================
export const getAllOrders = async (buyerEmail) => {
  if (isMongoConnected) {
    const q = buyerEmail ? { buyerEmail } : {};
    return await Order.find(q).sort({ orderDate: -1 });
  }
  if (buyerEmail) {
    return memOrders.filter(o => o.buyerEmail === buyerEmail);
  }
  return memOrders;
};

export const getOrderById = async (id) => {
  if (isMongoConnected) {
    return await Order.findOne({ $or: [{ orderId: id }, { trackingId: id }] });
  }
  return memOrders.find(o => o.orderId === id || o.trackingId === id) || null;
};

export const createOrder = async (orderInput) => {
  const orderId = `ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const trackingId = `EB${Math.floor(100000000 + Math.random() * 900000000)}IN`;

  const newOrder = {
    orderId,
    trackingId,
    buyerName: orderInput.buyerName || 'Valued Art Connoisseur',
    buyerEmail: orderInput.buyerEmail || 'buyer@example.com',
    buyerPhone: orderInput.buyerPhone || '+91 98765 43210',
    shippingAddress: orderInput.shippingAddress || 'India',
    craftId: orderInput.craftId,
    craftName: orderInput.craftName,
    craftImage: orderInput.craftImage || 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80',
    artisanId: orderInput.artisanId || 's-1',
    artisanName: orderInput.artisanName || 'Master Artisan Guild',
    amount: orderInput.amount || 2450,
    quantity: orderInput.quantity || 1,
    courier: 'India Post Speed Post',
    trackingStatus: 'Order Confirmed',
    orderDate: new Date(),
    deliveryDate: null,
    returnDeadline: null,
    returnStatus: 'none',
    trackingTimeline: [
      {
        status: 'Order Confirmed',
        location: 'Artisan Workshop Hub',
        timestamp: new Date(),
        description: 'Authenticity certificate generated and item packed in eco-protective box.'
      }
    ]
  };

  if (isMongoConnected) {
    return await Order.create(newOrder);
  }

  memOrders.unshift(newOrder);
  return newOrder;
};

// 10-Day Return Request Handler
export const requestOrderReturn = async (orderId, returnReason) => {
  const now = new Date();

  if (isMongoConnected) {
    const order = await Order.findOne({ orderId });
    if (!order) return { success: false, message: 'Order not found' };

    // Check if within 10 days of deliveryDate
    if (order.deliveryDate) {
      const daysSinceDelivery = (now - new Date(order.deliveryDate)) / (1000 * 60 * 60 * 24);
      if (daysSinceDelivery > 10) {
        return { success: false, message: 'Return window of 10 days has expired.' };
      }
    }

    order.trackingStatus = 'Return Requested';
    order.returnStatus = 'requested';
    order.returnReason = returnReason;
    order.returnRequestedDate = now;
    order.trackingTimeline.push({
      status: 'Return Requested',
      location: 'Buyer Return Pickup Hub',
      timestamp: now,
      description: `Return initiated by buyer. Reason: ${returnReason}`
    });

    await order.save();
    return { success: true, order };
  }

  const idx = memOrders.findIndex(o => o.orderId === orderId);
  if (idx === -1) return { success: false, message: 'Order not found' };

  const order = memOrders[idx];
  if (order.deliveryDate) {
    const daysSinceDelivery = (now - new Date(order.deliveryDate)) / (1000 * 60 * 60 * 24);
    if (daysSinceDelivery > 10) {
      return { success: false, message: 'Return window of 10 days has expired.' };
    }
  }

  order.trackingStatus = 'Return Requested';
  order.returnStatus = 'requested';
  order.returnReason = returnReason;
  order.returnRequestedDate = now;
  order.trackingTimeline.push({
    status: 'Return Requested',
    location: 'Buyer Return Pickup Hub',
    timestamp: now,
    description: `Return initiated by buyer. Reason: ${returnReason}`
  });

  return { success: true, order };
};

// ==========================================
// ⭐ RATINGS & REVIEWS
// ==========================================
export const addReview = async (reviewInput) => {
  const newRev = {
    id: `rev-${Date.now()}`,
    craftId: reviewInput.craftId,
    sellerId: reviewInput.sellerId,
    buyerName: reviewInput.buyerName || 'Verified Buyer',
    rating: Number(reviewInput.rating) || 5,
    comment: reviewInput.comment || reviewInput.reviewText || 'Superb authentic quality!',
    verifiedPurchase: true,
    orderId: reviewInput.orderId,
    createdAt: new Date()
  };

  if (isMongoConnected) {
    await Review.create(newRev);

    // Update craft average rating
    const craft = await Craft.findOne({ id: reviewInput.craftId });
    if (craft) {
      craft.reviews.push(newRev);
      craft.reviewCount = craft.reviews.length;
      const totalStars = craft.reviews.reduce((acc, r) => acc + r.rating, 0);
      craft.rating = Number((totalStars / craft.reviews.length).toFixed(1));
      await craft.save();
    }
    return newRev;
  }

  memReviews.unshift(newRev);

  // Update in-memory craft
  const craft = memCrafts.find(c => c.id === reviewInput.craftId);
  if (craft) {
    if (!craft.reviews) craft.reviews = [];
    craft.reviews.push(newRev);
    craft.reviewCount = craft.reviews.length;
    const totalStars = craft.reviews.reduce((acc, r) => acc + r.rating, 0);
    craft.rating = Number((totalStars / craft.reviews.length).toFixed(1));
  }

  return newRev;
};

// ==========================================
// 🤖 AI CRAFT INSIGHTS
// ==========================================
export const getCraftInsights = async (craftId) => {
  const craft = await getCraftById(craftId);
  if (!craft) {
    return {
      success: false,
      message: 'Craft record not found'
    };
  }

  return {
    success: true,
    craftId: craft.id,
    name: craft.name,
    nativeName: craft.nativeName,
    state: craft.state,
    GI_status: craft.GI_tagged || craft.giTagged ? `Officially GI Tagged (${craft.giYear || 'Certified'})` : `Researched & Verified (${craft.verification_source || 'NGO Documented'})`,
    preservation_status: craft.status || 'Active',
    insights: {
      culturalBackground: craft.culturalSignificance || `${craft.name} carries centuries of sacred ritual and regional heritage, expressing deep bonds between the artisan community and local ecology.`,
      historicalSignificance: craft.history || `Dating back to the ${craft.era || 'ancient classical period'}, this craft has survived through generational guilds and royal patronage.`,
      techniquesUsed: craft.technique || `Mastered through manual techniques using ${craft.materials?.join(', ') || 'natural local materials'}.`,
      artisanCommunity: `${craft.artisanGroup || 'Generational master craft clusters'} in ${craft.state}. Verified and documented through ${craft.verification_source || 'all India field archives'}.`,
      ecologicalImpact: '100% biodegradable and zero-carbon footprint using natural mineral binders and non-toxic botanical extracts.'
    }
  };
};

// ==========================================
// 👥 SELLERS
// ==========================================
export const getAllSellers = async (filters = {}) => {
  if (isMongoConnected) {
    const q = {};
    if (filters.craftId) q.craftId = filters.craftId;
    if (filters.state) q.state = filters.state;
    if (filters.status) q.verificationStatus = filters.status;
    return await Seller.find(q).sort({ createdAt: -1 });
  }

  let res = [...memSellers];
  if (filters.craftId) res = res.filter(s => s.craftId === filters.craftId);
  if (filters.state) res = res.filter(s => s.state === filters.state);
  if (filters.status) res = res.filter(s => s.verificationStatus === filters.status);
  return res;
};

export const registerSeller = async (sellerData) => {
  const newSeller = {
    ...sellerData,
    id: sellerData.id || `s-${Date.now()}`,
    verificationStatus: 'pending',
    trustBadge: 'Pending Verification',
    rating: 4.8,
    reviewCount: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  if (isMongoConnected) {
    return await Seller.create(newSeller);
  }

  memSellers.unshift(newSeller);
  return newSeller;
};

export const updateSellerVerification = async (id, status, badge) => {
  if (isMongoConnected) {
    return await Seller.findOneAndUpdate(
      { id },
      { verificationStatus: status, trustBadge: badge },
      { new: true }
    );
  }

  const s = memSellers.find(x => x.id === id);
  if (s) {
    s.verificationStatus = status;
    if (badge) s.trustBadge = badge;
  }
  return s;
};
