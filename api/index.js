// Vercel Serverless Function Handler - PURE IN-MEMORY, NO FILESYSTEM
const express = require('express');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory storage (resets per request - for demo purposes)
let generatedScripts = null;

// Helper: Generate complete scripts
function generateCompleteScripts() {
  const today = new Date().toISOString().split('T')[0];
  
  return {
    date: today,
    brand: "JUCY CLEANSE",
    total_scripts: 5,
    scripts: [
      {
        template: "problem_solution",
        title: "Problem → Solution: constant bloating",
        hook: "If you're dealing with constant bloating after meals, you need to see this.",
        body: "Here's what most people don't realise... When you eat processed foods, your digestive system gets overwhelmed. Bloating, fatigue, brain fog - it's all connected. But there's a solution: JUCY CLEANSE.\n\nOur cold-pressed juices are 100% raw, packed with enzymes and nutrients. No heat damage. No additives. Just pure, concentrated nutrition that your body can actually absorb.\n\nHere's what happens:\n• Day 1: You feel lighter, less sluggish\n• Day 3: Energy levels stabilise, digestive relief kicks in\n• Day 5: Real transformation. You look different. You feel different.",
        conclusion: "Ready to feel the difference? Your first JUCY cleanse is just one click away. Choose your cleanse: 1-Day Refresh, 3-Day Cleanse, or 5-Day Deep Cleanse. Join thousands who've already felt the change. Money-back guarantee applied.",
        captions: { 
          tiktok: "If you're bloated constantly... you need this 💚 #JuicyCleanse #Detox",
          instagram: "Real problem. Real solution. Real results. 💚 Link in bio #JuicyCleanse",
          youtube: "Stop the scroll if you're bloated constantly..." 
        },
        hashtags: ["#JuicyCleanse", "#Detox", "#HealthTransformation", "#ColdPressed"],
        length: "25-30 seconds",
        engagement_prediction: "high (8-12%)",
        best_for: ["TikTok", "Instagram"],
        approved: null
      },
      {
        template: "testimonial",
        title: "Testimonial: Day 3 Results",
        hook: "Day 3 of JUCY cleanse and I can't believe the difference...",
        body: "I was sceptical at first. I've tried cleanses before that didn't work. I'd feel deprived, miserable, and the results didn't last.\n\nBut JUCY is different.\n\nDay 1: Got my delivery. Premium packaging. Started my first juice.\nDay 3: This is insane.\n\nThe energy boost. The digestive relief. I'm not exaggerating when I say I feel like a new person.\n\nWhat shocked me most:\n• You don't feel hungry (the juices are surprisingly satisfying)\n• You have MORE energy (not less)\n• The results are REAL (not temporary)\n• The money-back guarantee meant zero risk",
        conclusion: "Ready for your own transformation? JUCY CLEANSE made me a believer. Try risk-free with our money-back guarantee. Zero risk. Feel the difference or get your money back. Order today. 💚",
        captions: { 
          tiktok: "Day 3 and I'm obsessed 💚 This actually works #JuicyCleanse #Results",
          instagram: "I wasn't expecting this. 💚 Day 3 results are REAL. Link in bio.",
          youtube: "Honest review: JUCY CLEANSE after 3 days" 
        },
        hashtags: ["#JuicyCleanse", "#CleanseResults", "#BeforeAndAfter", "#Testimonial"],
        length: "20-28 seconds",
        engagement_prediction: "very high (9-14%)",
        best_for: ["TikTok", "Instagram"],
        approved: null
      },
      {
        template: "benefits_breakdown",
        title: "Why Cold-Pressed Works",
        hook: "Here's exactly why JUCY cold-pressed cleanses work better than everything else...",
        body: "Most juice cleanses fail because they use HEAT.\n\nHeat destroys nutrients. Simple as that.\n\nJUCY is different. Here's the science:\n\nBENEFIT #1: RAW NUTRIENTS (No Heat Loss)\nRegular juice is pasteurised. Heat kills enzymes and vitamins.\nJUCY is cold-pressed. Raw. All nutrients intact.\nResult: Your body absorbs MORE.\n\nBENEFIT #2: CONCENTRATED NUTRITION\nWe use 3-4 lbs of fresh produce per bottle.\nStore-bought juice has water added.\nJUCY has nothing but pure juice.\nResult: More nutrient density per sip.\n\nBENEFIT #3: ACTIVE ENZYMES\nEnzymes break down food. They're ALIVE.\nHeat kills them.\nCold-pressed juice keeps them alive.\nResult: Better digestion. Better nutrient absorption.\n\nBENEFIT #4: NO ADDITIVES\nNo preservatives. No sugar added. No fillers.\nJust fresh juice.\nResult: Your body recognises it as real food.",
        conclusion: "Stop wasting money on juice that's been processed to death. JUCY CLEANSE is the real deal: 100% cold-pressed, 100% raw, 100% results-backed guarantee. It's not the cheapest option. It's the BEST option. Ready to feel the science in action? Order your cleanse today. 💚",
        captions: { 
          tiktok: "Why cold-pressed actually works 🧪💚 Heat kills nutrients. Science. #Nutrition",
          instagram: "The science behind why JUCY works 🧪 Cold-pressed > pasteurised. Always.",
          youtube: "Why Cold-Pressed Juice Works (The Science)" 
        },
        hashtags: ["#NutritionScience", "#ColdPressed", "#JuicyCleanse", "#Health"],
        length: "22-28 seconds",
        engagement_prediction: "high (7-10%)",
        best_for: ["TikTok", "Instagram", "YouTube"],
        approved: null
      },
      {
        template: "objection_handler",
        title: "Answer: Is it worth the price?",
        hook: "Common question: Is it worth the price?",
        body: "Fair question. Most people ask this before buying.\n\nThe answer: YES.\n\nHere's why:\n\nCompare cost per nutrient vs supplements. JUCY wins.\nCompare nutrition per dollar vs store cleanses. JUCY wins.\nYou're getting pure, concentrated nutrition from 3-4 lbs of fresh produce per bottle.\n\nYour body recognises it as real food.\nYour body responds immediately.\n\nWhat people are really worried about:\n'Will I suffer?' No. You'll feel BETTER.\n'Will it actually work?' Yes. Thousands of customers prove it.\n'What if it doesn't work for me?' Money-back guarantee. Zero risk.\n\nThe truth: Your body WANTS to be healthy.\n\nGive it real nutrition and it responds immediately.",
        conclusion: "Still on the fence? That's exactly why we have a money-back guarantee. Try JUCY risk-free: Feel the difference yourself, see real results, get your money back if you don't. No fine print. No questions asked. Order today. 💚",
        captions: { 
          tiktok: "Is JUCY worth it? YES. Here's why 💚 #JuicyCleanse #Worth",
          instagram: "Real question. Real answer. 💚 Is it worth the price? Absolutely.",
          youtube: "FAQ: Is JUCY worth the price?" 
        },
        hashtags: ["#JuicyCleanse", "#FAQ", "#MoneyBackGuarantee", "#Worth"],
        length: "18-24 seconds",
        engagement_prediction: "high (8-11%)",
        best_for: ["TikTok", "Instagram"],
        approved: null
      },
      {
        template: "lifestyle",
        title: "Lifestyle: Morning Routine",
        hook: "POV: You finally take your health seriously",
        body: "This is what happens when you make yourself a priority.\n\nMorning routine:\n→ Wake up intentional\n→ Start with JUCY\n→ Feel the difference\n→ Carry that energy all day\n\nIt's not complicated.\n\nIt's just:\nReal nutrition → Better energy → Better results → Better life\n\nJUCY isn't just a drink.\n\nIt's the anchor of your health routine.\n\nOne bottle. One decision. One moment.\n\nThat's all it takes to shift your entire day.\n\nYour body responds when you prioritise it.\n\nThis is what that looks like.",
        conclusion: "This could be your morning. Your routine. Your life. One choice leads to everything else. Choose health. Choose JUCY. Join thousands who've made the shift. Your healthier self is waiting. 💚",
        captions: { 
          tiktok: "This is what taking your health seriously looks like 💚 #HealthyHabits",
          instagram: "POV: You actually take care of yourself 💚 Link in bio to start your cleanse.",
          youtube: "Morning Wellness Routine (Featuring JUCY Cleanse)" 
        },
        hashtags: ["#WellnessRoutine", "#HealthyHabits", "#SelfCare", "#JuicyCleanse"],
        length: "20-25 seconds",
        engagement_prediction: "high (7-10%)",
        best_for: ["Instagram", "TikTok"],
        approved: null
      }
    ]
  };
}

// Routes

/**
 * GET / - Home page (redirect to dashboard)
 */
app.get('/', (req, res) => {
  res.redirect('/dashboard');
});

/**
 * GET /dashboard - Serve dashboard HTML
 */
app.get('/dashboard', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JUCY CLEANSE — Content Factory</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(135deg, #0f2818 0%, #051109 100%); color: #fff; padding: 20px; min-height: 100vh; }
    .container { max-width: 1400px; margin: 0 auto; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
    .header h1 { font-size: 2rem; color: #7eff9f; }
    button { background: #7eff9f; color: #0f2818; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; margin-left: 10px; }
    button:hover { background: #9fff7f; }
    .status-bar { display: grid; grid-template-columns: repeat(5, 1fr); gap: 15px; margin-bottom: 30px; }
    .status-card { background: rgba(31, 41, 55, 0.8); border: 1px solid #374151; border-radius: 12px; padding: 20px; text-align: center; }
    .status-value { font-size: 2.5rem; color: #7eff9f; font-weight: bold; margin: 10px 0; }
    .scripts-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 20px; }
    .script-card { background: rgba(31, 41, 55, 0.8); border: 1px solid #374151; border-radius: 12px; padding: 20px; }
    .script-card:hover { border-color: #7eff9f; box-shadow: 0 10px 30px rgba(126, 255, 159, 0.1); }
    .script-type { display: inline-block; padding: 4px 12px; background: rgba(126, 255, 159, 0.2); border-radius: 20px; font-size: 0.75rem; color: #7eff9f; font-weight: 600; text-transform: uppercase; }
    .script-title { font-size: 1.2rem; font-weight: 600; margin: 15px 0; }
    .script-hook { font-style: italic; color: #d1d5db; margin: 10px 0; padding: 10px; background: rgba(0, 0, 0, 0.2); border-left: 3px solid #7eff9f; border-radius: 4px; }
    .actions { display: flex; gap: 10px; margin-top: 15px; }
    .btn-approve { background: #4ade80; color: #1a2e1b; flex: 1; }
    .btn-reject { background: #ef4444; color: white; flex: 1; }
    .loading { text-align: center; padding: 40px; color: #9ca3af; }
    .spinner { display: inline-block; width: 40px; height: 40px; border: 4px solid #374151; border-top: 4px solid #7eff9f; border-radius: 50%; animation: spin 1s linear infinite; }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🌿 JUCY CLEANSE</h1>
      <div>
        <button onclick="generateScripts()">+ Generate Scripts</button>
        <button onclick="publishScripts()" style="background: #3b82f6;">🚀 Publish</button>
      </div>
    </div>

    <div class="status-bar">
      <div class="status-card">
        <div style="color: #9ca3af; text-transform: uppercase; font-size: 0.85rem;">Today</div>
        <div class="status-value" id="dateDisplay">—</div>
      </div>
      <div class="status-card">
        <div style="color: #9ca3af; text-transform: uppercase; font-size: 0.85rem;">Total Scripts</div>
        <div class="status-value" id="totalScripts">0</div>
      </div>
      <div class="status-card">
        <div style="color: #9ca3af; text-transform: uppercase; font-size: 0.85rem;">Approved</div>
        <div class="status-value" id="approvedCount">0</div>
      </div>
      <div class="status-card">
        <div style="color: #9ca3af; text-transform: uppercase; font-size: 0.85rem;">Pending</div>
        <div class="status-value" id="pendingCount">0</div>
      </div>
      <div class="status-card">
        <div style="color: #9ca3af; text-transform: uppercase; font-size: 0.85rem;">Rejected</div>
        <div class="status-value" id="rejectedCount">0</div>
      </div>
    </div>

    <h2 style="margin-bottom: 20px; border-bottom: 2px solid #7eff9f; padding-bottom: 10px;">📝 Today's Scripts</h2>
    <div id="scriptsContainer" class="scripts-grid">
      <div class="loading"><div class="spinner"></div><p>Loading scripts...</p></div>
    </div>
  </div>

  <script>
    let currentScripts = null;

    async function generateScripts() {
      const btn = event.target;
      btn.disabled = true;
      btn.textContent = 'Generating...';
      
      try {
        const response = await fetch('/api/scripts/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' } });
        const data = await response.json();
        
        currentScripts = data.scripts || data;
        renderScripts(data.scripts ? data.scripts.scripts : data.scripts || []);
        updateStatus();
        
        btn.disabled = false;
        btn.textContent = '+ Generate Scripts';
      } catch (error) {
        alert('Error: ' + error.message);
        btn.disabled = false;
        btn.textContent = '+ Generate Scripts';
      }
    }

    async function loadScripts() {
      try {
        const response = await fetch('/api/scripts');
        const data = await response.json();
        currentScripts = data;
        renderScripts(data.scripts || []);
        updateStatus();
      } catch (error) {
        console.error('Error:', error);
      }
    }

    function renderScripts(scripts) {
      if (!scripts || scripts.length === 0) {
        document.getElementById('scriptsContainer').innerHTML = '<div class="loading"><p>Click "Generate Scripts" to get started</p></div>';
        return;
      }

      const html = scripts.map((script, index) => \`
        <div class="script-card">
          <span class="script-type">\${script.template.replace(/_/g, ' ')}</span>
          <div class="script-title">\${script.title}</div>
          <div class="script-hook">"\${script.hook}"</div>
          <div style="font-size: 0.9rem; color: #d1d5db; margin: 10px 0;">\${script.length} | 📊 \${script.engagement_prediction}</div>
          <div style="font-size: 0.85rem; color: #d1d5db; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 4px; max-height: 80px; overflow-y: auto; margin: 10px 0;">\${script.body.substring(0, 150)}...</div>
          <div class="actions">
            <button class="btn-approve" onclick="approveScript(\${index})">✓ Approve</button>
            <button class="btn-reject" onclick="rejectScript(\${index})">✗ Reject</button>
          </div>
        </div>
      \`).join('');

      document.getElementById('scriptsContainer').innerHTML = html;
    }

    function approveScript(index) {
      if (currentScripts && currentScripts.scripts && currentScripts.scripts[index]) {
        currentScripts.scripts[index].approved = true;
        updateStatus();
        alert('✅ Script approved!');
      }
    }

    function rejectScript(index) {
      if (currentScripts && currentScripts.scripts && currentScripts.scripts[index]) {
        currentScripts.scripts[index].approved = false;
        updateStatus();
        alert('❌ Script rejected!');
      }
    }

    function publishScripts() {
      const approved = currentScripts && currentScripts.scripts 
        ? currentScripts.scripts.filter(s => s.approved === true).length 
        : 0;
      
      if (approved === 0) {
        alert('⚠️ No approved scripts to publish. Approve some scripts first!');
        return;
      }
      
      alert('✅ ' + approved + ' videos scheduled for publishing!');
    }

    function updateStatus() {
      if (!currentScripts || !currentScripts.scripts) {
        document.getElementById('totalScripts').textContent = '0';
        document.getElementById('approvedCount').textContent = '0';
        document.getElementById('pendingCount').textContent = '0';
        document.getElementById('rejectedCount').textContent = '0';
        return;
      }

      const scripts = currentScripts.scripts;
      const approved = scripts.filter(s => s.approved === true).length;
      const rejected = scripts.filter(s => s.approved === false).length;
      const pending = scripts.length - approved - rejected;

      document.getElementById('dateDisplay').textContent = currentScripts.date || '—';
      document.getElementById('totalScripts').textContent = scripts.length;
      document.getElementById('approvedCount').textContent = approved;
      document.getElementById('pendingCount').textContent = pending;
      document.getElementById('rejectedCount').textContent = rejected;
    }

    loadScripts();
  </script>
</body>
</html>
  `);
});

/**
 * API: POST /api/scripts/generate - Generate new scripts
 */
app.post('/api/scripts/generate', (req, res) => {
  try {
    const scripts = generateCompleteScripts();
    res.json({ success: true, message: 'Scripts generated successfully', scripts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * API: GET /api/scripts - Get scripts
 */
app.get('/api/scripts', (req, res) => {
  try {
    const scripts = generateCompleteScripts();
    res.json(scripts);
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
    res.json({
      date: today,
      scripts_generated: true,
      total_scripts: 5,
      approved: 0,
      rejected: 0,
      pending: 5,
      higgsfield_configured: false,
      openai_configured: false,
      tiktok_configured: false,
      instagram_configured: false,
      youtube_configured: false
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 404 & Error handlers
app.use((req, res) => res.status(404).json({ error: 'Not found' }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

module.exports = app;
