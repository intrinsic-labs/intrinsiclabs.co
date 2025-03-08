'use client';

import PageHero from '../ui/PageHero';

const AboutHero = () => {
  return (

    <PageHero
      title="If it would just do\nthis one thing,\nit would be \nperfect."
      description="That recurring thought is where the journey started. It's been going strong ever since. Wanna be a part of it?"
      children={
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mt-8">
            <a href="#company-story" className="btn-primary">
              Our Story
            </a>
            <a href="#team" className="btn-secondary">
              Meet the Team
            </a>
          </div>
      }
    />
  );
};

export default AboutHero; 