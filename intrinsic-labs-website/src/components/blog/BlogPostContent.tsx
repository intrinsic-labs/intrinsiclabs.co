"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BlogPost } from '@/lib/blog';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface BlogPostContentProps {
  post: BlogPost;
}

const BlogPostContent = ({ post }: BlogPostContentProps) => {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch with syntax highlighting
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="animate-pulse space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 bg-neutral-800/50 rounded w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="">
            <ReactMarkdown
              components={{
                // Custom rendering for code blocks with syntax highlighting
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <div className="overflow-hidden rounded-xl my-6">
                      <SyntaxHighlighter
                        style={vscDarkPlus as any}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{ borderRadius: '1rem', margin: 0 }}
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
                // Custom rendering for headings with anchor links
                h1: ({ node, ...props }: any) => (
                  <h1 className="text-3xl font-bold mt-12 mb-6 text-primary" {...props} />
                ),
                h2: ({ node, ...props }: any) => (
                  <h2 className="text-2xl font-bold mt-10 mb-4 text-primary" {...props} />
                ),
                h3: ({ node, ...props }: any) => (
                  <h3 className="text-xl font-bold mt-8 mb-4 text-primary" {...props} />
                ),
                p: ({ node, ...props }: any) => (
                  <p className="text-secondary/90 leading-relaxed mb-6" {...props} />
                ),
                ul: ({ node, ...props }: any) => (
                  <ul className="list-disc pl-6 mb-6 text-secondary/90" {...props} />
                ),
                ol: ({ node, ...props }: any) => (
                  <ol className="list-decimal pl-6 mb-6 text-secondary/90" {...props} />
                ),
                li: ({ node, ...props }: any) => (
                  <li className="mb-2 text-secondary/90" {...props} />
                ),
                a: ({ node, ...props }: any) => (
                  <a className="text-primary hover:text-primary/80 underline transition-colors duration-300" {...props} />
                ),
                blockquote: ({ node, ...props }: any) => (
                  <blockquote className="border-l-4 border-primary/30 pl-4 italic text-secondary/80 my-6" {...props} />
                ),
                img: ({ node, ...props }: any) => (
                  <img className="rounded-lg my-8 w-full" {...props} />
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
          
          {/* Tags */}
          <div className="mt-16 pt-8 border-t border-neutral-800/50">
            <h3 className="text-lg font-medium mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Link 
                  key={index} 
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary/90 hover:bg-primary/20 transition-colors duration-300"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Share */}
          <div className="mt-12">
            <h3 className="text-lg font-medium mb-4">Share this article</h3>
            <div className="flex space-x-4">
              <button className="p-2 rounded-full bg-neutral-800/50 hover:bg-primary/20 text-primary/80 hover:text-primary transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </button>
              <button className="p-2 rounded-full bg-neutral-800/50 hover:bg-primary/20 text-primary/80 hover:text-primary transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </button>
              <button className="p-2 rounded-full bg-neutral-800/50 hover:bg-primary/20 text-primary/80 hover:text-primary transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </button>
              <button className="p-2 rounded-full bg-neutral-800/50 hover:bg-primary/20 text-primary/80 hover:text-primary transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Add Link component for tags
import Link from 'next/link';

export default BlogPostContent; 