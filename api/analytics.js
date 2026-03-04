/**
 * Analytics Engine
 * Tracks performance metrics and optimizes future script generation
 */

const fs = require('fs');
const path = require('path');

const ANALYTICS_FILE = path.join(__dirname, '../output/analytics.json');

/**
 * Initialize or load analytics database
 */
function initializeAnalytics() {
  if (!fs.existsSync(ANALYTICS_FILE)) {
    const emptyAnalytics = {
      version: 1,
      created_at: new Date().toISOString(),
      performance_by_template: {},
      performance_by_hook_pattern: {},
      top_performers: [],
      videos_tracked: 0
    };
    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(emptyAnalytics, null, 2));
    return emptyAnalytics;
  }
  return JSON.parse(fs.readFileSync(ANALYTICS_FILE, 'utf-8'));
}

/**
 * Log video performance metrics
 */
function logVideoPerformance(videoData) {
  try {
    const analytics = initializeAnalytics();
    
    // Calculate engagement rate
    const engagementRate = videoData.likes + videoData.shares + videoData.comments / (videoData.views || 1);
    
    // Track by template
    if (!analytics.performance_by_template[videoData.template]) {
      analytics.performance_by_template[videoData.template] = {
        count: 0,
        avg_views: 0,
        avg_engagement_rate: 0,
        total_conversions: 0
      };
    }
    
    const templateStats = analytics.performance_by_template[videoData.template];
    templateStats.count += 1;
    templateStats.avg_views = (templateStats.avg_views * (templateStats.count - 1) + videoData.views) / templateStats.count;
    templateStats.avg_engagement_rate = (templateStats.avg_engagement_rate * (templateStats.count - 1) + engagementRate) / templateStats.count;
    templateStats.total_conversions += videoData.conversions || 0;
    
    // Track top performers
    analytics.videos_tracked += 1;
    analytics.top_performers = analytics.top_performers || [];
    analytics.top_performers.push({
      title: videoData.title,
      template: videoData.template,
      hook: videoData.hook,
      views: videoData.views,
      engagement_rate: engagementRate,
      conversions: videoData.conversions || 0,
      date: new Date().toISOString()
    });
    
    // Keep only top 50
    analytics.top_performers = analytics.top_performers
      .sort((a, b) => b.engagement_rate - a.engagement_rate)
      .slice(0, 50);
    
    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(analytics, null, 2));
    
    return {
      success: true,
      engagement_rate: engagementRate,
      template_avg: templateStats.avg_engagement_rate
    };
  } catch (error) {
    console.error('Error logging performance:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get top performing hooks
 */
function getTopPerformingHooks(limit = 10) {
  try {
    const analytics = initializeAnalytics();
    return analytics.top_performers
      .slice(0, limit)
      .map(p => ({
        hook: p.hook,
        engagement_rate: p.engagement_rate,
        template: p.template,
        views: p.views
      }));
  } catch (error) {
    return [];
  }
}

/**
 * Get best performing template
 */
function getBestTemplate() {
  try {
    const analytics = initializeAnalytics();
    let best = null;
    let bestEngagement = 0;
    
    Object.entries(analytics.performance_by_template).forEach(([template, stats]) => {
      if (stats.avg_engagement_rate > bestEngagement) {
        bestEngagement = stats.avg_engagement_rate;
        best = template;
      }
    });
    
    return best || 'problem_solution';
  } catch (error) {
    return 'problem_solution';
  }
}

/**
 * Get analytics summary
 */
function getAnalyticsSummary() {
  try {
    const analytics = initializeAnalytics();
    
    const summary = {
      total_videos_tracked: analytics.videos_tracked,
      templates_used: Object.keys(analytics.performance_by_template),
      best_template: getBestTemplate(),
      top_hooks: getTopPerformingHooks(5),
      overall_stats: {}
    };
    
    // Calculate overall stats
    let totalEngagement = 0;
    let totalCount = 0;
    Object.values(analytics.performance_by_template).forEach(stats => {
      totalEngagement += stats.avg_engagement_rate * stats.count;
      totalCount += stats.count;
    });
    
    summary.overall_stats = {
      avg_engagement_rate: totalCount > 0 ? (totalEngagement / totalCount).toFixed(2) : 0,
      templates_tested: Object.keys(analytics.performance_by_template).length,
      total_conversions: Object.values(analytics.performance_by_template)
        .reduce((sum, s) => sum + s.total_conversions, 0)
    };
    
    return summary;
  } catch (error) {
    return { error: error.message };
  }
}

module.exports = {
  logVideoPerformance,
  getTopPerformingHooks,
  getBestTemplate,
  getAnalyticsSummary,
  initializeAnalytics
};
