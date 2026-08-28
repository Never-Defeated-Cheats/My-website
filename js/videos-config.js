/* ==========================================================================
   CREATIVE VIBE - MASTER VIDEOS & NICHES CONFIGURATION FILE
   High-Speed Direct Cloudinary Video Engine with User's Real Master Videos
   ========================================================================== */

const USER_CLOUDINARY_VIDEOS = {
  // Vertical 9:16 Shorts & Reels
  vertRealEstate: {
    preview: "https://res.cloudinary.com/pxf5pjuu/video/upload/w_200,c_scale,q_auto:eco,br_150k,f_mp4/v1787906532/Real_Estate.mp4",
    master: "https://res.cloudinary.com/pxf5pjuu/video/upload/q_auto:good,vc_auto/v1787906532/Real_Estate.mp4",
    poster: "https://res.cloudinary.com/pxf5pjuu/video/upload/w_400,so_0,q_auto:eco/v1787906532/Real_Estate.jpg"
  },
  vertReel06: {
    preview: "https://res.cloudinary.com/pxf5pjuu/video/upload/w_200,c_scale,q_auto:eco,br_150k,f_mp4/v1787906442/Reel_06.mp4",
    master: "https://res.cloudinary.com/pxf5pjuu/video/upload/q_auto:good,vc_auto/v1787906442/Reel_06.mp4",
    poster: "https://res.cloudinary.com/pxf5pjuu/video/upload/w_400,so_0,q_auto:eco/v1787906442/Reel_06.jpg"
  },
  vertPerception: {
    preview: "https://res.cloudinary.com/pxf5pjuu/video/upload/w_200,c_scale,q_auto:eco,br_150k,f_mp4/v1787847723/perception_over_value.mp4",
    master: "https://res.cloudinary.com/pxf5pjuu/video/upload/q_auto:good,vc_auto/v1787847723/perception_over_value.mp4",
    poster: "https://res.cloudinary.com/pxf5pjuu/video/upload/w_400,so_0,q_auto:eco/v1787847723/perception_over_value.jpg"
  },

  // Horizontal 16:9 Long-Form Master Edit (perception_over_value_1.mp4 used across all horizontal frames)
  horizPerception1: {
    preview: "https://res.cloudinary.com/pxf5pjuu/video/upload/w_280,c_scale,q_auto:eco,br_200k,f_mp4/v1787906505/perception_over_value_1.mp4",
    master: "https://res.cloudinary.com/pxf5pjuu/video/upload/q_auto:good,vc_auto/v1787906505/perception_over_value_1.mp4",
    poster: "https://res.cloudinary.com/pxf5pjuu/video/upload/w_600,so_0,q_auto:eco/v1787906505/perception_over_value_1.jpg"
  },
  horizTajStory: {
    preview: "https://res.cloudinary.com/pxf5pjuu/video/upload/w_280,c_scale,q_auto:eco,br_200k,f_mp4/v1787906348/The_Taj_Story.mp4",
    master: "https://res.cloudinary.com/pxf5pjuu/video/upload/q_auto:good,vc_auto/v1787906348/The_Taj_Story.mp4",
    poster: "https://res.cloudinary.com/pxf5pjuu/video/upload/w_600,so_0,q_auto:eco/v1787906348/The_Taj_Story.jpg"
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
        poster: USER_CLOUDINARY_VIDEOS.vertRealEstate.poster,
        title: "Trending Real Estate Speed Ramp Reel",
        client: "Luxury Real Estate",
        views: "1.8M Views",
        aspectRatio: "9:16"
      },
      {
        previewUrl: USER_CLOUDINARY_VIDEOS.vertReel06.preview,
        masterUrl: USER_CLOUDINARY_VIDEOS.vertReel06.master,
        poster: USER_CLOUDINARY_VIDEOS.vertReel06.poster,
        title: "Viral Dynamic Motion & Sound Design Reel",
        client: "SaaS Brand",
        views: "940K Views",
        aspectRatio: "9:16"
      },
      {
        previewUrl: USER_CLOUDINARY_VIDEOS.vertPerception.preview,
        masterUrl: USER_CLOUDINARY_VIDEOS.vertPerception.master,
        poster: USER_CLOUDINARY_VIDEOS.vertPerception.poster,
        title: "Perception Over Value | Viral Short",
        client: "Creator Spotlight",
        views: "2.4M Views",
        aspectRatio: "9:16"
      },
      {
        previewUrl: USER_CLOUDINARY_VIDEOS.vertRealEstate.preview,
        masterUrl: USER_CLOUDINARY_VIDEOS.vertRealEstate.master,
        poster: USER_CLOUDINARY_VIDEOS.vertRealEstate.poster,
        title: "Alex Hormozi Style Captions & Sound Hits",
        client: "Podcast Host",
        views: "1.2M Views",
        aspectRatio: "9:16"
      }
    ],

    // Bottom Row: Horizontal Videos (16:9 Long-Form) - perception_over_value_1.mp4 in all horizontal frames
    horizontal: [
      {
        previewUrl: USER_CLOUDINARY_VIDEOS.horizPerception1.preview,
        masterUrl: USER_CLOUDINARY_VIDEOS.horizPerception1.master,
        poster: USER_CLOUDINARY_VIDEOS.horizPerception1.poster,
        title: "Perception Over Value | 16:9 Master Edition",
        client: "Creative Vibe Masterclass",
        views: "1.5M Views",
        aspectRatio: "16:9",
        duration: "04:30"
      },
      {
        previewUrl: USER_CLOUDINARY_VIDEOS.horizPerception1.preview,
        masterUrl: USER_CLOUDINARY_VIDEOS.horizPerception1.master,
        poster: USER_CLOUDINARY_VIDEOS.horizPerception1.poster,
        title: "Documentary Masterclass Film",
        client: "Heritage Media",
        views: "2.1M Views",
        aspectRatio: "16:9",
        duration: "08:45"
      },
      {
        previewUrl: USER_CLOUDINARY_VIDEOS.horizPerception1.preview,
        masterUrl: USER_CLOUDINARY_VIDEOS.horizPerception1.master,
        poster: USER_CLOUDINARY_VIDEOS.horizPerception1.poster,
        title: "Fintech SaaS Product Explainer Animation",
        client: "PayFlow Inc",
        views: "450K Views",
        aspectRatio: "16:9",
        duration: "02:15"
      },
      {
        previewUrl: USER_CLOUDINARY_VIDEOS.horizPerception1.preview,
        masterUrl: USER_CLOUDINARY_VIDEOS.horizPerception1.master,
        poster: USER_CLOUDINARY_VIDEOS.horizPerception1.poster,
        title: "How He Built an Empire | Talking Head Edit",
        client: "Founder Hub",
        views: "890K Views",
        aspectRatio: "16:9",
        duration: "21:40"
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
          poster: USER_CLOUDINARY_VIDEOS.vertPerception.poster,
          title: "Viral Podcast Clip - The $100M Mindset",
          aspectRatio: "9:16"
        },
        {
          previewUrl: USER_CLOUDINARY_VIDEOS.vertReel06.preview,
          masterUrl: USER_CLOUDINARY_VIDEOS.vertReel06.master,
          poster: USER_CLOUDINARY_VIDEOS.vertReel06.poster,
          title: "Hormozi Kinetic Captions Reel",
          aspectRatio: "9:16"
        }
      ],
      horizontal: [
        {
          previewUrl: USER_CLOUDINARY_VIDEOS.horizPerception1.preview,
          masterUrl: USER_CLOUDINARY_VIDEOS.horizPerception1.master,
          poster: USER_CLOUDINARY_VIDEOS.horizPerception1.poster,
          title: "Full 45-Min Interview Multi-Cam Edit",
          aspectRatio: "16:9"
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
          poster: USER_CLOUDINARY_VIDEOS.vertRealEstate.poster,
          title: "The Fall of Silicon Valley Bank",
          aspectRatio: "9:16"
        }
      ],
      horizontal: [
        {
          previewUrl: USER_CLOUDINARY_VIDEOS.horizPerception1.preview,
          masterUrl: USER_CLOUDINARY_VIDEOS.horizPerception1.master,
          poster: USER_CLOUDINARY_VIDEOS.horizPerception1.poster,
          title: "How Tesla Conquered Global EV Market",
          aspectRatio: "16:9"
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
          poster: USER_CLOUDINARY_VIDEOS.vertReel06.poster,
          title: "Mobile App Feature Launch",
          aspectRatio: "9:16"
        }
      ],
      horizontal: [
        {
          previewUrl: USER_CLOUDINARY_VIDEOS.horizPerception1.preview,
          masterUrl: USER_CLOUDINARY_VIDEOS.horizPerception1.master,
          poster: USER_CLOUDINARY_VIDEOS.horizPerception1.poster,
          title: "Complete SaaS Product Overview & UI Walkthrough",
          aspectRatio: "16:9"
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
          poster: USER_CLOUDINARY_VIDEOS.vertRealEstate.poster,
          title: "I Survived 100 Hours in VR (Hook)",
          aspectRatio: "9:16"
        }
      ],
      horizontal: [
        {
          previewUrl: USER_CLOUDINARY_VIDEOS.horizPerception1.preview,
          masterUrl: USER_CLOUDINARY_VIDEOS.horizPerception1.master,
          poster: USER_CLOUDINARY_VIDEOS.horizPerception1.poster,
          title: "Extreme $50,000 Hide and Seek Championship",
          aspectRatio: "16:9"
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
          poster: USER_CLOUDINARY_VIDEOS.vertRealEstate.poster,
          title: "Kyoto Night Walk - Cinematic Reel",
          aspectRatio: "9:16"
        }
      ],
      horizontal: [
        {
          previewUrl: USER_CLOUDINARY_VIDEOS.horizPerception1.preview,
          masterUrl: USER_CLOUDINARY_VIDEOS.horizPerception1.master,
          poster: USER_CLOUDINARY_VIDEOS.horizPerception1.poster,
          title: "4K Cinematic Travel Film",
          aspectRatio: "16:9"
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
          poster: USER_CLOUDINARY_VIDEOS.vertPerception.poster,
          title: "Luxury Commercial Hook",
          aspectRatio: "9:16"
        }
      ],
      horizontal: [
        {
          previewUrl: USER_CLOUDINARY_VIDEOS.horizPerception1.preview,
          masterUrl: USER_CLOUDINARY_VIDEOS.horizPerception1.master,
          poster: USER_CLOUDINARY_VIDEOS.horizPerception1.poster,
          title: "Commercial Brand Anthem Film",
          aspectRatio: "16:9"
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
  let poster = '';
  let title = 'Project Showcase';
  let client = 'Creative Vibe';
  let views = '1.2M Views';
  let duration = 'Full HD';
  let description = 'Crafted for high audience retention and cinematic storytelling.';
  let aspectRatio = defaultAspect;

  if (typeof item === 'string') {
    previewUrl = item.trim();
    masterUrl = item.trim();
    title = 'Selected Video Edit';
  } else if (typeof item === 'object' && item !== null) {
    previewUrl = (item.previewUrl || item.url || item.videoUrl || '').trim();
    masterUrl = (item.masterUrl || previewUrl).trim();
    poster = item.poster || '';
    title = item.title || title;
    client = item.client || client;
    views = item.views || views;
    duration = item.duration || duration;
    description = item.description || description;
    aspectRatio = item.aspectRatio || defaultAspect;
  }

  const isVertical = aspectRatio === '9:16' || previewUrl.includes('w_200');
  const finalAspect = isVertical ? '9:16' : '16:9';

  return {
    id: `vid_cld_${Math.random().toString(36).substr(2, 6)}`,
    sourceType: 'direct',
    previewUrl: previewUrl,
    masterUrl: masterUrl,
    poster: poster,
    videoUrl: previewUrl,
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
