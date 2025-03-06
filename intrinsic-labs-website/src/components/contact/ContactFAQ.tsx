"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import FeatureCard from '../ui/FeatureCard';

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
    <section className="py-16 md:py-24 bg-neutral-900/30">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">Frequently Asked Questions</h2>
          <p className="paragraph text-secondary/70 max-w-2xl mx-auto">
            Have questions about working with us? Here are answers to some common inquiries.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
            >
              <div className="bg-background/50 backdrop-blur-sm rounded-lg border border-primary/20 hover:border-primary/40 transition-all duration-300 overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex justify-between items-center"
                >
                  <h3 className="text-lg font-medium text-primary">{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-primary"
                  >
                    <FiChevronDown size={20} />
                  </motion.div>
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
                      <div className="px-6 pb-6 pt-0">
                        <div className="h-px w-full bg-primary/10 mb-4"></div>
                        <p className="text-secondary/80">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-secondary/70 mb-6">
            Still have questions? Just fill out the contact form above to get in touch.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactFAQ; 