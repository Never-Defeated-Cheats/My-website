import { VideoItem, NicheCategory, PricingPlan, ClientReview } from '../types';
import siteLogo from '../assets/images/logo.png';

// Central Website Brand Logo loaded directly from local source assets
export const SITE_LOGO_URL = siteLogo;

// Cloudinary Direct Video CDN Assets
export const CLOUDINARY_VIDEOS = {
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
  vertTajStory: {
    preview: "https://res.cloudinary.com/pxf5pjuu/video/upload/w_200,c_scale,q_auto:eco,br_150k,f_mp4/v1787906348/The_Taj_Story.mp4",
    master: "https://res.cloudinary.com/pxf5pjuu/video/upload/q_auto:good,vc_auto/v1787906348/The_Taj_Story.mp4",
    poster: "https://res.cloudinary.com/pxf5pjuu/video/upload/w_400,so_0,q_auto:eco/v1787906348/The_Taj_Story.jpg"
  },
  horizPerception1: {
    preview: "https://res.cloudinary.com/pxf5pjuu/video/upload/w_280,c_scale,q_auto:eco,br_200k,f_mp4/v1787906505/perception_over_value_1.mp4",
    master: "https://res.cloudinary.com/pxf5pjuu/video/upload/q_auto:good,vc_auto/v1787906505/perception_over_value_1.mp4",
    poster: "/og-image.jpg"
  }
};

// Recent Signature Edits (Homepage Dual Sliders)
export const RECENT_EDITS_DATA: { vertical: VideoItem[]; horizontal: VideoItem[] } = {
  vertical: [
    {
      id: "recent-vert-1",
      title: "Real Estate Speed Ramp Reel",
      client: "Luxury Real Estate",
      views: "1.8M Views",
      aspectRatio: "9:16",
      previewUrl: CLOUDINARY_VIDEOS.vertRealEstate.preview,
      masterUrl: CLOUDINARY_VIDEOS.vertRealEstate.master,
      poster: CLOUDINARY_VIDEOS.vertRealEstate.poster,
      category: "shorts-reels"
    },
    {
      id: "recent-vert-2",
      title: "The Taj Story | Visual Short Film",
      client: "Heritage Media",
      views: "2.1M Views",
      aspectRatio: "9:16",
      previewUrl: CLOUDINARY_VIDEOS.vertTajStory.preview,
      masterUrl: CLOUDINARY_VIDEOS.vertTajStory.master,
      poster: CLOUDINARY_VIDEOS.vertTajStory.poster,
      category: "shorts-reels"
    },
    {
      id: "recent-vert-3",
      title: "Perception Over Value | Viral Short",
      client: "Creator Spotlight",
      views: "2.4M Views",
      aspectRatio: "9:16",
      previewUrl: CLOUDINARY_VIDEOS.vertPerception.preview,
      masterUrl: CLOUDINARY_VIDEOS.vertPerception.master,
      poster: CLOUDINARY_VIDEOS.vertPerception.poster,
      category: "shorts-reels"
    },
    {
      id: "recent-vert-4",
      title: "Dynamic Motion & Sound Design Reel",
      client: "SaaS Brand",
      views: "940K Views",
      aspectRatio: "9:16",
      previewUrl: CLOUDINARY_VIDEOS.vertReel06.preview,
      masterUrl: CLOUDINARY_VIDEOS.vertReel06.master,
      poster: CLOUDINARY_VIDEOS.vertReel06.poster,
      category: "shorts-reels"
    }
  ],
  horizontal: [
    {
      id: "recent-horiz-1",
      title: "Perception Over Value | 4K Master Film",
      client: "Creative Vibe Masterclass",
      views: "1.5M Views",
      aspectRatio: "16:9",
      duration: "04:30",
      previewUrl: CLOUDINARY_VIDEOS.horizPerception1.preview,
      masterUrl: CLOUDINARY_VIDEOS.horizPerception1.master,
      poster: CLOUDINARY_VIDEOS.horizPerception1.poster,
      category: "documentary"
    },
    {
      id: "recent-horiz-2",
      title: "High-Retention Documentary Masterclass",
      client: "AeroTech Insights",
      views: "1.4M Views",
      aspectRatio: "16:9",
      duration: "18:40",
      previewUrl: CLOUDINARY_VIDEOS.horizPerception1.preview,
      masterUrl: CLOUDINARY_VIDEOS.horizPerception1.master,
      poster: CLOUDINARY_VIDEOS.horizPerception1.poster,
      category: "documentary"
    },
    {
      id: "recent-horiz-3",
      title: "Fintech SaaS Product Explainer Animation",
      client: "PayFlow Inc",
      views: "450K Views",
      aspectRatio: "16:9",
      duration: "02:15",
      previewUrl: CLOUDINARY_VIDEOS.horizPerception1.preview,
      masterUrl: CLOUDINARY_VIDEOS.horizPerception1.master,
      poster: CLOUDINARY_VIDEOS.horizPerception1.poster,
      category: "saas"
    },
    {
      id: "recent-horiz-4",
      title: "How He Built an Empire | Talking Head Edit",
      client: "Founder Hub",
      views: "890K Views",
      aspectRatio: "16:9",
      duration: "21:40",
      previewUrl: CLOUDINARY_VIDEOS.horizPerception1.preview,
      masterUrl: CLOUDINARY_VIDEOS.horizPerception1.master,
      poster: CLOUDINARY_VIDEOS.horizPerception1.poster,
      category: "talking-head"
    }
  ]
};

// 5 Curated Editing Niches
export const NICHES_DATA: Record<string, NicheCategory> = {
  "talking-head": {
    key: "talking-head",
    name: "Talking Head & Podcasts",
    iconName: "Mic",
    subtitle: "Multi-cam retention switching, kinetic zoom-ins, vocal cleanup & dynamic B-roll",
    description: "High-retention editing for personal brands, YouTube talking head videos, and podcasts with clean lower thirds and punchy sound design.",
    vertical: [
      {
        id: "th-v1",
        title: "Viral Podcast Clip - The $100M Mindset",
        client: "Growth Mindset TV",
        views: "1.2M Views",
        aspectRatio: "9:16",
        previewUrl: CLOUDINARY_VIDEOS.vertPerception.preview,
        masterUrl: CLOUDINARY_VIDEOS.vertPerception.master,
        poster: CLOUDINARY_VIDEOS.vertPerception.poster
      },
      {
        id: "th-v2",
        title: "Hormozi Kinetic Captions Reel",
        client: "Apex Creator",
        views: "850K Views",
        aspectRatio: "9:16",
        previewUrl: CLOUDINARY_VIDEOS.vertReel06.preview,
        masterUrl: CLOUDINARY_VIDEOS.vertReel06.master,
        poster: CLOUDINARY_VIDEOS.vertReel06.poster
      },
      {
        id: "th-v3",
        title: "Founder Story | Hook & Pacing Cut",
        client: "Venture Daily",
        views: "1.6M Views",
        aspectRatio: "9:16",
        previewUrl: CLOUDINARY_VIDEOS.vertRealEstate.preview,
        masterUrl: CLOUDINARY_VIDEOS.vertRealEstate.master,
        poster: CLOUDINARY_VIDEOS.vertRealEstate.poster
      },
      {
        id: "th-v4",
        title: "High-Impact Interview Master Short",
        client: "The Real Talk",
        views: "920K Views",
        aspectRatio: "9:16",
        previewUrl: CLOUDINARY_VIDEOS.vertTajStory.preview,
        masterUrl: CLOUDINARY_VIDEOS.vertTajStory.master,
        poster: CLOUDINARY_VIDEOS.vertTajStory.poster
      },
      {
        id: "th-v5",
        title: "Multi-Angle Kinetic Podcast Reel",
        client: "Alpha Pod",
        views: "1.4M Views",
        aspectRatio: "9:16",
        previewUrl: CLOUDINARY_VIDEOS.vertReel06.preview,
        masterUrl: CLOUDINARY_VIDEOS.vertReel06.master,
        poster: CLOUDINARY_VIDEOS.vertReel06.poster
      }
    ],
    horizontal: [
      {
        id: "th-h1",
        title: "Full 45-Min Interview Multi-Cam Edit",
        client: "The Mindset Blueprint",
        views: "750K Views",
        aspectRatio: "16:9",
        duration: "45:20",
        previewUrl: CLOUDINARY_VIDEOS.horizPerception1.preview,
        masterUrl: CLOUDINARY_VIDEOS.horizPerception1.master,
        poster: CLOUDINARY_VIDEOS.horizPerception1.poster
      },
      {
        id: "th-h2",
        title: "How He Built an Empire | Talking Head Edit",
        client: "Founder Hub",
        views: "890K Views",
        aspectRatio: "16:9",
        duration: "21:40",
        previewUrl: CLOUDINARY_VIDEOS.horizPerception1.preview,
        masterUrl: CLOUDINARY_VIDEOS.horizPerception1.master,
        poster: CLOUDINARY_VIDEOS.horizPerception1.poster
      },
      {
        id: "th-h3",
        title: "Deep Dive Studio Interview & Master Audio",
        client: "Executive Series",
        views: "620K Views",
        aspectRatio: "16:9",
        duration: "34:15",
        previewUrl: CLOUDINARY_VIDEOS.horizPerception1.preview,
        masterUrl: CLOUDINARY_VIDEOS.horizPerception1.master,
        poster: CLOUDINARY_VIDEOS.horizPerception1.poster
      }
    ]
  },
  "documentary": {
    key: "documentary",
    name: "Documentary Style",
    iconName: "Film",
    subtitle: "Vox & Magnates Media style kinetic maps, paper rip textures, timeline animations & immersive soundscapes",
    description: "In-depth narrative storytelling with DaVinci Resolve color grading, custom 3D map animations, and multi-layered Foley sound effects.",
    vertical: [
      {
        id: "doc-v1",
        title: "The Fall of Silicon Valley Bank",
        client: "Finance Today",
        views: "980K Views",
        aspectRatio: "9:16",
        previewUrl: CLOUDINARY_VIDEOS.vertRealEstate.preview,
        masterUrl: CLOUDINARY_VIDEOS.vertRealEstate.master,
        poster: CLOUDINARY_VIDEOS.vertRealEstate.poster
      },
      {
        id: "doc-v2",
        title: "The Taj Story | Visual Short Film",
        client: "Heritage Media",
        views: "2.1M Views",
        aspectRatio: "9:16",
        previewUrl: CLOUDINARY_VIDEOS.vertTajStory.preview,
        masterUrl: CLOUDINARY_VIDEOS.vertTajStory.master,
        poster: CLOUDINARY_VIDEOS.vertTajStory.poster
      },
      {
        id: "doc-v3",
        title: "The Secret Rise of Modern AI",
        client: "Tech Chronicles",
        views: "1.7M Views",
        aspectRatio: "9:16",
        previewUrl: CLOUDINARY_VIDEOS.vertPerception.preview,
        masterUrl: CLOUDINARY_VIDEOS.vertPerception.master,
        poster: CLOUDINARY_VIDEOS.vertPerception.poster
      },
      {
        id: "doc-v4",
        title: "Shadow Empires | Visual Investigation",
        client: "Deep Lore",
        views: "840K Views",
        aspectRatio: "9:16",
        previewUrl: CLOUDINARY_VIDEOS.vertReel06.preview,
        masterUrl: CLOUDINARY_VIDEOS.vertReel06.master,
        poster: CLOUDINARY_VIDEOS.vertReel06.poster
      },
      {
        id: "doc-v5",
        title: "Mystery of the Lost Civilization",
        client: "Historic Wonders",
        views: "1.3M Views",
        aspectRatio: "9:16",
        previewUrl: CLOUDINARY_VIDEOS.vertTajStory.preview,
        masterUrl: CLOUDINARY_VIDEOS.vertTajStory.master,
        poster: CLOUDINARY_VIDEOS.vertTajStory.poster
      }
    ],
    horizontal: [
      {
        id: "doc-h1",
        title: "How Tesla Conquered the Global EV Market",
        client: "AeroTech Insights",
        views: "1.4M Views",
        aspectRatio: "16:9",
        duration: "18:40",
        previewUrl: CLOUDINARY_VIDEOS.horizPerception1.preview,
        masterUrl: CLOUDINARY_VIDEOS.horizPerception1.master,
        poster: CLOUDINARY_VIDEOS.horizPerception1.poster
      },
      {
        id: "doc-h2",
        title: "High-Retention Documentary Masterclass",
        client: "Vox Insights",
        views: "2.2M Views",
        aspectRatio: "16:9",
        duration: "24:15",
        previewUrl: CLOUDINARY_VIDEOS.horizPerception1.preview,
        masterUrl: CLOUDINARY_VIDEOS.horizPerception1.master,
        poster: CLOUDINARY_VIDEOS.horizPerception1.poster
      },
      {
        id: "doc-h3",
        title: "Perception Over Value | 4K Master Film",
        client: "Creative Vibe",
        views: "1.5M Views",
        aspectRatio: "16:9",
        duration: "04:30",
        previewUrl: CLOUDINARY_VIDEOS.horizPerception1.preview,
        masterUrl: CLOUDINARY_VIDEOS.horizPerception1.master,
        poster: CLOUDINARY_VIDEOS.horizPerception1.poster
      }
    ]
  },
  "saas-animations": {
    key: "saas-animations",
    name: "SaaS Animations",
    iconName: "Laptop",
    subtitle: "3D isometric UI breakdowns, feature zooms, mockups, kinetic vector typography & app launch films",
    description: "Our flagship specialty: turning complex software and web products into sleek, highly-engaging video demos that drive conversions.",
    vertical: [
      {
        id: "saas-v1",
        title: "Mobile App Feature Launch Breakdown",
        client: "TaskPulse Mobile",
        views: "620K Views",
        aspectRatio: "9:16",
        previewUrl: CLOUDINARY_VIDEOS.vertReel06.preview,
        masterUrl: CLOUDINARY_VIDEOS.vertReel06.master,
        poster: CLOUDINARY_VIDEOS.vertReel06.poster
      },
      {
        id: "saas-v2",
        title: "Fintech UI Feature Animation",
        client: "CashFlow App",
        views: "1.1M Views",
        aspectRatio: "9:16",
        previewUrl: CLOUDINARY_VIDEOS.vertPerception.preview,
        masterUrl: CLOUDINARY_VIDEOS.vertPerception.master,
        poster: CLOUDINARY_VIDEOS.vertPerception.poster
      },
      {
        id: "saas-v3",
        title: "3D Dashboard Metric Showcase",
        client: "MetricHQ",
        views: "780K Views",
        aspectRatio: "9:16",
        previewUrl: CLOUDINARY_VIDEOS.vertRealEstate.preview,
        masterUrl: CLOUDINARY_VIDEOS.vertRealEstate.master,
        poster: CLOUDINARY_VIDEOS.vertRealEstate.poster
      },
      {
        id: "saas-v4",
        title: "AI Workflow Tool Showcase Reel",
        client: "AutoFlow AI",
        views: "1.5M Views",
        aspectRatio: "9:16",
        previewUrl: CLOUDINARY_VIDEOS.vertReel06.preview,
        masterUrl: CLOUDINARY_VIDEOS.vertReel06.master,
        poster: CLOUDINARY_VIDEOS.vertReel06.poster
      },
      {
        id: "saas-v5",
        title: "Clean SaaS Micro-Interactions Reel",
        client: "DesignSync",
        views: "890K Views",
        aspectRatio: "9:16",
        previewUrl: CLOUDINARY_VIDEOS.vertPerception.preview,
        masterUrl: CLOUDINARY_VIDEOS.vertPerception.master,
        poster: CLOUDINARY_VIDEOS.vertPerception.poster
      }
    ],
    horizontal: [
      {
        id: "saas-h1",
        title: "Complete SaaS Product Overview & UI Walkthrough",
        client: "CloudScale DevOps",
        views: "520K Views",
        aspectRatio: "16:9",
        duration: "02:15",
        previewUrl: CLOUDINARY_VIDEOS.horizPerception1.preview,
        masterUrl: CLOUDINARY_VIDEOS.horizPerception1.master,
        poster: CLOUDINARY_VIDEOS.horizPerception1.poster
      },
      {
        id: "saas-h2",
        title: "Fintech SaaS Product Explainer Animation",
        client: "PayFlow Inc",
        views: "450K Views",
        aspectRatio: "16:9",
        duration: "02:15",
        previewUrl: CLOUDINARY_VIDEOS.horizPerception1.preview,
        masterUrl: CLOUDINARY_VIDEOS.horizPerception1.master,
        poster: CLOUDINARY_VIDEOS.horizPerception1.poster
      },
      {
        id: "saas-h3",
        title: "Enterprise CRM 3D Interactive Feature Demo",
        client: "SalesNexus",
        views: "610K Views",
        aspectRatio: "16:9",
        duration: "03:00",
        previewUrl: CLOUDINARY_VIDEOS.horizPerception1.preview,
        masterUrl: CLOUDINARY_VIDEOS.horizPerception1.master,
        poster: CLOUDINARY_VIDEOS.horizPerception1.poster
      }
    ]
  },
  "retention-beast": {
    key: "retention-beast",
    name: "Retention Videos (MR. Beast Style)",
    iconName: "Zap",
    subtitle: "Fast-cut pacing, sound effects every 2.5s, custom illustrated overlays, countdown timers & pattern interrupts",
    description: "High-velocity editing engineered to maximize YouTube watch time with zero dead air, engaging visual hooks, and graphic callouts.",
    vertical: [
      {
        id: "ret-v1",
        title: "I Survived 100 Hours in VR (Retention Hook)",
        client: "Challenge Central",
        views: "3.2M Views",
        aspectRatio: "9:16",
        previewUrl: CLOUDINARY_VIDEOS.vertRealEstate.preview,
        masterUrl: CLOUDINARY_VIDEOS.vertRealEstate.master,
        poster: CLOUDINARY_VIDEOS.vertRealEstate.poster
      },
      {
        id: "ret-v2",
        title: "Last to Leave the Circle Wins $10,000",
        client: "Viral Beasts",
        views: "4.1M Views",
        aspectRatio: "9:16",
        previewUrl: CLOUDINARY_VIDEOS.vertTajStory.preview,
        masterUrl: CLOUDINARY_VIDEOS.vertTajStory.master,
        poster: CLOUDINARY_VIDEOS.vertTajStory.poster
      },
      {
        id: "ret-v3",
        title: "World's Most Dangerous Maze Short",
        client: "Epic Stunts",
        views: "2.8M Views",
        aspectRatio: "9:16",
        previewUrl: CLOUDINARY_VIDEOS.vertReel06.preview,
        masterUrl: CLOUDINARY_VIDEOS.vertReel06.master,
        poster: CLOUDINARY_VIDEOS.vertReel06.poster
      },
      {
        id: "ret-v4",
        title: "Fast-Paced Gaming Challenge Hook",
        client: "LevelUp Show",
        views: "1.9M Views",
        aspectRatio: "9:16",
        previewUrl: CLOUDINARY_VIDEOS.vertPerception.preview,
        masterUrl: CLOUDINARY_VIDEOS.vertPerception.master,
        poster: CLOUDINARY_VIDEOS.vertPerception.poster
      },
      {
        id: "ret-v5",
        title: "I Gave $1,000 to Strangers (Hook Cut)",
        client: "Heart Beats",
        views: "3.5M Views",
        aspectRatio: "9:16",
        previewUrl: CLOUDINARY_VIDEOS.vertRealEstate.preview,
        masterUrl: CLOUDINARY_VIDEOS.vertRealEstate.master,
        poster: CLOUDINARY_VIDEOS.vertRealEstate.poster
      }
    ],
    horizontal: [
      {
        id: "ret-h1",
        title: "Extreme $50,000 Hide and Seek Championship",
        client: "Mega Creators",
        views: "4.8M Views",
        aspectRatio: "16:9",
        duration: "14:10",
        previewUrl: CLOUDINARY_VIDEOS.horizPerception1.preview,
        masterUrl: CLOUDINARY_VIDEOS.horizPerception1.master,
        poster: CLOUDINARY_VIDEOS.horizPerception1.poster
      },
      {
        id: "ret-h2",
        title: "I Built a Secret Underground Bunker",
        client: "Titan Crew",
        views: "5.2M Views",
        aspectRatio: "16:9",
        duration: "19:30",
        previewUrl: CLOUDINARY_VIDEOS.horizPerception1.preview,
        masterUrl: CLOUDINARY_VIDEOS.horizPerception1.master,
        poster: CLOUDINARY_VIDEOS.horizPerception1.poster
      },
      {
        id: "ret-h3",
        title: "Surviving 7 Days on a Deserted Island",
        client: "Wild Horizon",
        views: "3.9M Views",
        aspectRatio: "16:9",
        duration: "17:45",
        previewUrl: CLOUDINARY_VIDEOS.horizPerception1.preview,
        masterUrl: CLOUDINARY_VIDEOS.horizPerception1.master,
        poster: CLOUDINARY_VIDEOS.horizPerception1.poster
      }
    ]
  },
  "irl": {
    key: "irl",
    name: "IRL & Travel Films",
    iconName: "Plane",
    subtitle: "Speed ramps, whip transitions, DaVinci Resolve film color grades, atmospheric environmental Foley & music rhythm",
    description: "Cinematic rhythm for real-life vlogs, travel reels, and lifestyle series with natural ambient audio and Sony/GoPro log color grading.",
    vertical: [
      {
        id: "irl-v1",
        title: "Kyoto Night Walk - 4K Cinematic Reel",
        client: "Travelers Hub",
        views: "1.9M Views",
        aspectRatio: "9:16",
        previewUrl: CLOUDINARY_VIDEOS.vertRealEstate.preview,
        masterUrl: CLOUDINARY_VIDEOS.vertRealEstate.master,
        poster: CLOUDINARY_VIDEOS.vertRealEstate.poster
      },
      {
        id: "irl-v2",
        title: "Golden Hour in Amalfi Coast",
        client: "Wanderlust Films",
        views: "2.3M Views",
        aspectRatio: "9:16",
        previewUrl: CLOUDINARY_VIDEOS.vertTajStory.preview,
        masterUrl: CLOUDINARY_VIDEOS.vertTajStory.master,
        poster: CLOUDINARY_VIDEOS.vertTajStory.poster
      },
      {
        id: "irl-v3",
        title: "Tokyo Street Food Exploration",
        client: "City Escapes",
        views: "1.7M Views",
        aspectRatio: "9:16",
        previewUrl: CLOUDINARY_VIDEOS.vertPerception.preview,
        masterUrl: CLOUDINARY_VIDEOS.vertPerception.master,
        poster: CLOUDINARY_VIDEOS.vertPerception.poster
      },
      {
        id: "irl-v4",
        title: "Iceland Glaciers & Volcanic Valleys",
        client: "Nordic Nomad",
        views: "1.4M Views",
        aspectRatio: "9:16",
        previewUrl: CLOUDINARY_VIDEOS.vertReel06.preview,
        masterUrl: CLOUDINARY_VIDEOS.vertReel06.master,
        poster: CLOUDINARY_VIDEOS.vertReel06.poster
      },
      {
        id: "irl-v5",
        title: "Speed Ramp Mountain Bike Descent",
        client: "Adrenaline Peak",
        views: "2.1M Views",
        aspectRatio: "9:16",
        previewUrl: CLOUDINARY_VIDEOS.vertRealEstate.preview,
        masterUrl: CLOUDINARY_VIDEOS.vertRealEstate.master,
        poster: CLOUDINARY_VIDEOS.vertRealEstate.poster
      }
    ],
    horizontal: [
      {
        id: "irl-h1",
        title: "4K Cinematic Travel Film - Tokyo & Kyoto",
        client: "Nomad Chronicles",
        views: "1.8M Views",
        aspectRatio: "16:9",
        duration: "12:30",
        previewUrl: CLOUDINARY_VIDEOS.horizPerception1.preview,
        masterUrl: CLOUDINARY_VIDEOS.horizPerception1.master,
        poster: CLOUDINARY_VIDEOS.horizPerception1.poster
      },
      {
        id: "irl-h2",
        title: "Road Trip Across the Swiss Alps",
        client: "Alpine Journeys",
        views: "1.2M Views",
        aspectRatio: "16:9",
        duration: "15:20",
        previewUrl: CLOUDINARY_VIDEOS.horizPerception1.preview,
        masterUrl: CLOUDINARY_VIDEOS.horizPerception1.master,
        poster: CLOUDINARY_VIDEOS.horizPerception1.poster
      },
      {
        id: "irl-h3",
        title: "Lost in Bali - A Cinematic Travel Odyssey",
        client: "Island Vibe",
        views: "1.5M Views",
        aspectRatio: "16:9",
        duration: "11:45",
        previewUrl: CLOUDINARY_VIDEOS.horizPerception1.preview,
        masterUrl: CLOUDINARY_VIDEOS.horizPerception1.master,
        poster: CLOUDINARY_VIDEOS.horizPerception1.poster
      }
    ]
  }
};

// 6 Pricing Tiers
export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "price-talking-head",
    nicheKey: "talking-head",
    iconName: "Mic",
    name: "Talking Head",
    badge: "Most Requested • High Volume",
    price: "$19.99 - $29.99",
    minPrice: "$19.99",
    maxPrice: "$29.99",
    period: "per reel / edit",
    rangeNote: "Min – Max standard bracket (90% of edits)",
    desc: "High-retention editing for personal brands, Alex Hormozi style kinetic subtitles, pattern interrupts, and punchy sound popups.",
    features: [
      "Dynamic kinetic subtitles & graphic overlays",
      "Strategic pattern interrupts & punch zooms",
      "Custom B-roll research & meme insertions",
      "Broadcast vocal leveling & background noise cleanup",
      "Fast 24–48 Hours Turnaround",
      "Unlimited minor revisions included"
    ],
    featured: false
  },
  {
    id: "price-saas",
    nicheKey: "saas-animations",
    iconName: "Laptop",
    name: "SaaS Animations",
    badge: "Core Expertise • Flagship Quality",
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
    nicheKey: "retention-beast",
    iconName: "Zap",
    name: "Retention videos (MR. Beast Style)",
    badge: "High Velocity • Hook Master",
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
    nicheKey: "documentary",
    iconName: "Film",
    name: "Documentary style",
    badge: "Cinema & Long-Form Narrative",
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
    iconName: "Plane",
    name: "IRL & Travel Films",
    badge: "In Real Life & Travel Films",
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
    nicheKey: "talking-head",
    iconName: "Headphones",
    name: "Podcast & Interviews",
    badge: "Studio Multicam & Clarity",
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
];

// Authentic Client Reviews
export const CLIENT_REVIEWS: ClientReview[] = [
  {
    id: "rev-1",
    clientName: "Marcus Vance",
    channel: "AeroTech Insights (480K Subs) • Mini Documentaries",
    rating: 5.0,
    text: "Creative Vibe completely transformed our documentary series. Our average 30-day retention spiked from 38% to 68.4%, and our Starship video hit 1.2M views. Pacing, kinetic maps, and immersive sound design are top tier.",
    date: "2 days ago",
    verified: true,
    projectType: "Documentary Style"
  },
  {
    id: "rev-2",
    clientName: "Sarah Chen",
    channel: "Founder at TaskPulse SaaS • 3D UI Explainer",
    rating: 5.0,
    text: "We needed a 90-second launch video that explained our dev tool clearly without boring users. The 3D isometric animation and sound sync were flawless. We secured over 14,000 beta signups in week one.",
    date: "4 days ago",
    verified: true,
    projectType: "SaaS Animations"
  },
  {
    id: "rev-3",
    clientName: "Devon Brooks",
    channel: "Devon Vlogs (1.2M Subs) • Travel & Lifestyle",
    rating: 4.9,
    text: "Turnaround is fast, communication is effortless, and the music choices elevate raw camera footage to cinema grade. Working with Creative Vibe feels like having a dedicated Netflix post-production editor.",
    date: "1 week ago",
    verified: true,
    projectType: "IRL & Travel"
  },
  {
    id: "rev-4",
    clientName: "Liam Thorne",
    channel: "The Mindset Blueprint Podcast (320K Subs)",
    rating: 4.9,
    text: "Best editor I've worked with in 4 years of podcasting. He knows exactly where to cut dead air, inserts relevant B-roll at the right retention drop-off marks, and masterfully mixes vocal clarity.",
    date: "1 week ago",
    verified: true,
    projectType: "Talking Head & Podcast"
  },
  {
    id: "rev-5",
    clientName: "Aarav Patel",
    channel: "Crypto & Fintech Daily (650K Subs)",
    rating: 4.8,
    text: "My Shorts went from averaging 20k views to pulling 400k+ consistently. The caption animations, sound effects, and pattern interrupts keep viewers hooked until the last second.",
    date: "2 weeks ago",
    verified: true,
    projectType: "Viral Shorts & Reels"
  },
  {
    id: "rev-6",
    clientName: "Elena Rostova",
    channel: "Creative Director, Studio Lumina",
    rating: 5.0,
    text: "We handed over 150GB of chaotic raw footage for a high-profile client brand film. Creative Vibe delivered a pristine rough cut in 48 hours that required zero fundamental revisions. Exceptional taste.",
    date: "2 weeks ago",
    verified: true,
    projectType: "Custom Retention"
  },
  {
    id: "rev-7",
    clientName: "Nathaniel Ross",
    channel: "BuildInPublic SaaS (190K Followers) • Launch Film",
    rating: 5.0,
    text: "Creative Vibe cut our product video for Product Hunt launch day. We hit #1 Product of the Day with over 1,200 upvotes. The vector UI choreography and sound effects blew our team away.",
    date: "3 weeks ago",
    verified: true,
    projectType: "SaaS Animations"
  },
  {
    id: "rev-8",
    clientName: "Chloe Davenport",
    channel: "Luxury Estates Media • Speed Ramp Reels",
    rating: 5.0,
    text: "Our real estate reels went from 15k views to 1.8M and 2.4M on Instagram. The speed ramps and bass drop sound design make million-dollar architectural tours feel like cinematic movie trailers.",
    date: "3 weeks ago",
    verified: true,
    projectType: "Real Estate & Commercial"
  },
  {
    id: "rev-9",
    clientName: "Julian Vance",
    channel: "Apex Retention Agency (Managing 12 Channels)",
    rating: 4.9,
    text: "We outsource our highest-priority creator edits exclusively to Creative Vibe. Turnarounds are strictly within 48 hours, file organization is immaculate, and retention curves consistently stay above 65%.",
    date: "1 month ago",
    verified: true,
    projectType: "Retention Videos"
  },
  {
    id: "rev-10",
    clientName: "Dr. Maya Patel",
    channel: "Health Science Explained (890K Subs)",
    rating: 5.0,
    text: "Explaining medical science visually is difficult, but Creative Vibe brings our 3D anatomy models, charts, and research papers to life. Audience average watch percentage increased by 22%.",
    date: "1 month ago",
    verified: true,
    projectType: "Documentary Style"
  },
  {
    id: "rev-11",
    clientName: "Samir Al-Mansoor",
    channel: "The Founder's Journey • Executive Studio Podcast",
    rating: 4.9,
    text: "Studio multi-cam editing done right. Vocal clarity is radio-grade, the camera cuts match speaker cadence naturally, and the bonus vertical clips generate over 500K monthly impressions.",
    date: "1 month ago",
    verified: true,
    projectType: "Talking Head & Podcast"
  },
  {
    id: "rev-12",
    clientName: "Toby Wright",
    channel: "Velocity Gaming & Esports (1.5M Subs)",
    rating: 5.0,
    text: "High energy, zero fluff, and insane sound design. He understands YouTube retention algorithms better than full-time agency teams. Absolute masterclass editor.",
    date: "2 months ago",
    verified: true,
    projectType: "Viral Shorts & Reels"
  }
];

// Workflow Stages
export const WORKFLOW_STAGES = [
  {
    step: "01",
    title: "Ingest & Narrative Hook",
    iconName: "Download",
    desc: "Organizing raw footage, syncing dual-system audio, and cutting an irresistible hook in the first 5–10 seconds."
  },
  {
    step: "02",
    title: "Pacing & Zero-Dead-Air Cut",
    iconName: "Scissors",
    desc: "Trimming fluff, dialing in rhythm, punch zooms, strategic pattern interrupts, and seamless B-roll storytelling."
  },
  {
    step: "03",
    title: "Motion Graphics & 3D UI",
    iconName: "Sparkles",
    desc: "Custom kinetic typography, animated 3D map routes, UI product callouts, and clean vector illustrations."
  },
  {
    step: "04",
    title: "DaVinci Cinema Color Grade",
    iconName: "Palette",
    desc: "Skin-tone balancing, custom film grain, mood LUTs, and precise log color matching across multi-camera shoots."
  },
  {
    step: "05",
    title: "Layered Sound Design & Master",
    iconName: "Headphones",
    desc: "Multi-track Foley soundscapes, bass risers, whoosh impacts, vocal mastering, audio ducking, and 4K export."
  }
];

export const TOOL_STACK = [
  "Adobe Premiere Pro",
  "Adobe After Effects",
  "DaVinci Resolve Studio",
  "Blender 3D",
  "Adobe Photoshop",
  "Adobe Audition",
  "Frame.io"
];
