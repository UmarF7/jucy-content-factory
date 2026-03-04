# JUCY CLEANSE — Implementation Guide

## Quick Start (Next 24 Hours)

### Step 1: Set Up Environment
```bash
cd /data/.openclaw/workspace/jucy-content-factory
npm init -y
npm install axios dotenv
```

### Step 2: Configure API Keys
Create `.env` file:
```
HIGGSFIELD_API_KEY=your_api_key_here
OPENAI_API_KEY=sk-your-key
TIKTOK_ACCESS_TOKEN=your_token
INSTAGRAM_ACCESS_TOKEN=your_token
YOUTUBE_API_KEY=your_key
```

### Step 3: Generate Today's Scripts
```bash
node scripts/script-generator.js
```

This creates `output/scripts-2026-03-04.json` with 5 daily scripts.

### Step 4: Review Scripts
Open `dashboard/index.html` in your browser to review and approve scripts.

### Step 5: Generate Videos (Higgsfield)
Once approved, each script goes to Higgsfield for AI video generation.

### Step 6: Schedule Posts
Approved videos are scheduled to post automatically across platforms.

---

## System Architecture

```
[Daily Script Generation]
         ↓
[Script Review Dashboard]
         ↓
[Approved Scripts → Higgsfield]
         ↓
[AI Video Generation]
         ↓
[Publishing Queue]
         ↓
[Post to TikTok/Instagram/YouTube]
         ↓
[Analytics Tracking]
         ↓
[Performance Data → Optimization Loop]
```

---

## Component Details

### 1. Script Generator (`script-generator.js`)
**Purpose:** Create 5 daily UGC scripts based on templates

**Inputs:**
- Brand config (JUCY CLEANSE)
- Audience pain points
- Trending topics

**Outputs:**
- JSON file with 5 scripts
- Each script includes:
  - Hook
  - Scene-by-scene breakdown
  - Voiceover text
  - Captions
  - Hashtags

**Run daily:** `node scripts/script-generator.js`

### 2. Review Dashboard (`dashboard/index.html`)
**Purpose:** Human approval before any video generation

**Features:**
- View all 5 daily scripts
- Approve/Reject each script
- Edit captions and hashtags
- See engagement predictions
- Track approval status

**Access:** Open `dashboard/index.html` in browser

### 3. Video Production Pipeline (To Build)
**Tools:** Higgsfield API
**Input:** Approved scripts
**Output:** AI-generated UGC videos

**Process:**
1. Take approved script
2. Send to Higgsfield with:
   - Hook text
   - Scene descriptions
   - Voiceover audio
   - Product placement instructions
3. Higgsfield generates video (2-5 minutes)
4. Download and store video

### 4. Publishing System (To Build)
**Platforms:** TikTok, Instagram, YouTube Shorts
**Schedule:** Optimal posting times

**Posting Rules:**
- Unique captions per platform
- Platform-appropriate hashtags
- Scheduled for best times
- Include FTC disclosure if needed

### 5. Analytics Tracking (To Build)
**Metrics:**
- Views
- Watch time
- Engagement rate
- Clicks to website
- Conversions

**Database:** Store all performance data for optimization

---

## Phase 2: Higgsfield Integration

### API Key Setup
1. Create Higgsfield account at higgsfield.io
2. Get API key
3. Add to `.env` file

### Video Generation Script

```javascript
// Example: higgsfield-integration.js
const higgsfield = require('./higgsfield-api');

async function generateVideo(approvedScript) {
  const videoPrompt = {
    hook: approvedScript.hook,
    scenes: approvedScript.scenes,
    voiceover: approvedScript.voiceover,
    style: "UGC authentic mobile aesthetic",
    length: "20 seconds",
    music: "upbeat wellness track"
  };
  
  const video = await higgsfield.generate(videoPrompt);
  return video;
}
```

---

## Phase 3: Publishing Automation

### TikTok Publishing
- Use TikTok Business API (when available)
- Fallback: Schedule via Publer or Metricool

### Instagram Publishing
- Instagram Graph API
- Post Reels with captions/hashtags

### YouTube Publishing
- YouTube API v3
- Upload Shorts with metadata

---

## Daily Workflow

**Morning (6 AM):**
1. Script generator runs automatically
2. Creates 5 scripts for the day
3. Notifies you to review

**Mid-morning (9 AM):**
1. You review scripts in dashboard
2. Approve/reject/edit
3. Click "Generate Videos"

**Late morning (10 AM):**
1. Higgsfield generates approved videos
2. Videos downloaded and stored
3. Notifies you when ready

**Afternoon (2 PM):**
1. You review videos (optional final check)
2. Click "Publish"
3. Videos scheduled for optimal times

**Evening (8 PM - 11 PM):**
1. Videos post automatically
2. Analytics start tracking
3. Engagement data logged

**Night (Analytics):**
1. Performance data collected
2. Top performers identified
3. Feeds into next day's script generation

---

## Cost Breakdown (Estimated Monthly)

| Tool | Cost | Purpose |
|------|------|---------|
| Higgsfield | $100-500 | Video generation (5/day) |
| OpenAI API | $20-50 | Script generation + analysis |
| TikTok API | Free | Publishing |
| Instagram API | Free | Publishing |
| YouTube API | Free | Publishing |
| Database | $10-20 | Analytics storage |
| **Total** | **~$150-600/month** | Full automated system |

*Note: Minimize by batching API calls and using free tiers where possible.*

---

## Performance Targets

**Monthly Goals:**
- Generate: 150 videos (5/day × 30 days)
- Views: 500K - 2M (depending on following)
- Engagement: 7-10% average
- Traffic to site: 5-10K clicks
- Conversions: 50-100 cleanse orders

---

## Command Reference

```bash
# Generate daily scripts
node scripts/script-generator.js

# Review dashboard
open dashboard/index.html

# Generate videos (when built)
node scripts/higgsfield-integration.js

# Publish approved videos (when built)
node scripts/publish-scheduler.js

# Get analytics report (when built)
node scripts/analytics-report.js
```

---

## Next Steps

1. ✅ Script generation system (DONE)
2. ✅ Review dashboard (DONE)
3. ⏳ Higgsfield integration (NEXT)
4. ⏳ Publishing automation (NEXT)
5. ⏳ Analytics tracking (NEXT)
6. ⏳ Optimization engine (NEXT)

---

## Support & Troubleshooting

**Scripts not generating?**
- Check config.json is valid JSON
- Verify Node.js is installed (v14+)

**Dashboard not loading?**
- Open dashboard/index.html in modern browser
- Check browser console for errors

**Videos not generating?**
- Verify Higgsfield API key is correct
- Check internet connection
- Check API rate limits

---

## Resources

- [Higgsfield API Docs](https://higgsfield.io/docs)
- [JUCY CLEANSE Brand Guidelines](./config.json)
- [Video Templates](./scripts/video-templates.json)
- [Research Report](./RESEARCH.md)
