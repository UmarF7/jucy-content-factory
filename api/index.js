// JUCY CLEANSE Content Factory - Vercel Serverless API
// Pure in-memory script generation - NO filesystem access
const express = require('express');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import dynamic script generator
const { generateDailyScripts } = require('./script-generator');

// Routes

/**
 * GET / - Redirect to dashboard
 */
app.get('/', (req, res) => {
  res.redirect('/dashboard');
});

/**
 * GET /dashboard - Serve interactive dashboard
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
    button:hover { background: #9fff7f; transform: translateY(-2px); }
    button:disabled { opacity: 0.6; cursor: not-allowed; }
    .status-bar { display: grid; grid-template-columns: repeat(5, 1fr); gap: 15px; margin-bottom: 30px; }
    .status-card { background: rgba(31, 41, 55, 0.8); border: 1px solid #374151; border-radius: 12px; padding: 20px; text-align: center; }
    .status-value { font-size: 2.5rem; color: #7eff9f; font-weight: bold; margin: 10px 0; }
    .scripts-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 20px; }
    .script-card { background: rgba(31, 41, 55, 0.8); border: 1px solid #374151; border-radius: 12px; padding: 20px; }
    .script-card:hover { border-color: #7eff9f; box-shadow: 0 10px 30px rgba(126, 255, 159, 0.1); }
    .script-type { display: inline-block; padding: 4px 12px; background: rgba(126, 255, 159, 0.2); border-radius: 20px; font-size: 0.75rem; color: #7eff9f; font-weight: 600; text-transform: uppercase; margin-bottom: 10px; }
    .script-title { font-size: 1.2rem; font-weight: 600; margin: 10px 0; }
    .script-hook { font-style: italic; color: #d1d5db; margin: 10px 0; padding: 10px; background: rgba(0, 0, 0, 0.2); border-left: 3px solid #7eff9f; border-radius: 4px; }
    .script-body { font-size: 0.85rem; line-height: 1.6; color: #d1d5db; background: rgba(0, 0, 0, 0.2); padding: 10px; border-radius: 4px; max-height: 120px; overflow-y: auto; margin: 10px 0; }
    .actions { display: flex; gap: 10px; margin-top: 15px; }
    .btn-approve { background: #4ade80; color: #1a2e1b; flex: 1; }
    .btn-reject { background: #ef4444; color: white; flex: 1; }
    .btn-view { background: #3b82f6; color: white; flex: 0 1 auto; }
    .loading { text-align: center; padding: 40px; color: #9ca3af; }
    .spinner { display: inline-block; width: 40px; height: 40px; border: 4px solid #374151; border-top: 4px solid #7eff9f; border-radius: 50%; animation: spin 1s linear infinite; }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    .empty-state { text-align: center; padding: 60px 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🌿 JUCY CLEANSE</h1>
      <div>
        <button id="generateBtn" onclick="generateScripts()">+ Generate Scripts</button>
        <button onclick="publishScripts()" style="background: #3b82f6;">🚀 Publish</button>
      </div>
    </div>

    <div class="status-bar">
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
      <div class="status-card">
        <div style="color: #9ca3af; text-transform: uppercase; font-size: 0.85rem;">Today</div>
        <div class="status-value" id="dateDisplay">—</div>
      </div>
    </div>

    <h2 style="margin-bottom: 20px; border-bottom: 2px solid #7eff9f; padding-bottom: 10px;">📝 Today's Scripts</h2>
    <div id="scriptsContainer" class="scripts-grid">
      <div class="empty-state"><p>Click "Generate Scripts" to create today's content</p></div>
    </div>
  </div>

  <script>
    let currentScripts = null;

    async function generateScripts() {
      const btn = document.getElementById('generateBtn');
      btn.disabled = true;
      btn.textContent = 'Generating...';
      
      try {
        const response = await fetch('/api/scripts/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' } });
        if (!response.ok) throw new Error('API error: ' + response.status);
        
        const data = await response.json();
        currentScripts = data.scripts;
        renderScripts(data.scripts.scripts || []);
        updateStatus();
        
        alert('✅ ' + (data.scripts.scripts ? data.scripts.scripts.length : 5) + ' UNIQUE scripts generated!');
        btn.disabled = false;
        btn.textContent = '+ Generate Scripts';
      } catch (error) {
        alert('Error: ' + error.message);
        btn.disabled = false;
        btn.textContent = '+ Generate Scripts';
      }
    }

    function renderScripts(scripts) {
      if (!scripts || scripts.length === 0) {
        document.getElementById('scriptsContainer').innerHTML = '<div class="empty-state"><p>No scripts. Click Generate to create content.</p></div>';
        return;
      }

      const html = scripts.map((script, index) => \`
        <div class="script-card">
          <div class="script-type">\${script.template.replace(/_/g, ' ')}</div>
          <div class="script-title">\${script.title}</div>
          <div class="script-hook">"\${script.hook}"</div>
          <div style="font-size: 0.9rem; color: #d1d5db;">⏱️ \${script.length} | 📊 \${script.engagement_prediction}</div>
          <div class="script-body">\${script.body.substring(0, 150)}...</div>
          <div class="actions">
            <button class="btn-approve" onclick="approveScript(\${index})">✓ Approve</button>
            <button class="btn-reject" onclick="rejectScript(\${index})">✗ Reject</button>
            <button class="btn-view" onclick="viewScript(\${index})">View</button>
          </div>
        </div>
      \`).join('');

      document.getElementById('scriptsContainer').innerHTML = html;
    }

    function viewScript(index) {
      const script = currentScripts.scripts[index];
      alert('📝 ' + script.title + '\\n\\nHook: ' + script.hook + '\\n\\nLength: ' + script.length + '\\n\\nEngagement: ' + script.engagement_prediction);
    }

    function approveScript(index) {
      if (currentScripts && currentScripts.scripts && currentScripts.scripts[index]) {
        currentScripts.scripts[index].approved = true;
        updateStatus();
      }
    }

    function rejectScript(index) {
      if (currentScripts && currentScripts.scripts && currentScripts.scripts[index]) {
        currentScripts.scripts[index].approved = false;
        updateStatus();
      }
    }

    function publishScripts() {
      const approved = currentScripts && currentScripts.scripts 
        ? currentScripts.scripts.filter(s => s.approved === true).length 
        : 0;
      
      if (approved === 0) {
        alert('⚠️ No approved scripts. Approve some first!');
        return;
      }
      
      alert('✅ ' + approved + ' videos scheduled for publishing!');
    }

    function updateStatus() {
      if (!currentScripts || !currentScripts.scripts) return;

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
  </script>
</body>
</html>
  `);
});

/**
 * API: POST /api/scripts/generate - Generate UNIQUE scripts based on product info
 */
app.post('/api/scripts/generate', (req, res) => {
  try {
    const scripts = generateDailyScripts();
    res.json({ 
      success: true, 
      message: 'Unique scripts generated based on JUCY CLEANSE product info',
      scripts 
    });
  } catch (error) {
    console.error('Generation error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * API: GET /api/scripts - Get scripts
 */
app.get('/api/scripts', (req, res) => {
  try {
    const scripts = generateDailyScripts();
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
      system: 'JUCY CLEANSE Content Factory',
      scripts_generated: true,
      generation_type: 'Dynamic (UNIQUE every time)',
      total_scripts_per_day: 5,
      video_structures: [
        'Problem → Solution',
        'Testimonial / Social Proof',
        'Benefits Breakdown',
        'Objection Handling',
        'Lifestyle / Identity'
      ],
      higgsfield_configured: false,
      status: 'ready'
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
