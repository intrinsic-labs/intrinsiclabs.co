"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import { useForm, ValidationError } from '@formspree/react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    budget: '',
    timeline: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  // Use the form key from formspree.json instead of environment variable
  const [state, handleSubmit] = useForm("contactForm");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    // Let Formspree handle the submission
    await handleSubmit(e);
  };
  
  const inputClasses = "w-full bg-background border border-neutral-300 rounded-md px-4 py-3 text-primary placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-600 focus:border-transparent transition-all duration-200";
  const labelClasses = "block text-sm font-light text-neutral-600 mb-1";
  const errorClasses = "text-orange text-xs mt-1";
  
  // Success message animation variants
  const successVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <Card className="p-6 md:p-8" id="contact-form">
      <div className="mb-6">
        <p className="text-neutral-800">Fill out the form below and we'll get back to you within 24-48 hours.</p>
      </div>
      
      {state.succeeded ? (
        <motion.div 
          className="bg-accent/10 border border-accent/30 rounded-lg p-6 text-center"
          initial="hidden"
          animate="visible"
          variants={successVariants}
        >
          <div className="text-accent text-4xl mb-4">✓</div>
          <h3 className="heading-sm mb-2">Message Sent!</h3>
          <p className="text-neutral-800">
            Thank you for reaching out. We'll be in touch with you shortly.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 text-primary hover:text-accent transition-colors"
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className={labelClasses}>Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`${inputClasses} ${errors.name ? 'border-orange/50 focus:ring-orange/30' : ''}`}
                placeholder="Your name"
              />
              {errors.name && <p className={errorClasses}>{errors.name}</p>}
              <ValidationError prefix="Name" field="name" errors={state.errors} />
            </div>
            
            <div>
              <label htmlFor="email" className={labelClasses}>Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`${inputClasses} ${errors.email ? 'border-orange/50 focus:ring-orange/30' : ''}`}
                placeholder="your.email@example.com"
              />
              {errors.email && <p className={errorClasses}>{errors.email}</p>}
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="subject" className={labelClasses}>Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={inputClasses}
              placeholder="What's this about?"
            />
            <ValidationError prefix="Subject" field="subject" errors={state.errors} />
          </div>
          
          <div className="mb-6">
            <label htmlFor="message" className={labelClasses}>Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className={`${inputClasses} resize-none ${errors.message ? 'border-orange/50 focus:ring-orange/30' : ''}`}
              placeholder="Tell us about your project or inquiry..."
            ></textarea>
            {errors.message && <p className={errorClasses}>{errors.message}</p>}
            <ValidationError prefix="Message" field="message" errors={state.errors} />
          </div>
          
          {errors.form && (
            <div className="mb-6 p-3 bg-orange/10 border border-orange/30 rounded-md">
              <p className="text-orange text-sm">{errors.form}</p>
            </div>
          )}
          <ValidationError errors={state.errors} />
          
          <button
            type="submit"
            disabled={state.submitting}
            className={`btn-primary w-full flex items-center justify-center ${state.submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {state.submitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-background" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </button>
        </form>
      )}
    </Card>
  );
};

export default ContactForm; 