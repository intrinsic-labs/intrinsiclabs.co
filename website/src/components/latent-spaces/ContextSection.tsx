'use client';

import { useRef, useEffect } from 'react';
import SectionTitle from './SectionTitle';
import SectionContent from './SectionContent';
import AccentText from './AccentText';
import CodeChip from './CodeChip';

export default function ContextSection() {
  const parallaxBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxBgRef.current) {
        const section = parallaxBgRef.current.parentElement;
        if (section) {
          const sectionTop = section.getBoundingClientRect().top;
          const scrollFactor = 0.3;
          parallaxBgRef.current.style.transform = `translateY(${-sectionTop * scrollFactor}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="pb-12 pt-12 md:py-24 px-8 max-w-3xl mx-auto relative overflow-hidden" id="about">
      <div className="relative overflow-hidden">
        <div 
          ref={parallaxBgRef} 
          className="absolute top-0 left-0 w-full h-[120%] z-0 opacity-15"
        />
        <div className="relative z-10">
          <SectionTitle>Context & Purpose</SectionTitle>
          <SectionContent>
            <p>
              In the past five years, many mobile AI chat apps have been released - Claude, ChatGPT, Gemini, and countless
              clones. Often, these apps are supported by a more robust web app. To date, only a couple of these platforms have
              introduced some form of conversation branching (allowing users generate many continuations to a prompt <span className="italic">and</span> continue from each generated branch). Claude.ai recently added this feature, but it is not yet available on mobile,
              nor is it positioned as a primary feature. To date, Grok is the only commercially developed mobile app that supports
              this feature.
            </p>
            <br />
            <p>
              While the advantages and implications of a <CodeChip>loom interface</CodeChip> are profound even for basic interactions, the majority of
              the population is unaware of the concept, and even if they do discover it, have no obvious or easy way to experience
              it. Most existing looms take some amount of technical know-how to get up and running and are desktop-only. While it
              is true that most power users will be working from a computer, it is also true that there are many <span className="italic">potential</span> users who
              desire to understand AI more deeply, and who could easily be captured by a low-barrier-to-entry mobile app.
            </p>
            <br />
            <AccentText>
              Intrinsic Labs is invested in facilitating widespread, deep understanding of AI behavior. Latent Spaces is our first big step in that direction.
            </AccentText>
          </SectionContent>
        </div>
      </div>
    </section>
  );
} 