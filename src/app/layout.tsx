import type { Metadata } from 'next';
import { Bebas_Neue, DM_Sans, Instrument_Serif } from 'next/font/google';
import './globals.css';
import CustomCursor from '@/components/layout/CustomCursor';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Pranav Nair — AI-Powered Marketing Strategist, Dubai',
  description:
    'Dubai-based AI-Powered Marketing Strategist. Pranav Nair helps healthcare and luxury brands grow through brand strategy, content, and AI workflows.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Pranav Nair',
    jobTitle: 'AI-Powered Marketing Strategist',
    description: 'Dubai-based AI-Powered Marketing Strategist helping healthcare and luxury brands grow through brand strategy, content, and AI workflows.',
    url: 'https://pranavnair.co',
    image: 'https://pranavnair.co/photo.png',
    email: 'ppranav18@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dubai',
      addressCountry: 'AE',
    },
    sameAs: [
      'https://www.linkedin.com/in/pranavnairrr',
      'https://www.instagram.com/ps.ooo7',
      'https://www.x.com/PranavNair__',
      'https://twitter.com/PranavNair__',
      'https://www.youtube.com/@PranavNairrrrr',
    ],
  };

  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${dmSans.variable} ${instrumentSerif.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <CustomCursor />
        <FloatingWhatsApp />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
