/* ==========================================================================
   CREATIVE VIBE - MASTER VIDEOS & NICHES CONFIGURATION FILE
   Direct High-Performance Native Video Engine (0% Watermarks & 60 FPS)
   ========================================================================== */

const CREATIVE_VIBE_VIDEOS_CONFIG = {
  
  // =========================================================================
  // 1. BEST EDITS & SIGNATURE WORK (Home Page Dual-Row Infinite Sliders)
  // =========================================================================
  recentEdits: {
    // Top Row: Vertical Videos (9:16 Shorts, Reels, TikToks)
    vertical: [
      {
        url: "assets/videos/short1.mp4",
        title: "MrBeast Style Fast-Paced Pacing Hook",
        client: "Creator Spotlight",
        views: "1.8M Views",
        aspectRatio: "9:16"
      },
      {
        url: "assets/videos/short2.mp4",
        title: "3D Kinetic Motion Typography & Speed Ramps",
        client: "SaaS Brand",
        views: "940K Views",
        aspectRatio: "9:16"
      },
      {
        url: "assets/videos/short3.mp4",
        title: "Alex Hormozi Style Captions & Sound Hits",
        client: "Podcast Host",
        views: "2.4M Views",
        aspectRatio: "9:16"
      },
      {
        url: "assets/videos/short4.mp4",
        title: "Viral Retention Hook & Pattern Interrupts",
        client: "Tech YouTuber",
        views: "1.2M Views",
        aspectRatio: "9:16"
      }
    ],

    // Bottom Row: Horizontal Videos (16:9 Long-Form & Master Edits)
    horizontal: [
      {
        url: "assets/videos/long1.mp4",
        title: "The Rise of Artificial Intelligence | Mini Documentary",
        client: "VoxStyle Media",
        views: "1.4M Views",
        aspectRatio: "16:9",
        duration: "14:20"
      },
      {
        url: "assets/videos/long1.mp4",
        title: "Fintech SaaS Product Explainer Animation",
        client: "PayFlow Inc",
        views: "450K Views",
        aspectRatio: "16:9",
        duration: "02:15"
      },
      {
        url: "assets/videos/long1.mp4",
        title: "How He Built a $10M Empire | Talking Head Masterclass",
        client: "Founder Hub",
        views: "890K Views",
        aspectRatio: "16:9",
        duration: "21:40"
      },
      {
        url: "assets/videos/long1.mp4",
        title: "Dynamic Motion Graphics & Sound Design Showreel",
        client: "Creative Vibe Original",
        views: "1.1M Views",
        aspectRatio: "16:9",
        duration: "01:30"
      }
    ]
  },

  // =========================================================================
  // 2. CURATED EDITING NICHES (Work Page 6 Dedicated Niches)
  // =========================================================================
  niches: {
    
    // NICHE 1: TALKING HEAD & PODCAST EDITS
    "talking-head": {
      name: "Talking Head & Podcasts",
      icon: "🎙️",
      subtitle: "Multi-cam retention switching, kinetic zoom-ins, vocal cleanup & dynamic B-roll",
      vertical: [
        {
          url: "assets/videos/short1.mp4",
          title: "Viral Podcast Clip - The $100M Mindset",
          client: "The Growth Show",
          views: "1.4M Views"
        },
        {
          url: "assets/videos/short2.mp4",
          title: "Hormozi Kinetic Captions Reel",
          client: "Alex Growth",
          views: "890K Views"
        },
        {
          url: "assets/videos/short3.mp4",
          title: "High Energy Solo Hook Edit",
          client: "Creator Mastery",
          views: "2.1M Views"
        }
      ],
      horizontal: [
        {
          url: "assets/videos/long1.mp4",
          title: "Full 45-Min Interview Multi-Cam Edit",
          client: "Founder Unfiltered",
          views: "620K Views",
          duration: "45:10"
        },
        {
          url: "assets/videos/long1.mp4",
          title: "Talking Head YouTube Video with Custom Motion B-Roll",
          client: "Dan Tech",
          views: "430K Views",
          duration: "12:45"
        }
      ]
    },

    // NICHE 2: DOCUMENTARY STYLE EDITS
    "documentary": {
      name: "Documentary Style",
      icon: "🎬",
      subtitle: "Vox & Magnates Media style kinetic maps, paper rip textures, timeline animations & immersive soundscapes",
      vertical: [
        {
          url: "assets/videos/short3.mp4",
          title: "The Fall of Silicon Valley Bank (Short Breakdown)",
          client: "FinTech Stories",
          views: "3.2M Views"
        },
        {
          url: "assets/videos/short4.mp4",
          title: "How Ferrari Built an Empire",
          client: "Brand Biographies",
          views: "1.8M Views"
        }
      ],
      horizontal: [
        {
          url: "assets/videos/long1.mp4",
          title: "The Dark Reality of Fast Fashion | 20-Min Documentary",
          client: "Investigate Daily",
          views: "1.9M Views",
          duration: "20:30"
        },
        {
          url: "assets/videos/long1.mp4",
          title: "How Tesla Conquered Global EV Market",
          client: "Tech Chronology",
          views: "890K Views",
          duration: "18:15"
        }
      ]
    },

    // NICHE 3: SAAS & DIGITAL PRODUCT ANIMATIONS
    "saas-animations": {
      name: "SaaS Animations",
      icon: "💻",
      subtitle: "3D isometric UI breakdowns, feature zooms, mockups, kinetic vector typography & app launch films",
      vertical: [
        {
          url: "assets/videos/short1.mp4",
          title: "Mobile App Feature Launch (TikTok / Reels Ad)",
          client: "FlowSync App",
          views: "720K Views"
        },
        {
          url: "assets/videos/short2.mp4",
          title: "AI Automation Tool in 30 Seconds",
          client: "AutoPilot AI",
          views: "1.1M Views"
        }
      ],
      horizontal: [
        {
          url: "assets/videos/long1.mp4",
          title: "Complete SaaS Product Overview & UI Walkthrough",
          client: "MetricPulse",
          views: "310K Views",
          duration: "02:45"
        },
        {
          url: "assets/videos/long1.mp4",
          title: "DevTools 3D Explainer Video",
          client: "CodeStream",
          views: "480K Views",
          duration: "01:50"
        }
      ]
    },

    // NICHE 4: RETENTION & VIRAL MRBEAST STYLE
    "retention-beast": {
      name: "Retention Videos (MR. Beast Style)",
      icon: "⚡",
      subtitle: "Fast-cut pacing, sound effects every 2.5s, custom illustrated overlays, countdown timers & pattern interrupts",
      vertical: [
        {
          url: "assets/videos/short3.mp4",
          title: "I Survived 100 Hours in VR (Hook)",
          client: "Challenge Beast",
          views: "4.5M Views"
        },
        {
          url: "assets/videos/short4.mp4",
          title: "Last To Leave Giant Circle Wins $10,000",
          client: "Hyper Viral",
          views: "2.8M Views"
        }
      ],
      horizontal: [
        {
          url: "assets/videos/long1.mp4",
          title: "Extreme $50,000 Hide and Seek Championship",
          client: "Quest Arena",
          views: "5.1M Views",
          duration: "16:40"
        },
        {
          url: "assets/videos/long1.mp4",
          title: "Surviving on $1 vs $1,000,000 Island",
          client: "Adventure Bros",
          views: "3.7M Views",
          duration: "14:10"
        }
      ]
    },

    // NICHE 5: IRL & TRAVEL CINEMATIC FILMS
    "irl": {
      name: "IRL & Travel Films",
      icon: "✈️",
      subtitle: "Speed ramps, whip transitions, DaVinci Resolve film color grades, atmospheric environmental Foley & music rhythm",
      vertical: [
        {
          url: "assets/videos/short1.mp4",
          title: "Kyoto Night Walk - Cinematic Reel",
          client: "Nomad Visuals",
          views: "1.6M Views"
        },
        {
          url: "assets/videos/short2.mp4",
          title: "Iceland Drone Speed Ramps",
          client: "Explore With Sam",
          views: "980K Views"
        }
      ],
      horizontal: [
        {
          url: "assets/videos/long1.mp4",
          title: "Lost in the Arctic | 4K Cinematic Travel Film",
          client: "Far North Films",
          views: "820K Views",
          duration: "10:15"
        },
        {
          url: "assets/videos/long1.mp4",
          title: "Swiss Alps Motorcycle Journey",
          client: "Ride Free",
          views: "540K Views",
          duration: "13:50"
        }
      ]
    },

    // NICHE 6: CUSTOM RETENTION EXPERIMENTS
    "custom-retention": {
      name: "Custom Retention & Brand Films",
      icon: "💎",
      subtitle: "Custom pacing tailored to your specific audience retention analytics, brand guidelines & A/B hook testing",
      vertical: [
        {
          url: "assets/videos/short3.mp4",
          title: "Luxury Watch Commercial Hook",
          client: "Apex Timepieces",
          views: "860K Views"
        },
        {
          url: "assets/videos/short4.mp4",
          title: "Fitness Brand Motivation Reel",
          client: "Pulse Athletic",
          views: "1.9M Views"
        }
      ],
      horizontal: [
        {
          url: "assets/videos/long1.mp4",
          title: "Commercial Brand Anthem Film",
          client: "Lumina Studios",
          views: "420K Views",
          duration: "03:10"
        },
        {
          url: "assets/videos/long1.mp4",
          title: "Founder Story Manifesto Film",
          client: "Elevate Global",
          views: "610K Views",
          duration: "05:45"
        }
      ]
    }
  }
};

// ===========================================================================
// SMART MULTI-SOURCE PARSER
// ===========================================================================

function parseYouTubeId(url) {
  if (!url || typeof url !== 'string') return null;
  if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) return url.trim();
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

function normalizeVideoItem(item, defaultCategory = 'general', defaultAspect = '16:9') {
  let url = '';
  let title = 'Project Showcase';
  let client = 'Creative Vibe';
  let views = '1.2M Views';
  let duration = 'Full HD';
  let description = 'Crafted for high audience retention and cinematic storytelling.';
  let aspectRatio = defaultAspect;
  let customThumb = '';

  if (typeof item === 'string') {
    url = item.trim();
    title = 'Selected Video Edit';
  } else if (typeof item === 'object' && item !== null) {
    url = (item.url || item.videoUrl || item.youtubeUrl || item.youtubeId || '').trim();
    title = item.title || title;
    client = item.client || client;
    views = item.views || views;
    duration = item.duration || duration;
    description = item.description || description;
    aspectRatio = item.aspectRatio || defaultAspect;
    customThumb = item.thumbnail || '';
  }

  const isVertical = aspectRatio === '9:16' || url.includes('/shorts/');
  const finalAspect = isVertical ? '9:16' : '16:9';

  // 1. YouTube Link
  const ytId = parseYouTubeId(url);
  if (ytId) {
    return {
      id: `vid_yt_${ytId}`,
      sourceType: 'youtube',
      ytId: ytId,
      youtubeUrl: `https://www.youtube.com/watch?v=${ytId}`,
      videoUrl: `https://www.youtube.com/watch?v=${ytId}`,
      thumbnail: customThumb || `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`,
      title: title,
      client: client,
      views: views,
      duration: duration,
      description: description,
      aspectRatio: finalAspect,
      category: defaultCategory
    };
  }

  // 2. Direct Video (Local MP4 / WebM / CDN)
  return {
    id: `vid_direct_${Math.random().toString(36).substr(2, 6)}`,
    sourceType: 'direct',
    videoUrl: url,
    thumbnail: customThumb || '',
    title: title,
    client: client,
    views: views,
    duration: duration,
    description: description,
    aspectRatio: finalAspect,
    category: defaultCategory
  };
}

// Global accessor
window.CREATIVE_VIBE_VIDEOS = {
  config: CREATIVE_VIBE_VIDEOS_CONFIG,
  parseYouTubeId: parseYouTubeId,
  normalize: normalizeVideoItem,

  // Get normalized list of Recent Edits
  getRecentEdits() {
    const raw = CREATIVE_VIBE_VIDEOS_CONFIG.recentEdits || {};
    return {
      vertical: (raw.vertical || []).map(v => normalizeVideoItem(v, 'shorts-reels', '9:16')),
      horizontal: (raw.horizontal || []).map(v => normalizeVideoItem(v, 'documentary', '16:9'))
    };
  },

  // Get normalized Niches dictionary for Work section
  getNiches() {
    const rawNiches = CREATIVE_VIBE_VIDEOS_CONFIG.niches || {};
    const result = {};
    for (const [key, niche] of Object.entries(rawNiches)) {
      result[key] = {
        key: key,
        name: niche.name,
        icon: niche.icon,
        subtitle: niche.subtitle,
        vertical: (niche.vertical || []).map(v => normalizeVideoItem(v, key, '9:16')),
        horizontal: (niche.horizontal || []).map(v => normalizeVideoItem(v, key, '16:9'))
      };
    }
    return result;
  },

  // Get single niche by key
  getNiche(key) {
    const all = this.getNiches();
    return all[key] || null;
  }
};
