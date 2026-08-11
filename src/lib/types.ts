// =============================================================================
// Urban Safai - TypeScript Type Definitions
// =============================================================================

/** FAQ question/answer pair */
export interface FAQ {
  question: string;
  answer: string;
}

/** Cleaning service offered by Urban Safai */
export interface Service {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  icon: string; // lucide-react icon name
  price: string;
  priceUnit: string;
  features: string[];
  category: "cleaning" | "specialized";
  faq: FAQ[];
}

/** Cleaning package / bundle */
export interface Package {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  priceNote: string;
  features: string[];
  popular: boolean;
  color: string;
}

/** Customer review / testimonial */
export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  service: string;
  avatar: string;
}

/** Service area with list of localities */
export interface ServiceArea {
  id: string;
  name: string;
  areas: string[];
}

/** Blog post */
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  authorAvatar: string;
  author: string;
  category: string;
  readTime?: string;
}

/** Booking form submission data */
export interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  time: string;
  address: string;
  message: string;
}

/** Contact form submission data */
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

/** Statistic displayed on testimonial / hero section */
export interface TestimonialStat {
  label: string;
  value: string;
}

/** Pricing table row */
export interface PricingItem {
  service: string;
  price: string;
  note?: string;
}

/** Pricing table category */
export interface PricingCategory {
  category: string;
  items: PricingItem[];
}

/** Social media links */
export interface SocialLinks {
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
  linkedin: string;
}

/** Booking item with service details and quantity */
export interface BookingItem {
  serviceId: string;
  serviceName: string;
  price: string;
  quantity: number;
  subtotal: string;
}
