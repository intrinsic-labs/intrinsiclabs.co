import Link from 'next/link';

export const metadata = {
  title: 'Tools | Intrinsic Labs',
  description: 'Free tools to help local businesses improve their online presence and visibility.',
};

export default function ToolsPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        <h1 className="heading-xl mb-4">Business Growth Tools</h1>
        <p className="paragraph-serif text-xl mb-12 max-w-3xl">
          Free tools to help your local business thrive online.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/tools/local-visibility-decoder" className="card p-6 h-full flex flex-col">
            <h3 className="heading-md mb-3">Local Visibility Decoder™</h3>
            <p className="paragraph mb-4 text-neutral-700 flex-grow">
              Discover why local customers aren't finding your business online, even though you're right there.
            </p>
            <div className="text-accent font-medium">Try it free →</div>
          </Link>
          
          {/* Add more tools here as they become available */}
        </div>
      </div>
    </main>
  );
} 