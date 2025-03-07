import { Metadata } from 'next';
import BlogPostHeader from '@/components/blog/BlogPostHeader';
import BlogPostContent from '@/components/blog/BlogPostContent';
import RelatedPosts from '@/components/blog/RelatedPosts';
import CallToAction from '@/components/home/CallToAction';
import { getBlogPost, getRelatedPosts } from '@/lib/blog';

// This would be replaced with actual data fetching
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  
  return {
    title: `${post.title} | Intrinsic Labs Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  const relatedPosts = await getRelatedPosts(params.slug);
  
  return (
    <main className="min-h-screen">
      <BlogPostHeader post={post} />
      <BlogPostContent post={post} />
      <RelatedPosts posts={relatedPosts} />
      <CallToAction />
    </main>
  );
} 