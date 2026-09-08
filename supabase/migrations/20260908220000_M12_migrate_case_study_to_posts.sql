-- Brings the AM Health Hub case study (previously a standalone page at
-- /vault/be411a9e5d45, gated by the old M01 vault_gates system) into the
-- real posts table so it's manageable from the admin dashboard like any
-- other post: visible in the list, shareable link with expiry, rate-
-- limited password attempts, RLS-enforced access.
--
-- The rendered page itself stays a custom hand-built component (the
-- content has metric grids, issue cards, before/after columns that Tiptap
-- can't express) — src/app/read/[slug]/page.tsx special-cases this one
-- slug to render that component once access is granted, rather than the
-- generic Tiptap HTML. This row is what drives the actual access control.

insert into posts (slug, title, excerpt, category, body_json, visibility, share_token, published_at)
values (
  'growth-engine-case-study',
  'Building a Growth Engine From Absolute Zero',
  'Google Ads, paid search, and a full measurement and CRM rebuild for a healthcare company that had zero digital infrastructure on day one.',
  'Case Study',
  '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"This post has a custom-coded layout and does not render from this content — editing text here has no effect on what visitors see. To change the actual page, edit the component directly."}]}]}'::jsonb,
  'private',
  gen_random_uuid()::text,
  now()
)
on conflict (slug) do nothing;
