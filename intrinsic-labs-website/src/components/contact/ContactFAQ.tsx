"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

interface FAQItem {
  question: string;
  answer: string;
}

const ContactFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  const faqs: FAQItem[] = [
    {
      question: "What types of projects do you take on?",
      answer: "We specialize in native mobile app development (iOS and Android), web applications, and custom software solutions. Our expertise spans across various industries including healthcare, finance, e-commerce, and entertainment. We're particularly passionate about projects that solve real problems and create meaningful user experiences."
    },
    {
      question: "How much does a typical project cost?",
      answer: "Project costs vary widely depending on complexity, scope, and timeline. A simple mobile app might start around $25,000, while more complex applications with extensive features can range from $50,000 to $150,000+. We provide detailed estimates after understanding your specific requirements during our initial consultation."
    },
    {
      question: "What is your development process?",
      answer: "We follow an agile development methodology with regular client touchpoints. Our process typically includes: 1) Discovery and planning, 2) Design and prototyping, 3) Development sprints, 4) Testing and quality assurance, 5) Deployment, and 6) Ongoing support and maintenance. We emphasize transparency and collaboration throughout the entire process."
    },
    {
      question: "How long does it take to build an app or website?",
      answer: "Timeline depends on project complexity and scope. A simple website might take 4-8 weeks, while a comprehensive mobile app could take 3-6 months from concept to launch. We'll provide a more accurate timeline after our initial consultation and requirements gathering."
    },
    {
      question: "Do you offer ongoing maintenance and support?",
      answer: "Yes, we offer various maintenance and support packages to ensure your application remains secure, up-to-date, and functioning optimally. These can include regular updates, bug fixes, performance monitoring, and feature enhancements. We can tailor a support plan to meet your specific needs and budget."
    },
    {
      question: "Can you work with our existing team or codebase?",
      answer: "Absolutely. We're experienced in collaborating with in-house teams and working with existing codebases. We can provide specialized expertise to complement your team or take on specific aspects of development. We're flexible in our approach and can adapt to your existing workflows and processes."
    }
  ];
  
  return (
    <div>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-display font-medium mb-8"
      >
        Frequently Asked Questions
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-neutral-800 mb-8"
      >
        Have questions about working with us? Here are answers to some common inquiries. If you can't find what you're looking for, just fill out the contact form above to get in touch.
      </motion.p>
      
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 * index }}
            className="group"
          >
            <div className="hover:border-primary/30 transition-colors duration-300">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full py-6 text-left group"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-medium group-hover:text-accent transition-colors duration-300">
                      {faq.question}
                    </h3>
                  </div>
                  
                  <div className="mt-2 md:mt-0">
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="h-6 w-6 flex items-center justify-center rounded-full border border-neutral-500 text-neutral-800 group-hover:border-accent group-hover:text-accent transition-colors duration-300"
                    >
                      <FiChevronDown size={16} />
                    </motion.div>
                  </div>
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6">
                      <div className="h-px w-full bg-neutral-800/50 my-4"></div>
                      <p className="text-neutral-800">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Add a divider line between FAQ items, but not after the last item */}
              {index !== faqs.length - 1 && (
                <div className="border-b border-neutral-800/50 hover:border-primary/30 transition-colors duration-300"></div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ContactFAQ; 