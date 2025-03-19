'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import FeatureItem from './FeatureItem';
import SectionTitle from './SectionTitle';
import SectionContent from './SectionContent';
import CodeChip from './CodeChip';
// Fundraising progress data
const FUNDING_GOAL = 100000; // $100,000 goal
const CURRENT_FUNDING = 35000; // $35,000 current (example)
const FUNDING_PERCENTAGE = (CURRENT_FUNDING / FUNDING_GOAL) * 100;

// Features with funding status
const iosFeatures = [
  { id: 1, text: 'Address SwiftData-related performance issues', funded: true },
  { id: 2, text: 'Upgrade node caching system', funded: true },
  { id: 3, text: 'Add support for saving reusable system prompts', funded: true },
  { id: 4, text: 'Add pinned/bookmarked trees', funded: false },
  { id: 5, text: 'Add support for editing tree nodes', funded: false },
  { id: 6, text: 'Add full markdown display support', funded: false },
  { id: 7, text: 'Add image upload support (for applicable models)', funded: false },
  { id: 8, text: 'Add document upload support (for applicable models)', funded: false },
  { id: 9, text: 'Parse reasoning tokens for relevant models (e.g. DeepSeek R1)', funded: false },
  { id: 10, text: 'Add support for user defined models that comply with OpenAI API schema', funded: false },
  { id: 11, text: 'Add on-device audio transcription for hands-free beta voice mode', funded: false },
  { id: 12, text: 'Implement functional MVP of LoomDisplay (text-to-ASCII animation system)', funded: false },
];

const openLoomFeatures = [
  { id: 1, text: 'Upgrade OpenLoom protocol from graph structure to hypergraph structure', funded: true },
  { id: 2, text: 'Upgrade node signing requirements to ensure accurate author attribution', funded: false },
  { id: 3, text: 'Add support for non-text node types (e.g. images, documents)', funded: false },
];

const websiteFeatures = [
  { id: 1, text: 'Latent Spaces project overview', funded: true },
  { id: 2, text: 'Loom interface introduction for new users', funded: true },
  { id: 3, text: 'High level roadmap', funded: true },
  { id: 4, text: 'Beta program information and signup', funded: true },
  { id: 5, text: 'Social links', funded: true },
];

export default function Fundraising() {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const parallaxBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate the progress bar
    const timer = setTimeout(() => {
      setAnimatedPercentage(FUNDING_PERCENTAGE);
    }, 500);

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
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="py-24 px-4 max-w-5xl mx-auto relative overflow-hidden" id="fundraising">
      <div className="relative overflow-hidden">
        <div
          ref={parallaxBgRef}
          className="absolute top-0 left-0 w-full h-[120%] z-0 opacity-15"
        />
        <div className="relative z-10">


          <div className="bg-white/[0.03] border border-ls-accent/40 rounded-2xl p-6 pt-8 md:p-8 my-8 mb-16">
            <SectionTitle>Beta Fundraiser</SectionTitle>
            <SectionContent>
              Your support will directly fund development of Latent Spaces and the OpenLoom protocol. We're aiming to launch a public beta with a core set of features that will enable users to experience a true loom interface on their mobile devices.
            </SectionContent>

            <div className="my-12">
              <div className="flex justify-between mb-2 text-base font-calling-code">
                <span>${CURRENT_FUNDING.toLocaleString()} raised</span>
                <span>Goal: ${FUNDING_GOAL.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-white/10 rounded overflow-hidden mb-4">
                <motion.div
                  className="h-full bg-gradient-to-r from-ls-accentLight to-ls-accent rounded"
                  initial={{ width: '0%' }}
                  animate={{ width: `${animatedPercentage}%` }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
              </div>
              <div className="flex justify-between mb-2 text-base font-calling-code">
                <span>{FUNDING_PERCENTAGE.toFixed(1)}% funded</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-white/[0.05] rounded-2xl p-6 md:p-8 transition-colors duration-300 hover:bg-white/[0.08]">
                <h3 className="text-2xl mb-4 font-cardo">One-Time Contribution</h3>
                <p>Support development with a single contribution.</p>
                <div className="mt-6">
                  <a
                    href="https://buy.stripe.com/test_14k3dSg1z0uw8Io144"
                    className="inline-block w-full bg-ls-yellow text-white py-3 px-6 font-calling-code text-[0.95rem] rounded-full cursor-pointer transition-all duration-300 text-center"
                  >
                    Contribute Now
                  </a>
                </div>
              </div>
              <div className="bg-white/[0.05] rounded-2xl p-6 md:p-8 transition-colors duration-300 hover:bg-white/[0.08]">
                <h3 className="text-2xl mb-4 font-cardo">Monthly Support</h3>
                <p>Become a regular supporter for continuous development.</p>
                <div className="mt-6">
                  <a
                    href="https://buy.stripe.com/test_14k3dSg1z0uw8Io144"
                    className="inline-block w-full bg-ls-yellow text-white py-3 px-6 font-calling-code text-[0.95rem] rounded-full cursor-pointer transition-all duration-300 text-center"
                  >
                    Support Monthly
                  </a>
                </div>
              </div>
            </div>
          </div>




          <div className="px-4 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <SectionTitle>Feature Map</SectionTitle>
            </motion.div>

            <div className="mb-20">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <CodeChip size="large">iOS App Improvements</CodeChip>
              </motion.div>
              <ul className="my-8">
                {iosFeatures.map((feature, index) => (
                  <FeatureItem
                    key={feature.id}
                    text={feature.text}
                    funded={feature.funded}
                    delay={0.1 + index * 0.05}
                  />
                ))}
              </ul>
            </div>

            <div className="mb-20">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <CodeChip size="large">OpenLoom Protocol Upgrades</CodeChip>
              </motion.div>
              <ul className="my-8">
                {openLoomFeatures.map((feature, index) => (
                  <FeatureItem
                    key={feature.id}
                    text={feature.text}
                    funded={feature.funded}
                    delay={0.1 + index * 0.05}
                  />
                ))}
              </ul>
            </div>

            <div className="">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <CodeChip size="large">Latent Spaces Website</CodeChip>
              </motion.div>
              <ul className="my-8">
                {websiteFeatures.map((feature, index) => (
                  <FeatureItem
                    key={feature.id}
                    text={feature.text}
                    funded={feature.funded}
                    delay={0.1 + index * 0.05}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 