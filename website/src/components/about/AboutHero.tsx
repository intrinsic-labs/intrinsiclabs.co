'use client';

import PageHero from '../ui/PageHero';

const AboutHero = () => {
  return (

    <PageHero
      title="&ldquo;If it would just do\nthis one thing,\nit would be \nperfect.&rdquo;"
      description="That recurring thought is where we started."
      terminalContent={"console.log(intrinsicLabs.story)"}
    />
  );
};

export default AboutHero; 