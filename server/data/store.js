import fs from 'fs';
import path from 'path';
import Craft from '../models/Craft.js';
import Seller from '../models/Seller.js';
import Order from '../models/Order.js';
import Review from '../models/Review.js';
import { initialCrafts, initialOrders } from './craftsSeed.js';

let isMongoConnected = false;

// ==========================================
// 💾 PERSISTENT FILE STORAGE INITIALIZATION
// ==========================================
const STORAGE_DIR = path.resolve('data/persistent_storage');
if (!fs.existsSync(STORAGE_DIR)) {
  fs.mkdirSync(STORAGE_DIR, { recursive: true });
}

const CRAFTS_FILE = path.join(STORAGE_DIR, 'crafts.json');
const SELLERS_FILE = path.join(STORAGE_DIR, 'sellers.json');
const ORDERS_FILE = path.join(STORAGE_DIR, 'orders.json');
const REVIEWS_FILE = path.join(STORAGE_DIR, 'reviews.json');

// Safe file writer helper
const writeJsonSafe = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing to ${filePath}:`, err.message);
  }
};

// Safe file reader helper
const readJsonSafe = (filePath, defaultVal = []) => {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err.message);
  }
  return defaultVal;
};

// Extract default sellers from initialCrafts
const extractInitialSellers = (crafts) => {
  const sellers = [];
  crafts.forEach(craft => {
    if (craft.sellers && craft.sellers.length > 0) {
      craft.sellers.forEach(s => {
        if (!sellers.find(ms => ms.id === s.id)) {
          sellers.push({
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
            trustBadge: s.badge || (s.verified ? 'Verified Master Artisan' : 'Applicant Artisan'),
            experienceYears: 15,
            rating: s.rating || 4.9,
            reviewCount: s.reviewCount || 10,
            verificationDocuments: [
              {
                type: 'Pehchan Artisan ID',
                fileName: 'pehchan_card.pdf',
                fileUrl: '',
                verified: !!s.verified,
                uploadedAt: new Date()
              }
            ],
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }
      });
    }
  });
  return sellers;
};

// Extract default reviews from initialCrafts
const extractInitialReviews = (crafts) => {
  const reviews = [];
  crafts.forEach(craft => {
    if (craft.reviews && craft.reviews.length > 0) {
      craft.reviews.forEach(r => {
        reviews.push({
          id: r.id || `rev-${Math.random().toString(36).substr(2, 9)}`,
          craftId: craft.id,
          buyerName: r.buyerName || 'Verified Art Patron',
          rating: Number(r.rating) || 5,
          comment: r.comment || 'Authentic quality!',
          verifiedPurchase: r.verifiedPurchase !== false,
          createdAt: r.createdAt ? new Date(r.createdAt) : new Date()
        });
      });
    }
  });
  return reviews;
};

// Load or initialize persistent data arrays
let memCrafts = readJsonSafe(CRAFTS_FILE, null);
if (!memCrafts || !Array.isArray(memCrafts) || memCrafts.length === 0) {
  memCrafts = [...initialCrafts];
  writeJsonSafe(CRAFTS_FILE, memCrafts);
}

let memSellers = readJsonSafe(SELLERS_FILE, null);
if (!memSellers || !Array.isArray(memSellers) || memSellers.length === 0) {
  memSellers = extractInitialSellers(memCrafts);
  writeJsonSafe(SELLERS_FILE, memSellers);
}

let memOrders = readJsonSafe(ORDERS_FILE, null);
if (!memOrders || !Array.isArray(memOrders) || memOrders.length === 0) {
  memOrders = [...initialOrders];
  writeJsonSafe(ORDERS_FILE, memOrders);
}

let memReviews = readJsonSafe(REVIEWS_FILE, null);
if (!memReviews || !Array.isArray(memReviews) || memReviews.length === 0) {
  memReviews = extractInitialReviews(memCrafts);
  writeJsonSafe(REVIEWS_FILE, memReviews);
}

// Persist helpers
export const persistCrafts = () => writeJsonSafe(CRAFTS_FILE, memCrafts);
export const persistSellers = () => writeJsonSafe(SELLERS_FILE, memSellers);
export const persistOrders = () => writeJsonSafe(ORDERS_FILE, memOrders);
export const persistReviews = () => writeJsonSafe(REVIEWS_FILE, memReviews);

export const setMongoConnected = (status) => {
  isMongoConnected = status;
};

export const getStoreStatus = () => ({
  mode: isMongoConnected ? 'mongodb-live' : 'persistent-file-storage',
  craftCount: memCrafts.length,
  sellerCount: memSellers.length,
  orderCount: memOrders.length,
  reviewCount: memReviews.length,
  storageDirectory: STORAGE_DIR
});

// Seed and Sync data to MongoDB if connected
export const seedDatabaseIfEmpty = async () => {
  if (!isMongoConnected) return;
  try {
    console.log('🔄 Synchronizing persistent records with MongoDB...');
    for (const craft of memCrafts) {
      await Craft.findOneAndUpdate({ id: craft.id }, craft, { upsert: true, new: true });
    }
    console.log(`✅ Synced ${memCrafts.length} crafts with MongoDB.`);

    for (const seller of memSellers) {
      await Seller.findOneAndUpdate({ id: seller.id }, seller, { upsert: true, new: true });
    }
    console.log(`✅ Synced ${memSellers.length} registered artisans with MongoDB.`);

    for (const order of memOrders) {
      await Order.findOneAndUpdate({ orderId: order.orderId }, order, { upsert: true, new: true });
    }
    console.log(`✅ Synced ${memOrders.length} orders with MongoDB.`);

    for (const review of memReviews) {
      await Review.findOneAndUpdate({ id: review.id }, review, { upsert: true, new: true });
    }
    console.log(`✅ Synced ${memReviews.length} reviews with MongoDB.`);
  } catch (err) {
    console.error('Error during MongoDB synchronization:', err.message);
  }
};

// ==========================================
// 🎨 CRAFTS QUERIES & MUTATIONS
// ==========================================
export const getAllCrafts = async (filters = {}) => {
  const { search, category, region, state, giTagged, GI_tagged, status, verification_status } = filters;

  if (isMongoConnected) {
    try {
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
      
      if (GI_tagged !== undefined) {
        query.GI_tagged = GI_tagged === 'true' || GI_tagged === true;
      } else if (giTagged !== undefined) {
        query.GI_tagged = giTagged === 'true' || giTagged === true;
      }
      
      if (status) query.status = status;
      if (verification_status) query.verification_status = verification_status;

      const docs = await Craft.find(query).sort({ createdAt: -1 });
      if (docs && docs.length > 0) return docs;
    } catch (e) {
      console.error('Mongo query error in getAllCrafts:', e.message);
    }
  }

  // File-backed memory store filtering
  let results = [...memCrafts];

  if (search) {
    const s = search.toLowerCase();
    results = results.filter(c =>
      (c.name && c.name.toLowerCase().includes(s)) ||
      (c.description && c.description.toLowerCase().includes(s)) ||
      (c.state && c.state.toLowerCase().includes(s)) ||
      (c.tags && c.tags.some(t => t.toLowerCase().includes(s)))
    );
  }

  if (category) results = results.filter(c => c.category === category);
  if (region && region !== 'all') results = results.filter(c => c.region && c.region.toLowerCase() === region.toLowerCase());
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
    try {
      const doc = await Craft.findOne({ id });
      if (doc) return doc;
    } catch (e) {
      console.error('Mongo getCraftById error:', e.message);
    }
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
    sellers: craftData.sellers || [],
    createdAt: new Date(),
    updatedAt: new Date()
  };

  if (isMongoConnected) {
    try {
      await Craft.create(newCraft);
    } catch (e) {
      console.error('Mongo createCraft error:', e.message);
    }
  }

  memCrafts.unshift(newCraft);
  persistCrafts();
  return newCraft;
};

export const verifyCraft = async (id, status = 'verified') => {
  let updated = null;
  if (isMongoConnected) {
    try {
      updated = await Craft.findOneAndUpdate(
        { id },
        { verification_status: status },
        { new: true }
      );
    } catch (e) {
      console.error('Mongo verifyCraft error:', e.message);
    }
  }

  const c = memCrafts.find(x => x.id === id);
  if (c) {
    c.verification_status = status;
    c.updatedAt = new Date();
    persistCrafts();
    if (!updated) updated = c;
  }
  return updated;
};

// ==========================================
// 👥 REGISTERED ARTISANS & SELLERS
// ==========================================
export const getAllSellers = async (filters = {}) => {
  if (isMongoConnected) {
    try {
      const q = {};
      if (filters.craftId) q.craftId = filters.craftId;
      if (filters.state) q.state = filters.state;
      if (filters.status) q.verificationStatus = filters.status;
      const docs = await Seller.find(q).sort({ createdAt: -1 });
      if (docs && docs.length > 0) return docs;
    } catch (e) {
      console.error('Mongo getAllSellers error:', e.message);
    }
  }

  let res = [...memSellers];
  if (filters.craftId) res = res.filter(s => s.craftId === filters.craftId);
  if (filters.state) res = res.filter(s => s.state === filters.state);
  if (filters.status) res = res.filter(s => s.verificationStatus === filters.status);
  return res;
};

export const getSellerById = async (id) => {
  if (isMongoConnected) {
    try {
      const doc = await Seller.findOne({ id });
      if (doc) return doc;
    } catch (e) {
      console.error('Mongo getSellerById error:', e.message);
    }
  }
  return memSellers.find(s => s.id === id) || null;
};

// Link seller directly to craft record
const linkSellerToCraft = async (seller) => {
  const craftRefSeller = {
    id: seller.id,
    name: seller.businessName || seller.artisanName,
    artisanName: seller.artisanName,
    phone: seller.phone,
    email: seller.email,
    address: seller.address,
    location: `${seller.address || ''}, ${seller.state || ''}`.trim(),
    verified: seller.verificationStatus === 'verified',
    badge: seller.trustBadge,
    rating: seller.rating || 5.0,
    reviewCount: seller.reviewCount || 0,
    onlineStoreUrl: seller.onlineStoreUrl,
    workshopVisits: 'Direct artisan studio tours welcome by appointment.'
  };

  // Update in-memory craft
  const craft = memCrafts.find(c => c.id === seller.craftId);
  if (craft) {
    if (!craft.sellers) craft.sellers = [];
    const sIdx = craft.sellers.findIndex(s => s.id === seller.id);
    if (sIdx >= 0) {
      craft.sellers[sIdx] = { ...craft.sellers[sIdx], ...craftRefSeller };
    } else {
      craft.sellers.push(craftRefSeller);
    }
    persistCrafts();
  }

  // Update MongoDB craft if connected
  if (isMongoConnected) {
    try {
      const dbCraft = await Craft.findOne({ id: seller.craftId });
      if (dbCraft) {
        if (!dbCraft.sellers) dbCraft.sellers = [];
        const sIdx = dbCraft.sellers.findIndex(s => s.id === seller.id);
        if (sIdx >= 0) {
          dbCraft.sellers[sIdx] = { ...dbCraft.sellers[sIdx], ...craftRefSeller };
        } else {
          dbCraft.sellers.push(craftRefSeller);
        }
        await dbCraft.save();
      }
    } catch (e) {
      console.error('Mongo craft linking error:', e.message);
    }
  }
};

export const registerSeller = async (sellerData) => {
  const newSeller = {
    ...sellerData,
    id: sellerData.id || `s-${Date.now()}`,
    artisanName: sellerData.artisanName || 'Master Craftsman',
    businessName: sellerData.businessName || `${sellerData.artisanName}'s Studio`,
    craftId: sellerData.craftId,
    craftName: sellerData.craftName || sellerData.craftId,
    state: sellerData.state || 'India',
    pehchanCardNo: sellerData.pehchanCardNo || `PEH-${Math.floor(100000 + Math.random() * 900000)}`,
    aadhaarMasked: sellerData.aadhaarMasked ? `XXXX-XXXX-${sellerData.aadhaarMasked.slice(-4)}` : 'XXXX-XXXX-8921',
    phone: sellerData.phone || '+91 98765 43210',
    email: sellerData.email || 'artisan@craftsguild.in',
    address: sellerData.address || 'Artisan Workshop Cluster',
    ngoEndorsement: sellerData.ngoEndorsement || 'Self-Registered Artisan',
    experienceYears: Number(sellerData.experienceYears) || 10,
    onlineStoreUrl: sellerData.onlineStoreUrl || '',
    verificationStatus: sellerData.verificationStatus || 'pending',
    trustBadge: sellerData.trustBadge || 'Pending Verification',
    rating: 5.0,
    reviewCount: 0,
    reviews: 0,
    verificationDocuments: sellerData.verificationDocuments || [],
    createdAt: new Date(),
    updatedAt: new Date()
  };

  // Save to MongoDB if connected
  if (isMongoConnected) {
    try {
      await Seller.findOneAndUpdate({ id: newSeller.id }, newSeller, { upsert: true, new: true });
    } catch (e) {
      console.error('Mongo save seller error:', e.message);
    }
  }

  // Save to persistent file storage
  const existingIdx = memSellers.findIndex(s => s.id === newSeller.id);
  if (existingIdx >= 0) {
    memSellers[existingIdx] = newSeller;
  } else {
    memSellers.unshift(newSeller);
  }
  persistSellers();

  // Attach seller to craft's sellers list
  if (newSeller.craftId) {
    await linkSellerToCraft(newSeller);
  }

  return newSeller;
};

export const updateSellerVerification = async (id, status, badge) => {
  const trustBadge = badge || (status === 'verified' ? 'GI Certified Master Artisan' : 'Applicant Artisan');
  let updated = null;

  if (isMongoConnected) {
    try {
      updated = await Seller.findOneAndUpdate(
        { id },
        { verificationStatus: status, trustBadge, updatedAt: new Date() },
        { new: true }
      );
    } catch (e) {
      console.error('Mongo updateSellerVerification error:', e.message);
    }
  }

  const s = memSellers.find(x => x.id === id);
  if (s) {
    s.verificationStatus = status;
    s.trustBadge = trustBadge;
    s.updatedAt = new Date();
    persistSellers();
    await linkSellerToCraft(s);
    if (!updated) updated = s;
  }
  return updated;
};

export const deleteSeller = async (id) => {
  if (isMongoConnected) {
    try {
      await Seller.findOneAndDelete({ id });
    } catch (e) {
      console.error('Mongo deleteSeller error:', e.message);
    }
  }

  const idx = memSellers.findIndex(s => s.id === id);
  if (idx >= 0) {
    const deleted = memSellers.splice(idx, 1)[0];
    persistSellers();
    return deleted;
  }
  return null;
};

// ==========================================
// 📦 ORDERS & INDIA POST TRACKING
// ==========================================
export const getAllOrders = async (buyerEmail) => {
  if (isMongoConnected) {
    try {
      const q = buyerEmail ? { buyerEmail } : {};
      const docs = await Order.find(q).sort({ orderDate: -1 });
      if (docs && docs.length > 0) return docs;
    } catch (e) {
      console.error('Mongo getAllOrders error:', e.message);
    }
  }
  if (buyerEmail) {
    return memOrders.filter(o => o.buyerEmail === buyerEmail);
  }
  return memOrders;
};

export const getOrderById = async (id) => {
  if (isMongoConnected) {
    try {
      const doc = await Order.findOne({ $or: [{ orderId: id }, { trackingId: id }] });
      if (doc) return doc;
    } catch (e) {
      console.error('Mongo getOrderById error:', e.message);
    }
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
    try {
      await Order.create(newOrder);
    } catch (e) {
      console.error('Mongo createOrder error:', e.message);
    }
  }

  memOrders.unshift(newOrder);
  persistOrders();
  return newOrder;
};

export const updateOrderStatus = async (orderId, newStatus, location = 'Speed Post Sorting Hub', description = '') => {
  const now = new Date();
  let updated = null;

  if (isMongoConnected) {
    try {
      const order = await Order.findOne({ $or: [{ orderId }, { trackingId: orderId }] });
      if (order) {
        order.trackingStatus = newStatus;
        if (newStatus === 'Delivered') {
          order.deliveryDate = now;
          order.returnDeadline = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000);
        }
        order.trackingTimeline.push({
          status: newStatus,
          location,
          timestamp: now,
          description: description || `Status updated to ${newStatus}`
        });
        await order.save();
        updated = order;
      }
    } catch (e) {
      console.error('Mongo updateOrderStatus error:', e.message);
    }
  }

  const o = memOrders.find(x => x.orderId === orderId || x.trackingId === orderId);
  if (o) {
    o.trackingStatus = newStatus;
    if (newStatus === 'Delivered') {
      o.deliveryDate = now;
      o.returnDeadline = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000);
    }
    if (!o.trackingTimeline) o.trackingTimeline = [];
    o.trackingTimeline.push({
      status: newStatus,
      location,
      timestamp: now,
      description: description || `Status updated to ${newStatus}`
    });
    persistOrders();
    if (!updated) updated = o;
  }
  return updated;
};

export const requestOrderReturn = async (orderId, returnReason) => {
  const now = new Date();

  if (isMongoConnected) {
    try {
      const order = await Order.findOne({ orderId });
      if (!order) return { success: false, message: 'Order not found' };

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
    } catch (e) {
      console.error('Mongo requestOrderReturn error:', e.message);
    }
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
  if (!order.trackingTimeline) order.trackingTimeline = [];
  order.trackingTimeline.push({
    status: 'Return Requested',
    location: 'Buyer Return Pickup Hub',
    timestamp: now,
    description: `Return initiated by buyer. Reason: ${returnReason}`
  });

  persistOrders();
  return { success: true, order };
};

export const deleteOrder = async (orderId) => {
  if (isMongoConnected) {
    try {
      await Order.findOneAndDelete({ orderId });
    } catch (e) {
      console.error('Mongo deleteOrder error:', e.message);
    }
  }

  const idx = memOrders.findIndex(o => o.orderId === orderId);
  if (idx >= 0) {
    const deleted = memOrders.splice(idx, 1)[0];
    persistOrders();
    return deleted;
  }
  return null;
};

// ==========================================
// ⭐ RATINGS & REVIEWS
// ==========================================
export const addReview = async (reviewInput) => {
  const newRev = {
    id: `rev-${Date.now()}`,
    craftId: reviewInput.craftId,
    sellerId: reviewInput.sellerId,
    buyerName: reviewInput.buyerName || 'Verified Connoisseur',
    rating: Number(reviewInput.rating) || 5,
    comment: reviewInput.comment || reviewInput.reviewText || 'Superb authentic quality!',
    verifiedPurchase: true,
    orderId: reviewInput.orderId,
    createdAt: new Date()
  };

  // 1. Add to persistent reviews
  memReviews.unshift(newRev);
  persistReviews();

  // 2. Update craft in memory & file
  const craft = memCrafts.find(c => c.id === reviewInput.craftId);
  if (craft) {
    if (!craft.reviews) craft.reviews = [];
    craft.reviews.push(newRev);
    craft.reviewCount = craft.reviews.length;
    const totalStars = craft.reviews.reduce((acc, r) => acc + (Number(r.rating) || 5), 0);
    craft.rating = Number((totalStars / craft.reviews.length).toFixed(1));
    persistCrafts();
  }

  // 3. Update MongoDB if connected
  if (isMongoConnected) {
    try {
      await Review.create(newRev);
      const dbCraft = await Craft.findOne({ id: reviewInput.craftId });
      if (dbCraft) {
        dbCraft.reviews.push(newRev);
        dbCraft.reviewCount = dbCraft.reviews.length;
        const totalStars = dbCraft.reviews.reduce((acc, r) => acc + (Number(r.rating) || 5), 0);
        dbCraft.rating = Number((totalStars / dbCraft.reviews.length).toFixed(1));
        await dbCraft.save();
      }
    } catch (e) {
      console.error('Mongo review save error:', e.message);
    }
  }

  return newRev;
};

export const getReviews = async (craftId) => {
  if (craftId) {
    return memReviews.filter(r => r.craftId === craftId);
  }
  return memReviews;
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

// Aliases for route compatibility
export const createSeller = registerSeller;
export const updateSellerStatus = updateSellerVerification;
