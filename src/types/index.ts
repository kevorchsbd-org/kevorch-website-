export interface Service {
  id: string;
  title: string;
  category: 'SEO' | 'Paid Media' | 'Social & Branding' | 'Design & Dev' | 'Growth & Sales' | 'Creative Design' | 'Creative Media';
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  features: string[];
  metrics: {
    avgGrowth: string;
    timeline: string;
    roas: string;
  };
  featured?: boolean;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  category: string;
  summary: string;
  challenge: string;
  solution: string;
  results: {
    roi: string;
    revenue: string;
    trafficIncrease: string;
    conversionRate: string;
  };
  tags: string[];
  imageUrl: string;
  accentColor: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  image: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface Testimonial {
  id: string;
  author: string;
  company: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
  metric: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Services' | 'Pricing' | 'Process';
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
  stats: string;
}
