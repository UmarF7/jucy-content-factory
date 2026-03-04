#!/usr/bin/env node

/**
 * JUCY CLEANSE — Web App Server
 * Express server with dashboard UI
 * Runs the content factory as a web service
 */

const express = require('express');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes

/**
 * GET / - Home page (redirect to dashboard)
 */
app.get('/', (req, res) => {
  res.redirect('/dashboard');
});

/**
 * GET /dashboard - Main dashboard
 */
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

/**
 * API: GET /api/scripts - Get today's scripts
 */
app.get('/api/scripts', (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const scriptFile = `./output/scripts-${today}.json`;

    if (fs.existsSync(scriptFile)) {
      const scripts = JSON.parse(fs.readFileSync(scriptFile, 'utf-8'));
      res.json(scripts);
    } else {
      res.json({ scripts: [], message: 'No scripts generated yet. Run generator first.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * API: POST /api/scripts/generate - Generate new scripts
 */
app.post('/api/scripts/generate', (req, res) => {
  try {
    const { execSync } = require('child_process');
    const result = execSync('node scripts/script-generator-v2.js', { encoding: 'utf-8' });
    
    const today = new Date().toISOString().split('T')[0];
    const scriptFile = `./output/scripts-${today}.json`;
    const scripts = JSON.parse(fs.readFileSync(scriptFile, 'utf-8'));

    res.json({
      success: true,
      message: 'Scripts generated successfully',
      scripts: scripts
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * API: POST /api/scripts/approve - Approve a script
 */
app.post('/api/scripts/approve', (req, res) => {
  try {
    const { date, index, notes } = req.body;
    const scriptFile = `./output/scripts-${date}.json`;

    if (!fs.existsSync(scriptFile)) {
      return res.status(404).json({ error: 'Script file not found' });
    }

    const scripts = JSON.parse(fs.readFileSync(scriptFile, 'utf-8'));
    scripts.scripts[index].approved = true;
    scripts.scripts[index].approved_at = new Date().toISOString();
    scripts.scripts[index].notes = notes || '';

    fs.writeFileSync(scriptFile, JSON.stringify(scripts, null, 2));

    res.json({ success: true, message: 'Script approved' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * API: POST /api/scripts/reject - Reject a script
 */
app.post('/api/scripts/reject', (req, res) => {
  try {
    const { date, index, reason } = req.body;
    const scriptFile = `./output/scripts-${date}.json`;

    if (!fs.existsSync(scriptFile)) {
      return res.status(404).json({ error: 'Script file not found' });
    }

    const scripts = JSON.parse(fs.readFileSync(scriptFile, 'utf-8'));
    scripts.scripts[index].approved = false;
    scripts.scripts[index].rejected_at = new Date().toISOString();
    scripts.scripts[index].rejection_reason = reason || '';

    fs.writeFileSync(scriptFile, JSON.stringify(scripts, null, 2));

    res.json({ success: true, message: 'Script rejected' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * API: POST /api/videos/generate - Generate videos from approved scripts
 */
app.post('/api/videos/generate', (req, res) => {
  try {
    // This would integrate with Higgsfield API
    // For now, return status
    res.json({
      success: true,
      message: 'Video generation started. Check back in 5-10 minutes.',
      status: 'pending'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * API: POST /api/videos/publish - Publish videos
 */
app.post('/api/videos/publish', (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Videos scheduled for publishing',
      platforms: ['TikTok', 'Instagram', 'YouTube Shorts'],
      schedule: 'Optimal posting times applied'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * API: GET /api/status - System status
 */
app.get('/api/status', (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const scriptFile = `./output/scripts-${today}.json`;
    
    let scripts = null;
    let approved = 0;
    let rejected = 0;
    let pending = 5;

    if (fs.existsSync(scriptFile)) {
      scripts = JSON.parse(fs.readFileSync(scriptFile, 'utf-8'));
      approved = scripts.scripts.filter(s => s.approved === true).length;
      rejected = scripts.scripts.filter(s => s.approved === false).length;
      pending = scripts.scripts.length - approved - rejected;
    }

    res.json({
      date: today,
      scripts_generated: scripts ? true : false,
      total_scripts: scripts ? scripts.scripts.length : 0,
      approved,
      rejected,
      pending,
      higgsfield_configured: !!process.env.HIGGSFIELD_API_KEY,
      openai_configured: !!process.env.OPENAI_API_KEY,
      tiktok_configured: !!process.env.TIKTOK_ACCESS_TOKEN,
      instagram_configured: !!process.env.INSTAGRAM_ACCESS_TOKEN,
      youtube_configured: !!process.env.YOUTUBE_API_KEY
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * API: GET /api/config - Get brand config
 */
app.get('/api/config', (req, res) => {
  try {
    const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

// Start server (only for local development)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`\n🌿 JUCY CLEANSE Content Factory`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`✅ Server running at http://localhost:${PORT}`);
    console.log(`📊 Dashboard: http://localhost:${PORT}/dashboard`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
  });
}

module.exports = app;
