import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Building a Growth Engine from Zero — AM Health Hub · Pranav Nair',
  description:
    'From no digital presence to $29 CPA and 569 conversions. The full Google Ads case study for AM Health Hub — medical tourism, Dubai UAE.',
};

const chapters = [
  {
    num: '01',
    date: 'July 8, 2025',
    title: 'Day One. Everything Is Missing.',
    body: `The concept was sharp: connect patients in underserved markets — primarily Nigeria and wider Africa — with specialist healthcare in India. Haematology. Bone marrow transplants. Oncology. Complex surgeries where the gap between what's available locally and what's needed is significant.

The model was simple: patients seeking specialist medical care — primarily from Nigeria and across Africa — get connected to hospitals and doctors in India. Everything in between, from the initial consultation to travel and appointments, is handled end to end.

Good model. Real need. Experienced founders. And then I logged into the systems for the first time.`,
    pull: `There was no website. No Google Analytics. No Search Console. No Google Ads account. No tracking of any kind. The company had been operating on referrals and networks, with no digital presence to speak of.`,
    body2: `I want to be precise about what "no digital presence" actually means in practice, because it's easy to read that and think I'm exaggerating. There was a domain. There was a placeholder — a holding page — but nothing that could receive traffic, convert a visitor into a lead, or tell me anything about who was finding us, how they were finding us, or what they did when they got there. No pixels, no tags, no goals, no events. If someone in Lagos had typed our company name into Google that week and landed somewhere, we would have had no record of it happening.

For a company targeting patients in Nigeria and Africa who are desperately researching treatment options — often at two in the morning, on a phone, terrified about a diagnosis they received that week — that was a problem that needed to be solved before anything else.

I spent the first week doing nothing but mapping what needed to exist before I could build anything useful. Website. Analytics. Search Console. Tag Manager. Conversion tracking. Account structure. Keyword research. Landing pages. Campaigns last.`,
  },
  {
    num: '02',
    date: 'July 2025',
    title: 'Getting the Website Right. Before the Ads, Before Everything.',
    body: `The instinct in this situation is to get the ads running first and sort the website out later. I understood the pressure — the founders wanted leads, and they wanted them soon. But sending paid traffic to a placeholder page burns budget and proves nothing. I made the case for sequencing it correctly, and the first month was infrastructure.

The company had an external IT team who handled the technical build. My role was to define everything that would affect ad performance and conversion: the site architecture, the brand system, the page structure, the copy, and critically — the performance standards the site had to meet before we pointed paid traffic at it. Mobile page load speed is a direct input into Google's Quality Score via the "Landing Page Experience" component. A slow site means higher CPCs in every single auction, indefinitely. So those performance requirements weren't aesthetic preferences — they were ad account constraints I set upfront and worked with the IT team to hit.

The brand direction I defined was built around the nature of the service. Patients arriving at this site have usually already been through something frightening. Deep evergreen tones, restrained layout, clean typography — nothing that felt clinical or transactional. The content on every page was structured around the questions a patient or family member actually types at two in the morning, not what a company brochure would say about itself.

Eight core pages: home, services, about, the doctor consultation pathway, condition-specific pages for haematology and oncology, a destinations page for the India hospital network, and a contact page built around a single focused lead form. Site went live in late July — functional, reasonably fast on mobile, and with tracking in place from day one.`,
    callout: `Separately: I also developed a full rebuilt version of the site independently in Next.js — a complete multi-page rebuild with improved architecture and performance. That version is currently under internal review. It's the version I'd point to as a cleaner example of what the site should eventually become.`,
  },
  {
    num: '03',
    date: 'Late July 2025',
    title: "Setting Up the Measurement Stack. The Unglamorous Part Nobody Talks About.",
    body: `Nobody writes case studies about setting up Google Search Console. Nobody posts about linking GA4 to Tag Manager on a Tuesday afternoon. It doesn't have a dramatic number attached to it. But I want to write about it here, because if you skip this step — or rush it — you spend months making decisions based on data you can't actually trust. I've seen what that looks like. I wasn't going to let it happen here.`,
    subsections: [
      {
        title: 'Google Search Console',
        body: `First thing I verified once the site was live. Submitted the sitemap. Confirmed domain ownership via DNS record. Began monitoring for crawl errors and index coverage from day one. This isn't directly about ads — it's about making sure Google can see what we've built, and catching technical issues before they compound quietly over weeks. Within the first fortnight I could see which pages were indexing and at what speed. No surprises later.`,
      },
      {
        title: 'Google Analytics 4',
        body: `Set up a fresh GA4 property connected to the site through Google Tag Manager. Configured custom events for the moments in the user journey that actually mattered: scroll depth on service pages, time on the doctor consultation page, and — most importantly — form submission completions. If we couldn't reliably record when a form was submitted successfully, nothing the ads account told us about conversions could be trusted.`,
      },
      {
        title: 'Google Tag Manager',
        body: `Everything routes through GTM. Every pixel, every event trigger, every conversion tag lives in one place. The reason is operational: when anything needs to change — a new conversion action, a Meta Ads pixel, a heat mapping script — it happens in GTM without touching the site's codebase. In a setup where I was the only person managing both the website and the ads, this kind of system discipline was not optional. It was the difference between being able to move fast and spending days debugging tracking issues.`,
      },
      {
        title: 'Google Ads Conversion Tracking',
        body: `One conversion action. Confirmation page view — the page that only loads after a form is submitted successfully. Not a button click, which fires even when form validation fails. Not a page visit to the contact page, which tells you nothing about intent. The confirmation page only appears when a genuine lead has been generated. That became the single signal the ads account would optimise for. Clean, unambiguous, accurate.`,
      },
    ],
    finding: {
      label: 'Why this sequencing mattered',
      body: `Before any campaign spent a single dirham, we had a definitive answer to the question: what is a conversion, and how do we know when one happens? Most accounts I've reviewed don't have this. They have four or five conversion actions, two of which are duplicates, one of which fires on the wrong trigger, and the algorithm is optimising for something that doesn't correspond to actual lead generation. We didn't have that problem because we built the measurement layer before the campaign layer.`,
    },
  },
  {
    num: '04',
    date: 'August 2025',
    title: 'The Research Phase. Understanding What We Were Actually Selling.',
    body: `Campaigns went live on August 15th. But before I touched the ads interface, I spent three weeks in research that most people skip. I want to walk through what that looked like, because it shaped every structural decision I made later — including some decisions I had to revisit when the data came back and told me I'd been wrong.`,
    subsections: [
      {
        title: 'Understanding the Patient',
        body: `The first thing I needed to internalise was that we were not selling a product. We were trying to be findable at one of the worst moments of someone's life. A family in Nigeria whose father has just been told he has a blood disorder the local hospital can't adequately treat. Someone in Oman whose child needs a bone marrow transplant and the pathway to getting it is unclear. These people don't search the way someone shopping for a phone searches. They search with urgency, with very specific terminology they've picked up from doctors and medical reports, and they search at strange hours when the fear is loudest.

That changes everything about how you write ad copy, how you structure landing pages, and which search terms you decide to be present for. You are not creating demand. You are being findable at the moment demand already exists and is acute.`,
      },
      {
        title: 'Keyword Architecture',
        body: `I mapped the keyword landscape in three layers. High-intent procedural terms: people who know exactly what they need and are looking for where to get it. "Bone marrow transplant India cost." "BMT specialist hospital India." "Haematology treatment abroad." Low volume, very high intent. These are the terms where presence matters most.

Condition-awareness terms: people with a diagnosis who are still exploring the treatment pathway. "Aplastic anaemia treatment options." "Thalassaemia specialist abroad." "Best country for blood cancer treatment." A step further up the funnel, but still serious intent.

Geographic-intent terms: patients in our target markets looking for routes to care. "Medical treatment in India from Nigeria." "Affordable cancer treatment abroad from Africa." "Travel for surgery India." These were critical for reaching the specific audiences the company was built to serve.

I also built the negative keyword list before launch — not after. Medical queries attract enormous irrelevant traffic. People searching for symptoms. People researching without any intent to seek treatment abroad. People looking for jobs in Indian hospitals. If I didn't exclude these proactively, the first weeks of spend would disappear into clicks that were never going to become leads.`,
      },
    ],
  },
  {
    num: '05',
    date: 'August 15, 2025',
    title: 'The First Campaigns Go Live.',
    body: `August 15th. Six campaigns structured around intent tiers — each with its own budget, its own tightly themed ad groups, its own corresponding landing page. Responsive Search Ads across every group, fifteen headlines and four descriptions each, written to the specific search intent of each keyword cluster rather than generic copy.

Extensions built out fully from day one: callouts for the free consultation and end-to-end coordination, sitelinks to specific condition pages rather than the homepage, structured snippets listing actual procedures. The goal was to make the ad useful before someone even clicked — so the clicks we paid for came from people who already understood what we offered.

The first few weeks were deliberately treated as a data collection phase. Before smart bidding can work efficiently, the account needs a minimum volume of conversion signal. Running manual CPC initially and letting the campaigns accumulate real search term data was the plan — not to hit targets yet, but to have something honest to audit. After about six weeks, I ran that audit. The data had found some things worth looking at.`,
  },
  {
    num: '06',
    date: 'September — October 2025',
    title: 'The Six-Week Audit. What the Data Actually Showed.',
    body: `The impression share report was the first thing that flagged. We were losing a significant chunk of available impressions — and the reason wasn't budget. Google was choosing not to show our ads as often as it could because the ads-to-landing-page experience wasn't scoring well enough in its auction logic. That pulled me into a full account audit: Quality Score breakdown by keyword, Page Speed Insights on every landing page, search term analysis, campaign structure review.`,
    metrics: [
      { value: '5.74', label: 'Average Quality Score (target ≥7)', bad: true },
      { value: '68%', label: 'Impression Share Lost to Quality', bad: true },
      { value: '5.4s', label: 'Mobile LCP (threshold: 2.5s)', bad: true },
      { value: '$120+', label: 'Blended CPA — early campaigns', bad: true },
    ],
    body2: `A Quality Score average of 5.74 means you're losing auctions to competitors who have the same bid as you but cleaner accounts. You're paying more per click than you should. You're showing less often than you could. And it's a compounding problem — lower Quality Score means worse Ad Rank, which means lower visibility, which means fewer clicks, which means slower conversion data for the algorithm, which means less efficient optimisation. Everything gets worse together, slowly and invisibly.

Running Page Speed Insights on the landing pages confirmed the source. Mobile LCP — the time it takes for the main visible content to appear on a mobile device — was at 5.4 seconds. Google's threshold for "Good" is 2.5 seconds. More than double, on mobile, in markets where most of the audience browses on a phone on a 4G connection.`,
    issues: [
      {
        n: '1',
        title: 'All six campaigns were showing "Limited by budget"',
        body: `Every campaign was throttled. Google wasn't entering the best auctions available — it was entering the cheapest ones. We were present in the market but not competitive in it.`,
      },
      {
        n: '2',
        title: 'Keyword cannibalization across three campaigns',
        body: `High-intent terms like "bone marrow transplant India" and several condition-specific queries were appearing in three separate campaigns simultaneously. Our own campaigns were bidding against each other in the same auctions, inflating our own CPCs with no benefit to anyone.`,
      },
      {
        n: '3',
        title: 'One campaign contributing almost nothing',
        body: `One of the six campaigns had been live since August 15th. It had spent real budget. It had produced 1.2% of total conversions. It had never been reviewed or questioned. It was drawing resources away from every other campaign while contributing almost nothing to the actual lead pipeline.`,
      },
      {
        n: '4',
        title: 'The search terms report was uncomfortable reading',
        body: `Going through the actual queries that had triggered our ads, a significant proportion were people searching for symptoms, for specific local hospital names, for general health information with no treatment-seeking intent. The negative keyword list I'd built at launch wasn't deep enough.`,
      },
    ],
  },
  {
    num: '07',
    date: 'October — November 2025',
    title: 'The Rebuild. Fixing Things in the Right Order.',
    body: `When you have multiple compounding problems in an ads account, the instinct is to start with the most visible one — the bids, the budget allocation — because those feel like immediate levers. That would have been the wrong move. The problems were chained. The landing page was suppressing Quality Score. Quality Score was suppressing Ad Rank. Ad Rank was suppressing impression share. Until the landing page was fixed, nothing else would hold. You start at the root, not the branch.`,
    actions: [
      {
        phase: 'Fix 01 — Foundation',
        title: 'Landing Page Performance Overhaul',
        body: `Went back into the codebase. Converted all hero and above-the-fold images to WebP format with explicit width and height attributes so the browser reserves space before the images load. Moved every non-essential third-party script to load after the main content rendered. Implemented lazy loading for below-the-fold imagery. The result: mobile LCP dropped from 5.4 seconds to 1.9 seconds. We moved from Google's "Poor" band into "Good." Within two weeks, Quality Scores across the account started improving.`,
      },
      {
        phase: 'Fix 02 — Structure',
        title: 'Campaign Consolidation and Keyword Deduplication',
        body: `Built a full keyword matrix mapping every keyword in the account against every campaign and ad group it appeared in. Identified all cannibalization instances. Established clear intent-based segmentation with explicit cross-campaign negative keywords to enforce the boundaries. Paused the near-zero contributing campaign entirely and migrated its single performing ad group into the primary campaign. Went from six campaigns to five, each with a defined purpose and no internal competition.`,
      },
      {
        phase: 'Fix 03 — Ad Relevance',
        title: 'Ad Copy and Extension Rebuild',
        body: `Rewrote all ad copy to achieve tight keyword-to-ad-to-landing-page alignment — the core driver of the "Ad Relevance" and "Expected CTR" Quality Score components. Rebuilt all extensions: new callouts for the free consultation and end-to-end coordination, sitelinks pointing to specific condition pages, structured snippets listing actual procedures. Average Quality Score moved from 5.74 to 7.9 over six weeks.`,
      },
      {
        phase: 'Fix 04 — Bidding',
        title: 'Smart Bidding Migration with Controlled tCPA',
        body: `Once structural fixes were in place and conversion data had accumulated to sufficient volume — a minimum of 30 conversions per campaign in a 30-day window — migrated from manual CPC to Target CPA smart bidding. Set the initial tCPA slightly above the then-current blended CPA to give the algorithm room to learn without triggering under-delivery. Stepped it down gradually over four weeks as the algorithm stabilised.`,
      },
      {
        phase: 'Fix 05 — Ongoing',
        title: 'Negative Keyword Expansion',
        body: `Committed to weekly search terms review for the first two months post-rebuild. Added over 180 negative keywords across the account — irrelevant navigational queries, competitor branded terms, symptom-only searches with no treatment-seeking intent, and job-related queries that were triggering on our medical keywords. This work is not a one-time event. It is a continuous hygiene practice that has a compounding positive effect on traffic quality over time.`,
      },
    ],
  },
  {
    num: '08',
    date: 'November 2025 — January 2026',
    title: 'When the Leads Came In, a Different Set of Problems Appeared.',
    body: `Once the ads started working, it became clear that the ads account was only one part of the system. The lead comes in, the form gets submitted, the CPA looks clean in the dashboard — and then you find out what actually happens next.

I started sitting with the patient coordinators regularly. Not to report back to management — I wanted to understand the pipeline from their side, because I was optimising based on form submissions and had no visibility into what happened after a lead landed.`,
    subsections: [
      {
        title: 'Problem One: Response Time',
        body: `When a patient in Nigeria submits a form at 11pm their time — which is not uncommon, this is when people research things they are frightened to research during the day — they were not always receiving a response until the following morning UAE time. That is a gap of several hours for someone in a state of urgency making a high-stakes decision. We established a response time standard. Every lead receives an acknowledgement within a defined window, even if the full consultation call can't happen immediately. The missed lead rate dropped after this change alone.`,
      },
      {
        title: 'Problem Two: Messaging Instead of Calling',
        body: `The coordinators were primarily reaching out via WhatsApp message rather than calling. I understood why — messaging is easier to manage when you are handling multiple cases simultaneously. But for a patient making a potentially life-changing healthcare decision, a message from an unknown number feels transactional. A call from a person who introduces themselves and asks how they can help feels entirely different. We shifted the first-contact protocol to calls, with follow-up documentation by message.`,
      },
      {
        title: 'Problem Three: Patients Going Quiet After First Contact',
        body: `A consistent pattern: patients would engage initially, seem genuinely interested, and then go quiet. The answer came up repeatedly: the patient had been asked to share their medical reports so the in-house doctor could review the case — and they either didn't have the reports organised, didn't know how to send them digitally, or were overwhelmed by the request and withdrew entirely.

We restructured the intake sequence. Instead of asking for documents upfront, the coordinator now leads with the consultation — a general conversation with the doctor, no documents required initially. The patient gets to speak with someone who understands their condition and makes them feel heard. The document request comes after that conversation, once trust is established. The drop-off rate after first contact fell significantly.

None of these were advertising problems. All of them were directly affecting the real return on our ad spend. I would not have known about any of them if I hadn't walked into the room and asked.`,
      },
    ],
  },
  {
    num: '09',
    date: 'December 2025 — February 2026',
    title: 'Building the Tracking Layer for the Sales Pipeline.',
    body: `I could fix the ads. I could fix the landing pages. I could sit with the coordinators and help redesign how they engaged with leads. But none of that learning was being captured anywhere in a form that persisted. Every conversation about lead quality happened verbally and then dissolved. The following week, decisions were being made on memory and gut feel rather than patterns visible across actual data.`,
    subsections: [
      {
        title: 'Phase One: The Spreadsheet',
        body: `I built a shared tracking sheet that every coordinator updated when a new lead came in. Date of submission. Source campaign. Country of origin. Condition type. Current status. Outcome notes. Simple. Not glamorous. But for the first time we had a record we could look at and ask real questions of.

The patterns that emerged from even four weeks of consistent tracking were immediate and actionable. Leads from Nigeria with haematology-related queries had significantly higher follow-through rates than leads from other sources. Leads generated by broadly-worded, high-funnel ad groups were producing form submissions but very low consultation conversion rates. A form submission from someone who searched "medical tourism" is not the same as a form submission from someone who searched "bone marrow transplant cost India from Nigeria." Both show as conversions in Google Ads. Only the data downstream tells you which one is real intent.`,
      },
      {
        title: 'Phase Two: Odoo CRM',
        body: `The spreadsheet worked for its purpose. But as lead volume increased, its limits became obvious. Multiple coordinators updating it simultaneously caused conflicts. There was no way to assign ownership of a lead to a specific coordinator with accountability. No automated follow-up reminders. No pipeline view.

We moved to Odoo CRM. I scoped the pipeline requirements, defined the stage logic, and managed the implementation through a freelance developer. The pipeline was set up to mirror the actual patient journey: New Lead → Contacted → Consultation Booked → Doctor Reviewed → Case Forwarded to Hospital → Quote Received → Travel Arranged → Converted. Each stage has a clear definition. Each lead has an owner and a timestamp. Follow-up tasks are logged in the system, not kept in someone's head or a WhatsApp reminder.

The team is actively using it. The data coming out of it is already changing how I read the Google Ads account. I can now see not just how many leads a campaign generated, but where in the pipeline those leads are sitting. That is a completely different level of insight than form submission counts in a dashboard.`,
      },
    ],
    finding: {
      label: 'The number that changed how I read the account',
      body: `$29 per form submission across 569 total conversions sounds clean. But when the spreadsheet started showing us that not all of those submissions converted to consultations at the same rate — and that the rate varied significantly by source campaign, country, and condition type — the real question became: what is our cost per genuinely qualified case? That number is higher than $29. It's also the number that actually drives the business. You can only calculate it when you have a tracking layer that goes past the confirmation page.`,
    },
  },
  {
    num: '10',
    date: 'March 2026',
    title: 'Where It Stands. Results Across All Three Phases.',
    body: `Here is where everything stands.`,
  },
];

const finalStats = [
  { v: '$29', l: 'Blended cost / submission' },
  { v: '569', l: 'Total conversions' },
  { v: '$16,465', l: 'Total spend' },
  { v: '277k', l: 'Total impressions' },
  { v: '6.98%', l: 'Account CTR' },
  { v: '7.9', l: 'Average Quality Score' },
];

const beforeItems = [
  'No website, no tracking infrastructure',
  'Quality Score: 5.74 average',
  'Mobile LCP: 5.4s — rated Poor',
  '68% impression share lost to quality',
  'All 6 campaigns budget-limited',
  'Keyword cannibalization, 3 campaigns',
  'CPA: $120+ on early campaigns',
  'No post-submission lead tracking',
  'Coordinator process unstructured',
  'No CRM, no pipeline visibility',
];

const afterItems = [
  'Full 8-page site, GA4, GSC, GTM live',
  'Quality Score: 7.9 average',
  'Mobile LCP: 1.9s — rated Good',
  '11% impression share lost to quality',
  '0 of 5 active campaigns budget-limited',
  'Clean intent-based structure, no duplication',
  'Blended CPA: $29 · 569 total conversions',
  'Odoo CRM tracking full patient pipeline',
  'Intake process rebuilt around patient behaviour',
  'Real cost-per-qualified-lead now measurable',
];

export default function AMHealthHubGrowthPage() {
  return (
    <>
      <style>{`
        .cs-full h3 {
          font-family: var(--font-display);
          font-size: clamp(22px, 2.5vw, 32px);
          line-height: 1;
          color: var(--white);
          margin: 48px 0 16px;
          letter-spacing: 0.02em;
        }
        .cs-full p {
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 300;
          line-height: 1.85;
          color: rgba(245,240,232,0.65);
          margin-bottom: 20px;
        }
        .cs-full p:last-child { margin-bottom: 0; }
        .cs-full-pull {
          margin: 40px 0;
          padding: 28px 32px;
          border-left: 3px solid var(--orange);
          background: rgba(255,77,0,0.04);
        }
        .cs-full-pull p {
          font-family: var(--font-body);
          font-size: 17px;
          font-weight: 400;
          color: var(--white);
          line-height: 1.7;
          margin: 0;
        }
        .cs-full-callout {
          margin: 32px 0;
          padding: 20px 24px;
          border: 1px solid var(--grey);
          background: #0d0d0d;
        }
        .cs-full-callout p {
          font-family: var(--font-body);
          font-size: 13.5px;
          color: rgba(245,240,232,0.5);
          margin: 0;
          line-height: 1.7;
        }
        .cs-full-callout p strong { color: var(--white); font-weight: 500; }
        .cs-full-finding {
          margin: 32px 0;
          padding: 20px 24px;
          border: 1px solid var(--grey);
          background: #0d0d0d;
        }
        .cs-full-finding-label {
          font-family: var(--font-body);
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--orange);
          margin-bottom: 12px;
        }
        .cs-full-finding p {
          font-family: var(--font-body);
          font-size: 13.5px;
          color: rgba(245,240,232,0.55);
          margin: 0;
          line-height: 1.75;
        }
        .cs-metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1px;
          background: var(--grey);
          border: 1px solid var(--grey);
          margin: 32px 0;
        }
        .cs-metric-box {
          background: var(--black);
          padding: 20px 18px;
        }
        .cs-metric-val {
          font-family: var(--font-display);
          font-size: 40px;
          line-height: 1;
          color: var(--orange);
          display: block;
          margin-bottom: 8px;
        }
        .cs-metric-val.bad { color: #c94a4a; }
        .cs-metric-val.good { color: #4a9e7a; }
        .cs-metric-label {
          font-family: var(--font-body);
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(245,240,232,0.3);
          line-height: 1.5;
        }
        .cs-issue {
          display: grid;
          grid-template-columns: 48px 1fr;
          border: 1px solid var(--grey);
          margin-bottom: 2px;
        }
        .cs-issue-num {
          background: #0d0d0d;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-size: 28px;
          color: var(--orange);
          border-right: 1px solid var(--grey);
        }
        .cs-issue-body {
          padding: 18px 22px;
        }
        .cs-issue-body strong {
          display: block;
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 500;
          color: var(--white);
          margin-bottom: 6px;
        }
        .cs-issue-body p {
          font-size: 13px;
          color: rgba(245,240,232,0.45);
          margin: 0;
          line-height: 1.65;
        }
        .cs-action {
          border-left: 3px solid #4a9e7a;
          padding: 20px 24px;
          margin: 16px 0;
          background: rgba(74,158,122,0.04);
        }
        .cs-action-phase {
          font-family: var(--font-body);
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #4a9e7a;
          margin-bottom: 8px;
        }
        .cs-action h4 {
          font-family: var(--font-display);
          font-size: 22px;
          color: var(--white);
          margin-bottom: 10px;
        }
        .cs-action p {
          font-size: 13.5px;
          color: rgba(245,240,232,0.5);
          margin: 0;
          line-height: 1.7;
        }
        .cs-ba-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: var(--grey);
          border: 1px solid var(--grey);
          margin: 32px 0;
        }
        .cs-ba-side { background: var(--black); padding: 24px 20px; }
        .cs-ba-label {
          font-family: var(--font-body);
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 16px;
          display: block;
        }
        .cs-ba-side.before .cs-ba-label { color: #c94a4a; }
        .cs-ba-side.after .cs-ba-label { color: #4a9e7a; }
        .cs-ba-side ul { list-style: none; padding: 0; }
        .cs-ba-side ul li {
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 300;
          color: rgba(245,240,232,0.55);
          padding: 8px 0;
          border-bottom: 1px solid var(--grey);
          display: flex;
          align-items: flex-start;
          gap: 10px;
          line-height: 1.5;
        }
        .cs-ba-side ul li:last-child { border-bottom: none; }
        .cs-ba-side.before ul li::before { content: '✗'; color: #c94a4a; font-size: 10px; margin-top: 2px; flex-shrink: 0; }
        .cs-ba-side.after ul li::before { content: '✓'; color: #4a9e7a; font-size: 10px; margin-top: 2px; flex-shrink: 0; }
        @media (max-width: 640px) {
          .cs-ba-grid { grid-template-columns: 1fr; }
          .cs-metrics-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <main className="cs-full">

        {/* ── HERO ── */}
        <section
          style={{
            padding: '100px var(--pad) 72px',
            borderBottom: '1px solid var(--grey)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute', top: '40px', right: 'var(--pad)',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(120px, 16vw, 220px)',
              color: 'rgba(245,240,232,0.02)',
              lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
            }}
          >
            ADS
          </div>

          <Link href="/work/am-health-hub" style={{
            display: 'inline-block',
            fontFamily: 'var(--font-body)',
            fontSize: '10px',
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            color: 'rgba(245,240,232,0.3)',
            textDecoration: 'none',
            marginBottom: '36px',
          }}>
            ← AM Health Hub
          </Link>

          <span style={{
            display: 'block',
            fontFamily: 'var(--font-body)',
            fontSize: '10px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'var(--orange)',
            marginBottom: '20px',
          }}>
            Google Ads · Paid Search · Medical Tourism · Dubai, UAE
          </span>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(52px, 7vw, 110px)',
            lineHeight: 0.92,
            maxWidth: '900px',
            marginBottom: '40px',
          }}>
            BUILDING A GROWTH ENGINE FROM ABSOLUTE ZERO
          </h1>

          {/* Cover stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '1px',
            background: 'var(--grey)',
            border: '1px solid var(--grey)',
            maxWidth: '680px',
          }}>
            {[
              { v: '$29', l: 'Cost / Submission' },
              { v: '569', l: 'Total Conversions' },
              { v: '$16,465', l: 'Total Spend' },
              { v: '3 Phases', l: 'Infra · Launch · Optimise' },
            ].map((s) => (
              <div key={s.l} style={{ background: 'var(--black)', padding: '20px 18px' }}>
                <span style={{
                  display: 'block',
                  fontFamily: 'var(--font-display)',
                  fontSize: '36px',
                  color: 'var(--orange)',
                  lineHeight: 1,
                  marginBottom: '6px',
                }}>{s.v}</span>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '9px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'rgba(245,240,232,0.3)',
                }}>{s.l}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── INTRO ── */}
        <section style={{ padding: '72px var(--pad)', borderBottom: '1px solid var(--grey)', maxWidth: '760px' }}>
          <p style={{ fontSize: '17px', fontWeight: 300, lineHeight: 1.85, color: 'rgba(245,240,232,0.7)', marginBottom: '20px' }}>
            This is not a case study written after the fact by someone who had a plan and executed it cleanly. Decisions were made without full information. Problems were found after they'd already been running for weeks. A few things had to be rebuilt from scratch mid-way through.
          </p>
          <p style={{ fontSize: '17px', fontWeight: 300, lineHeight: 1.85, color: 'rgba(245,240,232,0.7)', marginBottom: '20px' }}>
            The numbers are real. The problems are real. And some of them had nothing to do with advertising — they showed up in what happened after a lead came in, which turned out to matter just as much as how the lead got there.
          </p>
          <p style={{ fontSize: '17px', fontWeight: 400, lineHeight: 1.85, color: 'var(--white)', marginBottom: 0 }}>
            This is the full story, from the first day.
          </p>
        </section>

        {/* ── CHAPTERS ── */}
        {chapters.map((ch) => (
          <section
            key={ch.num}
            style={{
              padding: '72px var(--pad)',
              borderBottom: '1px solid var(--grey)',
            }}
          >
            {/* Chapter marker */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '9px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: 'var(--orange)',
                whiteSpace: 'nowrap',
              }}>
                Chapter {ch.num}
              </span>
              <div style={{ flex: 1, height: '1px', background: 'var(--grey)' }} />
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '9px',
                letterSpacing: '2px',
                color: 'rgba(245,240,232,0.2)',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}>
                {ch.date}
              </span>
            </div>

            {/* Chapter title */}
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 4vw, 60px)',
              lineHeight: 0.95,
              color: 'var(--white)',
              marginBottom: '32px',
              maxWidth: '800px',
            }}>
              {ch.title.toUpperCase()}
            </h2>

            {/* Body */}
            {ch.body && ch.body.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}

            {/* Pull quote */}
            {'pull' in ch && ch.pull && (
              <div className="cs-full-pull">
                <p>{ch.pull}</p>
              </div>
            )}

            {/* Body 2 */}
            {'body2' in ch && ch.body2 && ch.body2.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}

            {/* Callout */}
            {'callout' in ch && ch.callout && (
              <div className="cs-full-callout">
                <p><strong>Separately:</strong> {ch.callout.replace('Separately: ', '')}</p>
              </div>
            )}

            {/* Subsections */}
            {'subsections' in ch && ch.subsections && ch.subsections.map((s) => (
              <div key={s.title}>
                <h3>{s.title.toUpperCase()}</h3>
                {s.body.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            ))}

            {/* Finding */}
            {'finding' in ch && ch.finding && (
              <div className="cs-full-finding">
                <div className="cs-full-finding-label">{ch.finding.label}</div>
                <p>{ch.finding.body}</p>
              </div>
            )}

            {/* Metrics grid (ch06) */}
            {'metrics' in ch && ch.metrics && (
              <div className="cs-metrics-grid">
                {ch.metrics.map((m) => (
                  <div key={m.label} className="cs-metric-box">
                    <span className={`cs-metric-val${m.bad ? ' bad' : ''}`}>{m.value}</span>
                    <span className="cs-metric-label">{m.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Issues (ch06) */}
            {'issues' in ch && ch.issues && (
              <div style={{ margin: '32px 0' }}>
                {ch.issues.map((issue) => (
                  <div key={issue.n} className="cs-issue">
                    <div className="cs-issue-num">{issue.n}</div>
                    <div className="cs-issue-body">
                      <strong>{issue.title}</strong>
                      <p>{issue.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Actions (ch07) */}
            {'actions' in ch && ch.actions && ch.actions.map((action) => (
              <div key={action.phase} className="cs-action">
                <div className="cs-action-phase">{action.phase}</div>
                <h4>{action.title.toUpperCase()}</h4>
                <p>{action.body}</p>
              </div>
            ))}

            {/* Final results (ch10) */}
            {ch.num === '10' && (
              <>
                {/* Stats band */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                  gap: '1px',
                  background: 'var(--grey)',
                  border: '1px solid var(--grey)',
                  margin: '32px 0',
                }}>
                  {finalStats.map((s) => (
                    <div key={s.l} style={{ background: '#0d0d0d', padding: '24px 20px' }}>
                      <span style={{
                        display: 'block',
                        fontFamily: 'var(--font-display)',
                        fontSize: '44px',
                        color: 'var(--orange)',
                        lineHeight: 1,
                        marginBottom: '8px',
                      }}>{s.v}</span>
                      <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '9px',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        color: 'rgba(245,240,232,0.28)',
                        lineHeight: 1.5,
                      }}>{s.l}</span>
                    </div>
                  ))}
                </div>

                {/* Before / After */}
                <div className="cs-ba-grid">
                  <div className="cs-ba-side before">
                    <span className="cs-ba-label">Before · August 2025</span>
                    <ul>{beforeItems.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                  <div className="cs-ba-side after">
                    <span className="cs-ba-label">After · March 2026</span>
                    <ul>{afterItems.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                </div>

                <p>The $29 figure is cost per form submission, not cost per patient. Total spend across the full campaign period was $16,465, generating 569 submissions — that maths holds. But a form submission is the entry point to the pipeline. The real cost per consultation, and per case forwarded to a hospital, are higher — and we can now calculate both for the first time through the CRM. That work is ongoing.</p>
                <p>What the number doesn't capture is the full scope of what was built: from a patient finding the company through a Google search late at night, to submitting a form on a mobile phone, to a consultation with a doctor, to their travel and hospital appointment being coordinated end to end. That pipeline didn't exist when I joined. It does now.</p>
              </>
            )}
          </section>
        ))}

        {/* ── FOOTER ── */}
        <section style={{
          padding: '48px var(--pad)',
          borderBottom: '1px solid var(--grey)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <div>
            <span style={{
              display: 'block',
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              fontWeight: 500,
              color: 'var(--white)',
              marginBottom: '4px',
            }}>Pranav Nair</span>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              color: 'rgba(245,240,232,0.3)',
              letterSpacing: '1px',
            }}>Marketing Strategist · Paid Media · Growth</span>
          </div>
          <Link href="/work/am-health-hub" style={{
            fontFamily: 'var(--font-body)',
            fontSize: '10px',
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            color: 'rgba(245,240,232,0.3)',
            textDecoration: 'none',
          }}>
            ← Back to AM Health Hub
          </Link>
        </section>

      </main>
    </>
  );
}
