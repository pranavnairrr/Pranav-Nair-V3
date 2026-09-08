export interface Build {
  id: string;
  title: string;
  tag: string;
  desc: string;
  url: string;
}

export const builds: Build[] = [
  {
    id: 'macins-luxe',
    title: 'Macins Luxe Properties',
    tag: 'Website',
    desc: 'Company website — designed and launched end to end, from architecture to copy.',
    url: 'https://macins-luxe-properties.vercel.app/',
  },
  {
    id: 'am-health-hub-site',
    title: 'AM Health Hub',
    tag: 'Website',
    desc: 'Company website — full site architecture, design, and build.',
    url: 'https://darkslategray-emu-669139.hostingersite.com/',
  },
  {
    id: 'mycrm',
    title: 'mycrm',
    tag: 'Product · CRM',
    desc: 'Self-built multi-tenant CRM — Next.js, Supabase/Postgres, Row-Level Security — replacing a costly third-party platform.',
    url: 'https://mycrm.amhealthhub.com/',
  },
];
