"use client";

import PageHero from '../ui/PageHero';

const ContactHero = () => {
  
  return (
    <PageHero
      title="Let's Build Something\nAmazing Together"
      description="Have a project in mind or just want to chat about possibilities? We're here to help turn your ideas into reality."
      terminalContent='const contact = await intrinsicLabs.connect()'
      bottomPadding={false}
    />
  );
};

export default ContactHero; 