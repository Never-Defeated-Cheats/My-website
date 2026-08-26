/* ==========================================================================
   CREATIVE VIBE - DEFAULT DATA & LOCALSTORAGE SYNC
   ========================================================================== */

const STORAGE_KEY = 'CREATIVE_VIBE_DATA_V9';

const DEFAULT_PORTFOLIO_DATA = {
  profile: {
    brandName: "Creative Vibe",
    brandTitle: "Freelance Video Editor",
    tagline: "Crafting High-Retention Stories, Cinematic Documentaries & Viral Motion Graphics",
    bio: "Hey, I'm Creative Vibe — a full-stack freelance video editor helping top YouTubers, SaaS brands, and creators turn raw footage into high-converting visual masterpieces.",
    email: "creative_vibe@creavibestudios.in",
    adminEmail: "creative_vibe@creavibestudios.in",
    whatsapp: "+919193905629",
    instagram: "https://www.instagram.com/creavibe.studios",
    discord: "https://discord.gg/QHKAcSNDxD",
    youtube: "https://youtube.com/@creavibe.studios",
    twitter: "https://twitter.com/creavibe",
    adminPin: "1234",
    customLogoUrl: "assets/logo.svg"
  },
  stats: {
    totalViews: "50M+",
    projectsCompleted: "180+",
    avgRetention: "72%",
    satisfiedClients: "45+"
  },
  categories: [
    {
      id: "documentary",
      name: "Documentaries",
      icon: "🎬",
      description: "In-depth storytelling, deep sound design, pacing & cinematic grading."
    },
    {
      id: "motion-graphics",
      name: "Motion Graphics",
      icon: "✨",
      description: "Dynamic kinetic typography, 3D element integration, and brand animations."
    },
    {
      id: "saas",
      name: "SaaS Animations",
      icon: "💻",
      description: "Clean product demos, UI/UX breakdowns, and high-converting launch videos."
    },
    {
      id: "talking-head",
      name: "Talking Head",
      icon: "🎙️",
      description: "Engaging podcast cuts, interviews, pattern interrupts & dynamic zooms."
    },
    {
      id: "vlogs",
      name: "Vlogs & Travel",
      icon: "✈️",
      description: "Seamless rhythm, story progression, upbeat soundscapes & color flair."
    },
    {
      id: "shorts-reels",
      name: "Viral Shorts & Reels",
      icon: "📱",
      description: "9:16 Vertical retention hooks, animated subtitles, memes & sound FX."
    }
  ],
  videos: [
    // 1. Documentaries (16:9 Horizontal)
    {
      id: "doc-1",
      title: "The Rise of Artificial Superintelligence | Mini Doc",
      category: "documentary",
      aspectRatio: "16:9",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtubeId: "dQw4w9WgXcQ",
      client: "VoxStyle Media",
      duration: "14:20",
      views: "1.2M Views",
      thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
      description: "Comprehensive mini-documentary featuring custom maps, kinetic text, and orchestral sound design.",
      isFeatured: true
    },
    {
      id: "doc-2",
      title: "How SpaceX Engineered the Starship Mega-Rocket",
      category: "documentary",
      aspectRatio: "16:9",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtubeId: "dQw4w9WgXcQ",
      client: "AeroTech Insights",
      duration: "18:45",
      views: "890K Views",
      thumbnail: "https://images.unsplash.com/photo-1517976487507-5b3648489d1a?auto=format&fit=crop&w=1000&q=80",
      description: "High-paced technical documentary with 3D explosion diagrams and archival footage restoration.",
      isFeatured: false
    },

    // 2. Motion Graphics (16:9 Horizontal)
    {
      id: "mg-1",
      title: "Fintech Platform - 3D Isometric Explainer",
      category: "motion-graphics",
      aspectRatio: "16:9",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtubeId: "dQw4w9WgXcQ",
      client: "PayFlow Global",
      duration: "01:30",
      views: "340K Views",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
      description: "Futuristic UI motion, vector character rigging, and seamless transitions.",
      isFeatured: true
    },
    {
      id: "mg-2",
      title: "Cybersecurity Shield - Concept Animation",
      category: "motion-graphics",
      aspectRatio: "16:9",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtubeId: "dQw4w9WgXcQ",
      client: "VaultGuard",
      duration: "00:45",
      views: "210K Views",
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80",
      description: "Neon HUD interface animations, particle simulations, and cyber soundscapes.",
      isFeatured: false
    },

    // 3. SaaS Animations (16:9 Horizontal)
    {
      id: "saas-1",
      title: "TaskPulse AI - Product Launch Video",
      category: "saas",
      aspectRatio: "16:9",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtubeId: "dQw4w9WgXcQ",
      client: "TaskPulse Inc.",
      duration: "01:15",
      views: "520K Views",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
      description: "Crisp screencast enhancements, cursor tracking, zoom zooms, and sleek product framing.",
      isFeatured: true
    },
    {
      id: "saas-2",
      title: "CloudScale - Infrastructure Management Demo",
      category: "saas",
      aspectRatio: "16:9",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtubeId: "dQw4w9WgXcQ",
      client: "CloudScale Devs",
      duration: "02:10",
      views: "180K Views",
      thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80",
      description: "Interactive dashboard mockups, glassmorphism overlays, and feature walkthrough.",
      isFeatured: false
    },

    // 4. Talking Head (16:9 Horizontal & 9:16)
    {
      id: "th-1",
      title: "Ali Abdaal Style: 7 Habits of High Achievers",
      category: "talking-head",
      aspectRatio: "16:9",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtubeId: "dQw4w9WgXcQ",
      client: "Growth Mindset TV",
      duration: "11:05",
      views: "750K Views",
      thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
      description: "Clean lower thirds, paper textures, sound popups, and high retention pacing.",
      isFeatured: true
    },
    {
      id: "th-2",
      title: "Deep Dive: How to Scale a $10k/mo Agency",
      category: "talking-head",
      aspectRatio: "16:9",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtubeId: "dQw4w9WgXcQ",
      client: "Founder Chronicles",
      duration: "16:30",
      views: "420K Views",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80",
      description: "Multi-camera switching, color matching, and engaging B-roll overlays.",
      isFeatured: false
    },

    // 5. Vlogs & Travel (16:9 Horizontal)
    {
      id: "vlog-1",
      title: "48 Hours in Tokyo: Cyberpunk Night Walk",
      category: "vlogs",
      aspectRatio: "16:9",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtubeId: "dQw4w9WgXcQ",
      client: "Lost in Shibuya",
      duration: "09:40",
      views: "1.8M Views",
      thumbnail: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80",
      description: "Cinematic speed ramps, neo-tokyo color grade, and ambient foley sound design.",
      isFeatured: true
    },

    // 6. Viral Shorts & Reels (9:16 Vertical)
    {
      id: "short-1",
      title: "The $1 Billion Marketing Trick You Never Noticed 🤯",
      category: "shorts-reels",
      aspectRatio: "9:16",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtubeId: "dQw4w9WgXcQ",
      client: "Business Uncut",
      duration: "00:45",
      views: "3.4M Views",
      thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80",
      description: "Alex Hormozi style animated subtitles, sound hits, and hook retainers.",
      isFeatured: true
    },
    {
      id: "short-2",
      title: "How Steve Jobs Designed the iPhone in 2007",
      category: "shorts-reels",
      aspectRatio: "9:16",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtubeId: "dQw4w9WgXcQ",
      client: "Tech Flashbacks",
      duration: "00:58",
      views: "2.1M Views",
      thumbnail: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=600&q=80",
      description: "Story-driven vertical documentary cut with archival photo 3D depth maps.",
      isFeatured: true
    },
    {
      id: "short-3",
      title: "Stop Making This Huge Video Editing Mistake!",
      category: "shorts-reels",
      aspectRatio: "9:16",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtubeId: "dQw4w9WgXcQ",
      client: "Editor Secrets",
      duration: "00:35",
      views: "1.5M Views",
      thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80",
      description: "Fast-paced tutorial with zoom ramps and split-screen comparisons.",
      isFeatured: true
    },
    {
      id: "short-4",
      title: "How 1 Sound Effect Saved a Hollywood Movie 🎬",
      category: "shorts-reels",
      aspectRatio: "9:16",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtubeId: "dQw4w9WgXcQ",
      client: "Cinema Bites",
      duration: "00:52",
      views: "4.8M Views",
      thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80",
      description: "High retention audio-driven breakdown with dynamic visual waveform.",
      isFeatured: true
    }
  ],
  pricing: [
    {
      id: "price-talking-head",
      nicheKey: "talking-head",
      icon: "🎙️",
      name: "Talking Head",
      badge: "🔥 Most Requested • High Volume",
      price: "$19.99 - $29.99",
      minPrice: "$19.99",
      maxPrice: "$29.99",
      period: "per reel / edit",
      rangeNote: "Min – Max standard bracket (90% of edits)",
      desc: "High-retention editing for personal brands, Alex Hormozi style kinetic subtitles, pattern interrupts, and punchy sound popups.",
      features: [
        "Dynamic kinetic subtitles & emoji overlays",
        "Strategic pattern interrupts & punch zooms",
        "Custom B-roll research & meme insertions",
        "Broadcast vocal leveling & noise cleanup",
        "24–48 Hours Turnaround",
        "Unlimited minor revisions included"
      ],
      featured: false
    },
    {
      id: "price-saas",
      nicheKey: "saas-animations",
      icon: "💻",
      name: "SaaS Animations",
      badge: "⭐ Core Expertise • Flagship Quality",
      price: "$19.99 - $49.99",
      minPrice: "$19.99",
      maxPrice: "$49.99",
      period: "per minute of video",
      rangeNote: "Min – Max standard bracket (90% of edits)",
      desc: "Primary specialization: 3D UI breakdowns, product demo animations, smooth cursor choreography, and high-conversion launch videos.",
      features: [
        "3D isometric UI & dashboard feature mockups",
        "Smooth cursor tracking & auto-zoom choreography",
        "Feature callout badges & glassmorphism overlays",
        "Licensed commercial background music & SFX",
        "High-converting launch video pacing",
        "Full commercial usage rights worldwide"
      ],
      featured: true
    },
    {
      id: "price-retention",
      nicheKey: "retention-videos",
      icon: "⚡",
      name: "Retention videos (like MR. Beast)",
      badge: "⚡ High Velocity • Hook Master",
      price: "$29.99 - $49.99",
      minPrice: "$29.99",
      maxPrice: "$49.99",
      period: "per minute of video",
      rangeNote: "Min – Max standard bracket (90% of edits)",
      desc: "Ultra high-velocity fast-cut storytelling, intense sound hits, 3D text popouts, countdown timers, and 90%+ audience retention hooks.",
      features: [
        "Zero dead-air fast-cut pacing formula",
        "Intense layered SFX (risers, whooshes, impacts)",
        "Custom 3D text popups, countdowns & arrows",
        "Retention curve drop-off optimization",
        "High-CTR Thumbnail concept design included",
        "Priority 24-48h turnaround with dedicated Slack"
      ],
      featured: false
    },
    {
      id: "price-documentary",
      nicheKey: "documentary-style",
      icon: "🎬",
      name: "Documentary style",
      badge: "🎬 Cinema & Long-Form Narrative",
      price: "$9.99 - $19.99",
      minPrice: "$9.99",
      maxPrice: "$19.99",
      period: "per minute of video",
      rangeNote: "Min – Max standard bracket (90% of edits)",
      desc: "Deep investigative storytelling, custom 2D/3D map animations, newspaper visual transitions, and orchestral sound design.",
      features: [
        "Narrative pacing & story hook architecture",
        "Kinetic 3D map animations & visual charts",
        "Archival footage restoration & textures",
        "DaVinci Resolve film LUT & skin-tone grading",
        "Multi-layered Foley & bass riser sound mix",
        "4K Master Export with project stems"
      ],
      featured: false
    },
    {
      id: "price-irl",
      nicheKey: "irl",
      icon: "✈️",
      name: "IRL",
      badge: "✈️ In Real Life & Travel Films",
      price: "$9.99 - $19.99",
      minPrice: "$9.99",
      maxPrice: "$19.99",
      period: "per minute of video",
      rangeNote: "Min – Max standard bracket (90% of edits)",
      desc: "Seamless rhythm for In Real Life vlogs, travel films, speed ramps, neo-color grades, and atmospheric environmental audio.",
      features: [
        "Cinematic speed ramps & whip-pan transitions",
        "Sony S-Log / GoPro / Drone log color matching",
        "Atmospheric environmental Foley soundscapes",
        "Upbeat music rhythm & beat-matched cuts",
        "Dynamic location title cards & lower thirds",
        "4K Ultra HD final master export"
      ],
      featured: false
    },
    {
      id: "price-podcast",
      nicheKey: "podcast",
      icon: "🎧",
      name: "Podcast",
      badge: "🎙️ Studio Multicam & Clarity",
      price: "$9.99 - $14.99",
      minPrice: "$9.99",
      maxPrice: "$14.99",
      period: "per minute of episode",
      rangeNote: "Min – Max standard bracket (90% of edits)",
      desc: "Multi-camera angle switching, studio vocal mastering, dead-air trimming, dynamic zoom cutouts, and viral highlight clipping.",
      features: [
        "Seamless multi-camera angle switching",
        "Broadcast vocal EQ, compression & de-essing",
        "Automated dead-air & filler word trimming",
        "Graphic lower thirds & speaker name tags",
        "Bonus viral vertical clip (9:16) for Reels/Shorts",
        "Full episode master + audio WAV stems"
      ],
      featured: false
    }
  ],
  reviews: [
    {
      id: "rev-1",
      clientName: "Marcus Vance",
      channel: "AeroTech Insights (480K Subs) • Mini Documentaries",
      rating: 4.9,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      text: "Creative Vibe completely transformed our documentary series. Our average 30-day retention spiked from 38% to 68.4%, and our Starship video hit 1.2M views. Pacing, kinetic maps, and immersive sound design are top tier.",
      date: "2 days ago",
      verified: true
    },
    {
      id: "rev-2",
      clientName: "Sarah Chen",
      channel: "Founder at TaskPulse SaaS • 3D UI Explainer",
      rating: 5.0,
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
      text: "We needed a 90-second launch video that explained our dev tool clearly without boring users. The 3D isometric animation and sound sync were flawless. We secured over 14,000 beta signups in week one.",
      date: "4 days ago",
      verified: true
    },
    {
      id: "rev-3",
      clientName: "Devon Brooks",
      channel: "Devon Vlogs (1.2M Subs) • Travel & Lifestyle",
      rating: 4.8,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      text: "Turnaround is fast, communication is effortless, and the music choices elevate raw camera footage to cinema grade. Working with Creative Vibe feels like having a dedicated Netflix post-production editor.",
      date: "1 week ago",
      verified: true
    },
    {
      id: "rev-4",
      clientName: "Liam Thorne",
      channel: "The Mindset Blueprint Podcast (320K Subs)",
      rating: 4.9,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      text: "Best editor I've worked with in 4 years of podcasting. He knows exactly where to cut dead air, inserts relevant B-roll at the right retention drop-off marks, and masterfully mixes vocal clarity.",
      date: "1 week ago",
      verified: true
    },
    {
      id: "rev-5",
      clientName: "Aarav Patel",
      channel: "Crypto & Fintech Daily (650K Subs)",
      rating: 4.7,
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
      text: "My Shorts went from averaging 20k views to pulling 400k+ consistently. The Hormozi caption animations, sound effects, and pattern interrupts keep viewers hooked until the last second.",
      date: "2 weeks ago",
      verified: true
    },
    {
      id: "rev-6",
      clientName: "Elena Rostova",
      channel: "Creative Director, Studio Lumina",
      rating: 5.0,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
      text: "We handed over 150GB of chaotic raw footage for a high-profile client brand film. Creative Vibe delivered a pristine rough cut in 48 hours that required zero fundamental revisions. Exceptional taste.",
      date: "2 weeks ago",
      verified: true
    },
    {
      id: "rev-7",
      clientName: "Jason Miller",
      channel: "CEO, FlowMetric Analytics SaaS",
      rating: 4.8,
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
      text: "The SaaS product explainer video generated a 3.8x conversion bump on our landing page. The smooth zoom-ins on product features and typography hits made our complex software feel simple and irresistible.",
      date: "3 weeks ago",
      verified: true
    },
    {
      id: "rev-8",
      clientName: "Maya Lin",
      channel: "Nomad Chronicles • 4K Travel Films",
      rating: 4.6,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
      text: "The DaVinci Resolve color grading on my Iceland vlog was breathtaking. He matched drone footage with Sony A7SIII logs effortlessly. Audio design with wind and footsteps brought the footage to life.",
      date: "3 weeks ago",
      verified: true
    },
    {
      id: "rev-9",
      clientName: "Kavita Sharma",
      channel: "Finance & Investing Uncut (890K Subs)",
      rating: 4.9,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
      text: "Finding an editor who understands finance charts and timing is nearly impossible. Creative Vibe adds custom kinetic graphics that make dry balance sheets look cinematic and exciting.",
      date: "1 month ago",
      verified: true
    },
    {
      id: "rev-10",
      clientName: "Toby Jenkins",
      channel: "Gaming & Pop Culture Breakdown (740K Subs)",
      rating: 4.7,
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80",
      text: "Fast cuts without feeling overwhelming. The sound design hits are punchy, memes are well-timed, and copyright-safe music curation saved me countless hours. 10/10 recommendation.",
      date: "1 month ago",
      verified: true
    },
    {
      id: "rev-11",
      clientName: "Dr. Julian Hayes",
      channel: "Health & Longevity Lab Podcast",
      rating: 4.8,
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=150&q=80",
      text: "Our interview retention jumped past the 15-minute mark for the first time. The multi-cam switching and subtle visual callouts for medical terms kept audience engagement remarkably steady.",
      date: "1 month ago",
      verified: true
    },
    {
      id: "rev-12",
      clientName: "Chloe Dubois",
      channel: "E-Commerce Brand Founder (LumaSkin)",
      rating: 5.0,
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80",
      text: "Our TikTok and Reels ad ROAS went from 1.8x to 4.2x after switching to Creative Vibe for our vertical hooks. The speed, energy, and visual polish paid for itself on day three.",
      date: "1 month ago",
      verified: true
    }
  ]
};

class DataStore {
  constructor() {
    this.data = this.loadData();
  }

  loadData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not read from localStorage, using defaults', e);
    }
    this.saveData(DEFAULT_PORTFOLIO_DATA);
    return JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA));
  }

  saveData(newData) {
    this.data = newData;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }

  getData() {
    return this.data;
  }

  getVideos(category = null) {
    if (!category || category === 'all') {
      return this.data.videos;
    }
    return this.data.videos.filter(v => v.category === category);
  }

  addVideo(videoObj) {
    videoObj.id = 'vid_' + Date.now();
    this.data.videos.unshift(videoObj);
    this.saveData(this.data);
    return videoObj;
  }

  updateVideo(id, updatedFields) {
    const idx = this.data.videos.findIndex(v => v.id === id);
    if (idx !== -1) {
      this.data.videos[idx] = { ...this.data.videos[idx], ...updatedFields };
      this.saveData(this.data);
      return this.data.videos[idx];
    }
    return null;
  }

  deleteVideo(id) {
    this.data.videos = this.data.videos.filter(v => v.id !== id);
    this.saveData(this.data);
  }

  updatePricing(pricingArray) {
    this.data.pricing = pricingArray;
    this.saveData(this.data);
  }

  addReview(reviewObj) {
    reviewObj.id = 'rev_' + Date.now();
    this.data.reviews.unshift(reviewObj);
    this.saveData(this.data);
    return reviewObj;
  }

  deleteReview(id) {
    this.data.reviews = this.data.reviews.filter(r => r.id !== id);
    this.saveData(this.data);
  }

  updateProfile(profileFields) {
    this.data.profile = { ...this.data.profile, ...profileFields };
    this.saveData(this.data);
  }

  resetToDefault() {
    this.saveData(JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA)));
    return this.data;
  }
}

window.appData = new DataStore();
