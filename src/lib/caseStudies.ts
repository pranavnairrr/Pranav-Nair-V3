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
  logo?: string;
  comingSoon?: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'am-health-hub',
    slug: 'am-health-hub',
    num: '01',
    tag: 'Google Ads · Paid Search · Medical Tourism · Dubai, UAE',
    title: 'AM Health Hub — Growth Engine',
    brief:
      'From no digital presence to a functioning lead pipeline serving patients across Nigeria and Africa — a cost per submission of $29, 569 total conversions, and $16,465 in total spend. Built the full infrastructure: website, measurement stack, campaigns, CRM pipeline, and intake process.',
    strategy:
      'Sequenced the build correctly: website and tracking infrastructure before any ads. One clean conversion action (confirmation page view), everything routed through GTM. Three-tier keyword architecture — high-intent procedural, condition-awareness, and geographic-intent terms — with a pre-launch negative keyword list to protect budget from day one.',
    execution:
      'Six intent-segmented campaigns launched August 2025. Six-week audit uncovered Quality Score 5.74, mobile LCP 5.4s, keyword cannibalization, and 68% impression share lost to quality. Full rebuild: WebP images + lazy loading cut LCP to 1.9s; campaign consolidation eliminated cannibalization; ad copy rewrite pushed QS to 7.9; tCPA smart bidding introduced after 30+ conversions per campaign. 180+ negative keywords added. Odoo CRM implemented to track full patient pipeline post-submission. Intake process redesigned around patient behaviour to reduce drop-off.',
    results: [
      { metric: 'Cost Per Submission', before: '$120+ (early campaigns)', after: '$29 blended' },
      { metric: 'Quality Score', before: '5.74 average', after: '7.9 average' },
      { metric: 'Mobile LCP', before: '5.4s — Poor', after: '1.9s — Good' },
      { metric: 'Impression Share Lost', before: '68%', after: '11%' },
      { metric: 'Total Conversions', before: '0', after: '569' },
      { metric: 'Campaigns Budget-Limited', before: '6 of 6', after: '0 of 5' },
    ],
    resultPill: '$29 CPA · 569 Conversions · Growth Engine Built',
    logo: '/logos/AM Health.png',
  },
  {
    id: 'macins-group',
    slug: 'macins-group',
    num: '02',
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
    logo: '/logos/Macins.png',
  },
  {
    id: 'hdfc-securities',
    slug: 'hdfc-securities',
    num: '03',
    tag: 'Broking · Stock Market · Financial Services',
    title: 'HDFC Securities — Financial Content',
    brief:
      'Content strategy and digital marketing for HDFC Securities — one of India\'s leading stock broking firms. Built investor-focused content that simplifies complex financial products.',
    strategy:
      'Investor education content, product explainers, and campaign creatives tailored for retail and HNI audiences.',
    execution:
      'Social media content, campaign materials, investor guides, product communications across digital channels.',
    results: [],
    resultPill: 'Case Study Coming Soon',
    logo: '/logos/Hdfc.png',
    comingSoon: true,
  },
  {
    id: 'motilal-oswal',
    slug: 'motilal-oswal',
    num: '04',
    tag: 'Wealth Management · Equity Research · Broking',
    title: 'Motilal Oswal — Wealth & Equity Content',
    brief:
      'Digital content and marketing for Motilal Oswal — a premier wealth management and equity research brand. Focused on building trust with high-net-worth investors.',
    strategy:
      'Premium content positioning that communicates research depth and wealth management expertise to sophisticated investors.',
    execution:
      'Social media strategy, campaign creatives, investor communications, equity research content packaging.',
    results: [],
    resultPill: 'Case Study Coming Soon',
    logo: '/logos/Motilal.jpg',
    comingSoon: true,
  },
  {
    id: 'ventura-securities',
    slug: 'ventura-securities',
    num: '05',
    tag: 'Broking · Financial Services · Retail Investing',
    title: 'Ventura Securities — Retail Broking Content',
    brief:
      'Content creation and digital marketing for Ventura Securities — a trusted broking platform serving retail and institutional investors across India.',
    strategy:
      'Accessible, trust-building content for retail investors. Clear communication of complex financial products and market insights.',
    execution:
      'Social media content, investor education campaigns, product launch creatives, digital brand communications.',
    results: [],
    resultPill: 'Case Study Coming Soon',
    logo: '/logos/Ventura.png',
    comingSoon: true,
  },
  {
    id: 'me-hin-tech',
    slug: 'me-hin-tech',
    num: '06',
    tag: 'Tech · Digital Solutions · B2B',
    title: 'Me-Hin Tech Edge Solutions',
    brief:
      'Brand building and content strategy for Me-Hin Tech Edge Solutions — a technology company delivering digital transformation solutions for businesses.',
    strategy:
      'Positioned Me-Hin as a credible B2B tech partner through thought leadership content and clear product communication.',
    execution:
      'Brand identity, digital content, case study production, LinkedIn strategy, and B2B campaign materials.',
    results: [],
    resultPill: 'Case Study Coming Soon',
    comingSoon: true,
  },
  {
    id: 'storyfactory',
    slug: 'storyfactory',
    num: '07',
    tag: 'YouTube · Content Creation · Video Strategy',
    title: 'Storyfactory — YouTube Channel',
    brief:
      'Built and managed Storyfactory — a YouTube channel focused on storytelling, content strategy, and creator economy insights. Grew from zero to an engaged subscriber base.',
    strategy:
      'Data-driven content calendar, SEO-optimised titles and thumbnails, consistent upload schedule with audience retention focus.',
    execution:
      'Channel strategy, video scripting, thumbnail design, community management, analytics-driven optimisation.',
    results: [],
    resultPill: 'Case Study Coming Soon',
    comingSoon: true,
  },
  {
    id: 'moins-view',
    slug: 'moins-view',
    num: '08',
    tag: 'YouTube · Commentary · Content Strategy',
    title: "Moin's View — YouTube Channel",
    brief:
      "Managed content strategy and growth for Moin's View — a YouTube channel covering commentary, opinions, and culture. Focus on building a loyal, engaged audience.",
    strategy:
      'Consistent publishing schedule, trend-driven content calendar, audience engagement strategy, and cross-platform distribution.',
    execution:
      'Video strategy, scripting support, SEO optimisation, thumbnail direction, community building, analytics review.',
    results: [],
    resultPill: 'Case Study Coming Soon',
    comingSoon: true,
  },
  {
    id: 'aries-dental',
    slug: 'aries-dental',
    num: '09',
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
];
