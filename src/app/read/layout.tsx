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
};

export default function ReadLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
