export interface PortfolioItem {
  id: string;
  category: string;
  tag: string;
  title: string;
  desc: string;
  cta: string;
  platform: string;
  href: string;
  thumbnail: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'adobe',
    category: 'all',
    tag: 'Adobe Portfolio · In-Depth Breakdowns',
    title: 'CREATIVE\nPORTFOLIO',
    desc: 'Brand identity work, campaign visuals, and creative direction — documented in full detail. Everything from concept to execution, with the thinking behind each piece explained.',
    cta: 'Explore on Adobe Portfolio',
    platform: 'ADOBE',
    href: 'https://pranavnairrr.myportfolio.com',
    thumbnail: '/screenshots/adobe-portfolio.png',
  },
  {
    id: 'canva',
    category: 'all',
    tag: 'Canva Portfolio · Visual Showcase',
    title: 'VISUAL\nSHOWCASE',
    desc: 'Social media content, poster designs, reels thumbnails, and brand visuals — curated into a visual showcase.',
    cta: 'Explore on Canva',
    platform: 'CANVA',
    href: 'https://pranavnair.my.canva.site/',
    thumbnail: '/screenshots/canva-portfolio.png',
  },
];
