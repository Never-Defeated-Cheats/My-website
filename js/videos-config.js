/* ==========================================================================
   CREATIVE VIBE - MASTER VIDEOS & NICHES CONFIGURATION FILE
   Dual-Tier Adaptive Cloudinary Engine:
   - Without Hover: Low-Quality Eco Stream (w_200, br_150k, q_auto:eco) < 0.2% CPU / < 2% GPU
   - On Hover & Modal: High-Quality Master Stream (Full 1080p + Live Audio)
   ========================================================================== */

const USER_CLOUDINARY_VIDEO = {
  // Ultra-Lightweight Low Bitrate Eco Stream for 60FPS Silent Sliders (<80KB per stream)
  ecoPreviewVertical: "https://res.cloudinary.com/pxf5pjuu/video/upload/w_200,c_scale,q_auto:eco,br_150k,f_mp4/v1787847723/perception_over_value.mp4",
  ecoPreviewHorizontal: "https://res.cloudinary.com/pxf5pjuu/video/upload/w_280,c_scale,q_auto:eco,br_200k,f_mp4/v1787847723/perception_over_value.mp4",
  
  // Full 1080p High-Quality Master Stream with Crystal Audio for Hover & Modal
  fullMaster: "https://res.cloudinary.com/pxf5pjuu/video/upload/v1787847723/perception_over_value.mp4"
};

const CREATIVE_VIBE_VIDEOS_CONFIG = {
  
  // =========================================================================
  // 1. BEST EDITS & SIGNATURE WORK (Home Page Dual-Row Infinite Sliders)
  // =========================================================================
  recentEdits: {
    // Top Row: Vertical Videos (9:16 Shorts, Reels, TikToks)
    vertical: [
      {
        previewUrl: USER_CLOUDINARY_VIDEO.ecoPreviewVertical,
        masterUrl: USER_CLOUDINARY_VIDEO.fullMaster,
        title: "Perception Over Value | High Retention Hook",
        client: "Creator Spotlight",
        views: "1.8M Views",
        aspectRatio: "9:16"
      },
      {
        previewUrl: USER_CLOUDINARY_VIDEO.ecoPreviewVertical,
        masterUrl: USER_CLOUDINARY_VIDEO.fullMaster,
        title: "3D Kinetic Motion Typography & Speed Ramps",
        client: "SaaS Brand",
        views: "940K Views",
        aspectRatio: "9:16"
      },
      {
        previewUrl: USER_CLOUDINARY_VIDEO.ecoPreviewVertical,
        masterUrl: USER_CLOUDINARY_VIDEO.fullMaster,
        title: "Alex Hormozi Style Captions & Sound Hits",
        client: "Podcast Host",
        views: "2.4M Views",
        aspectRatio: "9:16"
      },
      {
        previewUrl: USER_CLOUDINARY_VIDEO.ecoPreviewVertical,
        masterUrl: USER_CLOUDINARY_VIDEO.fullMaster,
        title: "Viral Retention Pattern Interrupt Reel",
        client: "Tech Brand",
        views: "1.2M Views",
        aspectRatio: "9:16"
      }
    ],

    // Bottom Row: Horizontal Videos (16:9 Long-Form & Master Edits)
    horizontal: [
      {
        previewUrl: USER_CLOUDINARY_VIDEO.ecoPreviewHorizontal,
        masterUrl: USER_CLOUDINARY_VIDEO.fullMaster,
        title: "Perception Over Value | Full Master Edit",
        client: "Creative Vibe Masterclass",
        views: "2.1M Views",
        aspectRatio: "16:9",
        duration: "08:45"
      },
      {
        previewUrl: USER_CLOUDINARY_VIDEO.ecoPreviewHorizontal,
        masterUrl: USER_CLOUDINARY_VIDEO.fullMaster,
        title: "Fintech SaaS Product Explainer Animation",
        client: "PayFlow Inc",
        views: "450K Views",
        aspectRatio: "16:9",
        duration: "02:15"
      },
      {
        previewUrl: USER_CLOUDINARY_VIDEO.ecoPreviewHorizontal,
        masterUrl: USER_CLOUDINARY_VIDEO.fullMaster,
        title: "How He Built an Empire | Talking Head Edit",
        client: "Founder Hub",
        views: "890K Views",
        aspectRatio: "16:9",
        duration: "21:40"
      },
      {
        previewUrl: USER_CLOUDINARY_VIDEO.ecoPreviewHorizontal,
        masterUrl: USER_CLOUDINARY_VIDEO.fullMaster,
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
          previewUrl: USER_CLOUDINARY_VIDEO.ecoPreviewVertical,
          masterUrl: USER_CLOUDINARY_VIDEO.fullMaster,
          title: "Viral Podcast Clip - The $100M Mindset",
          client: "The Growth Show",
          views: "1.4M Views"
        },
        {
          previewUrl: USER_CLOUDINARY_VIDEO.ecoPreviewVertical,
          masterUrl: USER_CLOUDINARY_VIDEO.fullMaster,
          title: "Hormozi Kinetic Captions Reel",
          client: "Alex Growth",
          views: "890K Views"
        }
      ],
      horizontal: [
        {
          previewUrl: USER_CLOUDINARY_VIDEO.ecoPreviewHorizontal,
          masterUrl: USER_CLOUDINARY_VIDEO.fullMaster,
          title: "Full 45-Min Interview Multi-Cam Edit",
          client: "Founder Unfiltered",
          views: "620K Views",
          duration: "45:10"
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
          previewUrl: USER_CLOUDINARY_VIDEO.ecoPreviewVertical,
          masterUrl: USER_CLOUDINARY_VIDEO.fullMaster,
          title: "The Fall of Silicon Valley Bank (Short Breakdown)",
          client: "FinTech Stories",
          views: "3.2M Views"
        }
      ],
      horizontal: [
        {
          previewUrl: USER_CLOUDINARY_VIDEO.ecoPreviewHorizontal,
          masterUrl: USER_CLOUDINARY_VIDEO.fullMaster,
          title: "Perception Over Value | 20-Min Documentary Masterclass",
          client: "Investigate Daily",
          views: "1.9M Views",
          duration: "20:30"
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
          previewUrl: USER_CLOUDINARY_VIDEO.ecoPreviewVertical,
          masterUrl: USER_CLOUDINARY_VIDEO.fullMaster,
          title: "Mobile App Feature Launch (TikTok / Reels Ad)",
          client: "FlowSync App",
          views: "720K Views"
        }
      ],
      horizontal: [
        {
          previewUrl: USER_CLOUDINARY_VIDEO.ecoPreviewHorizontal,
          masterUrl: USER_CLOUDINARY_VIDEO.fullMaster,
          title: "Complete SaaS Product Overview & UI Walkthrough",
          client: "MetricPulse",
          views: "310K Views",
          duration: "02:45"
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
          previewUrl: USER_CLOUDINARY_VIDEO.ecoPreviewVertical,
          masterUrl: USER_CLOUDINARY_VIDEO.fullMaster,
          title: "I Survived 100 Hours in VR (Hook)",
          client: "Challenge Beast",
          views: "4.5M Views"
        }
      ],
      horizontal: [
        {
          previewUrl: USER_CLOUDINARY_VIDEO.ecoPreviewHorizontal,
          masterUrl: USER_CLOUDINARY_VIDEO.fullMaster,
          title: "Extreme $50,000 Hide and Seek Championship",
          client: "Quest Arena",
          views: "5.1M Views",
          duration: "16:40"
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
          previewUrl: USER_CLOUDINARY_VIDEO.ecoPreviewVertical,
          masterUrl: USER_CLOUDINARY_VIDEO.fullMaster,
          title: "Kyoto Night Walk - Cinematic Reel",
          client: "Nomad Visuals",
          views: "1.6M Views"
        }
      ],
      horizontal: [
        {
          previewUrl: USER_CLOUDINARY_VIDEO.ecoPreviewHorizontal,
          masterUrl: USER_CLOUDINARY_VIDEO.fullMaster,
          title: "Perception Over Value | 4K Cinematic Travel Film",
          client: "Far North Films",
          views: "820K Views",
          duration: "10:15"
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
          previewUrl: USER_CLOUDINARY_VIDEO.ecoPreviewVertical,
          masterUrl: USER_CLOUDINARY_VIDEO.fullMaster,
          title: "Luxury Watch Commercial Hook",
          client: "Apex Timepieces",
          views: "860K Views"
        }
      ],
      horizontal: [
        {
          previewUrl: USER_CLOUDINARY_VIDEO.ecoPreviewHorizontal,
          masterUrl: USER_CLOUDINARY_VIDEO.fullMaster,
          title: "Commercial Brand Anthem Film",
          client: "Lumina Studios",
          views: "420K Views",
          duration: "03:10"
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

  const isVertical = aspectRatio === '9:16' || previewUrl.includes('w_200') || previewUrl.includes('w_240') || previewUrl.includes('w_360');
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
