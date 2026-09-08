import { htmlToTiptapJson } from './html-to-tiptap.mjs';

const posts = {
  'why-luxury-real-estate-content-needs-a-different-strategy': `
      <p>Most real estate content makes the same mistake: it leads with features. 4 bedrooms. 3 bathrooms. 2,400 sq ft. Private pool. Sea view. This is spec-sheet marketing, and it doesn't sell luxury property.</p>

      <h2>Luxury is an Emotion, Not a Feature List</h2>
      <p>The buyer of an AED 10M+ property in Dubai is not making a spreadsheet decision. They are making an identity decision. The content has to answer one question: <em>Is this property consistent with who I am?</em></p>
      <p>That means the photography, the copy, the music in the reel, the pacing of the edit — all of it has to communicate status, taste, and aspiration before it communicates square footage.</p>

      <h2>The Channel Mix is Different</h2>
      <p>Instagram Reels work for clinic content. They do not work for AED 15M villas. The luxury real estate buyer is on LinkedIn, on private WhatsApp groups, on YouTube watching 4K cinematic walkthroughs. The distribution strategy has to match where the buyer actually lives online.</p>

      <h2>Content Formats That Actually Convert</h2>
      <ul>
        <li>Cinematic 60-90 second property films (not slideshows)</li>
        <li>Neighbourhood lifestyle content — sell the life, not the flat</li>
        <li>Developer credibility content — who built this, what else have they built</li>
        <li>ROI and investment angle content for investor buyers</li>
      </ul>

      <h2>The Macins Luxe Approach</h2>
      <p>For Macins Luxe Properties, we built a content system around lifestyle aspiration first, property second. Every piece of content was designed to make the viewer feel something before they knew the price. That emotional connection is what turns a viewer into an enquiry.</p>
    `,
  'my-ai-workflow-for-managing-multiple-brands': `
      <p>Five business units. Different industries. Different brand voices. 30+ pieces of content each, every month. Consistent output at that volume isn't sustainable without systems — and those systems are now largely AI-powered.</p>

      <h2>The Stack</h2>
      <ul>
        <li><strong>Claude AI</strong> — Strategy documents, long-form copy, campaign briefs, brand voice calibration.</li>
        <li><strong>ChatGPT</strong> — Rapid caption variations, hashtag research, quick ideation sessions.</li>
        <li><strong>Midjourney</strong> — Concept visuals, moodboards, creative direction references.</li>
        <li><strong>Canva AI</strong> — Template production at scale, brand kit application, Magic Resize for cross-platform adaptation.</li>
        <li><strong>CapCut AI</strong> — Reel editing, auto-captions, template-based video production.</li>
        <li><strong>Make.com</strong> — Automation flows: content approval → scheduling → reporting pipelines.</li>
        <li><strong>Notion AI</strong> — Content calendar management, brand briefing documents, campaign trackers.</li>
      </ul>

      <h2>The Weekly Rhythm</h2>
      <ul>
        <li><strong>Monday</strong> — Strategy and planning. Claude AI generates weekly content briefs based on brand guidelines and current campaign objectives.</li>
        <li><strong>Tuesday–Wednesday</strong> — Content production, in batches. Canva templates, Midjourney visuals, AI-assisted copy.</li>
        <li><strong>Thursday</strong> — Stakeholder review and approval, with Make.com handling the feedback loop.</li>
        <li><strong>Friday</strong> — Scheduling and the following week's brief prep.</li>
      </ul>

      <h2>The Non-Negotiable</h2>
      <p>AI handles speed. Strategy is still human. Every piece of content is reviewed for brand alignment, strategic intent, and quality before it goes out. The AI compresses the production timeline — it doesn't replace judgement.</p>

      <h2>The Result</h2>
      <p>The AI stack has cut the time this used to take dramatically. Not at reduced quality — at higher quality, because more time goes into strategy and less into admin.</p>
    `,
};

for (const [slug, html] of Object.entries(posts)) {
  const json = htmlToTiptapJson(html);
  console.log('--- ' + slug + ' ---');
  console.log(JSON.stringify(json));
  console.log();
}
