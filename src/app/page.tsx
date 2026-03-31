import GuiltBanner from '@/components/sections/GuiltBanner';
import Hero from '@/components/sections/Hero';
import Marquee from '@/components/sections/Marquee';
import Clients from '@/components/sections/Clients';
import VideoFeature from '@/components/sections/VideoFeature';
import About from '@/components/sections/About';
import Portfolio from '@/components/sections/Portfolio';
import Services from '@/components/sections/Services';
import CaseStudies from '@/components/sections/CaseStudies';
import AISection from '@/components/sections/AISection';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <main id="top">
      <GuiltBanner />
      <Hero />
      <Marquee />
      <Clients />
      <VideoFeature />
      <About />
      <Portfolio />
      <Services />
      <CaseStudies />
      <AISection />
      <Process />
      <Testimonials />
      <Contact />
    </main>
  );
}
