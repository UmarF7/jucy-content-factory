# 🌿 JUCY CLEANSE — Content Factory Setup

Complete automated system for generating viral UGC videos for your juice cleanse business.

## What This System Does

✅ **Generates 5 viral UGC scripts daily** — Problem/Solution, Testimonial, Benefits, Objections, Lifestyle  
✅ **Human review dashboard** — Approve before anything gets generated  
✅ **AI video generation** — Converts scripts to professional UGC videos via Higgsfield  
✅ **Automatic publishing** — Posts to TikTok, Instagram, and YouTube Shorts  
✅ **Performance tracking** — Monitor views, engagement, conversions  
✅ **Optimization loop** — Learn what works, generate more of it  

**Result:** 5 new videos/day × 30 days = 150 videos/month with minimal manual work

---

## Installation (10 minutes)

### 1. Install Dependencies
```bash
cd /path/to/jucy-content-factory
npm install
```

### 2. Get API Keys

You'll need:

| Service | Purpose | Cost | Setup |
|---------|---------|------|-------|
| **Higgsfield** | AI video generation | $100-500/mo | [Get key](https://higgsfield.io) |
| **OpenAI** | Script generation | ~$30/mo | [Get key](https://platform.openai.com) |
| **TikTok** | Publishing | Free | [Business API](https://developer.tiktok.com) |
| **Instagram** | Publishing | Free | [Graph API](https://developers.facebook.com) |
| **YouTube** | Publishing | Free | [API key](https://console.cloud.google.com) |

### 3. Configure Environment
```bash
cp .env.example .env
```

Edit `.env` and add your API keys:
```
HIGGSFIELD_API_KEY=xxx
OPENAI_API_KEY=xxx
TIKTOK_ACCESS_TOKEN=xxx
# ... etc
```

### 4. Test Setup
```bash
npm run generate-scripts
npm run dashboard
```

If scripts generate successfully, you're ready to go!

---

## Daily Workflow (5 minutes/day)

### Morning (6 AM)
Scripts generate automatically:
```bash
npm run generate-scripts
```

### Mid-Morning (9 AM)
Review and approve in dashboard:
```bash
npm run dashboard
```

Approve/reject each of the 5 scripts. Takes ~3 minutes.

### Late Morning (10 AM)
Generate videos from approved scripts:
```bash
npm run generate-videos
```

Higgsfield AI generates videos (takes 2-5 min each). You get notified when done.

### Afternoon (2 PM)
Publish to all platforms:
```bash
npm run publish-all
```

Videos scheduled for optimal posting times.

### Done! 
Your 5 videos post automatically throughout the day.

---

## File Structure

```
jucy-content-factory/
├── config.json                    # Brand config & audience
├── dashboard/
│   └── index.html                # Review interface (open in browser)
├── scripts/
│   ├── script-generator.js        # Daily script generation
│   ├── higgsfield-integration.js  # AI video generation
│   ├── publish-scheduler.js       # Auto-posting
│   └── video-templates.json       # UGC video templates
├── output/
│   ├── scripts-2026-03-04.json   # Daily scripts
│   ├── videos-2026-03-04.json    # Generated videos
│   └── schedule-2026-03-04.json  # Publishing schedule
├── .env                           # API keys (don't commit!)
├── .env.example                   # Template
└── README.md                      # This file
```

---

## Customization

### Change Brand Voice
Edit `config.json`:
```json
"brand_voice": {
  "tone": "motivational, scientific, approachable",
  "style": "real results, no BS, premium feel"
}
```

### Add Custom Pain Points
Edit `scripts/script-generator.js`:
```javascript
const pain_points = [
  "constant bloating after meals",
  "afternoon energy crash",
  // Add your own...
];
```

### Change Posting Schedule
Edit `scripts/publish-scheduler.js`:
```javascript
const POSTING_SCHEDULE = {
  tiktok: [7, 12, 17, 20],  // Change times here
  instagram: [9, 13, 18, 20],
  youtube: [10, 15, 19]
};
```

---

## Troubleshooting

### Scripts not generating?
```bash
# Check Node.js version (need 14+)
node --version

# Test config is valid
node -e "console.log(JSON.parse(require('fs').readFileSync('./config.json')))"
```

### Dashboard not loading?
- Open `dashboard/index.html` in Chrome/Safari/Firefox
- Check browser console for errors
- Make sure `output/scripts-*.json` files exist

### Videos not generating?
- Verify Higgsfield API key is correct
- Check Higgsfield account has credits
- Run with verbose output: `DEBUG=* npm run generate-videos`

### Publishing not working?
- Run `npm run status` to check which platforms are configured
- Add missing API tokens to `.env`
- Check platform API documentation for latest requirements

---

## Performance Targets

| Metric | Target | How to Reach |
|--------|--------|------------|
| **Views/month** | 500K - 2M | Consistent posting, quality content |
| **Engagement rate** | 7-10% | Use proven hook templates |
| **Traffic to site** | 5-10K clicks | Include clear CTA in every video |
| **Conversions** | 50-100 orders | A/B test hooks, optimize best performers |

---

## Advanced: Custom Integrations

### Add Slack Notifications
Edit `scripts/script-generator.js`:
```javascript
const axios = require('axios');

async function notifySlack(message) {
  await axios.post(process.env.SLACK_WEBHOOK, {
    text: message
  });
}
```

### Add Analytics Dashboard
Track performance with SQLite:
```javascript
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./analytics.db');

db.run(`
  CREATE TABLE IF NOT EXISTS videos (
    id INTEGER PRIMARY KEY,
    title TEXT,
    views INTEGER,
    engagement REAL,
    created_at TIMESTAMP
  )
`);
```

### Auto-Optimize Based on Performance
```javascript
// Identify top performing hooks
const topHooks = performanceData
  .sort((a, b) => b.engagement - a.engagement)
  .slice(0, 5)
  .map(v => v.hook);

// Prioritize similar templates next time
generateMoreVideosLike(topHooks);
```

---

## Safety & Best Practices

### Don't Commit API Keys
```bash
# .env is already in .gitignore
# Never commit .env file!
git status  # Should NOT show .env
```

### Test in Sandbox First
```bash
# Generate scripts without publishing
npm run generate-scripts

# Review dashboard without uploading
npm run dashboard

# Don't run publish until you're confident
npm run publish-all
```

### Monitor Performance
```bash
# Check what's working
npm run status

# Analyze top performers
open analytics-report.html
```

### Ethical AI Disclosure
If using AI-generated videos, consider:
- Disclosing "AI-assisted" in your captions
- Featuring real testimonials alongside AI videos
- Being transparent about product claims

---

## Support

**Questions?** Check:
- [RESEARCH.md](./RESEARCH.md) — Industry best practices
- [IMPLEMENTATION.md](./IMPLEMENTATION.md) — Detailed setup
- [config.json](./config.json) — Brand configuration

**API Issues?**
- [Higgsfield Docs](https://higgsfield.io/docs)
- [TikTok Dev](https://developer.tiktok.com)
- [Instagram Graph API](https://developers.facebook.com/docs/instagram-api)
- [YouTube API](https://developers.google.com/youtube)

---

## What's Next

1. ✅ **Setup complete** — You have the core system
2. ⏳ **Day 1** — Generate first 5 scripts, review dashboard
3. ⏳ **Day 2** — Generate videos, publish to platforms
4. ⏳ **Week 1** — Collect performance data, identify winners
5. ⏳ **Week 2+** — Optimize based on what works best

**Goal:** By end of month, your system should be running 90% automatically with you spending just 5-10 minutes/day reviewing.

---

## License

MIT — Use freely for your juice cleanse business 💚

Good luck! Let's make JUCY CLEANSE viral.
