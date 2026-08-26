/* ==========================================================================
   CREATIVE VIBE - MASTER VIDEOS CONFIGURATION FILE
   ==========================================================================
   👉 INSTRUCTIONS:
   1. You can paste ANY YouTube URL directly here:
      - Normal YouTube Link: "https://www.youtube.com/watch?v=VIDEO_ID"
      - YouTube Short:       "https://www.youtube.com/shorts/VIDEO_ID"
      - Shortened Link:      "https://youtu.be/VIDEO_ID"
      - Just Video ID:       "VIDEO_ID"
   2. You can either paste a direct URL string OR an object with custom title/client:
      Example string: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      Example object: { url: "https://youtu.be/xxx", title: "My Video", client: "Vox Media" }
   3. Whenever you add a new link into any category below, the website will
      AUTOMATICALLY detect it and render it in that section with full player!
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
  // 2. WORK SECTION CATEGORIES (Add any new links here!)
  // =========================================================================
  workCategories: {
    // 🎬 1. Documentaries (16:9 Long-Form, In-depth Storytelling)
    documentary: [
      {
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        title: "The Rise of Artificial Intelligence | Mini Doc",
        client: "VoxStyle Media",
        views: "1.4M Views",
        duration: "14:20",
        description: "In-depth investigative mini-doc with custom map animations, newspaper visual transitions, and intense sound design."
      },
      {
        url: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
        title: "Inside the Silicon Valley Tech Bubble",
        client: "Market Lens",
        views: "820K Views",
        duration: "18:45",
        description: "Deep-dive financial narrative with kinetic charts, archival footage restoration, and mood grading."
      }
    ],

    // ✨ 2. Motion Graphics & Kinetic Typography
    "motion-graphics": [
      {
        url: "https://www.youtube.com/watch?v=L_LUpnjgPso",
        title: "3D Kinetic Motion Typography & Sound Showcase",
        client: "Creative Vibe Original",
        views: "1.1M Views",
        duration: "01:45",
        description: "Smooth 3D camera moves, custom particle bursts, impact hits, and layered audio design."
      },
      {
        url: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
        title: "Broadcast Logo Ident & Title Sequences",
        client: "Apex Media",
        views: "340K Views",
        duration: "00:45",
        description: "Modern glassmorphism elements, light sweeps, and futuristic UI interface animations."
      }
    ],

    // 💻 3. SaaS & Product Explainer Animations
    saas: [
      {
        url: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
        title: "Fintech SaaS Product Explainer Animation",
        client: "PayFlow Inc",
        views: "450K Views",
        duration: "02:15",
        description: "Clean UI/UX feature walkthrough, animated cursors, smooth zooms, and high-conversion pacing."
      },
      {
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        title: "AI Automation Tool Launch Promo",
        client: "AutoFlow SaaS",
        views: "290K Views",
        duration: "01:30",
        description: "Fast-paced product breakdown highlighting key benefits with upbeat modern sound design."
      }
    ],

    // 🎙️ 4. Talking Head & Podcast Edits
    "talking-head": [
      {
        url: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ",
        title: "How He Built a $10M Empire | Masterclass",
        client: "Founder Hub",
        views: "890K Views",
        duration: "21:40",
        description: "Dynamic camera cuts, pattern interrupts every 4-6 seconds, relevant B-roll, and sound effects."
      },
      {
        url: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
        title: "The Ultimate Guide to Personal Branding",
        client: "Growth Daily",
        views: "510K Views",
        duration: "16:10",
        description: "Clean multi-cam switching, color correction, lower thirds, and studio audio mastering."
      }
    ],

    // ✈️ 5. Vlogs & Travel Storytelling
    vlogs: [
      {
        url: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
        title: "Tokyo After Dark | Cinematic Travel Film",
        client: "Nomad Stories",
        views: "620K Views",
        duration: "11:05",
        description: "DaVinci Resolve teal-and-orange grade, custom speed ramps, ambient stereo sound design, and seamless transitions."
      },
      {
        url: "https://www.youtube.com/watch?v=L_LUpnjgPso",
        title: "Solo Travel Through Iceland Glaciers",
        client: "Wanderlust Films",
        views: "440K Views",
        duration: "09:30",
        description: "Drone color matching, wind sound design, acoustic pacing, and emotional cinematic flow."
      }
    ],

    // ⚡ 6. Viral Shorts & Reels (9:16 Vertical)
    "shorts-reels": [
      {
        url: "https://www.youtube.com/shorts/dQw4w9WgXcQ",
        title: "MrBeast Fast Pacing Retention Hook",
        client: "Shorts Lab",
        views: "1.8M Views",
        aspectRatio: "9:16",
        description: "High-energy pacing, sound pop cues, animated emoji overlays, and 90%+ retention hook."
      },
      {
        url: "https://www.youtube.com/shorts/3JZ_D3ELwOQ",
        title: "3D Kinetic Motion Typography (Reel)",
        client: "SaaS Brand",
        views: "940K Views",
        aspectRatio: "9:16",
        description: "Sleek animated captions with highlighted keywords and motion graphics."
      },
      {
        url: "https://www.youtube.com/shorts/fJ9rUzIMcZQ",
        title: "Alex Hormozi Style Captions & Sound Effects",
        client: "Podcast Cuts",
        views: "2.4M Views",
        aspectRatio: "9:16",
        description: "Multi-colored animated subtitles, zoom pops, B-roll overlays, and bass hit drops."
      },
      {
        url: "https://www.youtube.com/shorts/kJQP7kiw5Fk",
        title: "Viral Pattern Interrupt Formula",
        client: "Tech Creator",
        views: "1.2M Views",
        aspectRatio: "9:16",
        description: "Retention-boosting visual switch every 2.5 seconds with crisp Foley audio."
      }
    ]
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
    previewUrl: `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`,
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

  // Get normalized categorized list for Work section
  getWorkVideos() {
    const raw = CREATIVE_VIBE_VIDEOS_CONFIG.workCategories || {};
    const result = {};
    for (const [catKey, list] of Object.entries(raw)) {
      const isVertCat = catKey === 'shorts-reels';
      result[catKey] = (list || []).map(v => normalizeVideoItem(v, catKey, isVertCat ? '9:16' : '16:9'));
    }
    return result;
  }
};
