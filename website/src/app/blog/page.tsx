import BlogHero from '@/components/blog/BlogHero';
import FeaturedPost from '@/components/blog/FeaturedPost';
import BlogPosts from '@/components/blog/BlogPosts';
import BlogSearch from '@/components/blog/BlogSearch';
import CallToAction from '@/components/home/CallToAction';

export const metadata = {
  title: 'Blog | Intrinsic Labs',
  description: 'Insights, tutorials, and updates from the Intrinsic Labs team on mobile development, web development, and custom software solutions.',
};

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <BlogHero />
      <FeaturedPost />
      <BlogPosts />
    </main>
  );
} 