import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Private',
  description: 'Private page.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true, nosnippet: true },
  },
  // The URL contains the access token. Without this, clicking an outbound
  // link from a private post (e.g. a link-preview card) could leak the
  // full URL — token included — to that site's server logs via Referer.
  // Modern browsers already default to stripping this for cross-origin
  // navigation, but that shouldn't be relied on implicitly here.
  referrer: 'no-referrer',
};

export default function ReadLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
