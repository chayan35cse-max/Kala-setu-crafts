import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';
import craftRoutes from './routes/craftRoutes.js';
import sellerRoutes from './routes/sellerRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import { setMongoStatus, seedMongoIfEmpty } from './data/store.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded documents
const uploadsDir = path.resolve('uploads');
app.use('/uploads', express.static(uploadsDir));

// Connect to MongoDB if available, otherwise use resilient memory fallback
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kalasetu';

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 2000
}).then(() => {
  console.log('✅ Connected to MongoDB at:', MONGODB_URI);
  setMongoStatus(true);
  seedMongoIfEmpty();
}).catch((err) => {
  console.log('ℹ️ MongoDB not connected (running in high-performance embedded mode with pre-seeded crafts).');
  setMongoStatus(false);
});

// API Routes
app.use('/api/crafts', craftRoutes);
app.use('/api/sellers', sellerRoutes);
app.use('/api/ai', aiRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'KalaSetu Traditional Crafts API',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'MongoDB Live' : 'Embedded Datastore (Active)'
  });
});

// Serve frontend static build in production
const clientDistPath = path.resolve('../client/dist');
const localDistPath = path.resolve('client/dist');
const distPath = fs.existsSync(clientDistPath) ? clientDistPath : fs.existsSync(localDistPath) ? localDistPath : null;

if (distPath) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api') && !req.path.startsWith('/uploads')) {
      res.sendFile(path.join(distPath, 'index.html'));
    }
  });
}

app.listen(PORT, () => {
  console.log(`✨ KalaSetu Server running smoothly on http://localhost:${PORT}`);
});
