'use client';

import { useRef } from 'react';
import CallToAction from '@/components/home/CallToAction';
import { values } from '@/lib/values';

const ValuesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      id="values"
      ref={sectionRef}
      className="pb-16 md:pb-24 bg-background relative overflow-hidden border-t border-slate/30 dark:border-creme/30 lg:border-none pt-4 md:pt-8 lg:pt-0"
    >

      <div className="container-custom relative z-10 pb-8 md:pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 max-w-6xl mx-auto">
          {values.map((value, idx) => (
            <div 
              key={value.id} 
              className="flex items-start lg:justify-center relative w-full"
            >
              <div className="pt-4 text-left w-full max-w-xl lg:max-w-xs">
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-lg text-primary/80">{value.description}</p>
              </div>
              {/* Vertical divider for all but the last item on large screens */}
              {idx !== values.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 h-[70%] w-px bg-slate/30 dark:bg-creme/30 transform translate-x-1/2 -translate-y-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
      <CallToAction id="contact" />
    </section>
  );
};

export default ValuesSection; 