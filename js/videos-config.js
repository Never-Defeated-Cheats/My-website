/* ==========================================================================
   CREATIVE VIBE - MASTER VIDEOS & NICHES CONFIGURATION FILE
   High-Speed Direct Cloudinary Video Engine with User's Real Master Videos
   ========================================================================== */

const USER_CLOUDINARY_VIDEOS = {
  // Vertical 9:16 Shorts & Reels
  vertRealEstate: {
    preview: "https://res.cloudinary.com/pxf5pjuu/video/upload/w_200,c_scale,q_auto:eco,br_150k,f_mp4/v1787906532/Real_Estate.mp4",
    master: "https://res.cloudinary.com/pxf5pjuu/video/upload/q_auto:good,vc_auto/v1787906532/Real_Estate.mp4"
  },
  vertReel06: {
    preview: "https://res.cloudinary.com/pxf5pjuu/video/upload/w_200,c_scale,q_auto:eco,br_150k,f_mp4/v1787906442/Reel_06.mp4",
    master: "https://res.cloudinary.com/pxf5pjuu/video/upload/q_auto:good,vc_auto/v1787906442/Reel_06.mp4"
  },
  vertPerception: {
    preview: "https://res.cloudinary.com/pxf5pjuu/video/upload/w_200,c_scale,q_auto:eco,br_150k,f_mp4/v1787847723/perception_over_value.mp4",
    master: "https://res.cloudinary.com/pxf5pjuu/video/upload/q_auto:good,vc_auto/v1787847723/perception_over_value.mp4"
  },

  // Horizontal 16:9 Long-Form Master Edits
  horizTajStory: {
    preview: "https://res.cloudinary.com/pxf5pjuu/video/upload/w_280,c_scale,q_auto:eco,br_200k,f_mp4/v1787906348/The_Taj_Story.mp4",
    master: "https://res.cloudinary.com/pxf5pjuu/video/upload/q_auto:good,vc_auto/v1787906348/The_Taj_Story.mp4"
  },
  horizPerception1: {
    preview: "https://res.cloudinary.com/pxf5pjuu/video/upload/w_280,c_scale,q_auto:eco,br_200k,f_mp4/v1787906505/perception_over_value_1.mp4",
    master: "https://res.cloudinary.com/pxf5pjuu/video/upload/q_auto:good,vc_auto/v1787906505/perception_over_value_1.mp4"
  }
};

const CREATIVE_VIBE_VIDEOS_CONFIG = {
  
  // =========================================================================
  // 1. BEST EDITS & SIGNATURE WORK (Home Page Dual-Row Infinite Sliders)
  // =========================================================================
  recentEdits: {
    // Top Row: Vertical Videos (9:16 Shorts, Reels, TikToks)
    vertical: [
      {
        previewUrl: USER_CLOUDINARY_VIDEOS.vertRealEstate.preview,
        masterUrl: USER_CLOUDINARY_VIDEOS.vertRealEstate.master,
        title: "Trending Real Estate Speed Ramp Reel",
        client: "Luxury Real Estate",
        views: "1.8M Views",
        aspectRatio: "9:16"
      },
      {
        previewUrl: USER_CLOUDINARY_VIDEOS.vertReel06.preview,
        masterUrl: USER_CLOUDINARY_VIDEOS.vertReel06.master,
        title: "Viral Dynamic Motion & Sound Design Reel",
        client: "SaaS Brand",
        views: "940K Views",
        aspectRatio: "9:16"
      },
      {
        previewUrl: USER_CLOUDINARY_VIDEOS.vertPerception.preview,
        masterUrl: USER_CLOUDINARY_VIDEOS.vertPerception.master,
        title: "Perception Over Value | Viral Short",
        client: "Creator Spotlight",
        views: "2.4M Views",
        aspectRatio: "9:16"
      },
      {
        previewUrl: USER_CLOUDINARY_VIDEOS.vertRealEstate.preview,
        masterUrl: USER_CLOUDINARY_VIDEOS.vertRealEstate.master,
        title: "Alex Hormozi Style Captions & Sound Hits",
        client: "Podcast Host",
        views: "1.2M Views",
        aspectRatio: "9:16"
      }
    ],

    // Bottom Row: Horizontal Videos (16:9 Long-Form) - The Taj Story & Perception Over Value 1
    horizontal: [
      {
        previewUrl: USER_CLOUDINARY_VIDEOS.horizTajStory.preview,
        masterUrl: USER_CLOUDINARY_VIDEOS.horizTajStory.master,
        title: "The Taj Story | Documentary Masterclass",
        client: "Heritage Media",
        views: "2.1M Views",
        aspectRatio: "16:9",
        duration: "08:45"
      },
      {
        previewUrl: USER_CLOUDINARY_VIDEOS.horizPerception1.preview,
        masterUrl: USER_CLOUDINARY_VIDEOS.horizPerception1.master,
        title: "Perception Over Value | 16:9 Master Edition",
        client: "Creative Vibe Masterclass",
        views: "1.5M Views",
        aspectRatio: "16:9",
        duration: "04:30"
      },
      {
        previewUrl: USER_CLOUDINARY_VIDEOS.horizTajStory.preview,
        masterUrl: USER_CLOUDINARY_VIDEOS.horizTajStory.master,
        title: "How He Built an Empire | Talking Head Edit",
        client: "Founder Hub",
        views: "890K Views",
        aspectRatio: "16:9",
        duration: "21:40"
      },
      {
        previewUrl: USER_CLOUDINARY_VIDEOS.horizPerception1.preview,
        masterUrl: USER_CLOUDINARY_VIDEOS.horizPerception1.master,
        title: "Fintech SaaS Product Explainer Animation",
        client: "PayFlow Inc",
        views: "450K Views",
        aspectRatio: "16:9",
        duration: "02:15"
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
          previewUrl: USER_CLOUDINARY_VIDEOS.vertPerception.preview,
          masterUrl: USER_CLOUDINARY_VIDEOS.vertPerception.master,
          title: "Viral Podcast Clip - The $100M Mindset",
          client: "The Growth Show",
          views: "1.4M Views"
        },
        {
          previewUrl: USER_CLOUDINARY_VIDEOS.vertReel06.preview,
          masterUrl: USER_CLOUDINARY_VIDEOS.vertReel06.master,
          title: "Hormozi Kinetic Captions Reel",
          client: "Alex Growth",
          views: "890K Views"
        }
      ],
      horizontal: [
        {
          previewUrl: USER_CLOUDINARY_VIDEOS.horizPerception1.preview,
          masterUrl: USER_CLOUDINARY_VIDEOS.horizPerception1.master,
          title: "Full 45-Min Interview Multi-Cam Edit",
          client: "Founder Unfiltered",
          views: "620K Views",
          duration: "45:10"
        },
        {
          previewUrl: USER_CLOUDINARY_VIDEOS.horizTajStory.preview,
          masterUrl: USER_CLOUDINARY_VIDEOS.horizTajStory.master,
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
          previewUrl: USER_CLOUDINARY_VIDEOS.vertRealEstate.preview,
          masterUrl: USER_CLOUDINARY_VIDEOS.vertRealEstate.master,
          title: "The Fall of Silicon Valley Bank (Short Breakdown)",
          client: "FinTech Stories",
          views: "3.2M Views"
        },
        {
          previewUrl: USER_CLOUDINARY_VIDEOS.vertReel06.preview,
          masterUrl: USER_CLOUDINARY_VIDEOS.vertReel06.master,
          title: "How Ferrari Built an Empire",
          client: "Brand Biographies",
          views: "1.8M Views"
        }
      ],
      horizontal: [
        {
          previewUrl: USER_CLOUDINARY_VIDEOS.horizTajStory.preview,
          masterUrl: USER_CLOUDINARY_VIDEOS.horizTajStory.master,
          title: "The Taj Story | 20-Min Documentary Masterclass",
          client: "Investigate Daily",
          views: "1.9M Views",
          duration: "20:30"
        },
        {
          previewUrl: USER_CLOUDINARY_VIDEOS.horizPerception1.preview,
          masterUrl: USER_CLOUDINARY_VIDEOS.horizPerception1.master,
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
          previewUrl: USER_CLOUDINARY_VIDEOS.vertReel06.preview,
          masterUrl: USER_CLOUDINARY_VIDEOS.vertReel06.master,
          title: "Mobile App Feature Launch (TikTok / Reels Ad)",
          client: "FlowSync App",
          views: "720K Views"
        },
        {
          previewUrl: USER_CLOUDINARY_VIDEOS.vertPerception.preview,
          masterUrl: USER_CLOUDINARY_VIDEOS.vertPerception.master,
          title: "AI Automation Tool in 30 Seconds",
          client: "AutoPilot AI",
          views: "1.1M Views"
        }
      ],
      horizontal: [
        {
          previewUrl: USER_CLOUDINARY_VIDEOS.horizPerception1.preview,
          masterUrl: USER_CLOUDINARY_VIDEOS.horizPerception1.master,
          title: "Complete SaaS Product Overview & UI Walkthrough",
          client: "MetricPulse",
          views: "310K Views",
          duration: "02:45"
        },
        {
          previewUrl: USER_CLOUDINARY_VIDEOS.horizTajStory.preview,
          masterUrl: USER_CLOUDINARY_VIDEOS.horizTajStory.master,
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
          previewUrl: USER_CLOUDINARY_VIDEOS.vertRealEstate.preview,
          masterUrl: USER_CLOUDINARY_VIDEOS.vertRealEstate.master,
          title: "I Survived 100 Hours in VR (Hook)",
          client: "Challenge Beast",
          views: "4.5M Views"
        },
        {
          previewUrl: USER_CLOUDINARY_VIDEOS.vertReel06.preview,
          masterUrl: USER_CLOUDINARY_VIDEOS.vertReel06.master,
          title: "Last To Leave Giant Circle Wins $10,000",
          client: "Hyper Viral",
          views: "2.8M Views"
        }
      ],
      horizontal: [
        {
          previewUrl: USER_CLOUDINARY_VIDEOS.horizPerception1.preview,
          masterUrl: USER_CLOUDINARY_VIDEOS.horizPerception1.master,
          title: "Extreme $50,000 Hide and Seek Championship",
          client: "Quest Arena",
          views: "5.1M Views",
          duration: "16:40"
        },
        {
          previewUrl: USER_CLOUDINARY_VIDEOS.horizTajStory.preview,
          masterUrl: USER_CLOUDINARY_VIDEOS.horizTajStory.master,
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
          previewUrl: USER_CLOUDINARY_VIDEOS.vertRealEstate.preview,
          masterUrl: USER_CLOUDINARY_VIDEOS.vertRealEstate.master,
          title: "Kyoto Night Walk - Cinematic Reel",
          client: "Nomad Visuals",
          views: "1.6M Views"
        },
        {
          previewUrl: USER_CLOUDINARY_VIDEOS.vertReel06.preview,
          masterUrl: USER_CLOUDINARY_VIDEOS.vertReel06.master,
          title: "Iceland Drone Speed Ramps",
          client: "Explore With Sam",
          views: "980K Views"
        }
      ],
      horizontal: [
        {
          previewUrl: USER_CLOUDINARY_VIDEOS.horizTajStory.preview,
          masterUrl: USER_CLOUDINARY_VIDEOS.horizTajStory.master,
          title: "The Taj Story | 4K Cinematic Travel Film",
          client: "Far North Films",
          views: "820K Views",
          duration: "10:15"
        },
        {
          previewUrl: USER_CLOUDINARY_VIDEOS.horizPerception1.preview,
          masterUrl: USER_CLOUDINARY_VIDEOS.horizPerception1.master,
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
          previewUrl: USER_CLOUDINARY_VIDEOS.vertPerception.preview,
          masterUrl: USER_CLOUDINARY_VIDEOS.vertPerception.master,
          title: "Luxury Watch Commercial Hook",
          client: "Apex Timepieces",
          views: "860K Views"
        },
        {
          previewUrl: USER_CLOUDINARY_VIDEOS.vertRealEstate.preview,
          masterUrl: USER_CLOUDINARY_VIDEOS.vertRealEstate.master,
          title: "Fitness Brand Motivation Reel",
          client: "Pulse Athletic",
          views: "1.9M Views"
        }
      ],
      horizontal: [
        {
          previewUrl: USER_CLOUDINARY_VIDEOS.horizPerception1.preview,
          masterUrl: USER_CLOUDINARY_VIDEOS.horizPerception1.master,
          title: "Commercial Brand Anthem Film",
          client: "Lumina Studios",
          views: "420K Views",
          duration: "03:10"
        },
        {
          previewUrl: USER_CLOUDINARY_VIDEOS.horizTajStory.preview,
          masterUrl: USER_CLOUDINARY_VIDEOS.horizTajStory.master,
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

function normalizeVideoItem(item, defaultCategory = 'general', defaultAspect = '16:9') {
  let previewUrl = '';
  let masterUrl = '';
  let title = 'Project Showcase';
  let client = 'Creative Vibe';
  let views = '1.2M Views';
  let duration = 'Full HD';
  let description = 'Crafted for high audience retention and cinematic storytelling.';
  let aspectRatio = defaultAspect;
  let customThumb = '';

  if (typeof item === 'string') {
    previewUrl = item.trim();
    masterUrl = item.trim();
    title = 'Selected Video Edit';
  } else if (typeof item === 'object' && item !== null) {
    previewUrl = (item.previewUrl || item.url || item.videoUrl || '').trim();
    masterUrl = (item.masterUrl || previewUrl).trim();
    title = item.title || title;
    client = item.client || client;
    views = item.views || views;
    duration = item.duration || duration;
    description = item.description || description;
    aspectRatio = item.aspectRatio || defaultAspect;
    customThumb = item.thumbnail || '';
  }

  const isVertical = aspectRatio === '9:16' || previewUrl.includes('w_200');
  const finalAspect = isVertical ? '9:16' : '16:9';

  return {
    id: `vid_cld_${Math.random().toString(36).substr(2, 6)}`,
    sourceType: 'direct',
    previewUrl: previewUrl,
    masterUrl: masterUrl,
    videoUrl: previewUrl,
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
