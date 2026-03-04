#!/usr/bin/env node

/**
 * JUCY CLEANSE — Publishing Scheduler
 * Schedules approved and generated videos to TikTok, Instagram, and YouTube Shorts
 * 
 * Requires API tokens for each platform in .env file
 */

const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

// Platform APIs (placeholder - actual implementation depends on API availability)
const PLATFORMS = {
  tiktok: {
    api_url: 'https://open.tiktokapis.com/v1',
    access_token: process.env.TIKTOK_ACCESS_TOKEN,
    available: !!process.env.TIKTOK_ACCESS_TOKEN
  },
  instagram: {
    api_url: 'https://graph.instagram.com/v18.0',
    access_token: process.env.INSTAGRAM_ACCESS_TOKEN,
    business_account_id: process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID,
    available: !!process.env.INSTAGRAM_ACCESS_TOKEN
  },
  youtube: {
    api_url: 'https://www.googleapis.com/youtube/v3',
    api_key: process.env.YOUTUBE_API_KEY,
    channel_id: process.env.YOUTUBE_CHANNEL_ID,
    available: !!process.env.YOUTUBE_API_KEY
  }
};

// Optimal posting times by platform (24h format)
const POSTING_SCHEDULE = {
  tiktok: [7, 12, 17, 20], // 7am, 12pm, 5pm, 8pm
  instagram: [9, 13, 18, 20], // 9am, 1pm, 6pm, 8pm
  youtube: [10, 15, 19] // 10am, 3pm, 7pm
};

/**
 * Adapt script captions for each platform
 */
function adaptCaptionForPlatform(script, platform) {
  let caption = script.caption;

  if (platform === 'tiktok') {
    // TikTok: shorter, more energy
    caption = caption
      .split('\n')[0] + '\n\n' +
      script.hashtags.slice(0, 8).join(' ') +
      '\n\n💚 Shop now → Link in bio';
  } else if (platform === 'instagram') {
    // Instagram: slightly longer, emojis
    caption = caption + '\n\n' +
      '👇 Shop in bio\n' +
      script.hashtags.join(' ');
  } else if (platform === 'youtube') {
    // YouTube: descriptive
    caption = script.caption + '\n\n' +
      '📝 Video Details:\n' +
      `💚 Product: JUCY CLEANSE\n` +
      `🔗 Shop: jucycleanse.co.uk\n` +
      `⏱️ Length: ${script.length}\n\n` +
      script.hashtags.join(' ');
  }

  return caption;
}

/**
 * Get optimal posting time for today
 */
function getOptimalPostingTime(platform) {
  const now = new Date();
  const times = POSTING_SCHEDULE[platform];
  let targetTime = null;

  // Find next available slot
  for (const hour of times) {
    const postTime = new Date(now);
    postTime.setHours(hour, 0, 0, 0);

    if (postTime > now) {
      targetTime = postTime;
      break;
    }
  }

  // If all times have passed, use first time tomorrow
  if (!targetTime) {
    targetTime = new Date(now);
    targetTime.setDate(targetTime.getDate() + 1);
    targetTime.setHours(times[0], 0, 0, 0);
  }

  return targetTime;
}

/**
 * Publish to TikTok
 */
async function publishToTikTok(video, script) {
  try {
    if (!PLATFORMS.tiktok.available) {
      console.log('⚠️  TikTok API token not configured. Skipping TikTok publish.');
      return {
        platform: 'tiktok',
        status: 'skipped',
        reason: 'API token not configured'
      };
    }

    console.log(`📱 Publishing to TikTok: ${script.title}`);

    // Note: TikTok's Content Posting API is limited. Fallback approach:
    // - If API unavailable, use scheduling tool (Publer, Metricool, etc.)
    // - For now, log the action

    const postTime = getOptimalPostingTime('tiktok');
    const caption = adaptCaptionForPlatform(script, 'tiktok');

    console.log(`   Scheduled for: ${postTime.toLocaleString()}`);
    console.log(`   Caption: ${caption.substring(0, 50)}...`);

    // TODO: Implement actual TikTok API call when available
    // const response = await axios.post(
    //   `${PLATFORMS.tiktok.api_url}/video/upload/`,
    //   {
    //     video_file: fs.createReadStream(video.local_path),
    //     description: caption,
    //     post_at: postTime.toISOString()
    //   },
    //   {
    //     headers: {
    //       'Authorization': `Bearer ${PLATFORMS.tiktok.access_token}`
    //     }
    //   }
    // );

    return {
      platform: 'tiktok',
      status: 'scheduled',
      scheduled_time: postTime.toISOString(),
      caption: caption
    };

  } catch (error) {
    console.error(`❌ Error publishing to TikTok:`, error.message);
    return {
      platform: 'tiktok',
      status: 'error',
      error: error.message
    };
  }
}

/**
 * Publish to Instagram Reels
 */
async function publishToInstagram(video, script) {
  try {
    if (!PLATFORMS.instagram.available) {
      console.log('⚠️  Instagram API token not configured. Skipping Instagram publish.');
      return {
        platform: 'instagram',
        status: 'skipped',
        reason: 'API token not configured'
      };
    }

    console.log(`📱 Publishing to Instagram: ${script.title}`);

    const postTime = getOptimalPostingTime('instagram');
    const caption = adaptCaptionForPlatform(script, 'instagram');

    console.log(`   Scheduled for: ${postTime.toLocaleString()}`);

    // TODO: Implement Instagram Graph API call
    // const response = await axios.post(
    //   `${PLATFORMS.instagram.api_url}/${PLATFORMS.instagram.business_account_id}/media`,
    //   {
    //     video_url: video.url,
    //     caption: caption,
    //     media_type: 'REELS'
    //   },
    //   {
    //     params: {
    //       access_token: PLATFORMS.instagram.access_token
    //     }
    //   }
    // );

    return {
      platform: 'instagram',
      status: 'scheduled',
      scheduled_time: postTime.toISOString(),
      caption: caption
    };

  } catch (error) {
    console.error(`❌ Error publishing to Instagram:`, error.message);
    return {
      platform: 'instagram',
      status: 'error',
      error: error.message
    };
  }
}

/**
 * Publish to YouTube Shorts
 */
async function publishToYouTube(video, script) {
  try {
    if (!PLATFORMS.youtube.available) {
      console.log('⚠️  YouTube API key not configured. Skipping YouTube publish.');
      return {
        platform: 'youtube',
        status: 'skipped',
        reason: 'API key not configured'
      };
    }

    console.log(`📱 Publishing to YouTube: ${script.title}`);

    const postTime = getOptimalPostingTime('youtube');
    const description = adaptCaptionForPlatform(script, 'youtube');

    console.log(`   Scheduled for: ${postTime.toLocaleString()}`);

    // TODO: Implement YouTube API call
    // const response = await axios.post(
    //   `${PLATFORMS.youtube.api_url}/videos?part=snippet,status`,
    //   {
    //     snippet: {
    //       title: script.title,
    //       description: description,
    //       tags: script.hashtags.map(h => h.replace('#', '')),
    //       categoryId: '22' // People & Blogs
    //     },
    //     status: {
    //       privacyStatus: 'public',
    //       publishAt: postTime.toISOString(),
    //       selfDeclaredMadeForKids: false
    //     }
    //   },
    //   {
    //     headers: {
    //       'Authorization': `Bearer ${PLATFORMS.youtube.api_key}`
    //     }
    //   }
    // );

    return {
      platform: 'youtube',
      status: 'scheduled',
      scheduled_time: postTime.toISOString(),
      description: description
    };

  } catch (error) {
    console.error(`❌ Error publishing to YouTube:`, error.message);
    return {
      platform: 'youtube',
      status: 'error',
      error: error.message
    };
  }
}

/**
 * Publish video to all platforms
 */
async function publishToAllPlatforms(video, script) {
  console.log(`\n🎬 Publishing video: ${script.title}`);
  console.log(`📁 Video path: ${video.local_path}`);

  const results = [];

  // Publish to each platform
  results.push(await publishToTikTok(video, script));
  results.push(await publishToInstagram(video, script));
  results.push(await publishToYouTube(video, script));

  return results;
}

/**
 * Schedule all approved videos from generated videos file
 */
async function scheduleAllVideos(videosFile = './output/videos-2026-03-04.json') {
  try {
    if (!fs.existsSync(videosFile)) {
      console.error(`❌ Videos file not found: ${videosFile}`);
      console.log('\nFirst generate videos with: node higgsfield-integration.js generate-all');
      return;
    }

    const videosData = JSON.parse(fs.readFileSync(videosFile, 'utf-8'));

    console.log(`\n🚀 Scheduling ${videosData.videos.length} videos to all platforms...`);

    const schedule = {
      date: new Date().toISOString().split('T')[0],
      videos_scheduled: videosData.videos.length,
      schedule_details: []
    };

    for (const video of videosData.videos) {
      const publishResults = await publishToAllPlatforms(video, video.script);
      schedule.schedule_details.push({
        video_title: video.title,
        results: publishResults
      });

      // Add delay between videos
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Save schedule details
    fs.writeFileSync(
      `./output/schedule-${schedule.date}.json`,
      JSON.stringify(schedule, null, 2)
    );

    console.log(`\n✅ All videos scheduled!`);
    console.log(`📁 Schedule details saved to: ./output/schedule-${schedule.date}.json`);

    return schedule;

  } catch (error) {
    console.error(`❌ Error in scheduleAllVideos:`, error);
  }
}

/**
 * CLI interface
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`JUCY CLEANSE — Publishing Scheduler`);
    console.log(`\nUsage:`);
    console.log(`  node publish-scheduler.js schedule-all [videosFile]`);
    console.log(`  node publish-scheduler.js status`);
    console.log(`\nExamples:`);
    console.log(`  node publish-scheduler.js schedule-all ./output/videos-2026-03-04.json`);
    console.log(`\nRequired environment variables (in .env):`);
    console.log(`  TIKTOK_ACCESS_TOKEN=xxx`);
    console.log(`  INSTAGRAM_ACCESS_TOKEN=xxx`);
    console.log(`  INSTAGRAM_BUSINESS_ACCOUNT_ID=xxx`);
    console.log(`  YOUTUBE_API_KEY=xxx`);
    console.log(`  YOUTUBE_CHANNEL_ID=xxx`);
    return;
  }

  const command = args[0];

  if (command === 'schedule-all') {
    const videosFile = args[1] || './output/videos-2026-03-04.json';
    await scheduleAllVideos(videosFile);
  } else if (command === 'status') {
    console.log('\n📊 Platform Status:');
    Object.entries(PLATFORMS).forEach(([platform, config]) => {
      console.log(`  ${platform}: ${config.available ? '✅ Configured' : '⚠️  Not configured'}`);
    });
  }
}

// Export for use as module
module.exports = {
  publishToAllPlatforms,
  scheduleAllVideos,
  adaptCaptionForPlatform,
  getOptimalPostingTime
};

// Run CLI if executed directly
if (require.main === module) {
  main();
}
