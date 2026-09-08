import Hero from '@/components/sections/Hero';
import Marquee from '@/components/sections/Marquee';
import Clients from '@/components/sections/Clients';
import VideoFeature from '@/components/sections/VideoFeature';
import About from '@/components/sections/About';
import Portfolio from '@/components/sections/Portfolio';
import Builds from '@/components/sections/Builds';
import Services from '@/components/sections/Services';
import Experience from '@/components/sections/Experience';
import AISection from '@/components/sections/AISection';
import Process from '@/components/sections/Process';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <Marquee />
      <Clients />
      <VideoFeature />
      <About />
      <Portfolio />
      <Builds />
      <Services />
      <Experience />
      <AISection />
      <Process />
      <Contact />
    </main>
  );
}
