import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { getAllSellers, getSellerById, createSeller, updateSellerStatus, deleteSeller } from '../data/store.js';

const router = express.Router();

// Configure Multer storage for verification documents
const uploadsDir = path.resolve('uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

// GET /api/sellers - List all verified or filter by status
router.get('/', async (req, res) => {
  try {
    const { status, craftId, state } = req.query;
    const sellers = await getAllSellers({ status, craftId, state });
    res.json({
      success: true,
      count: sellers.length,
      data: sellers
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/sellers/:id - Get single artisan profile
router.get('/:id', async (req, res) => {
  try {
    const seller = await getSellerById(req.params.id);
    if (!seller) {
      return res.status(404).json({ success: false, message: 'Artisan record not found' });
    }
    res.json({
      success: true,
      data: seller
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/sellers/register - Register a new artisan seller with document uploads
router.post('/register', upload.array('documents', 5), async (req, res) => {
  try {
    const {
      artisanName,
      businessName,
      craftId,
      craftName,
      state,
      pehchanCardNo,
      aadhaarMasked,
      phone,
      email,
      address,
      ngoEndorsement,
      experienceYears,
      onlineStoreUrl
    } = req.body;

    if (!artisanName || !businessName || !phone || !email || !craftId) {
      return res.status(400).json({
        success: false,
        message: 'Artisan Name, Studio Name, Phone, Email, and Craft are required.'
      });
    }

    const uploadedDocs = (req.files || []).map(f => ({
      type: 'Verification Document',
      fileName: f.originalname,
      fileUrl: `/uploads/${f.filename}`,
      verified: false,
      uploadedAt: new Date()
    }));

    // If documents were simulated
    if (uploadedDocs.length === 0 && req.body.simulatedDocs) {
      try {
        const parsed = JSON.parse(req.body.simulatedDocs);
        uploadedDocs.push(...parsed);
      } catch (e) {
        // ignore
      }
    }

    const newSeller = await createSeller({
      artisanName,
      businessName,
      craftId,
      craftName: craftName || craftId,
      state: state || 'India',
      pehchanCardNo: pehchanCardNo || `PEH-${Math.floor(100000 + Math.random() * 900000)}`,
      aadhaarMasked: aadhaarMasked ? (aadhaarMasked.startsWith('XXXX') ? aadhaarMasked : `XXXX-XXXX-${aadhaarMasked.slice(-4)}`) : 'XXXX-XXXX-8921',
      phone,
      email,
      address,
      ngoEndorsement: ngoEndorsement || 'Self-Sponsored Application',
      experienceYears: Number(experienceYears) || 5,
      onlineStoreUrl: onlineStoreUrl || '',
      verificationDocuments: uploadedDocs
    });

    res.status(201).json({
      success: true,
      message: 'Artisan seller application submitted successfully for review and permanently stored!',
      data: newSeller
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/sellers/:id/verify - Update verification status
router.put('/:id/verify', async (req, res) => {
  try {
    const { status, badge } = req.body;
    if (!['pending', 'under_review', 'verified', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid verification status' });
    }

    const updated = await updateSellerStatus(req.params.id, status, badge);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Seller not found' });
    }

    res.json({
      success: true,
      message: `Seller status updated to ${status}`,
      data: updated
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/sellers/:id - Remove registered artisan
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await deleteSeller(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Seller not found' });
    }
    res.json({
      success: true,
      message: 'Artisan profile deleted successfully',
      data: deleted
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
