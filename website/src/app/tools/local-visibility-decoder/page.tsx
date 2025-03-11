import LocalVisibilityHero from '@/components/tools/local-visibility-decoder/LocalVisibilityHero';
import LocalVisibilityForm from '@/components/tools/local-visibility-decoder/LocalVisibilityForm';

export const metadata = {
  title: 'Local Visibility Decoder™ | Intrinsic Labs',
  description: 'Discover why local customers aren\'t finding your business online, even though you\'re right there. Get a free analysis of your local business visibility.',
};

export default function LocalVisibilityDecoderPage() {
  return (
    <main className="min-h-screen">
      <LocalVisibilityHero />
      <LocalVisibilityForm />
    </main>
  );
} 