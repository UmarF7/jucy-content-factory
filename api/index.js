// JUCY CLEANSE Content Factory - Complete Serverless API
// ===== INLINE SCRIPT GENERATOR (No filesystem, pure in-memory) =====

const JUCY_INFO = {
  brand: "JUCY CLEANSE",
  website: "jucycleanse.co.uk",
  benefits: ["cold pressed", "healthy", "weight loss", "reduce bloating", "gut health", "natural energy"],
  keyFeatures: {
    coldPressed: "100% raw, cold-pressed, no heat damage",
    natural: "100% natural, no additives, no preservatives",
    guarantee: "Feel the difference or your money back",
    nutrientDense: "3-4 lbs of fresh produce per bottle"
  }
};

const PAIN_POINTS = [
  "constant bloating after meals", "afternoon energy crash", "struggling to lose weight",
  "poor digestion", "lack of confidence in body", "digestive discomfort", "sluggishness after eating",
  "difficulty with weight loss", "gut issues", "feeling uncomfortable in clothes"
];

const HOOKS = {
  problem: [
    "If you're dealing with {pain}, watch this.",
    "Stop struggling with {pain}. Here's what actually works.",
    "{Pain} got you down? There's finally a solution.",
    "Tired of {pain}? Here's how to fix it.",
    "Nobody talks about {pain}... but here's the fix."
  ]
};

const TESTIMONIAL_SCENARIOS = [
  { days: 3, benefit: "energy boost", result: "feel amazing" },
  { days: 5, benefit: "lost bloating", result: "clothes fit better" },
  { days: 3, benefit: "digestive relief", result: "no more discomfort" },
  { days: 5, benefit: "weight loss", result: "lost 5 pounds" }
];

function generateProblemSolution() {
  const pain = PAIN_POINTS[Math.floor(Math.random() * PAIN_POINTS.length)];
  const hook = HOOKS.problem[Math.floor(Math.random() * HOOKS.problem.length)]
    .replace("{pain}", pain).replace("{Pain}", pain.charAt(0).toUpperCase() + pain.slice(1));

  return {
    template: "problem_solution",
    title: `Problem → Solution: ${pain}`,
    hook: hook,
    body: `Here's what most people don't realise...\n\nWhen you deal with ${pain}, your body is telling you something's wrong.\n\n${JUCY_INFO.keyFeatures.coldPressed}\n\nDay 1: Feel lighter\nDay 3: Relief kicks in\nDay 5: Real transformation\n\nYou're finally giving your body what it needs.`,
    conclusion: `Ready to feel the difference? Choose 1-Day, 3-Day, or 5-Day cleanse. ${JUCY_INFO.keyFeatures.guarantee}`,
    captions: { tiktok: `If dealing with ${pain}... you need this 💚`, instagram: `Real problem. Real solution. 💚`, youtube: `Stop scrolling if you're dealing with ${pain}.` },
    hashtags: ["#JuicyCleanse", "#ColdPressed", "#HealthTransformation"],
    length: "25-30 seconds",
    engagement_prediction: "high (8-12%)"
  };
}

function generateTestimonial() {
  const s = TESTIMONIAL_SCENARIOS[Math.floor(Math.random() * TESTIMONIAL_SCENARIOS.length)];
  return {
    template: "testimonial",
    title: `Testimonial: Day ${s.days} Results`,
    hook: `Day ${s.days} of JUCY cleanse and I can't believe the difference...`,
    body: `I was sceptical. But JUCY is different.\n\nDay 1: Got delivery. Started juice.\n\nDay ${s.days}: This is insane.\n\nThe ${s.benefit}. I ${s.result}.\n\n${JUCY_INFO.keyFeatures.guarantee}`,
    conclusion: `Ready for your transformation? Try risk-free. Order today. 💚`,
    captions: { tiktok: `Day ${s.days} and I'm obsessed 💚`, instagram: `I wasn't expecting this. 💚`, youtube: `Honest review: Day ${s.days}` },
    hashtags: ["#JuicyCleanse", "#CleanseResults", "#RealReview"],
    length: "20-28 seconds",
    engagement_prediction: "very high (9-14%)"
  };
}

function generateBenefitsBreakdown() {
  return {
    template: "benefits_breakdown",
    title: "Why Cold-Pressed Works",
    hook: "Here's exactly why JUCY works better than everything else...",
    body: `Heat destroys nutrients.\n\n${JUCY_INFO.keyFeatures.coldPressed}\n\nBENEFIT #1: RAW NUTRIENTS - All intact ✓\nBENEFIT #2: CONCENTRATED - ${JUCY_INFO.keyFeatures.nutrientDense}\nBENEFIT #3: ACTIVE ENZYMES - Better digestion ✓\nBENEFIT #4: NO ADDITIVES - ${JUCY_INFO.keyFeatures.natural}\n\nResult: Your body responds. Immediately.`,
    conclusion: `Stop wasting money on processed juice. JUCY is the best option. ${JUCY_INFO.keyFeatures.guarantee}`,
    captions: { tiktok: "Why cold-pressed works 🧪💚", instagram: "The science behind JUCY 🧪", youtube: "Cold-Pressed vs Pasteurised" },
    hashtags: ["#NutritionScience", "#ColdPressed", "#JuicyCleanse"],
    length: "22-28 seconds",
    engagement_prediction: "high (7-10%)"
  };
}

function generateObjectionHandler() {
  const objections = ["Will I be hungry?", "Is it safe?", "Is it worth the price?", "Can I work while cleansing?"];
  const obj = objections[Math.floor(Math.random() * objections.length)];
  return {
    template: "objection_handler",
    title: `Answer: ${obj}`,
    hook: `Common question: "${obj}"`,
    body: `Fair question. Most people ask this.\n\n${obj}\n\nThe answer: Your body will feel BETTER.\n\n${JUCY_INFO.keyFeatures.nutrientDense}\n\nThousands of customers have results.\n\n${JUCY_INFO.keyFeatures.guarantee}`,
    conclusion: `Still on fence? Try risk-free. Order today. 💚`,
    captions: { tiktok: `"${obj}" - YES 💚`, instagram: `Real question. Real answer. 💚`, youtube: `FAQ: ${obj}` },
    hashtags: ["#JuicyCleanse", "#FAQ", "#MoneyBackGuarantee"],
    length: "18-24 seconds",
    engagement_prediction: "high (8-11%)"
  };
}

function generateLifestyle() {
  const scenarios = ["Morning", "Pre-workout", "Office", "Evening"];
  const time = scenarios[Math.floor(Math.random() * scenarios.length)];
  return {
    template: "lifestyle",
    title: `Lifestyle: ${time.toLowerCase()} routine`,
    hook: "POV: You finally take your health seriously",
    body: `${time} routine:\n→ Wake up intentional\n→ Start with JUCY\n→ Feel the difference\n→ Carry energy all day\n\nReal nutrition → Better energy → Better life\n\nJUCY is the anchor of your health routine.`,
    conclusion: `This could be your ${time.toLowerCase()}. Your routine. Your life.\n\nChoose health. Choose JUCY. 💚`,
    captions: { tiktok: `This is wellness 💚`, instagram: `${time} with intention 💚`, youtube: `${time} Wellness Routine` },
    hashtags: ["#WellnessRoutine", "#HealthyHabits", "#SelfCare"],
    length: "20-25 seconds",
    engagement_prediction: "high (7-10%)"
  };
}

function generateDailyScripts() {
  return {
    date: new Date().toISOString().split('T')[0],
    brand: "JUCY CLEANSE",
    total_scripts: 5,
    scripts: [
      generateProblemSolution(),
      generateTestimonial(),
      generateBenefitsBreakdown(),
      generateObjectionHandler(),
      generateLifestyle()
    ]
  };
}

// ===== EXPRESS API =====
const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.redirect('/dashboard'));

app.get('/dashboard', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
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
.script-card:hover { border-color: #7eff9f; }
.script-type { display: inline-block; padding: 4px 12px; background: rgba(126, 255, 159, 0.2); border-radius: 20px; font-size: 0.75rem; color: #7eff9f; text-transform: uppercase; margin-bottom: 10px; }
.script-title { font-size: 1.2rem; font-weight: 600; margin: 10px 0; }
.script-hook { font-style: italic; color: #d1d5db; margin: 10px 0; padding: 10px; background: rgba(0, 0, 0, 0.2); border-left: 3px solid #7eff9f; }
.script-body { font-size: 0.85rem; color: #d1d5db; background: rgba(0, 0, 0, 0.2); padding: 10px; max-height: 100px; overflow-y: auto; margin: 10px 0; }
.actions { display: flex; gap: 10px; margin-top: 15px; }
.btn-approve { background: #4ade80; color: #1a2e1b; flex: 1; }
.btn-reject { background: #ef4444; color: white; flex: 1; }
</style></head><body>
<div class="container">
<div class="header"><h1>🌿 JUCY CLEANSE</h1><div><button id="generateBtn" onclick="generateScripts()">+ Generate Scripts</button><button onclick="alert('✅ Publishing...')" style="background: #3b82f6;">🚀 Publish</button></div></div>
<div class="status-bar">
<div class="status-card"><div style="color: #9ca3af; text-transform: uppercase; font-size: 0.85rem;">Total</div><div class="status-value" id="totalScripts">0</div></div>
<div class="status-card"><div style="color: #9ca3af; text-transform: uppercase; font-size: 0.85rem;">Approved</div><div class="status-value" id="approvedCount">0</div></div>
<div class="status-card"><div style="color: #9ca3af; text-transform: uppercase; font-size: 0.85rem;">Pending</div><div class="status-value" id="pendingCount">0</div></div>
<div class="status-card"><div style="color: #9ca3af; text-transform: uppercase; font-size: 0.85rem;">Rejected</div><div class="status-value" id="rejectedCount">0</div></div>
<div class="status-card"><div style="color: #9ca3af; text-transform: uppercase; font-size: 0.85rem;">Date</div><div class="status-value" id="dateDisplay">—</div></div>
</div>
<h2 style="margin-bottom: 20px; border-bottom: 2px solid #7eff9f; padding-bottom: 10px;">📝 Today's Scripts</h2>
<div id="scriptsContainer" class="scripts-grid"><div style="text-align: center; padding: 60px 20px; color: #9ca3af;">Click "Generate Scripts" to create UNIQUE content</div></div>
</div>
<script>
let currentScripts = null;
async function generateScripts() {
  const btn = document.getElementById('generateBtn');
  btn.disabled = true;
  btn.textContent = 'Generating UNIQUE scripts...';
  try {
    const res = await fetch('/api/scripts/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' } });
    const data = await res.json();
    currentScripts = data.scripts;
    renderScripts(data.scripts.scripts);
    updateStatus();
    alert('✅ ' + data.scripts.scripts.length + ' UNIQUE scripts generated!');
    btn.disabled = false;
    btn.textContent = '+ Generate Scripts';
  } catch (e) {
    alert('Error: ' + e.message);
    btn.disabled = false;
    btn.textContent = '+ Generate Scripts';
  }
}
function renderScripts(scripts) {
  const html = scripts.map((s, i) => \`
    <div class="script-card">
      <div class="script-type">\${s.template.replace(/_/g, ' ')}</div>
      <div class="script-title">\${s.title}</div>
      <div class="script-hook">"\${s.hook}"</div>
      <div style="font-size: 0.9rem; color: #d1d5db;">⏱️ \${s.length} | 📊 \${s.engagement_prediction}</div>
      <div class="script-body">\${s.body.substring(0, 120)}...</div>
      <div class="actions">
        <button class="btn-approve" onclick="approve(\${i})">✓ Approve</button>
        <button class="btn-reject" onclick="reject(\${i})">✗ Reject</button>
      </div>
    </div>
  \`).join('');
  document.getElementById('scriptsContainer').innerHTML = html;
}
function approve(i) { currentScripts.scripts[i].approved = true; updateStatus(); }
function reject(i) { currentScripts.scripts[i].approved = false; updateStatus(); }
function updateStatus() {
  if (!currentScripts) return;
  const s = currentScripts.scripts;
  const app = s.filter(x => x.approved === true).length;
  const rej = s.filter(x => x.approved === false).length;
  const pend = s.length - app - rej;
  document.getElementById('totalScripts').textContent = s.length;
  document.getElementById('approvedCount').textContent = app;
  document.getElementById('pendingCount').textContent = pend;
  document.getElementById('rejectedCount').textContent = rej;
  document.getElementById('dateDisplay').textContent = currentScripts.date || '—';
}
</script>
</body></html>
  `);
});

app.post('/api/scripts/generate', (req, res) => {
  try {
    const scripts = generateDailyScripts();
    res.json({ success: true, message: 'UNIQUE scripts generated', scripts });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/scripts', (req, res) => {
  try {
    res.json(generateDailyScripts());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/status', (req, res) => {
  res.json({ status: 'ready', system: 'JUCY CLEANSE Content Factory', type: 'Dynamic Script Generation', scripts_per_day: 5 });
});

app.use((req, res) => res.status(404).json({ error: 'Not found' }));
module.exports = app;
