import ServicesHero from '@/components/services/ServicesHero';
import ServicesOverview from '@/components/services/ServicesOverview';
import MobileDevelopment from '@/components/services/MobileDevelopment';
import WebDevelopment from '@/components/services/WebDevelopment';
import CustomSoftware from '@/components/services/CustomSoftware';
import CallToAction from '@/components/home/CallToAction';

export const metadata = {
  title: 'Services | Intrinsic Labs',
  description: 'Discover our specialized software development services including mobile development, web development, and custom software solutions.',
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <ServicesHero />
      <ServicesOverview />
      <MobileDevelopment />
      <WebDevelopment />
      <CustomSoftware />
      <CallToAction />
    </main>
  );
} 