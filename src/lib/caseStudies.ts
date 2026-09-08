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
    id: 'macins-group',
    slug: 'macins-group',
    num: '01',
    tag: 'Conglomerate · Multi-Sector · UAE + Global',
    title: 'Macins Group — Multi-Sector Content',
    brief:
      "Working closely with Macins Group's leadership, we built and manage digital marketing for UAE's fastest-growing conglomerate spanning 10+ sectors.",
    strategy:
      "Guided by the leadership's vision for the group, we developed a multi-sector content strategy that maintains brand coherence across wildly different business units — construction, real estate, EV, MEP.",
    execution:
      'Together with the team, we deliver brand positioning content, social media, and campaign materials for the full portfolio across UAE, India, KSA, Qatar.',
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
    num: '02',
    tag: 'Growth & Area Management · Stock Broking · Financial Services',
    title: 'HDFC Securities — Regional Growth & Team Leadership',
    brief:
      "Growth Manager & Area Head owning brand visibility and growth marketing across 71 branches in Ernakulam District — corporate account acquisition, team leadership, and large-scale staff training.",
    strategy:
      'Aligned local marketing execution with compliance and operational standards region-wide, while building corporate acquisition and partnership pipelines across retail, hospitality, and healthcare sectors.',
    execution:
      'Managed and mentored a 25-person regional team, built performance monitoring systems to track marketing and operational KPIs, and delivered training programs for 800+ staff across 71 branches.',
    results: [],
    resultPill: 'Case Study Coming Soon',
    logo: '/logos/Hdfc.png',
    comingSoon: true,
  },
  {
    id: 'motilal-oswal',
    slug: 'motilal-oswal',
    num: '03',
    tag: 'Branch Marketing & Sales Management · Wealth Management · Broking',
    title: 'Motilal Oswal — Branch Marketing & Team Leadership',
    brief:
      'Branch Marketing & Sales Manager leading day-to-day marketing, sales, and administrative functions for the Kerala regional branch — managing two teams, including a team leader and a 40-member RM team.',
    strategy:
      'Offline and local marketing to establish and strengthen local brand presence, while ensuring streamlined operations and compliance with organisational protocols.',
    execution:
      'Supervised and guided staff to improve operational efficiency and support professional development across the branch.',
    results: [],
    resultPill: 'Case Study Coming Soon',
    logo: '/logos/Motilal.jpg',
    comingSoon: true,
  },
  {
    id: 'ventura-securities',
    slug: 'ventura-securities',
    num: '04',
    tag: 'Client Onboarding & Compliance · Broking · Financial Services',
    title: 'Ventura Securities — Client Onboarding & Branch Operations',
    brief:
      'Marketing Representative managing client onboarding and compliance documentation for Ventura Securities, ensuring regulatory adherence across the branch.',
    strategy:
      'Supported branch administration and operational workflow optimisation to keep day-to-day functions running smoothly.',
    execution:
      'Coordinated administrative functions including facility maintenance, documentation, and resource allocation.',
    results: [],
    resultPill: 'Case Study Coming Soon',
    logo: '/logos/Ventura.png',
    comingSoon: true,
  },
  {
    id: 'me-hin-tech',
    slug: 'me-hin-tech',
    num: '05',
    tag: 'Marketing Operations · Tech · Digital Solutions · B2B',
    title: 'Me-Hin Tech Edge Solutions — Marketing Operations',
    brief:
      'Marketing Manager overseeing marketing team operations for Me-Hin Tech Edge Solutions, a technology company delivering digital transformation solutions for businesses.',
    strategy:
      'Supported creative ideation for investor-focused video newsletters and product walkthroughs, and coordinated communication between sales representatives and management for operational efficiency.',
    execution:
      'Oversaw sales data collection and reporting to streamline performance tracking, provided administrative support to sales teams, and assisted in sales team training and performance monitoring.',
    results: [],
    resultPill: 'Case Study Coming Soon',
    comingSoon: true,
  },
  {
    id: 'storyfactory',
    slug: 'storyfactory',
    num: '06',
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
    num: '07',
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
    num: '08',
    tag: 'Premium Clinic · Content · Social Media · JBR Dubai',
    title: 'Aries Dental — Premium Brand Presence',
    brief:
      "Working with Aries Dental & Aesthetic's leadership, we manage content creation and social media strategy for one of Dubai's top-rated aesthetic clinics at JBR.",
    strategy:
      "Guided by the clinic's leadership and their vision for a 5-star patient experience, we built an aspirational, premium content system — healthcare-forward visual language with luxury execution.",
    execution:
      'As a team, we produce 5-star social content, procedure showcases, patient journey content, clinic atmosphere visuals, and campaign creatives.',
    results: [
      { metric: 'Brand Positioning', before: 'Generic clinic', after: '5-Star premium' },
      { metric: 'Content Quality', before: 'Inconsistent', after: 'Editorial grade' },
      { metric: 'Visual Identity', before: 'Fragmented', after: 'Cohesive system' },
    ],
    resultPill: '5-Star Brand Presence Delivered',
  },
];
