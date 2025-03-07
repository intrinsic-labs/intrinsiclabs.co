"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import PlaceholderImage from '@/components/ui/PlaceholderImage';
import { BlogPost, getFeaturedBlogPosts } from '@/lib/blog';

const FeaturedPost = () => {
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedPost = async () => {
      try {
        const posts = await getFeaturedBlogPosts();
        setFeaturedPost(posts[0] || null);
      } catch (error) {
        console.error('Error loading featured post:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedPost();
  }, []);

  if (isLoading) {
    return (
      <section className="py-8 md:py-16 bg-background/30">
        <div className="container-custom">
          <div className="h-96 animate-pulse bg-neutral-800/50 rounded-xl"></div>
        </div>
      </section>
    );
  }

  if (!featuredPost) {
    return null;
  }

  return (
    <section className="py-8 md:py-16 bg-background/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-6 md:mb-12"
        >
          <span className="inline-block text-primary text-sm font-medium">Featured Paper</span>
        </motion.div>

        <Link href={`/blog/${featuredPost.slug}`} className="block group">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-xl overflow-hidden"
          >
            {/* Image */}
            <div className="relative aspect-[3/4.5] md:aspect-[16/9] lg:aspect-[21/9] w-full">
              {featuredPost.coverImage ? (
                <img 
                  src={featuredPost.coverImage} 
                  alt={featuredPost.title} 
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <PlaceholderImage 
                  text="Featured Article" 
                  aspectRatio="4/3"
                  className="md:aspect-[16/9] lg:aspect-[21/9] group-hover:scale-105 transition-transform duration-700"
                />
              )}
              
              {/* Gradient overlay */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-background to-transparent"
              />
              
              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-12">
                <div className="max-w-3xl">
                  <div className="flex items-center space-x-2 mb-3 text-sm text-primary/80">
                    <span>{featuredPost.date}</span>
                    <span>|</span>
                    <span>{featuredPost.readingTime}</span>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-medium mb-4 group-hover:text-primary transition-colors duration-300">
                    {featuredPost.title}
                  </h2>
                  
                  {/* <div className="flex flex-wrap gap-2 mb-2">
                    {featuredPost.categories.map((category, index) => (
                      <span 
                        key={index} 
                        className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary/90"
                      >
                        {category}
                      </span>
                    ))}
                  </div> */}
                </div>
              </div>
            </div>
          </motion.div>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedPost; 