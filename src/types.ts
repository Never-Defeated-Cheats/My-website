export type VideoFormat = '16:9' | '9:16';

export interface VideoItem {
  id: string;
  title: string;
  client: string;
  views: string;
  aspectRatio: VideoFormat;
  previewUrl: string;
  masterUrl: string;
  poster?: string;
  duration?: string;
  description?: string;
  category?: string;
  isFeatured?: boolean;
}

export interface NicheCategory {
  key: string;
  name: string;
  iconName: string;
  subtitle: string;
  description: string;
  vertical: VideoItem[];
  horizontal: VideoItem[];
}

export interface PricingPlan {
  id: string;
  nicheKey: string;
  name: string;
  iconName: string;
  badge?: string;
  price: string;
  minPrice: string;
  maxPrice: string;
  period: string;
  rangeNote: string;
  desc: string;
  features: string[];
  featured?: boolean;
}

export interface ClientReview {
  id: string;
  clientName: string;
  channel: string;
  rating: number;
  avatar?: string;
  text: string;
  date: string;
  verified: boolean;
  projectType?: string;
}

export interface BookingFormData {
  projectType: string;
  clientName: string;
  channelName: string;
  email: string;
  timeSlot: string;
  refLink: string;
  footageLink: string;
  whatsapp: string;
  instagram?: string;
  discord?: string;
  projectDetails: string;
}

export interface ToastMessage {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
}
