export interface PortfolioItem {
  id: string;
  category: string;
  tag: string;
  title: string;
  desc: string;
  cta: string;
  platform: string;
  href: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'adobe',
    category: 'all',
    tag: 'Adobe Portfolio · Full Case Studies',
    title: 'CREATIVE\nPORTFOLIO',
    desc: 'Deep-dive case studies, brand identity work, campaign visuals, and creative direction — documented in full detail. Everything from concept to execution, with the strategy behind each piece explained.',
    cta: 'Explore on Adobe Portfolio',
    platform: 'ADOBE',
    href: 'https://pranavnairrr.myportfolio.com',
  },
  {
    id: 'canva',
    category: 'all',
    tag: 'Canva Portfolio · Visual Showcase',
    title: 'VISUAL\nSHOWCASE',
    desc: "Social media content, poster designs, reels thumbnails, and brand visuals — curated into a visual showcase. The actual content I've created for real brands, real campaigns, real results.",
    cta: 'Explore on Canva',
    platform: 'CANVA',
    href: 'https://pranavnair.my.canva.site/',
  },
];
