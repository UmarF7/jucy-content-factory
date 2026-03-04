# JUCY CLEANSE — Viral UGC Content Factory

Automated daily video generation system for TikTok, Instagram Reels, and YouTube Shorts.

## System Overview

**Daily Output:** 5 videos (human-reviewed before posting)
- 1x Problem → Solution (Direct Response)
- 1x Testimonial/Social Proof
- 1x Benefits Breakdown
- 1x Objection Handling
- 1x Lifestyle/Identity

**Platforms:** TikTok, Instagram, YouTube Shorts
**Brand:** @jucycleanse
**Website:** jucycleanse.co.uk

## Architecture

```
Trend Research → Script Generation → Video Production → Human Review → Publishing → Analytics
```

## Components

1. **Trend Research Engine** — Monitor wellness/fitness trends
2. **Script Generator** — AI creates 5 daily scripts based on templates
3. **Video Production** — Higgsfield integration for AI video generation
4. **Review Dashboard** — Approve/reject before posting
5. **Publishing System** — Schedule across platforms
6. **Analytics Tracker** — Monitor performance

## Quick Start

1. Set up Higgsfield account
2. Configure API credentials
3. Run initial trend research
4. Generate daily scripts
5. Review and approve videos
6. Publish to platforms

## Files

- `config.json` — Brand voice, product info, audience
- `scripts/generate-daily-scripts.js` — Daily 5-video script generation
- `scripts/higgsfield-integration.js` — Video generation
- `scripts/publish-scheduler.js` — Posting to platforms
- `database/schema.sql` — Performance tracking
- `dashboard/` — Review interface
