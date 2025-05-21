'use client';

import { useEffect } from 'react';

export default function ParallaxEffect() {
  useEffect(() => {
    const handleScroll = () => {
      const parallaxSections = document.querySelectorAll('.parallax-section');
      
      parallaxSections.forEach((section) => {
        const scrollY = window.scrollY;
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        
        // Only apply effect when section is in view or close to it
        if (scrollY + window.innerHeight > sectionTop - 300 && 
            scrollY < sectionTop + sectionHeight + 300) {
          
          // Calculate how far scrolled relative to the section
          const relativeScroll = scrollY - sectionTop + window.innerHeight;
          
          // Get the background element within the section
          const bgElement = section.querySelector('.parallax-background') as HTMLElement;
          if (bgElement) {
            // Apply transform for parallax effect
            bgElement.style.transform = `translateY(${relativeScroll * 0.7}px)`;
          }
        }
      });
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial call to position elements
    handleScroll();
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return null; // This component doesn't render anything
} 