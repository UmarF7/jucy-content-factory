/**
 * Dynamic Script Generator for JUCY CLEANSE
 * Generates UNIQUE scripts based on product info and video structures
 * Works entirely in-memory - no filesystem access needed
 */

// JUCY CLEANSE Product Information
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

// Pain Points (audience problems)
const PAIN_POINTS = [
  "constant bloating after meals",
  "afternoon energy crash",
  "struggling to lose weight",
  "poor digestion",
  "lack of confidence in body",
  "digestive discomfort",
  "sluggishness after eating",
  "difficulty with weight loss",
  "gut issues",
  "feeling uncomfortable in clothes"
];

// Hooks (attention-grabbers)
const HOOKS = {
  problem: [
    "If you're dealing with {pain}, watch this.",
    "Stop struggling with {pain}. Here's what actually works.",
    "{Pain} got you down? There's finally a solution.",
    "Tired of {pain}? Here's how to fix it.",
    "Nobody talks about {pain}... but here's the fix."
  ],
  testimonial: [
    "Day {days} of JUCY cleanse and I can't believe the difference...",
    "I didn't think it would work, but {days} days in...",
    "Day {days}: This is insane. Here's what happened...",
    "Day {days} update: I'm shocked by the results...",
    "This is what {days} days of JUCY looks like..."
  ],
  benefits: [
    "Here's exactly why JUCY works better than everything else...",
    "The science behind why cold-pressed is superior...",
    "3 reasons JUCY changes the game...",
    "Here's why this actually works (backed by science)...",
    "Cold-pressed vs pasteurised: The difference is massive..."
  ],
  objection: [
    "Will I be hungry?",
    "Is it safe?",
    "Is it worth the price?",
    "Can I still work while cleansing?",
    "Will the results last?"
  ],
  lifestyle: [
    "POV: You finally take your health seriously",
    "This is what a morning routine looks like (when you prioritise yourself)",
    "POV: You choose health",
    "What wellness actually looks like",
    "Morning routine of someone who takes their health seriously"
  ]
};

// Testimonial scenarios
const TESTIMONIAL_SCENARIOS = [
  { days: 3, benefit: "energy boost", result: "feel amazing" },
  { days: 5, benefit: "lost bloating", result: "clothes fit better" },
  { days: 3, benefit: "digestive relief", result: "no more discomfort" },
  { days: 5, benefit: "weight loss", result: "lost 5 pounds" },
  { days: 7, benefit: "complete transformation", result: "feel like a new person" }
];

// Objection answers
const OBJECTIONS = {
  "Will I be hungry?": "No. The juices are surprisingly satisfying. You'll actually have MORE energy, not less.",
  "Is it safe?": "Completely. It's just whole food nutrients. Your body loves it.",
  "Is it worth the price?": "Yes. Compare nutrient density per dollar to any supplement. JUCY wins every time.",
  "Can I still work while cleansing?": "Yes. You'll have MORE energy, not less. Perfect for working or exercising.",
  "Will the results last?": "Absolutely. You're resetting your system, not temporary detox. Results compound over time."
};

// Lifestyle scenarios
const LIFESTYLE_SCENARIOS = [
  { time: "Morning", activity: "wellness routine", vibe: "fresh and energised" },
  { time: "Pre-workout", activity: "fitness prep", vibe: "powerful and strong" },
  { time: "Office", activity: "productivity boost", vibe: "focused and confident" },
  { time: "Evening", activity: "self-care ritual", vibe: "calm and balanced" }
];

/**
 * Generate Problem → Solution script
 */
function generateProblemSolution() {
  const pain = PAIN_POINTS[Math.floor(Math.random() * PAIN_POINTS.length)];
  const painCapitalized = pain.charAt(0).toUpperCase() + pain.slice(1);
  const benefit = JUCY_INFO.benefits[Math.floor(Math.random() * JUCY_INFO.benefits.length)];
  
  const hookTemplate = HOOKS.problem[Math.floor(Math.random() * HOOKS.problem.length)];
  const hook = hookTemplate.replace("{pain}", pain).replace("{Pain}", painCapitalized);

  return {
    template: "problem_solution",
    title: `Problem → Solution: ${pain}`,
    hook: hook,
    body: `Here's what most people don't realise...

When you deal with ${pain}, your body is telling you something's wrong.

But here's the truth: It's not you. It's what you're eating.

Processed foods, additives, lack of real nutrients - your system gets overwhelmed. Your body can't process it.

That's where JUCY CLEANSE comes in.

${JUCY_INFO.keyFeatures.coldPressed}

Here's what happens:
• Day 1: You feel lighter, less sluggish
• Day 3: Relief kicks in
• Day 5: Real transformation

Why? Because you're finally giving your body what it needs.

Our customers see:
✓ ${benefit}
✓ Sustained energy
✓ Better digestion
✓ Real confidence

And you're protected by our ${JUCY_INFO.keyFeatures.guarantee}`,
    conclusion: `Ready to feel the difference?

Your first JUCY cleanse is one click away.

Choose your duration:
• 1-Day Refresh
• 3-Day Cleanse
• 5-Day Deep Cleanse

Join thousands who've already felt the change.

${JUCY_INFO.guarantee}

💚 Shop now: ${JUCY_INFO.website}`,
    captions: {
      tiktok: `If you're dealing with ${pain}... you need this 💚\n\nJUCY CLEANSE = real results.\n\nLink in bio #JuicyCleanse`,
      instagram: `Real problem. Real solution. 💚\n\nTired of ${pain}?\n\nOur ${JUCY_INFO.keyFeatures.coldPressed}\n\nLink in bio 🌿 #JuicyCleanse`,
      youtube: `Stop scrolling if you're dealing with ${pain}.\n\nHere's what JUCY does differently...\n\nShop: ${JUCY_INFO.website}`
    },
    hashtags: ["#JuicyCleanse", "#ColdPressed", "#HealthTransformation", "#NaturalEnergy"],
    length: "25-30 seconds",
    engagement_prediction: "high (8-12%)"
  };
}

/**
 * Generate Testimonial script
 */
function generateTestimonial() {
  const scenario = TESTIMONIAL_SCENARIOS[Math.floor(Math.random() * TESTIMONIAL_SCENARIOS.length)];
  const hookTemplate = HOOKS.testimonial[Math.floor(Math.random() * HOOKS.testimonial.length)];
  const hook = hookTemplate.replace("{days}", scenario.days);

  return {
    template: "testimonial",
    title: `Testimonial: Day ${scenario.days} Results`,
    hook: hook,
    body: `I was sceptical at first.

I've tried cleanses before. They didn't work. I'd feel deprived and the results didn't last.

But JUCY is different.

Day 1: Got my delivery. Premium packaging. ${JUCY_INFO.keyFeatures.coldPressed}. Started my first juice.

Day ${scenario.days}: This is insane.

The ${scenario.benefit}. The ${scenario.result}. I'm not exaggerating.

What shocked me most:
• You don't feel hungry (surprisingly satisfying)
• You have MORE energy (not less)
• The results are REAL (not temporary)
• ${JUCY_INFO.keyFeatures.guarantee}

I've already told 5 friends.

This isn't just a cleanse. It's a reset.

Proof that your body responds when you fuel it properly.

If you're on the fence: The money-back guarantee means zero risk.`,
    conclusion: `Ready for your own transformation?

JUCY CLEANSE made me a believer.

Don't take my word. Thousands have felt the same results:
✓ More energy
✓ Better digestion
✓ Clearer skin
✓ Real confidence boost
✓ ${scenario.benefit}

Your first cleanse is waiting.

${JUCY_INFO.keyFeatures.guarantee}

Try risk-free. Order today. 💚`,
    captions: {
      tiktok: `Day ${scenario.days} and I'm obsessed 💚\n\nJUCY > everything else I tried\n\n✓ Real results ✓ Real energy\n\nLink in bio #JuicyCleanse`,
      instagram: `I wasn't expecting this. 💚\n\nDay ${scenario.days} of JUCY and the difference is REAL.\n\n${scenario.benefit} = life changing\n\nLink in bio to order 🌿`,
      youtube: `Day ${scenario.days} honest review: JUCY CLEANSE\n\nResults: ${scenario.result}\n\nOrder: ${JUCY_INFO.website}`
    },
    hashtags: ["#JuicyCleanse", "#CleanseResults", "#RealReview", "#BeforeAndAfter"],
    length: "20-28 seconds",
    engagement_prediction: "very high (9-14%)"
  };
}

/**
 * Generate Benefits Breakdown script
 */
function generateBenefitsBreakdown() {
  const benefits = JUCY_INFO.benefits.slice(0, 3);
  const hookTemplate = HOOKS.benefits[Math.floor(Math.random() * HOOKS.benefits.length)];

  return {
    template: "benefits_breakdown",
    title: "Why Cold-Pressed Works",
    hook: hookTemplate,
    body: `Most juice cleanses fail because they use HEAT.

Heat destroys nutrients. Simple as that.

${JUCY_INFO.keyFeatures.coldPressed}

Here's the science:

BENEFIT #1: RAW NUTRIENTS
Regular juice = pasteurised = destroyed enzymes
JUCY = cold-pressed = all nutrients intact
Result: Your body absorbs MORE ✓

BENEFIT #2: CONCENTRATED NUTRITION
${JUCY_INFO.keyFeatures.nutrientDense}
Store-bought = diluted with water
Result: Maximum nutrient density ✓

BENEFIT #3: ACTIVE ENZYMES
Enzymes break down food. Heat kills them.
Cold-pressed keeps them ALIVE.
Result: Better digestion + absorption ✓

BENEFIT #4: NO ADDITIVES
${JUCY_INFO.keyFeatures.natural}
Result: Your body recognises REAL food ✓

THE RESULT?
✓ Digestion improves (24 hours)
✓ Energy rises (no crash)
✓ Skin clears (toxins leave)
✓ Weight normalises (body works properly)
✓ Confidence returns

That's not magic. That's biology.

Your body is designed to thrive.

Give it real nutrition and it RESPONDS.`,
    conclusion: `Stop wasting money on processed juice.

JUCY CLEANSE is the real deal:
✓ 100% cold-pressed
✓ 100% raw
✓ 100% nutrients intact
✓ ${JUCY_INFO.keyFeatures.guarantee}

It's not the cheapest.

It's the BEST.

Ready to feel the science in action?

Choose your cleanse. Get real results.

${JUCY_INFO.keyFeatures.guarantee}

💚 Shop: ${JUCY_INFO.website}`,
    captions: {
      tiktok: `Why cold-pressed works (the science) 🧪💚\n\nHeat = dead nutrients\nCold-pressed = alive\n\nThat's literally the difference.`,
      instagram: `The science behind JUCY 🧪\n\nCold-pressed > everything else\n\nNo heat damage. No additives. Results.\n\nLink in bio 💚`,
      youtube: `Cold-Pressed vs Pasteurised: The Difference\n\nScience doesn't lie. ${JUCY_INFO.keyFeatures.coldPressed}`
    },
    hashtags: ["#NutritionScience", "#ColdPressed", "#JuicyCleanse", "#HealthFacts"],
    length: "22-28 seconds",
    engagement_prediction: "high (7-10%)"
  };
}

/**
 * Generate Objection Handler script
 */
function generateObjectionHandler() {
  const objectionKeys = Object.keys(OBJECTIONS);
  const objectionKey = objectionKeys[Math.floor(Math.random() * objectionKeys.length)];
  const answer = OBJECTIONS[objectionKey];

  return {
    template: "objection_handler",
    title: `Answer: ${objectionKey}`,
    hook: `Common question: "${objectionKey}"`,
    body: `Fair question. Most people ask this before buying.

${objectionKey}

The answer: ${answer}

Here's why:

Our juices aren't watered-down. ${JUCY_INFO.keyFeatures.nutrientDense}

When you drink that, your body feels:
✓ Satisfied (real nutrition)
✓ Energised (natural sugars + enzymes)
✓ Healthy (your system works)

What people are really worried about:

"Will I suffer?"
No. You'll feel BETTER.

"Will it actually work?"
Yes. Thousands of customers prove it.

"What if it doesn't work?"
${JUCY_INFO.keyFeatures.guarantee}

The truth: Your body WANTS to be healthy.

Give it real nutrition and it responds.`,
    conclusion: `Still on the fence?

That's why we have the money-back guarantee.

Try JUCY risk-free:
✓ Feel the difference yourself
✓ See real results
✓ Get your money back if unsatisfied

No fine print. No questions asked.

We're confident because our customers are.

Order today. Feel the difference. 💚

${JUCY_INFO.website}`,
    captions: {
      tiktok: `"${objectionKey}"\n\n${answer.split('.')[0]} 💚\n\nTry risk-free #JuicyCleanse`,
      instagram: `Real question. Real answer. 💚\n\n${objectionKey}\n\n${answer}\n\nLink in bio to order 🌿`,
      youtube: `FAQ: ${objectionKey}\n\n${answer}\n\nOrdered today: ${JUCY_INFO.website}`
    },
    hashtags: ["#JuicyCleanse", "#FAQ", "#MoneyBackGuarantee", "#RiskFree"],
    length: "18-24 seconds",
    engagement_prediction: "high (8-11%)"
  };
}

/**
 * Generate Lifestyle script
 */
function generateLifestyle() {
  const scenario = LIFESTYLE_SCENARIOS[Math.floor(Math.random() * LIFESTYLE_SCENARIOS.length)];
  const hookTemplate = HOOKS.lifestyle[Math.floor(Math.random() * HOOKS.lifestyle.length)];

  return {
    template: "lifestyle",
    title: `Lifestyle: ${scenario.time.toLowerCase()} routine`,
    hook: hookTemplate,
    body: `This is what happens when you prioritise yourself.

${scenario.time} routine:
→ Wake up intentional
→ Start with JUCY
→ Feel the difference
→ Carry that energy all day

It's not complicated.

It's just:
Real nutrition → Better energy → Better results → Better life

JUCY isn't just a drink.

It's the anchor of your health routine.

One bottle. One decision. One moment.

That's all it takes to shift your entire day.

Your body responds when you prioritise it.

The vibe?
${scenario.vibe}

That's your life. That's your future.`,
    conclusion: `This could be your ${scenario.time.toLowerCase()}.

Your routine.

Your life.

One choice leads to everything else.

Choose health. Choose JUCY.

Join thousands who've made the shift.

Your healthier self is waiting. 💚

${JUCY_INFO.website}`,
    captions: {
      tiktok: `This is what taking your health seriously looks like 💚\n\n${scenario.vibe}\n\nPOV: You choose yourself.`,
      instagram: `${scenario.vibe} 💚\n\nThis is what wellness looks like.\n\nLink in bio to start your cleanse 🌿`,
      youtube: `${scenario.time} Wellness Routine\n\nFeaturing JUCY CLEANSE\n\nOrder: ${JUCY_INFO.website}`
    },
    hashtags: ["#WellnessRoutine", "#HealthyHabits", "#SelfCare", "#JuicyCleanse"],
    length: "20-25 seconds",
    engagement_prediction: "high (7-10%)"
  };
}

/**
 * Generate all 5 daily scripts - UNIQUE EVERY TIME
 */
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

module.exports = { generateDailyScripts };
