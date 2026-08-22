import Craft from '../models/Craft.js';
import Seller from '../models/Seller.js';
import { initialCrafts, initialSellers } from './craftsSeed.js';

let isMongoConnected = false;
let memCrafts = JSON.parse(JSON.stringify(initialCrafts));
let memSellers = JSON.parse(JSON.stringify(initialSellers));

export function setMongoStatus(connected) {
  isMongoConnected = connected;
}

export async function seedMongoIfEmpty() {
  if (!isMongoConnected) return;
  try {
    const count = await Craft.countDocuments();
    if (count === 0) {
      console.log('🌱 Seeding MongoDB with authentic Indian traditional crafts...');
      await Craft.insertMany(initialCrafts);
      await Seller.insertMany(initialSellers);
      console.log('✅ MongoDB successfully seeded.');
    }
  } catch (err) {
    console.warn('⚠️ MongoDB seeding check warning:', err.message);
  }
}

export async function getAllCrafts(filters = {}) {
  const { state, category, material, giOnly, search, preservationStatus } = filters;

  if (isMongoConnected) {
    try {
      const query = {};
      if (state && state !== 'All') query.state = state;
      if (category && category !== 'All') query.category = category;
      if (preservationStatus && preservationStatus !== 'All') query.preservationStatus = preservationStatus;
      if (giOnly === 'true' || giOnly === true) query.giTagged = true;
      if (material && material !== 'All') query.materials = { $regex: material, $options: 'i' };
      if (search && search.trim()) {
        const regex = new RegExp(search.trim(), 'i');
        query.$or = [
          { name: regex },
          { nativeName: regex },
          { state: regex },
          { region: regex },
          { category: regex },
          { materials: regex },
          { technique: regex },
          { tags: regex }
        ];
      }
      return await Craft.find(query).lean();
    } catch (err) {
      console.warn('MongoDB query failed, falling back to memory store:', err.message);
    }
  }

  // Fallback / In-Memory filter logic
  return memCrafts.filter(c => {
    if (state && state !== 'All' && c.state.toLowerCase() !== state.toLowerCase()) return false;
    if (category && category !== 'All' && c.category.toLowerCase() !== category.toLowerCase()) return false;
    if (preservationStatus && preservationStatus !== 'All' && c.preservationStatus !== preservationStatus) return false;
    if ((giOnly === 'true' || giOnly === true) && !c.giTagged) return false;
    if (material && material !== 'All') {
      const hasMat = c.materials.some(m => m.toLowerCase().includes(material.toLowerCase()));
      if (!hasMat) return false;
    }
    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      const match = c.name.toLowerCase().includes(q) ||
        (c.nativeName && c.nativeName.toLowerCase().includes(q)) ||
        c.state.toLowerCase().includes(q) ||
        c.region.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.materials.some(m => m.toLowerCase().includes(q)) ||
        c.technique.toLowerCase().includes(q) ||
        (c.tags && c.tags.some(t => t.toLowerCase().includes(q)));
      if (!match) return false;
    }
    return true;
  });
}

export async function getCraftById(id) {
  if (isMongoConnected) {
    try {
      const craft = await Craft.findOne({ id }).lean();
      if (craft) return craft;
    } catch (err) {
      console.warn('MongoDB find failed, checking memory store:', err.message);
    }
  }
  return memCrafts.find(c => c.id === id || c._id === id) || null;
}

export async function getAllSellers(filters = {}) {
  const { status, craftId } = filters;
  if (isMongoConnected) {
    try {
      const query = {};
      if (status) query.verificationStatus = status;
      if (craftId) query.craftId = craftId;
      return await Seller.find(query).lean();
    } catch (err) {
      console.warn('MongoDB seller query failed:', err.message);
    }
  }

  return memSellers.filter(s => {
    if (status && s.verificationStatus !== status) return false;
    if (craftId && s.craftId !== craftId) return false;
    return true;
  });
}

export async function createSeller(sellerData) {
  const newSeller = {
    id: `s-${Date.now()}`,
    ...sellerData,
    verificationStatus: 'pending',
    trustBadge: 'Pending Verification',
    rating: 5.0,
    reviews: 0,
    createdAt: new Date().toISOString()
  };

  if (isMongoConnected) {
    try {
      const created = await Seller.create(newSeller);
      return created.toObject();
    } catch (err) {
      console.warn('MongoDB create seller failed:', err.message);
    }
  }

  memSellers.unshift(newSeller);
  return newSeller;
}

export async function updateSellerStatus(id, status, badge) {
  if (isMongoConnected) {
    try {
      const updated = await Seller.findOneAndUpdate(
        { id },
        { verificationStatus: status, trustBadge: badge || (status === 'verified' ? 'Verified Master Craftsman' : 'Pending Verification') },
        { new: true }
      ).lean();
      if (updated) return updated;
    } catch (err) {
      console.warn('MongoDB update seller failed:', err.message);
    }
  }

  const idx = memSellers.findIndex(s => s.id === id);
  if (idx !== -1) {
    memSellers[idx].verificationStatus = status;
    if (badge) memSellers[idx].trustBadge = badge;
    else if (status === 'verified') memSellers[idx].trustBadge = 'Verified Master Craftsman';
    return memSellers[idx];
  }
  return null;
}

export async function getAIRelatedCrafts(craftId) {
  const currentCraft = await getCraftById(craftId);
  if (!currentCraft) return [];

  const all = await getAllCrafts({});
  // Similarity scoring based on material overlap, region proximity, techniques, and tags
  const scored = all
    .filter(c => c.id !== craftId)
    .map(other => {
      let score = 0;
      // Category match
      if (other.category === currentCraft.category) score += 4;
      // State / region
      if (other.state === currentCraft.state) score += 3;
      // Material overlap
      const sharedMaterials = other.materials.filter(m =>
        currentCraft.materials.some(cm => cm.toLowerCase().includes(m.toLowerCase()) || m.toLowerCase().includes(cm.toLowerCase()))
      );
      score += sharedMaterials.length * 2.5;
      // GI Tag match
      if (other.giTagged && currentCraft.giTagged) score += 1;
      // Tag overlap
      const sharedTags = (other.tags || []).filter(t => (currentCraft.tags || []).includes(t));
      score += sharedTags.length * 1.5;

      return {
        ...other,
        similarityScore: score,
        sharedReason: sharedMaterials.length > 0
          ? `Shared natural materials (${sharedMaterials.slice(0, 2).join(', ')})`
          : other.category === currentCraft.category
            ? `Shared craft discipline (${other.category})`
            : `Cultural heritage tradition from ${other.state}`
      };
    })
    .sort((a, b) => b.similarityScore - a.similarityScore);

  return scored.slice(0, 3);
}
