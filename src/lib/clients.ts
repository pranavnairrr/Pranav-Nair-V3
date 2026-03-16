export interface Client {
  id: string;
  industry: string;
  name: string;
  desc: string;
  loc: string;
  href: string;
}

export const clients: Client[] = [
  {
    id: 'am-health-hub',
    industry: 'Medical Tourism · Healthcare',
    name: 'AM Health Hub',
    desc: 'Dubai-based medical tourism platform connecting patients to world-class care across 40+ countries. Backed by Aries Group & Macins Group.',
    loc: 'Dubai, UAE · Global',
    href: 'https://www.amhealthhub.com',
  },
  {
    id: 'aries-dental',
    industry: 'Aesthetic · Dental',
    name: 'Aries Dental & Aesthetic',
    desc: 'Premium 5-star dental and aesthetic clinic at JBR Walk, Dubai. Haute, holistic, health-forward brand at one of Dubai\'s most iconic destinations.',
    loc: 'JBR Walk · Dubai Marina',
    href: 'https://ariesclinic.com',
  },
  {
    id: 'aries-group',
    industry: 'Healthcare · Wellness Group',
    name: 'Aries Group',
    desc: 'Parent group behind AM Health Hub and Aries Dental & Aesthetic. 35 years of cumulative healthcare and wellness expertise across multiple countries.',
    loc: 'Dubai, UAE',
    href: 'https://ariesclinic.com',
  },
  {
    id: 'macins-group',
    industry: 'Construction · Fit-Out · EV · Real Estate',
    name: 'Macins Group',
    desc: "UAE's fastest-growing diversified conglomerate. Interior fit-out, MEP, real estate, EV solutions across 10+ sectors in UAE, India, KSA & Qatar.",
    loc: 'UAE · India · KSA · Qatar',
    href: 'https://macinsgroup.com',
  },
];
