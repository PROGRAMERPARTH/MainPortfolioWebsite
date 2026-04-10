/* ============================================
   server.js — Express server for Portfolio Builder
   Serves the production build on localhost
   ============================================ */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// ---------- Middleware ----------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------- Serve static files from Vite build ----------
app.use(express.static(path.join(__dirname, 'dist')));

// ---------- API Routes (add your own below) ----------
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Portfolio Builder server is running!',
    timestamp: new Date().toISOString(),
  });
});

// ---------- Catch-all: serve index.html for SPA routing ----------
app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// ---------- Start server ----------
app.listen(PORT, () => {
  console.log(`\n🚀 Portfolio Builder is live!`);
  console.log(`   Local:   http://localhost:${PORT}`);
  console.log(`   Health:  http://localhost:${PORT}/api/health\n`);
});
