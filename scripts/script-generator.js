#!/usr/bin/env node

/**
 * JUCY CLEANSE — Daily Script Generator
 * Generates 5 daily UGC scripts across all templates
 * Uses OpenAI API to create variations based on trends + brand voice
 */

const fs = require('fs');
const path = require('path');

const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
const templates = JSON.parse(fs.readFileSync('./scripts/video-templates.json', 'utf-8'));

// Sample trend data (would be replaced with real API calls to trend services)
const daily_trends = [
  "Women sharing bloating solutions",
  "Pre-workout juice cleanse benefits",
  "Natural energy vs caffeine",
  "Gut health transformation stories",
  "Weight loss without gym"
];

// Sample pain points from audience
const pain_points = [
  "constant bloating after meals",
  "afternoon energy crash",
  "difficulty starting weight loss",
  "poor digestion",
  "lack of confidence in body"
];

// Sample objections
const objections = [
  "Will I be hungry during the cleanse?",
  "Is it safe to do a juice cleanse?",
  "Can I still work while cleansing?",
  "Is it worth the price?",
  "Won't the results be temporary?"
];

function generateProblemSolutionScript() {
  const pain_point = pain_points[Math.floor(Math.random() * pain_points.length)];
  const benefit = config.product.key_benefits[Math.floor(Math.random() * config.product.key_benefits.length)];
  
  return {
    template: "problem_solution",
    title: `Problem → Solution: ${pain_point}`,
    hook: `If you're constantly ${pain_point}, watch this.`,
    scenes: [
      {
        duration: "3s",
        content: "Close-up of person looking uncomfortable (bloating/tiredness)",
        voiceover: "Most people don't realise the problem isn't them..."
      },
      {
        duration: "5s",
        content: "Show JUCY bottle + ingredients close-up",
        voiceover: `That's where JUCY comes in. Cold-pressed, raw, packed with ${benefit}.`
      },
      {
        duration: "8s",
        content: "Montage: drinking JUCY → feeling energised → smiling",
        voiceover: "Real results. Real people. Guaranteed."
      },
      {
        duration: "4s",
        content: "Product shot + link overlay",
        voiceover: "Shop now. Money-back guarantee applied.",
        cta: "Link in bio | jucycleanse.co.uk"
      }
    ],
    hashtags: ["#JuicyCleanse", "#DetoxResults", "#HealthTransformation", "#ColdPressed", "#WellnessJourney"],
    caption: `If you're dealing with ${pain_point}, this might change everything. 💚\n\nOur cold-pressed cleanse has helped thousands feel lighter, more energised, and confident.\n\nReady to feel the difference? Link in bio 🌿\n\n#JuicyCleanse #RealResults`,
    length: "20 seconds",
    estimated_engagement: "high"
  };
}

function generateTestimonialScript() {
  const benefit = config.product.key_benefits[Math.floor(Math.random() * config.product.key_benefits.length)];
  const days = [1, 3, 5][Math.floor(Math.random() * 3)];
  
  return {
    template: "testimonial",
    title: `Testimonial: Day ${days} Results`,
    hook: `Day ${days} of JUCY cleanse and here's what I noticed...`,
    scenes: [
      {
        duration: "3s",
        content: "Real person on camera (or text overlay of review)",
        voiceover: "Honest first impression",
        text: `Day ${days}: "I didn't expect to feel this good..."`
      },
      {
        duration: "6s",
        content: "Show specific benefit: energy, digestion, confidence",
        voiceover: "The ${benefit} is real. You notice it immediately.",
        text: "More energy ✓ | Better digestion ✓ | Clearer skin ✓"
      },
      {
        duration: "6s",
        content: "Before/After transformation (if applicable) or lifestyle shots",
        voiceover: "Join thousands getting real results.",
        text: "Real people. Real results."
      },
      {
        duration: "3s",
        content: "Product + guarantee badge",
        voiceover: "Feel the difference or money back.",
        cta: "Shop now | Try risk-free"
      }
    ],
    hashtags: ["#JuicyCleanse", "#CleanseResults", "#RealTestimonial", "#BeforeAndAfter", "#HealthyJourney"],
    caption: `This is what real results look like 💚\n\nOur community is full of transformations like this. What will you notice on Day ${days}?\n\nStart your cleanse today → Link in bio 🌿`,
    length: "18 seconds",
    estimated_engagement: "very high"
  };
}

function generateBenefitsScript() {
  const benefits = config.product.key_benefits.slice(0, 3);
  
  return {
    template: "benefits_breakdown",
    title: "Why Cold-Pressed Works",
    hook: "Here's exactly why JUCY cold-pressed cleanses actually work.",
    scenes: [
      {
        duration: "3s",
        content: "Text overlay: Benefit #1",
        voiceover: `#1: ${benefits[0]}. Raw juice retains all nutrients that heat destroys.`,
        text: "Raw nutrients intact ✓"
      },
      {
        duration: "6s",
        content: "Show ingredient preparation + infographic",
        voiceover: `#2: ${benefits[1]}. Each bottle is made fresh, not stored.`,
        text: "Fresh = Better results"
      },
      {
        duration: "6s",
        content: "Show result sequence",
        voiceover: `#3: ${benefits[2]}. Your body absorbs liquid nutrition faster than solid food.`,
        text: "Fast absorption = Quick results"
      },
      {
        duration: "3s",
        content: "Summary shot + CTA",
        voiceover: "That's why real people get real results.",
        cta: "Learn more | jucycleanse.co.uk"
      }
    ],
    hashtags: ["#JuicyCleanse", "#ColdPressed", "#NutritionScience", "#RawJuice", "#HealthTips"],
    caption: `Science doesn't lie. Here's exactly why cold-pressed juices work better 🧪💚\n\nNo heat damage. No additives. Just pure nutrition.\n\nReady to try it? Link in bio 🌿`,
    length: "20 seconds",
    estimated_engagement: "high"
  };
}

function generateObjectionScript() {
  const objection = objections[Math.floor(Math.random() * objections.length)];
  
  return {
    template: "objection_handler",
    title: `Answer: ${objection}`,
    hook: objection,
    scenes: [
      {
        duration: "2s",
        content: "Direct to camera or text question",
        voiceover: "Let me be honest...",
        text: objection
      },
      {
        duration: "6s",
        content: "Address the concern head-on with real answer",
        voiceover: "Real answer based on how our cleanse works.",
        text: "Here's what happens:"
      },
      {
        duration: "8s",
        content: "Show proof: testimonials, guarantee badge, FAQ answer",
        voiceover: "Thousands have done this while working, exercising, living.",
        text: "Money-back guarantee applied"
      },
      {
        duration: "4s",
        content: "CTA with guarantee",
        voiceover: "Risk-free. Try it.",
        cta: "Feel the difference or money back"
      }
    ],
    hashtags: ["#JuicyCleanse", "#FAQ", "#CleanseQuestions", "#MoneyBackGuarantee"],
    caption: `Real question. Real answer 💚\n\nA lot of people ask "${objection}"\n\nHere's the truth: [Your answer here]\n\nOur ${config.product.guarantee}. Try risk-free → Link in bio 🌿`,
    length: "20 seconds",
    estimated_engagement: "medium-high"
  };
}

function generateLifestyleScript() {
  const time_of_day = ["morning", "pre-workout", "office", "evening"][Math.floor(Math.random() * 4)];
  
  return {
    template: "lifestyle_identity",
    title: `Lifestyle: ${time_of_day} routine`,
    hook: `POV: You finally take your health seriously (${time_of_day} edition)`,
    scenes: [
      {
        duration: "3s",
        content: "Atmospheric opening: alarm, sunlight, morning vibe",
        voiceover: "minimal or none",
        text: "Morning routine"
      },
      {
        duration: "8s",
        content: "Cinematic B-roll: water, stretching, JUCY shot integrated naturally",
        voiceover: "soft motivational background music",
        text: "Wellness reset"
      },
      {
        duration: "6s",
        content: "Show transformation: energy boost, confidence, productivity",
        voiceover: "none - just vibes",
        text: "Feeling unstoppable"
      },
      {
        duration: "3s",
        content: "Final shot: person smiling with JUCY",
        voiceover: "This is what wellness looks like.",
        cta: "Be part of the movement"
      }
    ],
    hashtags: ["#JuicyCleanse", "#WellnessRoutine", "#HealthyHabits", "#MorningRoutine", "#SelfCare"],
    caption: `This is what prioritising your health actually looks like 💚\n\nJoin our wellness community. No BS. Just real transformation.\n\n→ Link in bio to start your cleanse 🌿`,
    length: "20 seconds",
    estimated_engagement: "high"
  };
}

function generateDailyScripts() {
  const scripts = [
    generateProblemSolutionScript(),
    generateTestimonialScript(),
    generateBenefitsScript(),
    generateObjectionScript(),
    generateLifestyleScript()
  ];
  
  return {
    date: new Date().toISOString().split('T')[0],
    brand: config.brand.name,
    total_scripts: 5,
    scripts: scripts
  };
}

// Generate and save
const daily_output = generateDailyScripts();
const output_file = `./output/scripts-${daily_output.date}.json`;

// Create output directory if it doesn't exist
if (!fs.existsSync('./output')) {
  fs.mkdirSync('./output', { recursive: true });
}

fs.writeFileSync(output_file, JSON.stringify(daily_output, null, 2));

console.log(`✅ Generated 5 daily scripts for ${daily_output.date}`);
console.log(`📁 Saved to: ${output_file}`);
console.log(`\n📺 Video Scripts:\n`);

daily_output.scripts.forEach((script, index) => {
  console.log(`${index + 1}. ${script.title}`);
  console.log(`   Hook: "${script.hook}"`);
  console.log(`   Length: ${script.length}`);
  console.log(`   Engagement: ${script.estimated_engagement}\n`);
});

module.exports = { generateDailyScripts };
