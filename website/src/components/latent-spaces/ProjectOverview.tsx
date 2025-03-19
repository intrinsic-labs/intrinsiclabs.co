'use client';

import { useRef, useEffect } from 'react';
import SectionTitle from './SectionTitle';
import SectionContent from './SectionContent';
import AccentText from './AccentText';
import CodeChip from './CodeChip';

export default function ProjectOverview() {
  const parallaxBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxBgRef.current) {
        const section = parallaxBgRef.current.parentElement;
        if (section) {
          const sectionTop = section.getBoundingClientRect().top;
          const scrollFactor = 0.4; // Different speed for visual diversity
          parallaxBgRef.current.style.transform = `translateY(${-sectionTop * scrollFactor}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="py-24 px-8 max-w-3xl mx-auto relative overflow-hidden">
      <div className="relative overflow-hidden">
        <div 
          ref={parallaxBgRef} 
          className="absolute top-0 left-0 w-full h-[120%] z-0 opacity-15"
        />
        <div className="relative z-10">
          <SectionTitle>Project Overview</SectionTitle>
          <SectionContent>
            <p>
              <span className="font-cardo italic text-white">Latent Spaces</span> is the first mobile application specifically designed around the concept of a language model loom.
              The app facilitates generation of N continuations to any prompt from any point in an exchange, and allows users to
              traverse and curate all generated branches at will. Model providers <CodeChip>OpenRouter</CodeChip> and <CodeChip>Anthropic</CodeChip> are currently
              implemented. The iOS beta is in the works, with Android beta next in line on the priority list.
            </p>
            <br />
            <AccentText color="text-white">
              This project proposal aims to get the iOS app ready for a public beta release.
            </AccentText>
            <br />
            <p>
              Alongside the mobile app, Intrinsic Labs is developing a protocol called <CodeChip>OpenLoom</CodeChip> that other loom interfaces may
              adopt to import/export trees in a standardized lossless format. Latent Spaces supports tree sharing via the
              OpenLoom format out of the box.
            </p>
            <br />
            <AccentText color="text-white">
              This project proposal also aims to get OpenLoom V1.0 ready for publication.
            </AccentText>
          </SectionContent>
        </div>
      </div>
    </section>
  );
} 