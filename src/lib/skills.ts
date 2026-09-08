export interface SkillItem {
  label: string;
  icon?: string; // key into brandIcons, when a real logo exists for it
}

export interface SkillGroup {
  category: string;
  items: SkillItem[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Creative & Marketing',
    items: [
      { label: 'Canva' },
      { label: 'Adobe Premiere Pro' },
      { label: 'Social Media' },
      { label: 'Branding' },
      { label: 'Graphic Design' },
      { label: 'Video Production' },
      { label: 'Photography' },
      { label: 'Creative Direction' },
    ],
  },
  {
    category: 'Digital & Growth',
    items: [
      { label: 'Meta Ads', icon: 'meta' },
      { label: 'SEO' },
      { label: 'Content Strategy' },
      { label: 'Influencer Marketing' },
      { label: 'Campaign Management' },
      { label: 'Analytics' },
      { label: 'WhatsApp API', icon: 'whatsapp' },
      { label: 'Landing Pages' },
    ],
  },
  {
    category: 'CRM & Technology',
    items: [
      { label: 'Odoo', icon: 'odoo' },
      { label: 'Custom CRM' },
      { label: 'Next.js', icon: 'nextjs' },
      { label: 'NestJS', icon: 'nestjs' },
      { label: 'PostgreSQL', icon: 'postgresql' },
      { label: 'Supabase', icon: 'supabase' },
      { label: 'Docker', icon: 'docker' },
      { label: 'Cloudflare', icon: 'cloudflare' },
    ],
  },
  {
    category: 'Business',
    items: [
      { label: 'Sales' },
      { label: 'Business Development' },
      { label: 'Lead Generation' },
      { label: 'CRM' },
      { label: 'Marketing Operations' },
      { label: 'Team Management' },
    ],
  },
];
