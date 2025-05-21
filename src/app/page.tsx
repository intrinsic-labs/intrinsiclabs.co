import Hero from '@/components/home/Hero';
import TeamSection from '@/components/home/TeamSection';
import ValuesSection from '@/components/home/ValuesSection';
import Reviews from '@/components/home/Reviews';
import SoftwareSection from "@/components/home/SoftwareSection";
import ParallaxEffect from "@/components/ParallaxEffect";
import { softwareItems } from "@/lib/work";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CallToAction from '@/components/home/CallToAction';


export default function Home() {
  return (
    <main className="min-h-screen font-lato">
      <ParallaxEffect />
      <Navigation />

      <div className="md:px-16">
        <Hero />
        <ValuesSection />

        <div id="work">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-lg font-display mb-8">Our Work</h2>
          </div>
          {softwareItems.map((software, index) => (
            <SoftwareSection
              key={software.id}
              software={software}
              isEven={index % 2 === 0}
            />
          ))}
        </div>

        <CallToAction />

        <TeamSection />
        <Reviews />
        <div className="pb-20 -mt-20">
          <CallToAction />
        </div>
      </div>

      <Footer />
    </main>
  );
}