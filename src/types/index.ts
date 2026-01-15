export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface Testimonial {
  name: string;
  role: string;
  organisation: string;
  content: string;
  rating: number;
  verified?: boolean;
  logo?: string;
}

export interface Stat {
  metric: string;
  label: string;
  icon: string;
}

export interface PricingTier {
  name: string;
  description: string;
  priceLabel: string;
  price?: number;
  priceUnit?: string;
  billingPeriod?: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

export interface Resource {
  type: 'blog' | 'case-study' | 'publication' | 'webinar';
  title: string;
  description: string;
  date: string;
  image?: string;
}
