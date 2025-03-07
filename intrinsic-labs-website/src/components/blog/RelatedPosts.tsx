"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import PlaceholderImage from '@/components/ui/PlaceholderImage';
import { BlogPost } from '@/lib/blog';

interface RelatedPostsProps {
  posts: BlogPost[];
}

const RelatedPosts = ({ posts }: RelatedPostsProps) => {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-20 bg-background/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="heading-md mb-12 text-center">Related Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <RelatedPostCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

interface RelatedPostCardProps {
  post: BlogPost;
  index: number;
}

const RelatedPostCard = ({ post, index }: RelatedPostCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 + (index * 0.1) }}
    >
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <div className="bg-neutral-800/30 rounded-xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:bg-neutral-800/50 hover:shadow-lg hover:shadow-primary/5 border border-transparent hover:border-primary/10">
          {/* Image */}
          <div className="relative overflow-hidden">
            {post.coverImage ? (
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src={post.coverImage} 
                  alt={post.title} 
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ) : (
              <PlaceholderImage 
                text="Related Post" 
                aspectRatio="16/9"
                className="group-hover:scale-105 transition-transform duration-700"
              />
            )}
          </div>
          
          {/* Content */}
          <div className="p-5 flex flex-col flex-grow">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-primary/80 text-xs">{post.date}</span>
              <span className="text-secondary/50 text-xs">|</span>
              <span className="text-primary/80 text-xs">{post.readingTime}</span>
            </div>
            
            <h3 className="text-lg font-medium mb-2 group-hover:text-primary transition-colors duration-300">
              {post.title}
            </h3>
            
            <div className="flex flex-wrap gap-2 mt-auto">
              {post.category && (
                <span 
                  key={post.category} 
                  className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary/90"
                >
                  {post.category}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RelatedPosts; 