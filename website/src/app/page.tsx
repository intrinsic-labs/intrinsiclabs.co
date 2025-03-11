import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import FeaturedWork from '@/components/home/FeaturedWork';
import CallToAction from '@/components/home/CallToAction';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Services />
      <FeaturedWork />
      <CallToAction />
    </main>
  );
}
