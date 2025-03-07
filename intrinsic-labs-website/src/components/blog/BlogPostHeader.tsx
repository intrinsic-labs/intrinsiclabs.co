"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import PlaceholderImage from '@/components/ui/PlaceholderImage';
import { BlogPost } from '@/lib/blog';

interface BlogPostHeaderProps {
  post: BlogPost;
}

const BlogPostHeader = ({ post }: BlogPostHeaderProps) => {
  return (
    <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden">
      <div className="container-custom relative z-10">
        
        <div className="max-w-4xl mx-auto pt-16 text-center">
          {/* Category */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-2 mb-6 justify-center"
          >
            {post.category && (
              <Link 
                key={post.category} 
                href={`/blog?category=${encodeURIComponent(post.category)}`}
                className="text-xs px-3 py-1 rounded-full border border-primary/30 text-primary/90 hover:bg-primary/20 transition-colors duration-300"
              >
                {post.category}
              </Link>
            )}
          </motion.div>
          
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="heading-xl mb-6 text-center"
          >
            {post.title}
          </motion.h1>
          
          {/* Meta info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center gap-5 mb-10 justify-center"
          >
            
            <div className="text-sm text-secondary/70">
              {post.date}
            </div>
            
            <span className="text-secondary/50"></span>
            
            <div className="text-sm text-secondary/70">
              {post.readingTime}
            </div>
          </motion.div>
          
          {/* Featured image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="rounded-xl overflow-hidden mx-auto"
          >
            {post.coverImage ? (
              <div className="aspect-w-16 aspect-h-9 md:aspect-h-7 lg:aspect-h-5">
                <img 
                  src={post.coverImage} 
                  alt={post.title} 
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <PlaceholderImage 
                text={post.title} 
                aspectRatio="16/9"
              />
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Subtle background gradient */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(var(--primary-rgb), 0.15), transparent 70%)',
        }}
      />
    </section>
  );
};

export default BlogPostHeader; 