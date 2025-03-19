'use client';

import { useState, useRef, useEffect } from 'react';
import SectionTitle from './SectionTitle';

type FAQItemProps = {
  question: string;
  answer: string;
};

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (answerRef.current) {
      setHeight(answerRef.current.scrollHeight);
    }
  }, [answer, isOpen]);

  return (
    <div className="border-b border-white/10 py-6 last:border-b-0">
      <button
        className="w-full flex justify-between items-center text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3 className={`font-cardo text-[1.25rem] ${isOpen ? 'text-ls-accentLight' : 'text-white'} font-normal`}>{question}</h3>
        <div className="ml-4 flex-shrink-0 relative w-6 h-6">
          <span className={`absolute top-1/2 left-0 w-full h-0.5 ${isOpen ? 'bg-ls-accentLight' : 'bg-white'} transform -translate-y-1/2 transition-transform duration-300 ${isOpen ? 'rotate-0' : ''}`}></span>
          <span className={`absolute top-1/2 left-0 w-full h-0.5 ${isOpen ? 'bg-ls-accentLight' : 'bg-white'} transform -translate-y-1/2 transition-transform duration-300 ${isOpen ? 'rotate-90 opacity-0' : 'rotate-90'}`}></span>
        </div>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <div ref={answerRef} className="pt-4 pb-2 text-white font-inter text-[1rem] leading-[1.7]">
          {answer}
        </div>
      </div>
    </div>
  );
};

const faqData = [
  {
    question: "What is Latent Spaces?",
    answer: "Latent Spaces is a mobile app being developed for iOS (and later Android) that provides a direct interface to large language models, but with a unique twist - all conversations are structured as freely explorable looms instead of traditional linear chats. This enables much more intuitive exploration of ideas, scenarios, and creative concepts."
  },
  {
    question: "What is a loom interface?",
    answer: "A loom interface is a way of structuring conversations with AI that allows for non-linear exploration. Unlike traditional chat interfaces where each exchange is linear (one response follows another), a loom allows you to branch off in different directions from any point in the conversation, creating a network of interconnected thoughts and ideas."
  },
  {
    question: "What does 'open source' mean in this context?",
    answer: "Latent Spaces is being developed with an open source approach, meaning the code will be publicly available for examination, modification, and enhancement by anyone. This applies to both the Latent Spaces app itself and the OpenLoom protocol that powers the conversation structure. This approach encourages community participation and ensures transparency."
  },
  {
    question: "Will I need to pay for API access to use Latent Spaces?",
    answer: "Yes, Latent Spaces will require you to connect your own API keys for language models like OpenAI's GPT or Anthropic's Claude. This means you'll need to pay for your own API usage based on the pricing of those providers. This approach gives users flexibility to choose which models they want to use and keeps costs transparent."
  },
  {
    question: "When will the beta be available?",
    answer: "We're aiming to launch the first public beta of Latent Spaces in Summer 2024, provided we reach our fundraising goals. Development timelines may adjust based on funding and development progress."
  },
  {
    question: "How will the fundraiser funds be used?",
    answer: "Funds raised will directly support development of both the Latent Spaces iOS app and the OpenLoom protocol. This includes addressing performance issues, implementing core features like saving prompts and node editing, and expanding capabilities like image uploads and voice transcription. The detailed scope of work is outlined in the fundraiser section."
  },
];

export default function FAQ() {
  const parallaxBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxBgRef.current) {
        const section = parallaxBgRef.current.parentElement;
        if (section) {
          const sectionTop = section.getBoundingClientRect().top;
          const scrollFactor = 0.2; 
          parallaxBgRef.current.style.transform = `translateY(${-sectionTop * scrollFactor}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="px-4 max-w-3xl mx-auto relative overflow-hidden" id="faq">
      <div className="relative overflow-hidden">
        <div 
          ref={parallaxBgRef} 
          className="absolute top-0 left-0 w-full h-[120%] z-0 opacity-15"
        />
        <div className="relative z-10">
          <SectionTitle className="ml-4">FAQ</SectionTitle>

          <div className="bg-white/[0.03] rounded-xl p-6 md:p-8">
            {faqData.map((item, index) => (
              <FAQItem key={index} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 