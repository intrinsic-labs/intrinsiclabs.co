'use client';

import { SoftwareItem } from "@/lib/work";
import { useState, useCallback } from "react";
import ReactMarkdown from 'react-markdown';
interface SoftwareSectionProps {
  software: SoftwareItem;
  isEven: boolean;
}

export default function SoftwareSection({ software, isEven }: SoftwareSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Function to modify the video URL with parameters
  const getVideoUrl = useCallback(() => {
    // Add YouTube parameters to hide controls until playing
    // modestbranding=1: minimal YouTube branding
    // showinfo=0: hides video title and uploader info
    // controls=0: hides controls initially (they appear when playing)
    // rel=0: prevents related videos from showing

    const videoUrl = software.videoUrl;
    const separator = videoUrl?.includes('?') ? '&' : '?';

    // Only show minimal UI before playing
    if (!isPlaying) {
      return `${videoUrl}${separator}modestbranding=1&rel=0`;
    }

    // When playing, add parameters for standard controls
    return `${videoUrl}${separator}modestbranding=1&rel=0`;
  }, [software.videoUrl, isPlaying]);

  // Handle play event
  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <section
      className="relative min-h-[50vh] w-full xl:max-w-7xl xl:mx-auto flex items-center parallax-section overflow-hidden py-8"
    >

      <div className="section-overlay rounded-xl p-6 overflow-hidden bg-navy">

        {/* Parallax Background */}
        {/* <div
          className="parallax-background absolute inset-0"
          style={{
            backgroundImage: `url(${software.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            // backgroundBlendMode: 'overlay',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: -1,
            height: '120%', // Extra height to allow for movement
            top: '-80%',    // Offset to center the background
            // filter: 'blur(12px)', // Add blur effect
          }}
        ></div> */}

        <div className="container mx-auto flex flex-col xl:flex-row items-center gap-12">
          <div className={`max-w-2xl mx-auto xl:w-2/5 ${isEven ? 'xl:order-1' : 'xl:order-2'}`}>
            <h3 className="heading-md mb-8 font-bold">{software.title}</h3>
            {/* Render markdown description with styled lists, bold, etc. */}
            <div className="prose prose-invert prose-lg text-lg md:text-xl">
              <ReactMarkdown
                components={{
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc pl-6 mb-4" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="list-decimal pl-6 mb-4" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="mb-1" {...props} />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong className="text-accent" {...props} />
                  ),
                  em: ({ node, ...props }) => (
                    <em className="text-orange font-bold not-italic" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="mb-3" {...props} />
                  ),
                  br: () => <br />,
                  code: ({ node, ...props }) => (
                    <code className="font-lato text-orange rounded-sm py-0.5 px-1 overflow-x-auto my-4" {...props} />
                  ),
                  
                }}
              >
                {software.description}
              </ReactMarkdown>
            </div>
            {/* {software.webLink && (
              <div className="mb-6">
                <a href={software.webLink || ''} target="_blank" rel="noopener noreferrer" className="button-work">
                  {software.buttonText || 'View Website'}
                </a>
              </div>
            )} */}
          </div>

          <div className={`w-full xl:w-3/5 flex flex-col ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
            {software.videoUrl && (
              <div className="aspect-video w-full">
                <div className="relative w-full h-0 pb-[56.25%]">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-xl"
                    src={getVideoUrl()}
                    title={software.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onPlay={handlePlay}
                  ></iframe>
                </div>
              </div>
            )}

            {software.technicalInfo && (
              <div className="bg-white/40 hover:bg-white/80 dark:bg-primary/20 dark:hover:bg-primary/30 backdrop-blur-sm border border-primary/20 hover:border-accent/60 p-4 mt-4 rounded-xl transition-all duration-300">
                <p className="text-sm font-calling-code">{software.technicalInfo}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
} 