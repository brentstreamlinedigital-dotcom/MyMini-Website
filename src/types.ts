export type CategoryType = 
  | 'cars'
  | 'motorcycles'
  | 'homes'
  | 'pets'
  | 'people'
  | 'businesses'
  | 'buildings'
  | 'collectibles'
  | 'memories'
  | 'other';

export type SizeTier = 'mini' | 'classic' | 'large' | 'collector';

export type FinishTier = 'standard' | 'premium_painted' | 'collector_edition';

export interface SizeOption {
  id: SizeTier;
  name: string;
  tagline: string;
  dimensions: string;
  dimensionsMetric: string;
  recommendedUse: string;
  comparisonObject: string;
  basePrice: number;
  popular?: boolean;
}

export interface FinishOption {
  id: FinishTier;
  name: string;
  badge: string;
  description: string;
  features: string[];
  priceMultiplier: number;
  addedCost: number;
  leadTimeDays: number;
}

export interface ConfiguratorState {
  category: CategoryType;
  customCategoryName?: string;
  uploadedPhotos: Array<{
    id: string;
    url: string;
    name: string;
    angle?: string;
  }>;
  size: SizeTier;
  finish: FinishTier;
  personalizationText: string;
  specialInstructions: string;
  includeDisplayPlinth: boolean;
  rushProduction: boolean;
}

export interface CartItem {
  id: string;
  title: string;
  category: CategoryType;
  size: SizeTier;
  finish: FinishTier;
  price: number;
  photos: string[];
  personalizationText?: string;
  specialInstructions?: string;
  includeDisplayPlinth: boolean;
  rushProduction: boolean;
  createdAt: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  category: CategoryType;
  originalPhotoUrl: string;
  miniaturePhotoUrl: string;
  description: string;
  story: string;
  dimensions: string;
  scale: string;
  finish: string;
  turnaroundTime: string;
  customerName: string;
  customerLocation: string;
  tags: string[];
  featured?: boolean;
  macroDetails?: Array<{
    title: string;
    description: string;
    imageUrl: string;
  }>;
}

export interface Testimonial {
  id: string;
  rating: number;
  quote: string;
  customerName: string;
  location: string;
  miniatureType: string;
  photoUrl: string;
  verified: boolean;
  date: string;
}

export type OrderStatusStage = 
  | 'photo_received'
  | 'model_in_progress'
  | 'model_approved'
  | 'in_production'
  | 'quality_check'
  | 'shipped'
  | 'delivered';

export interface OrderTimelineEvent {
  stage: OrderStatusStage;
  label: string;
  date?: string;
  completed: boolean;
  current: boolean;
  description: string;
  visualIcon: string;
}

export interface OrderRecord {
  orderNumber: string;
  customerName: string;
  email: string;
  itemTitle: string;
  category: CategoryType;
  size: string;
  finish: string;
  currentStage: OrderStatusStage;
  estimatedDelivery: string;
  carrier?: string;
  trackingNumber?: string;
  timeline: OrderTimelineEvent[];
  previewPhotoUrl: string;
  digitalModelRenderUrl?: string;
  finalPhotoUrl?: string;
}
