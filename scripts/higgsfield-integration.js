#!/usr/bin/env node

/**
 * JUCY CLEANSE — Higgsfield Video Generation Integration
 * Converts approved scripts into AI-generated UGC videos
 * 
 * Requires Higgsfield API key in .env file
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const HIGGSFIELD_API_KEY = process.env.HIGGSFIELD_API_KEY;
const HIGGSFIELD_API_URL = 'https://api.higgsfield.ai/v1';

/**
 * Convert script to Higgsfield video generation prompt
 */
function scriptToHighsfieldPrompt(script) {
  const scenes = script.scenes
    .map((scene, i) => {
      return `Scene ${i + 1} (${scene.duration}):
- Visual: ${scene.content}
- Voiceover: ${scene.voiceover}
- On-screen text: ${scene.text || 'minimal'}`;
    })
    .join('\n\n');

  return {
    title: script.title,
    hook: script.hook,
    description: `JUCY CLEANSE UGC Video - ${script.template}`,
    style: "UGC authentic mobile aesthetic, real person feel, minimal polish",
    scenes: scenes,
    voiceover: true,
    voiceover_style: script.template === 'lifestyle_identity' ? 'none' : 'conversational',
    length_seconds: parseInt(script.length),
    format: "vertical", // For TikTok/Instagram/YouTube Shorts
    quality: "1080p",
    // Higgsfield-specific parameters
    ai_avatar: false, // Use realistic B-roll instead of AI avatar for JUCY
    music: "upbeat wellness track",
    captions: true,
    caption_text: script.caption,
    branding: {
      product_name: "JUCY CLEANSE",
      color_scheme: "green and white"
    }
  };
}

/**
 * Send script to Higgsfield for video generation
 */
async function generateVideo(script, outputDir = './videos') {
  try {
    if (!HIGGSFIELD_API_KEY) {
      console.error('❌ HIGGSFIELD_API_KEY not found in .env file');
      console.log('To use this feature:');
      console.log('1. Create a Higgsfield account at higgsfield.io');
      console.log('2. Get your API key');
      console.log('3. Add to .env: HIGGSFIELD_API_KEY=your_key_here');
      return null;
    }

    console.log(`🎬 Generating video for: ${script.title}`);

    const prompt = scriptToHighsfieldPrompt(script);

    // Call Higgsfield API
    const response = await axios.post(
      `${HIGGSFIELD_API_URL}/videos/generate`,
      prompt,
      {
        headers: {
          'Authorization': `Bearer ${HIGGSFIELD_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 300000 // 5 minute timeout for long-running video generation
      }
    );

    const videoId = response.data.id;
    console.log(`✅ Video generation started. ID: ${videoId}`);

    // Poll for completion (Higgsfield returns async)
    const video = await waitForVideoGeneration(videoId);

    if (video) {
      // Download video
      const videoPath = await downloadVideo(video.url, outputDir, script.title);
      console.log(`✅ Video saved to: ${videoPath}`);
      
      return {
        title: script.title,
        video_id: videoId,
        video_url: video.url,
        local_path: videoPath,
        script: script,
        metadata: {
          generated_at: new Date().toISOString(),
          template: script.template,
          length: script.length,
          hashtags: script.hashtags
        }
      };
    } else {
      console.error(`❌ Video generation failed for: ${script.title}`);
      return null;
    }

  } catch (error) {
    console.error(`❌ Error generating video:`, error.message);
    if (error.response) {
      console.error('API Response:', error.response.data);
    }
    return null;
  }
}

/**
 * Poll Higgsfield API until video is generated
 */
async function waitForVideoGeneration(videoId, maxAttempts = 120, delayMs = 5000) {
  console.log(`⏳ Waiting for video generation (ID: ${videoId})`);

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const response = await axios.get(
        `${HIGGSFIELD_API_URL}/videos/${videoId}`,
        {
          headers: {
            'Authorization': `Bearer ${HIGGSFIELD_API_KEY}`
          }
        }
      );

      const status = response.data.status;

      if (status === 'completed') {
        console.log(`✅ Video generation complete!`);
        return response.data;
      } else if (status === 'failed') {
        console.error(`❌ Video generation failed: ${response.data.error}`);
        return null;
      } else {
        console.log(`   Progress: ${status} (${attempt + 1}/${maxAttempts})`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    } catch (error) {
      console.error(`❌ Error checking video status:`, error.message);
      return null;
    }
  }

  console.error(`❌ Video generation timeout after ${maxAttempts * delayMs / 1000}s`);
  return null;
}

/**
 * Download video from Higgsfield URL
 */
async function downloadVideo(videoUrl, outputDir, title) {
  try {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const filename = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${Date.now()}.mp4`;
    const filepath = path.join(outputDir, filename);

    const response = await axios({
      url: videoUrl,
      method: 'GET',
      responseType: 'stream'
    });

    return new Promise((resolve, reject) => {
      const fileStream = fs.createWriteStream(filepath);
      response.data.pipe(fileStream);

      fileStream.on('finish', () => {
        resolve(filepath);
      });

      fileStream.on('error', (err) => {
        fs.unlink(filepath, () => {}); // Delete file on error
        reject(err);
      });
    });
  } catch (error) {
    console.error(`❌ Error downloading video:`, error.message);
    throw error;
  }
}

/**
 * Generate all videos from approved scripts
 */
async function generateAllVideos(scriptsFile = './output/scripts-2026-03-04.json') {
  try {
    if (!fs.existsSync(scriptsFile)) {
      console.error(`❌ Scripts file not found: ${scriptsFile}`);
      return;
    }

    const scriptsData = JSON.parse(fs.readFileSync(scriptsFile, 'utf-8'));
    const approvedScripts = scriptsData.scripts.filter(s => s.approved !== false);

    console.log(`📺 Generating ${approvedScripts.length} videos...`);

    const videos = [];

    for (const script of approvedScripts) {
      const video = await generateVideo(script);
      if (video) {
        videos.push(video);
      }
      // Add delay between API calls to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // Save video metadata
    const metadata = {
      date: new Date().toISOString().split('T')[0],
      videos_generated: videos.length,
      videos: videos
    };

    fs.writeFileSync(
      `./output/videos-${metadata.date}.json`,
      JSON.stringify(metadata, null, 2)
    );

    console.log(`\n✅ Generated ${videos.length} videos`);
    console.log(`📁 Metadata saved to: ./output/videos-${metadata.date}.json`);

    return videos;
  } catch (error) {
    console.error(`❌ Error in generateAllVideos:`, error);
  }
}

/**
 * CLI interface
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`JUCY CLEANSE — Higgsfield Video Generator`);
    console.log(`\nUsage:`);
    console.log(`  node higgsfield-integration.js generate-all [scriptsFile]`);
    console.log(`  node higgsfield-integration.js generate-single [scriptTitle]`);
    console.log(`  node higgsfield-integration.js status [videoId]`);
    console.log(`\nExamples:`);
    console.log(`  node higgsfield-integration.js generate-all ./output/scripts-2026-03-04.json`);
    console.log(`  node higgsfield-integration.js generate-single "Problem → Solution: Bloating"`);
    return;
  }

  const command = args[0];

  if (command === 'generate-all') {
    const scriptsFile = args[1] || './output/scripts-2026-03-04.json';
    await generateAllVideos(scriptsFile);
  } else if (command === 'generate-single') {
    const scriptTitle = args[1];
    // Load today's scripts
    const today = new Date().toISOString().split('T')[0];
    const scriptsFile = `./output/scripts-${today}.json`;
    const scriptsData = JSON.parse(fs.readFileSync(scriptsFile, 'utf-8'));
    const script = scriptsData.scripts.find(s => s.title === scriptTitle);
    
    if (script) {
      await generateVideo(script);
    } else {
      console.error(`❌ Script not found: ${scriptTitle}`);
    }
  } else if (command === 'status') {
    const videoId = args[1];
    if (videoId) {
      const video = await waitForVideoGeneration(videoId, 1);
      if (video) {
        console.log(JSON.stringify(video, null, 2));
      }
    } else {
      console.error('❌ Please provide video ID');
    }
  }
}

// Export for use as module
module.exports = {
  generateVideo,
  generateAllVideos,
  scriptToHighsfieldPrompt,
  waitForVideoGeneration
};

// Run CLI if executed directly
if (require.main === module) {
  main();
}
