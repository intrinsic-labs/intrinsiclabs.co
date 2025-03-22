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
          <SectionTitle>The Probable Beauty of LLMs</SectionTitle>
          <SectionContent>
            <p>
              There are many interesting differences between a traditional computer program and a large language model. One of the most powerful is the non-deterministic nature of a model's output; that is, how a single prompt may produce multiple <em>unique</em> responses each time it is run.
            </p>
            <br />
            <p>
              To see why this is important, it is helpful to understand where models come from in the first place. LLMs like ChatGPT, Claude, and Gemini are pre-trained on terabytes of text sourced from the internet. Pre-training may take weeks or months to complete, and the result is a <CodeChip>base model</CodeChip>. 
            </p>
            <br />
            <p>
              Base models do not behave like assistants. Imagine autocomplete on steroids - to a base model, a "chat" looks like one long document, and the model simply continues that document. Base models typically output vastly varied responses to the same prompt. This makes sense - the training dataset is so large that for most prompts, <em>many</em> tokens have a high probability of coming next. With each output token, the range of possible <em>following</em> tokens shrinks, slowly pushing the model towards a deterministic output.
            </p>
            <br />
            <p>
              Usually, the base model is then fine-tuned on a specific task, typically learing to assume the role of a 'helpful, harmless, honest assistant'. This is known as <CodeChip>instruction tuning</CodeChip>. Instruction tuning inherently introduces a level of determinism to the model's output - now, tokens like "Sure, I'd be happy to help you with..." have a much higher probablity of following a given prompt than most other tokens in the training dataset.
            </p>
            <br />
            <p>
              <em>Asher is still typing...</em>
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