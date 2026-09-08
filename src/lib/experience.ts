export interface ExperienceEntry {
  id: string;
  slug: string;
  num: string;
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  duties: string[];
  logo?: string;
  current?: boolean;
  links?: { label: string; url: string }[];
}

export const experience: ExperienceEntry[] = [
  {
    id: 'aries-macins',
    slug: 'aries-macins-group',
    num: '01',
    company: 'Aries Group & Macins Group',
    role: 'Head of Marketing',
    period: 'July 2025 — Present',
    location: 'Dubai, UAE',
    summary:
      'Own full-funnel marketing strategy and execution across five business units — AM Health Hub, Aries Dental & Aesthetic Clinic, Macins Luxe Properties, Macins Contracting, and the Chairman\'s personal brand — reporting directly to founders and leadership.',
    duties: [
      'Independently designed, built, and shipped a self-built multi-tenant CRM (Next.js, Supabase/Postgres, Row-Level Security), replacing a costly third-party platform.',
      'Designed and launched company websites, owning full site architecture end to end.',
      'Conceived, built, and shipped high-converting landing pages, including a large-scale community appreciation campaign and an interactive lead-generation campaign.',
      'Led Google Ads paid media strategy — diagnosing Quality Score, impression share, and landing page speed issues, then restructuring campaigns to improve ROAS and reduce CAC.',
      'Authored an integrated cross-entity marketing strategy, formalized into a leadership-facing strategy document.',
    ],
    logo: '/logos/Macins.png',
    current: true,
    links: [
      { label: 'AM Health Hub — Website', url: 'https://darkslategray-emu-669139.hostingersite.com/' },
      { label: 'Macins Luxe Properties — Website', url: 'https://macins-luxe-properties.vercel.app/' },
      { label: 'mycrm — Product', url: 'https://mycrm.amhealthhub.com/' },
    ],
  },
  {
    id: 'hdfc-securities',
    slug: 'hdfc-securities',
    num: '02',
    company: 'HDFC Securities Limited',
    role: 'Growth Manager | Area Head',
    period: 'May 2023 — Jan 2025',
    location: 'Ernakulam District, India',
    summary:
      'Owned brand visibility and growth marketing across 71 branches, aligning local marketing execution with compliance and operational standards.',
    duties: [
      'Sourced, nurtured, and closed corporate acquisition and partnership accounts across retail, entertainment, and healthcare sectors.',
      'Managed and mentored a state-level team of 25, driving performance efficiency and go-to-market execution.',
      'Delivered training programs for 800+ staff across 71 branches, improving product knowledge and service-led conversion.',
      'Built performance monitoring systems to track marketing and operational KPIs.',
    ],
    logo: '/logos/Hdfc.png',
  },
  {
    id: 'motilal-oswal',
    slug: 'motilal-oswal',
    num: '03',
    company: 'Motilal Oswal Financial Services Limited',
    role: 'Branch Marketing & Sales Manager',
    period: 'May 2022 — Apr 2023',
    location: 'Kerala, India',
    summary:
      'Led day-to-day marketing, sales, and administrative functions for the Kerala regional branch, managing two teams — a team leader and a 40-member RM team.',
    duties: [
      'Ensured streamlined operations and compliance with organisational protocols.',
      'Ran offline and local marketing to establish local brand presence.',
      'Supervised and guided staff, improving operational efficiency and professional development.',
    ],
    logo: '/logos/Motilal.jpg',
  },
  {
    id: 'me-hin-tech',
    slug: 'me-hin-tech',
    num: '04',
    company: 'Me-Hin Tech Edge Solutions',
    role: 'Marketing Manager',
    period: 'Mar 2019 — Feb 2021',
    location: 'India',
    summary: 'Managed marketing team operations for a technology solutions company.',
    duties: [
      'Supported creative ideation for investor-focused video newsletters and product walkthroughs.',
      'Oversaw sales data collection and reporting to streamline performance tracking.',
      'Provided administrative support to sales teams and coordinated communication between sales representatives and management.',
      'Assisted in sales team training and performance monitoring.',
    ],
  },
  {
    id: 'ventura-securities',
    slug: 'ventura-securities',
    num: '05',
    company: 'Ventura Securities Limited',
    role: 'Marketing Representative',
    period: 'May 2017 — Jun 2018',
    location: 'India',
    summary: 'Managed client onboarding and compliance documentation, ensuring regulatory adherence.',
    duties: [
      'Assisted in branch administration, supporting facility management and operational workflow optimisation.',
      'Coordinated administrative functions including facility maintenance, documentation, and resource allocation.',
    ],
    logo: '/logos/Ventura.png',
  },
];
