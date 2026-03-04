#!/usr/bin/env node

/**
 * JUCY CLEANSE — Enhanced Script Generator v2
 * Generates complete UGC scripts: Hook → Body → Conclusion
 */

const fs = require('fs');
const path = require('path');

const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));

// Complete script templates with full structure
const SCRIPT_TEMPLATES = {
  problem_solution: {
    name: "Problem → Solution",
    description: "Direct response format. Trigger emotion → show solution → prove results",
    generate: () => {
      const problems = [
        { pain: "constant bloating after meals", benefit: "natural energy", result: "digestive relief" },
        { pain: "afternoon energy crash", benefit: "sustained energy", result: "productivity boost" },
        { pain: "difficulty starting weight loss", benefit: "natural metabolism boost", result: "visible results" },
        { pain: "poor digestion and gut issues", benefit: "improved digestion", result: "better nutrient absorption" },
        { pain: "lack of confidence in your body", benefit: "internal cleanse", result: "renewed confidence" }
      ];

      const p = problems[Math.floor(Math.random() * problems.length)];

      return {
        template: "problem_solution",
        hook: `If you're dealing with ${p.pain}, you need to see this.`,
        body: `
Here's what most people don't realise...

When you eat processed foods, your digestive system gets overwhelmed. Bloating, fatigue, brain fog - it's all connected.

But there's a solution: JUCY CLEANSE.

Our cold-pressed juices are 100% raw, packed with enzymes and nutrients. No heat damage. No additives. Just pure, concentrated nutrition that your body can actually absorb.

Here's what happens:
• Day 1: You feel lighter, less sluggish
• Day 3: Energy levels stabilise, digestive relief kicks in
• Day 5: Real transformation. You look different. You feel different.

How? Because you're finally giving your body what it needs. Real food. Real nutrients. Real results.

Our customers see:
✓ Reduced bloating (within 24 hours)
✓ Sustained energy (no afternoon crash)
✓ Better digestion
✓ Clearer skin
✓ Confidence boost

And you're protected by our money-back guarantee. Feel the difference or your money back. No questions asked.

This is what happens when you stop fighting your body and start fuelling it properly.
        `,
        conclusion: `
Ready to feel the difference?

Your first JUCY cleanse is just one click away.

Choose your cleanse:
• 1-Day Refresh (perfect for beginners)
• 3-Day Cleanse (popular option)
• 5-Day Deep Cleanse (the transformation)

Join thousands who've already felt the change.

Link in bio. Order today. Money-back guarantee applied.

Your healthier self is waiting. 💚
        `,
        captions: {
          tiktok: `If you're constantly ${p.pain}... you need this 💚\n\nJUCY CLEANSE changed everything for me.\n\n✓ More energy ✓ Better digestion ✓ Real results\n\nShop → Link in bio\n\n#JuicyCleanse #Detox #HealthyLiving`,
          instagram: `Real problem. Real solution. Real results. 💚\n\nTired of feeling bloated and sluggish?\n\nOur cold-pressed cleanse gives your body what it actually needs - pure, raw nutrition.\n\nDay 1: Feel lighter\nDay 3: Energy boost\nDay 5: Transformation\n\n✓ Money-back guarantee\n✓ Real ingredients\n✓ Thousands of happy customers\n\nReady to feel the difference? Link in bio 🌿\n\n#JuicyCleanse #ColdPressed #CleanseResults`,
          youtube: `Stop the scroll if you're dealing with ${p.pain}.\n\nMost people don't realize this is fixable.\n\nJUCY CLEANSE is the solution. Here's why:\n\n1. 100% raw, cold-pressed juice\n2. No heat = No nutrient loss\n3. Real results in 5 days\n4. Money-back guarantee\n\nJoin thousands getting results.\n\nShop: jucycleanse.co.uk\nMoney-back guarantee applied.`
        },
        hashtags: ["#JuicyCleanse", "#Detox", "#HealthTransformation", "#ColdPressed", "#WellnessJourney", "#RealResults"],
        length: "25-30 seconds",
        engagement_prediction: "high (8-12%)",
        best_platforms: ["TikTok", "Instagram Reels", "YouTube Shorts"],
        visuals: [
          "0-2s: Close-up of person looking uncomfortable/tired",
          "2-8s: Show the problem (fatigue, bloating, frustration)",
          "8-15s: JUCY bottle reveal + ingredients showcase",
          "15-25s: Montage of transformation (energy boost, smiling, confident)",
          "25-30s: Product shot + CTA overlay + money-back guarantee badge"
        ]
      };
    }
  },

  testimonial: {
    name: "Testimonial / Social Proof",
    description: "Build trust. Real customer story with authentic results.",
    generate: () => {
      const testimonials = [
        { days: 3, benefit: "energy boost", result: "felt amazing" },
        { days: 5, benefit: "lost bloating", result: "clothes fit better" },
        { days: 7, benefit: "clearer skin", result: "glowing complexion" },
        { days: 3, benefit: "digestive relief", result: "no more discomfort" },
        { days: 5, benefit: "weight loss", result: "5 lbs down" }
      ];

      const t = testimonials[Math.floor(Math.random() * testimonials.length)];

      return {
        template: "testimonial",
        hook: `Day ${t.days} of JUCY cleanse and I can't believe the difference...`,
        body: `
I was sceptical at first.

I've tried cleanses before. They didn't work. I'd feel deprived, miserable, and the results didn't last.

But JUCY is different.

Day 1: Got my delivery. The bottles looked professional, felt premium. Started my first juice.

Day 2: Already feeling lighter. More energy. Less bloating.

Day ${t.days}: This is insane.

The ${t.benefit}. I'm not exaggerating when I say I ${t.result}.

What shocked me most:
• You don't feel hungry (the juices are surprisingly satisfying)
• You have MORE energy (not less)
• The results are REAL (not temporary)
• The money-back guarantee meant zero risk

I've recommended JUCY to 5 friends already. They're all loving it.

This isn't just a detox. It's a reset. It's proof that your body responds when you actually fuel it properly.

If you're on the fence: Try it. The money-back guarantee means there's literally no risk.
        `,
        conclusion: `
Ready for your own transformation?

JUCY CLEANSE made me a believer.

Don't take my word for it. Thousands have felt the same results:

✓ Clearer skin
✓ More energy
✓ Better digestion
✓ Real confidence boost

Your first cleanse is waiting.

Choose your duration:
• 1-Day Refresh (start light)
• 3-Day Cleanse (real results)
• 5-Day Deep Cleanse (full transformation)

Money-back guarantee. Risk-free. Try it.

Link in bio. Order today. 💚

P.S. The guarantee is real. Feel the difference or get your money back.
        `,
        captions: {
          tiktok: `Day ${t.days} and I'm obsessed 💚\n\nJUCY CLEANSE > everything else I've tried\n\n✓ Real energy ✓ Real results ✓ Actually works\n\nNot sponsored. Just a customer.\n\nLink in bio → Try risk-free\n\n#JuicyCleanse #CleanseResults #BeforeAndAfter`,
          instagram: `I wasn't expecting this. 💚\n\nDay ${t.days} of JUCY CLEANSE and the difference is REAL.\n\nNot just a cleanse. It's a complete reset.\n\nWhat I noticed:\n✓ More energy\n✓ Better digestion  \n✓ Clearer skin\n✓ Actual confidence boost\n\nI've tried other cleanses. This is different.\n\nMoney-back guarantee = zero risk.\n\nReady to feel the difference? Link in bio 🌿\n\n#JuicyCleanse #CleanseJourney #RealResults #Wellness`,
          youtube: `Honest review: JUCY CLEANSE after ${t.days} days\n\nI was sceptical. Here's what happened:\n\nDay 1: Received premium bottles, started cleanse\nDay 2: More energy (unexpected)\nDay ${t.days}: Real transformation\n\nProof:\n✓ ${t.benefit}\n✓ Feeling amazing\n✓ Real customer, real results\n\nBonus: Money-back guarantee (so zero risk)\n\nTry it: jucycleanse.co.uk\nGuarantee applied. Risk-free.`
        },
        hashtags: ["#JuicyCleanse", "#CleanseResults", "#RealReview", "#Testimonial", "#BeforeAndAfter", "#HealthyLiving"],
        length: "20-28 seconds",
        engagement_prediction: "very high (9-14%)",
        best_platforms: ["TikTok", "Instagram Reels"],
        visuals: [
          "0-3s: Real person on camera (text overlay of day count)",
          "3-10s: Before state (tired, bloated) vs current state",
          "10-18s: Show specific benefit (energy level, appearance, lifestyle)",
          "18-25s: Unboxing or review shot of product",
          "25-28s: Money-back guarantee badge + CTA"
        ]
      };
    }
  },

  benefits_breakdown: {
    name: "Benefits Breakdown",
    description: "Educate. Explain WHY the product works with science/facts.",
    generate: () => {
      return {
        template: "benefits_breakdown",
        hook: `Here's exactly why JUCY cold-pressed cleanses work better than everything else...`,
        body: `
Most juice cleanses fail because they use heat.

Heat destroys nutrients. Simple as that.

JUCY is different. Here's the science:

BENEFIT #1: RAW NUTRIENTS (No Heat Loss)
Regular juice is pasteurised. Heat kills enzymes and vitamins.
JUCY is cold-pressed. Raw. All nutrients intact.
Result: Your body absorbs MORE.

BENEFIT #2: CONCENTRATED NUTRITION
We use 3-4 lbs of fresh produce per bottle.
Store-bought juice has water added.
JUCY has nothing but pure juice.
Result: More nutrient density per sip.

BENEFIT #3: ACTIVE ENZYMES
Enzymes break down food. They're alive.
Heat kills them.
Cold-pressed juice keeps them alive.
Result: Better digestion. Better nutrient absorption.

BENEFIT #4: NO ADDITIVES
No preservatives. No sugar added. No fillers.
Just fresh juice.
Result: Your body recognises it as real food.

THE RESULT?
When your body actually gets pure nutrition...
✓ Digestion improves (within 24 hours)
✓ Energy rises (no sugar crash)
✓ Skin clears (toxins leave)
✓ Weight normalises (your body works properly)
✓ Confidence returns

That's not magic. That's biology.

Your body is designed to thrive. Give it real nutrition and it responds.
        `,
        conclusion: `
Stop wasting money on juice that's been processed to death.

JUCY CLEANSE is the real deal:

✓ 100% cold-pressed
✓ 100% raw
✓ 100% nutrients intact
✓ 100% results-backed guarantee

Why choose JUCY?
• Better than other cleanses (cold-pressed vs pasteurised)
• Better than supplements (whole food nutrients)
• Better than juicing at home (convenience + quality)
• Better results = Better price

It's not the cheapest option.

It's the BEST option.

Ready to feel the science in action?

Choose your cleanse. Get your results. Feel the difference.

Money-back guarantee. Risk-free. Try it.

Link in bio. Order today. 💚
        `,
        captions: {
          tiktok: `Why cold-pressed juice actually works (the science) 🧪💚\n\nHeat kills nutrients.\nCold-pressed keeps them alive.\n\nThat's literally the difference between a cleanse that works and one that doesn't.\n\nJUCY = raw, cold-pressed, results-backed\n\nShop → Link in bio\n\n#Science #Nutrition #JuicyCleanse`,
          instagram: `The science behind why JUCY works 🧪\n\nMost cleanses fail because:\n❌ Pasteurised (heat kills nutrients)\n❌ Full of additives\n❌ Diluted with water\n❌ No real results\n\nJUCY is different:\n✅ Cold-pressed (nutrients intact)\n✅ 100% pure juice\n✅ Concentrated nutrition\n✅ Real, measurable results\n\nWhen your body gets REAL nutrition, it responds.\n\n✓ Better digestion\n✓ More energy\n✓ Clearer skin\n✓ Actual weight loss\n\nReady to try the difference?\n\nLink in bio 🌿\n\n#Nutrition #Science #JuicyCleanse #ColdPressed`,
          youtube: `Why Cold-Pressed Juice Works (The Science)\n\nRegular juice vs JUCY:\n\n1. Heat Damage\n   - Regular: Pasteurised (kills enzymes)\n   - JUCY: Cold-pressed (all nutrients intact)\n\n2. Nutrient Density\n   - Regular: Diluted with water\n   - JUCY: 3-4 lbs produce per bottle\n\n3. Additives\n   - Regular: Preservatives, sugar\n   - JUCY: Nothing but juice\n\n4. Results\n   - Regular: Temporary\n   - JUCY: Real, lasting transformation\n\nThe result? Your body finally gets what it needs.\n\nTry JUCY risk-free: jucycleanse.co.uk\nMoney-back guarantee applied.`
        },
        hashtags: ["#NutritionScience", "#ColdPressed", "#JuicyCleanse", "#HealthFacts", "#WellnessEducation"],
        length: "22-28 seconds",
        engagement_prediction: "high (7-10%)",
        best_platforms: ["TikTok", "Instagram Reels", "YouTube"],
        visuals: [
          "0-3s: Hook text on screen",
          "3-8s: Show difference (heat vs cold-pressed)",
          "8-16s: Ingredient showcase + nutrient graphics",
          "16-24s: Infographic: benefits breakdown",
          "24-28s: Product + CTA"
        ]
      };
    }
  },

  objection_handler: {
    name: "Objection Handling",
    description: "Remove friction. Answer the question that stops people buying.",
    generate: () => {
      const objections = [
        { q: "Will I be hungry?", a: "No. Juices are surprisingly filling. You'll have energy and feel satisfied." },
        { q: "Is it safe?", a: "Completely. It's just whole food nutrients. Your body loves it." },
        { q: "Is it worth the price?", a: "Yes. Compare cost per nutrient vs supplements. JUCY wins." },
        { q: "Will results last?", a: "Absolutely. You're resetting your system, not just detoxing." },
        { q: "Can I work while cleansing?", a: "Yes. You'll have MORE energy, not less." }
      ];

      const obj = objections[Math.floor(Math.random() * objections.length)];

      return {
        template: "objection_handler",
        hook: `Common question: "${obj.q}"`,
        body: `
Fair question. Most people ask this before buying.

Let me be honest:

${obj.q}

The answer: ${obj.a}

Here's why:

Our juices aren't watered-down. They're concentrated nutrition from 3-4 lbs of fresh produce per bottle.

When you drink that, your body feels:
✓ Satisfied (real nutrition)
✓ Energised (natural sugars + enzymes)
✓ Healthy (your system is actually working)

What people are really worried about:

"Will I suffer?"
No. You'll feel BETTER.

"Will it actually work?"
Yes. Thousands of customers prove it.

"What if it doesn't work for me?"
Money-back guarantee. Zero risk.

The truth: Your body WANTS to be healthy.

Give it real nutrition and it responds immediately.

That's not a promise. That's biology.
        `,
        conclusion: `
Still on the fence?

That's exactly why we have a money-back guarantee.

Try JUCY risk-free:
• Feel the difference yourself
• See real results
• Get your money back if you don't

No fine print. No questions asked.

We're confident because our customers are confident.

Thousands have tried it. Thousands have results.

You could be next.

Order today. Feel the difference. 💚

jucycleanse.co.uk
Money-back guarantee applied.
        `,
        captions: {
          tiktok: `"Will I be hungry?" \n\nNo. You'll have MORE energy.\n\n🚀 Real nutrition = real results\n💚 Try risk-free (money-back guarantee)\n\nShop → Link in bio\n\n#JuicyCleanse #FAQ #RiskFree`,
          instagram: `Real question. Real answer. 💚\n\n"Is it worth the price?"\n\nYes. Here's why:\n\n✓ 3-4 lbs fresh produce per bottle\n✓ Cold-pressed (nutrients intact)\n✓ Real results (proven)\n✓ Money-back guarantee (zero risk)\n\nCompare nutrition per dollar:\nJUCY > any supplement\nJUCY > any store cleanse\n\nYou're not just buying juice.\nYou're buying transformation.\n\nMoney-back guarantee means you can try risk-free.\n\nReady? Link in bio 🌿\n\n#JuicyCleanse #Worth #Results`,
          youtube: `FAQ: Is JUCY worth the price?\n\nShort answer: Yes.\n\nLong answer:\n\nHere's what you're getting:\n✓ 3-4 lbs of fresh produce per bottle\n✓ Cold-pressed (no heat loss)\n✓ Maximum nutrient density\n✓ Proven results\n✓ Money-back guarantee\n\nCompare costs:\n- Supplements: $50-100/month (isolated nutrients)\n- Store cleanses: $200-300 (processed, poor results)\n- Juicing at home: Time + waste + inconsistency\n- JUCY: Best price for best results\n\nPlus: Money-back guarantee\n\nTry risk-free: jucycleanse.co.uk`
        },
        hashtags: ["#JuicyCleanse", "#FAQ", "#MoneyBackGuarantee", "#RiskFree", "#TrustBuilding"],
        length: "18-24 seconds",
        engagement_prediction: "high (8-11%)",
        best_platforms: ["TikTok", "Instagram Reels"],
        visuals: [
          "0-2s: Question on screen (big, clear text)",
          "2-10s: Direct answer with supporting info",
          "10-18s: Address underlying fear (safety/results/value)",
          "18-24s: Money-back guarantee badge + CTA"
        ]
      };
    }
  },

  lifestyle: {
    name: "Lifestyle / Identity",
    description: "Aspirational. Sell the vibe. Minimal talking, maximum atmosphere.",
    generate: () => {
      const scenarios = [
        { time: "Morning", activity: "wellness routine", vibe: "fresh, energised, ready for the day" },
        { time: "Pre-workout", activity: "gym prep", vibe: "powerful, strong, unstoppable" },
        { time: "Office", activity: "productivity ritual", vibe: "focused, confident, in control" },
        { time: "Evening", activity: "self-care routine", vibe: "calm, balanced, proud" },
        { time: "Weekend", activity: "health priority", vibe: "intentional, healthy, glowing" }
      ];

      const s = scenarios[Math.floor(Math.random() * scenarios.length)];

      return {
        template: "lifestyle",
        hook: `POV: You finally take your health seriously (${s.time.toLowerCase()} edition)`,
        body: `
This is what happens when you make yourself a priority.

${s.time} routine:
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

This is what that looks like.
        `,
        conclusion: `
This could be your morning.

Your routine.

Your life.

One choice leads to everything else.

Choose health. Choose JUCY.

Join thousands who've made the shift.

Your healthier self is waiting. 💚

Shop now. Order your cleanse.

Link in bio. jucycleanse.co.uk
        `,
        captions: {
          tiktok: `This is what taking your health seriously looks like 💚\n\nOne choice.\nOne juice.\nA lifetime of better health.\n\nPOV: You finally prioritise yourself.\n\nShop → Link in bio\n\n#Health #Wellness #Routine #JuicyCleanse`,
          instagram: `POV: You actually take care of yourself 💚\n\n${s.time} routine with JUCY:\n\n✓ Wake up intentional\n✓ Start with real nutrition\n✓ Carry that energy all day\n✓ Build the life you want\n\nIt's not about the juice.\nIt's about the decision.\n\nOne choice. That's all.\n\nReady? Link in bio 🌿\n\n#Wellness #SelfCare #HealthyHabits #JuicyCleanse`,
          youtube: `Morning Wellness Routine (Featuring JUCY Cleanse)\n\n${s.time} setup:\n1. Set intention\n2. Start with JUCY\n3. Feel the shift\n4. Carry momentum all day\n\nThis is what health looks like.\n\nReady for your routine?\nOrder now: jucycleanse.co.uk`
        },
        hashtags: ["#WellnessRoutine", "#HealthyHabits", "#SelfCare", "#Lifestyle", "#JuicyCleanse", "#Motivation"],
        length: "20-25 seconds",
        engagement_prediction: "high (7-10%)",
        best_platforms: ["Instagram Reels", "TikTok", "YouTube Shorts"],
        visuals: [
          "0-3s: Atmospheric opening (sunlight, calm, intentional)",
          "3-12s: Morning routine montage (minimal talking, just vibes)",
          "12-18s: JUCY integrated naturally into routine",
          "18-25s: Person looking energised, confident, ready for day",
          "Visual tone: Cinematic, aspirational, not cheesy"
        ]
      };
    }
  }
};

/**
 * Generate complete daily scripts
 */
function generateDailyScripts() {
  const scripts = [];

  // Generate one of each template
  Object.entries(SCRIPT_TEMPLATES).forEach(([key, template]) => {
    const script = template.generate();
    scripts.push(script);
  });

  return {
    date: new Date().toISOString().split('T')[0],
    brand: "JUCY CLEANSE",
    total_scripts: scripts.length,
    scripts: scripts
  };
}

// Generate and save
const dailyScripts = generateDailyScripts();
const outputFile = `./output/scripts-${dailyScripts.date}.json`;

if (!fs.existsSync('./output')) {
  fs.mkdirSync('./output', { recursive: true });
}

fs.writeFileSync(outputFile, JSON.stringify(dailyScripts, null, 2));

console.log(`✅ Generated ${dailyScripts.total_scripts} complete scripts for ${dailyScripts.date}`);
console.log(`📁 Saved to: ${outputFile}\n`);

dailyScripts.scripts.forEach((script, i) => {
  console.log(`${i + 1}. ${script.template.toUpperCase()}: ${script.hook.substring(0, 50)}...`);
  console.log(`   Length: ${script.length} | Engagement: ${script.engagement_prediction}\n`);
});

module.exports = { generateDailyScripts };
