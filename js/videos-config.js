/* ==========================================================================
   CREATIVE VIBE - MASTER VIDEOS & NICHES CONFIGURATION FILE
   ==========================================================================
   👉 INSTRUCTIONS:
   1. You can paste ANY YouTube URL directly into any Niche below:
      - Normal YouTube Link: "https://www.youtube.com/watch?v=VIDEO_ID"
      - YouTube Short:       "https://www.youtube.com/shorts/VIDEO_ID"
      - Shortened Link:      "https://youtu.be/VIDEO_ID"
      - Just Video ID:       "VIDEO_ID"
   2. You can either paste a direct URL string OR an object with custom title/client:
      Example: { url: "https://youtu.be/xxx", title: "My Video", client: "Vox Media" }
   3. Whenever you add a new link into any niche below, the website will
      AUTOMATICALLY render it in that niche's dual sliders & full archive!
   ========================================================================== */

const CREATIVE_VIBE_VIDEOS_CONFIG = {
  
  // =========================================================================
  // 1. RECENT EDITS (Home Page Dual-Row Infinite Sliders)
  // =========================================================================
  recentEdits: {
    // Top Row: Vertical Videos (9:16 Shorts, Reels, TikToks) - Slides Left to Right
    vertical: [
      {
        url: "https://www.youtube.com/shorts/dQw4w9WgXcQ",
        title: "MrBeast Fast-Paced Pacing Hook",
        client: "Creator Spotlight",
        views: "1.8M Views",
        aspectRatio: "9:16"
      },
      {
        url: "https://www.youtube.com/shorts/3JZ_D3ELwOQ",
        title: "3D Kinetic Motion Typography",
        client: "SaaS Brand",
        views: "940K Views",
        aspectRatio: "9:16"
      },
      {
        url: "https://www.youtube.com/shorts/fJ9rUzIMcZQ",
        title: "Alex Hormozi Style Captions & Sound",
        client: "Podcast Host",
        views: "2.4M Views",
        aspectRatio: "9:16"
      },
      {
        url: "https://www.youtube.com/shorts/kJQP7kiw5Fk",
        title: "Viral Hook Pattern Interrupt",
        client: "Tech YouTuber",
        views: "1.2M Views",
        aspectRatio: "9:16"
      },
      {
        url: "https://www.youtube.com/shorts/L_LUpnjgPso",
        title: "Cinematic Color Grade Reel",
        client: "Travel Creator",
        views: "780K Views",
        aspectRatio: "9:16"
      }
    ],

    // Bottom Row: Horizontal Videos (16:9 YouTube Long-Form & Cinema) - Slides Right to Left
    horizontal: [
      {
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        title: "The Rise of Artificial Intelligence | Mini Documentary",
        client: "VoxStyle Media",
        views: "1.4M Views",
        aspectRatio: "16:9",
        duration: "14:20"
      },
      {
        url: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
        title: "Fintech SaaS Product Explainer Animation",
        client: "PayFlow Inc",
        views: "450K Views",
        aspectRatio: "16:9",
        duration: "02:15"
      },
      {
        url: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ",
        title: "How He Built a $10M Empire | Talking Head Masterclass",
        client: "Founder Hub",
        views: "890K Views",
        aspectRatio: "16:9",
        duration: "21:40"
      },
      {
        url: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
        title: "Tokyo After Dark | Cinematic Travel Vlog Grade",
        client: "Nomad Stories",
        views: "620K Views",
        aspectRatio: "16:9",
        duration: "11:05"
      },
      {
        url: "https://www.youtube.com/watch?v=L_LUpnjgPso",
        title: "Dynamic Motion Graphics & Sound Design Showreel",
        client: "Creative Vibe Original",
        views: "1.1M Views",
        aspectRatio: "16:9",
        duration: "01:45"
      }
    ]
  },

  // =========================================================================
  // 2. WORK SECTION NICHES (Dual-Row Sliders & Full Pages per Niche)
  // =========================================================================
  niches: {
    // 🎙️ 1. Talking Head
    "talking-head": {
      name: "Talking Head",
      icon: "🎙️",
      subtitle: "Dynamic pattern interrupts, clean multi-cam, sound FX & graphic callouts",
      vertical: [
        { url: "https://www.youtube.com/shorts/fJ9rUzIMcZQ", title: "Alex Hormozi Style Talking Head Hook", client: "Creator Lab", views: "2.1M Views" },
        { url: "https://www.youtube.com/shorts/kJQP7kiw5Fk", title: "Personal Brand Story Hook", client: "Growth Daily", views: "850K Views" },
        { url: "https://www.youtube.com/shorts/3JZ_D3ELwOQ", title: "High-Retention Talking Head Cut", client: "Executive Coach", views: "1.4M Views" },
        { url: "https://www.youtube.com/shorts/dQw4w9WgXcQ", title: "Fast-Paced Advice Short", client: "Finance Hub", views: "920K Views" },
        { url: "https://www.youtube.com/shorts/L_LUpnjgPso", title: "Dynamic Text & Zoom Interrupt", client: "Mindset TV", views: "1.1M Views" }
      ],
      horizontal: [
        { url: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ", title: "How He Built a $10M Empire | Talking Head Masterclass", client: "Founder Hub", views: "890K Views", duration: "21:40" },
        { url: "https://www.youtube.com/watch?v=kJQP7kiw5Fk", title: "The Ultimate Guide to Personal Branding in 2026", client: "Growth Daily", views: "510K Views", duration: "16:10" },
        { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", title: "Why 99% of Startups Fail in Year One", client: "Venture Insights", views: "740K Views", duration: "18:25" },
        { url: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", title: "7 Habits That Make You Unstoppable", client: "Peak Performance", views: "1.2M Views", duration: "14:15" },
        { url: "https://www.youtube.com/watch?v=L_LUpnjgPso", title: "How I Mastered Video Editing in 30 Days", client: "Creative Studio", views: "630K Views", duration: "12:50" }
      ]
    },

    // 🎬 2. Documentary style
    "documentary-style": {
      name: "Documentary style",
      icon: "🎬",
      subtitle: "Investigative storytelling, kinetic archival maps, mood grading & cinema audio",
      vertical: [
        { url: "https://www.youtube.com/shorts/dQw4w9WgXcQ", title: "How Steve Jobs Changed History", client: "Tech Stories", views: "3.4M Views" },
        { url: "https://www.youtube.com/shorts/L_LUpnjgPso", title: "The Dark Truth About AI Giants", client: "DocuBites", views: "1.8M Views" },
        { url: "https://www.youtube.com/shorts/3JZ_D3ELwOQ", title: "Silicon Valley Secret Formula", client: "Market Lens", views: "940K Views" },
        { url: "https://www.youtube.com/shorts/fJ9rUzIMcZQ", title: "How 1 Movie Changed Hollywood", client: "Cinema Reel", views: "2.2M Views" },
        { url: "https://www.youtube.com/shorts/kJQP7kiw5Fk", title: "Deep Sea Mystery Solved", client: "Ocean Mystery", views: "1.5M Views" }
      ],
      horizontal: [
        { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", title: "The Rise of Artificial Superintelligence | Mini Documentary", client: "VoxStyle Media", views: "1.4M Views", duration: "14:20" },
        { url: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", title: "Inside the Silicon Valley Tech Bubble Crash", client: "Market Lens", views: "820K Views", duration: "18:45" },
        { url: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ", title: "How SpaceX Engineered the Starship Mega-Rocket", client: "AeroTech Insights", views: "1.1M Views", duration: "22:10" },
        { url: "https://www.youtube.com/watch?v=kJQP7kiw5Fk", title: "The Secret History of the Internet Mafia", client: "Cyber Archives", views: "680K Views", duration: "15:40" },
        { url: "https://www.youtube.com/watch?v=L_LUpnjgPso", title: "The Rise and Fall of a $40B Crypto Empire", client: "Financial Doc", views: "950K Views", duration: "19:15" }
      ]
    },

    // 💻 3. SaaS Animations
    "saas-animations": {
      name: "SaaS Animations",
      icon: "💻",
      subtitle: "3D kinetic UI breakdowns, animated cursors, smooth zooms & high-conversion pacing",
      vertical: [
        { url: "https://www.youtube.com/shorts/3JZ_D3ELwOQ", title: "3D Kinetic App UI Feature Reveal", client: "SaaS Brand", views: "940K Views" },
        { url: "https://www.youtube.com/shorts/dQw4w9WgXcQ", title: "AI Automation Tool in 30 Seconds", client: "AutoFlow", views: "1.6M Views" },
        { url: "https://www.youtube.com/shorts/fJ9rUzIMcZQ", title: "Cloud Analytics Fast Demo Reel", client: "MetricHQ", views: "820K Views" },
        { url: "https://www.youtube.com/shorts/L_LUpnjgPso", title: "Fintech Dashboard Micro Animation", client: "PayFlow", views: "1.1M Views" },
        { url: "https://www.youtube.com/shorts/kJQP7kiw5Fk", title: "Design Tool 3D Cursor Flow", client: "FigmaKit", views: "740K Views" }
      ],
      horizontal: [
        { url: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", title: "Fintech SaaS Product Explainer Animation (4K)", client: "PayFlow Inc", views: "450K Views", duration: "02:15" },
        { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", title: "AI Automation Tool Launch Commercial", client: "AutoFlow SaaS", views: "290K Views", duration: "01:30" },
        { url: "https://www.youtube.com/watch?v=L_LUpnjgPso", title: "TaskPulse AI - Product Overview Video", client: "TaskPulse Inc", views: "520K Views", duration: "01:45" },
        { url: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ", title: "CloudScale Infrastructure Management Demo", client: "CloudScale Devs", views: "310K Views", duration: "02:10" },
        { url: "https://www.youtube.com/watch?v=kJQP7kiw5Fk", title: "DataViz AI Interactive Dashboard Launch", client: "DataViz Systems", views: "410K Views", duration: "01:50" }
      ]
    },

    // ⚡ 4. Retention videos (like MR. Beast)
    "retention-videos": {
      name: "Retention videos (like MR. Beast)",
      icon: "⚡",
      subtitle: "High-velocity storytelling, intense sound design, visual pop-ups & 90%+ retention hooks",
      vertical: [
        { url: "https://www.youtube.com/shorts/dQw4w9WgXcQ", title: "MrBeast Fast-Paced Pacing Hook", client: "Shorts Lab", views: "3.8M Views" },
        { url: "https://www.youtube.com/shorts/fJ9rUzIMcZQ", title: "Viral Pattern Interrupt Formula", client: "Viral Formula", views: "2.9M Views" },
        { url: "https://www.youtube.com/shorts/kJQP7kiw5Fk", title: "High-Retention Challenge Reel", client: "Challenge King", views: "4.2M Views" },
        { url: "https://www.youtube.com/shorts/3JZ_D3ELwOQ", title: "Psychology Trick Retention Hook", client: "Brain Hack", views: "1.9M Views" },
        { url: "https://www.youtube.com/shorts/L_LUpnjgPso", title: "Crazy Transition Edit (Shorts)", client: "Action Cuts", views: "2.4M Views" }
      ],
      horizontal: [
        { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", title: "I Spent 50 Hours in Virtual Reality | Ultra Retention Edit", client: "BeastStyle Media", views: "2.4M Views", duration: "12:15" },
        { url: "https://www.youtube.com/watch?v=kJQP7kiw5Fk", title: "Surviving 24 Hours in a Locked Desert Bunker", client: "Challenge Studio", views: "1.9M Views", duration: "16:40" },
        { url: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ", title: "We Built a $100,000 Secret Gaming Room", client: "Extreme Builds", views: "3.1M Views", duration: "14:20" },
        { url: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", title: "I Tested Every Fake Life Hack on TikTok", client: "Mythbusters 2.0", views: "1.7M Views", duration: "11:55" },
        { url: "https://www.youtube.com/watch?v=L_LUpnjgPso", title: "The Most Dangerous Escape Room in the World", client: "Escape Lab", views: "2.8M Views", duration: "15:10" }
      ]
    },

    // ✈️ 5. IRL
    "irl": {
      name: "IRL",
      icon: "✈️",
      subtitle: "In Real Life vlogs, travel filmmaking, speed ramps, mood grading & authentic moments",
      vertical: [
        { url: "https://www.youtube.com/shorts/L_LUpnjgPso", title: "Cinematic Color Grade Reel (Tokyo)", client: "Travel Creator", views: "1.8M Views" },
        { url: "https://www.youtube.com/shorts/kJQP7kiw5Fk", title: "48 Hours in Iceland (Vertical Reel)", client: "Wanderlust", views: "1.2M Views" },
        { url: "https://www.youtube.com/shorts/3JZ_D3ELwOQ", title: "Street Food Night Market Vibes", client: "Foodie Vlogs", views: "980K Views" },
        { url: "https://www.youtube.com/shorts/dQw4w9WgXcQ", title: "Kyoto Temple Speed Ramp Reel", client: "Japan Explorer", views: "1.5M Views" },
        { url: "https://www.youtube.com/shorts/fJ9rUzIMcZQ", title: "Backpacking Switzerland Alps", client: "Alpine Dreams", views: "2.1M Views" }
      ],
      horizontal: [
        { url: "https://www.youtube.com/watch?v=kJQP7kiw5Fk", title: "Tokyo After Dark | Cinematic Travel Film (4K)", client: "Nomad Stories", views: "1.8M Views", duration: "11:05" },
        { url: "https://www.youtube.com/watch?v=L_LUpnjgPso", title: "Solo Travel Through Iceland Glaciers & Volcanos", client: "Wanderlust Films", views: "940K Views", duration: "09:30" },
        { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", title: "A Week in New York City with $0 Budget", client: "Urban Vlogs", views: "1.2M Views", duration: "17:40" },
        { url: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", title: "Living on a Boat for 30 Days in Norway Fjords", client: "Nordic Journey", views: "780K Views", duration: "14:10" },
        { url: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ", title: "Roadtrip Across New Zealand in a Campervan", client: "Kiwi Trails", views: "1.1M Views", duration: "18:50" }
      ]
    },

    // 🎧 6. Podcast
    "podcast": {
      name: "Podcast",
      icon: "🎧",
      subtitle: "Multi-camera switching, studio audio mastering, engaging sound hits & viral conversation cutouts",
      vertical: [
        { url: "https://www.youtube.com/shorts/fJ9rUzIMcZQ", title: "Millionaire Mindset Podcast Clip", client: "Podcast Cuts", views: "2.4M Views" },
        { url: "https://www.youtube.com/shorts/dQw4w9WgXcQ", title: "The Truth About Hard Work Clip", client: "Talk Hub", views: "1.7M Views" },
        { url: "https://www.youtube.com/shorts/kJQP7kiw5Fk", title: "Unbelievable Story Hook (Podcast)", client: "Deep Talks", views: "3.1M Views" },
        { url: "https://www.youtube.com/shorts/3JZ_D3ELwOQ", title: "Health & Longevity Podcast Cut", client: "Health Lab", views: "890K Views" },
        { url: "https://www.youtube.com/shorts/L_LUpnjgPso", title: "Best Business Advice in 60 Seconds", client: "Venture Cast", views: "1.5M Views" }
      ],
      horizontal: [
        { url: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ", title: "Deep Dive: How to Scale a $10k/mo Agency | Full Episode", client: "Founder Chronicles", views: "890K Views", duration: "42:15" },
        { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", title: "The Science of High Performance with Dr. Julian Hayes", client: "The Blueprint Podcast", views: "520K Views", duration: "55:30" },
        { url: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", title: "Building a Tech Empire from Zero | Exclusive Interview", client: "Tech Titans Podcast", views: "740K Views", duration: "48:10" },
        { url: "https://www.youtube.com/watch?v=kJQP7kiw5Fk", title: "How Psychology Controls Buying Decisions", client: "Marketing Masters", views: "430K Views", duration: "38:40" },
        { url: "https://www.youtube.com/watch?v=L_LUpnjgPso", title: "Navigating Crypto, AI, & Modern Wealth", client: "Future Proof Podcast", views: "610K Views", duration: "51:20" }
      ]
    }
  }
};

// ===========================================================================
// HELPER: Auto-parse YouTube URLs into structured video items
// ===========================================================================
function parseYouTubeId(input) {
  if (!input) return '';
  if (typeof input !== 'string') return '';
  const clean = input.trim();
  if (clean.length === 11 && !clean.includes('/') && !clean.includes('.') && !clean.includes('?')) {
    return clean;
  }
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = clean.match(regExp);
  return (match && match[2].length === 11) ? match[2] : 'dQw4w9WgXcQ';
}

function normalizeVideoItem(item, defaultCategory = 'general', defaultAspect = '16:9') {
  let url = '';
  let title = 'Project Showcase';
  let client = 'Creative Vibe';
  let views = '1.2M Views';
  let duration = 'Full HD';
  let description = 'Crafted for high audience retention and cinematic storytelling.';
  let aspectRatio = defaultAspect;

  if (typeof item === 'string') {
    url = item;
    title = 'Selected Video Edit';
  } else if (typeof item === 'object' && item !== null) {
    url = item.url || item.youtubeUrl || item.youtubeId || '';
    title = item.title || title;
    client = item.client || client;
    views = item.views || views;
    duration = item.duration || duration;
    description = item.description || description;
    aspectRatio = item.aspectRatio || defaultAspect;
  }

  const ytId = parseYouTubeId(url);
  const isVertical = aspectRatio === '9:16' || url.includes('/shorts/');
  const finalAspect = isVertical ? '9:16' : '16:9';

  return {
    id: `vid_${ytId}_${Math.random().toString(36).substr(2, 5)}`,
    ytId: ytId,
    youtubeUrl: `https://www.youtube.com/watch?v=${ytId}`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${ytId}`,
    thumbnail: `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`,
    maxThumbnail: `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`,
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
  parseId: parseYouTubeId,
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
