import ContactHero from '@/components/contact/ContactHero';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactFAQ from '@/components/contact/ContactFAQ';

export const metadata = {
  title: 'Contact | Intrinsic Labs',
  description: 'Get in touch with Intrinsic Labs for your mobile and web development needs. We\'re here to help bring your digital ideas to life.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <ContactHero />
      <div className="container-custom py-16 md:py-24">
        <div className="flex flex-col max-w-3xl mx-auto gap-24">
          <ContactForm />
          <ContactFAQ />
          <ContactInfo />
        </div>
      </div>
    </main>
  );
} 