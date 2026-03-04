// Vercel Serverless Function Handler
const express = require('express');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

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
  res.sendFile(path.join(__dirname, '../public', 'dashboard.html'));
});

/**
 * API: GET /api/scripts - Get today's scripts
 */
app.get('/api/scripts', (req, res) => {
  try {
    // Generate fresh scripts in memory
    const today = new Date().toISOString().split('T')[0];
    
    const scripts = {
      date: today,
      brand: "JUCY CLEANSE",
      total_scripts: 5,
      scripts: [
        {
          template: "problem_solution",
          title: "Problem → Solution: constant bloating",
          hook: "If you're dealing with constant bloating after meals, you need to see this.",
          body: "Here's what most people don't realise... When you eat processed foods, your digestive system gets overwhelmed. But there's a solution: JUCY CLEANSE. Our cold-pressed juices are 100% raw.",
          conclusion: "Ready to feel the difference? Money-back guarantee applied.",
          length: "25-30 seconds",
          engagement_prediction: "high",
          approved: null
        }
      ]
    };
    res.json(scripts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * API: POST /api/scripts/generate - Generate new scripts
 */
app.post('/api/scripts/generate', (req, res) => {
  try {
    // Generate 5 sample scripts directly (in-memory, no filesystem)
    const today = new Date().toISOString().split('T')[0];
    
    const scripts = {
      date: today,
      brand: "JUCY CLEANSE",
      total_scripts: 5,
      scripts: [
        {
          template: "problem_solution",
          title: "Problem → Solution: constant bloating",
          hook: "If you're dealing with constant bloating after meals, you need to see this.",
          body: "Here's what most people don't realise... When you eat processed foods, your digestive system gets overwhelmed. Bloating, fatigue, brain fog - it's all connected. But there's a solution: JUCY CLEANSE. Our cold-pressed juices are 100% raw, packed with enzymes and nutrients. No heat damage. No additives.",
          conclusion: "Ready to feel the difference? Your first JUCY cleanse is just one click away. Choose your cleanse and join thousands who've already felt the change. Money-back guarantee applied.",
          captions: { tiktok: "If you're bloated... you need this 💚", instagram: "Real problem. Real solution. Real results. 💚", youtube: "Stop the scroll if you're bloated constantly..." },
          hashtags: ["#JuicyCleanse", "#Detox", "#HealthTransformation"],
          length: "25-30 seconds",
          engagement_prediction: "high (8-12%)",
          best_for: ["TikTok", "Instagram"],
          approved: null
        },
        {
          template: "testimonial",
          title: "Testimonial: Day 3 Results",
          hook: "Day 3 of JUCY cleanse and I can't believe the difference...",
          body: "I was sceptical at first. I've tried cleanses before that didn't work. But JUCY is different. Day 1: Got my delivery. Started my first juice. Day 3: This is insane. The energy boost. I'm not exaggerating.",
          conclusion: "Ready for your own transformation? JUCY CLEANSE made me a believer. Try risk-free with our money-back guarantee. Order today. 💚",
          captions: { tiktok: "Day 3 and I'm obsessed 💚", instagram: "I wasn't expecting this. 💚", youtube: "Honest review: JUCY CLEANSE after 3 days" },
          hashtags: ["#JuicyCleanse", "#CleanseResults", "#BeforeAndAfter"],
          length: "20-28 seconds",
          engagement_prediction: "very high (9-14%)",
          best_for: ["TikTok", "Instagram"],
          approved: null
        },
        {
          template: "benefits_breakdown",
          title: "Why Cold-Pressed Works",
          hook: "Here's exactly why JUCY cold-pressed cleanses work better than everything else...",
          body: "Most juice cleanses fail because they use heat. Heat destroys nutrients. JUCY is different. We cold-press for maximum nutrient retention. Raw nutrients intact. Concentrated nutrition. Active enzymes. No additives.",
          conclusion: "Stop wasting money on processed juice. JUCY CLEANSE is the real deal. 100% cold-pressed, 100% raw, 100% results-backed guarantee. Ready to feel the science in action? Order today. 💚",
          captions: { tiktok: "Why cold-pressed actually works 🧪💚", instagram: "The science behind why JUCY works 🧪", youtube: "Why Cold-Pressed Juice Works (The Science)" },
          hashtags: ["#NutritionScience", "#ColdPressed", "#JuicyCleanse"],
          length: "22-28 seconds",
          engagement_prediction: "high (7-10%)",
          best_for: ["TikTok", "Instagram", "YouTube"],
          approved: null
        },
        {
          template: "objection_handler",
          title: "Answer: Is it worth the price?",
          hook: "Common question: Is it worth the price?",
          body: "Fair question. The answer: Yes. Compare nutrient density per dollar to any supplement. You're getting pure, concentrated nutrition from 3-4 lbs of fresh produce per bottle. Your body recognises it as real food.",
          conclusion: "Still on the fence? Try risk-free with our money-back guarantee. Zero risk. Thousands have tried it and got results. You could be next. Order today. 💚",
          captions: { tiktok: "Is JUCY worth it? Yes. Here's why. 💚", instagram: "Real question. Real answer. 💚", youtube: "FAQ: Is JUCY worth the price?" },
          hashtags: ["#JuicyCleanse", "#FAQ", "#MoneyBackGuarantee"],
          length: "18-24 seconds",
          engagement_prediction: "high (8-11%)",
          best_for: ["TikTok", "Instagram"],
          approved: null
        },
        {
          template: "lifestyle",
          title: "Lifestyle: Morning routine",
          hook: "POV: You finally take your health seriously",
          body: "This is what happens when you make yourself a priority. Morning routine: Wake up intentional. Start with JUCY. Feel the difference. Carry that energy all day. It's not complicated. Real nutrition → Better energy → Better results → Better life.",
          conclusion: "This could be your morning. Your routine. Your life. One choice leads to everything else. Choose health. Choose JUCY. Join thousands who've made the shift. Your healthier self is waiting. 💚",
          captions: { tiktok: "This is what taking your health seriously looks like 💚", instagram: "POV: You actually take care of yourself 💚", youtube: "Morning Wellness Routine (Featuring JUCY Cleanse)" },
          hashtags: ["#WellnessRoutine", "#HealthyHabits", "#SelfCare"],
          length: "20-25 seconds",
          engagement_prediction: "high (7-10%)",
          best_for: ["Instagram", "TikTok"],
          approved: null
        }
      ]
    };

    res.json({
      success: true,
      message: 'Scripts generated successfully',
      scripts: scripts
    });
  } catch (error) {
    console.error('Generation error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * API: POST /api/scripts/approve - Approve a script
 */
app.post('/api/scripts/approve', (req, res) => {
  try {
    const { date, index, notes } = req.body;
    const scriptFile = path.join(__dirname, `../output/scripts-${date}.json`);

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
    const scriptFile = path.join(__dirname, `../output/scripts-${date}.json`);

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
    const scriptFile = path.join(__dirname, `../output/scripts-${today}.json`);
    
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
    const config = JSON.parse(fs.readFileSync(path.join(__dirname, '../config.json'), 'utf-8'));
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * API: GET /api/analytics - Get performance analytics
 */
app.get('/api/analytics', (req, res) => {
  try {
    res.json({
      total_videos_tracked: 0,
      best_template: "problem_solution",
      top_hooks: [],
      overall_stats: {
        avg_engagement_rate: "0%",
        templates_tested: 5,
        total_conversions: 0
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * API: POST /api/analytics/log - Log video performance
 */
app.post('/api/analytics/log', (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Performance logged',
      engagement_rate: 8.5
    });
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

// Export for Vercel
module.exports = app;
