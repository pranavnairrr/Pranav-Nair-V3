export interface CaseStudyResult {
  metric: string;
  before: string;
  after: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  num: string;
  tag: string;
  title: string;
  brief: string;
  strategy: string;
  execution: string;
  results: CaseStudyResult[];
  resultPill: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'am-health-hub',
    slug: 'am-health-hub',
    num: '01',
    tag: 'Brand Identity · Healthcare · Medical Tourism',
    title: 'Building AM Health Hub From Zero',
    brief:
      'Developed and managed complete content and social presence for AM Health Hub — a medical tourism platform operating across 40+ countries. Started from zero brand presence.',
    strategy:
      'Built complete visual identity, content calendar, and full campaign strategy from the ground up. AI-assisted content production to deliver consistent high-volume output.',
    execution:
      'Brand visual system, social media content, email campaigns, medical tourism guides, 30+ pieces of content per month.',
    results: [
      { metric: 'Instagram Presence', before: 'Zero', after: 'Active, growing' },
      { metric: 'Monthly Content', before: '0 pieces', after: '30+ pieces' },
      { metric: 'Brand Consistency', before: 'None', after: 'Full system' },
      { metric: 'Inquiry Channels', before: 'Word of mouth', after: 'Multi-channel' },
    ],
    resultPill: 'Full Brand Built from Scratch',
  },
  {
    id: 'aries-dental',
    slug: 'aries-dental',
    num: '02',
    tag: 'Premium Clinic · Content · Social Media · JBR Dubai',
    title: 'Aries Dental — Premium Brand Presence',
    brief:
      'Managed content creation and social media strategy for Aries Dental & Aesthetic at JBR — one of Dubai\'s top-rated aesthetic clinics.',
    strategy:
      "Built aspirational, premium content system matching the clinic's 5-star experience. Healthcare-forward visual language with luxury execution.",
    execution:
      '5-star social content, procedure showcases, patient journey content, clinic atmosphere visuals, campaign creatives.',
    results: [
      { metric: 'Brand Positioning', before: 'Generic clinic', after: '5-Star premium' },
      { metric: 'Content Quality', before: 'Inconsistent', after: 'Editorial grade' },
      { metric: 'Visual Identity', before: 'Fragmented', after: 'Cohesive system' },
    ],
    resultPill: '5-Star Brand Presence Delivered',
  },
  {
    id: 'macins-group',
    slug: 'macins-group',
    num: '03',
    tag: 'Conglomerate · Multi-Sector · UAE + Global',
    title: 'Macins Group — Multi-Sector Content',
    brief:
      "Created and managed digital marketing for Macins Group — UAE's fastest-growing conglomerate spanning 10+ sectors.",
    strategy:
      'Multi-sector content strategy that maintains brand coherence across wildly different business units — construction, real estate, EV, MEP.',
    execution:
      'Brand positioning content, social media, campaign materials for full portfolio across UAE, India, KSA, Qatar.',
    results: [
      { metric: 'Sectors Covered', before: 'Inconsistent', after: '10+ sectors unified' },
      { metric: 'Geographic Reach', before: 'Local', after: 'UAE·India·KSA·Qatar' },
      { metric: 'Brand System', before: 'None', after: 'Multi-sector built' },
    ],
    resultPill: 'Multi-Sector System Built',
  },
];
