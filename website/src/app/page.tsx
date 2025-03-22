import Hero from '@/components/home/Hero';
import CompanyStory from '@/components/about/CompanyStory';
import TeamSection from '@/components/about/TeamSection';
import ValuesSection from '@/components/about/ValuesSection';
import CallToAction from '@/components/home/CallToAction';


export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <CompanyStory />
      <TeamSection />
      <ValuesSection />
      <CallToAction />
    </main>
  );
}