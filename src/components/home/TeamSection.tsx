'use client';

import Image from 'next/image';
import { teamMembers } from '@/lib/team';
import { useTheme } from '@/providers/ThemeProvider';

const TeamSection = () => {
  const { isDarkTheme } = useTheme();


  return (
    <section 
      id="team"
      className="section-top-margin bg-background relative overflow-hidden pb-8"
    >
      <div className="container-custom relative z-10">
        <div 
          className="max-w-4xl mx-auto mb-8 md:mb-16 text-center"
        >
          <h2 className="heading-lg mb-6 font-display">Meet The Team</h2>

        </div>

        {/* Team Carousel */}
        <div
          className="max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto"
        >
          {/* Team carousel */}
          <div className="relative">
            {/* Team members */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  className="bg-white/40 hover:bg-white/80 dark:bg-primary/20 dark:hover:bg-primary/30 backdrop-blur-sm rounded-lg overflow-hidden border border-primary/20 hover:border-accent/60 flex flex-col transition-all duration-300"
                >
                  <div className="relative aspect-[1] overflow-hidden">
                    <Image
                      src={
                        member.image
                          ? member.image
                          : isDarkTheme
                            ? '/images/logo/planet_white_padding.svg'
                            : '/images/logo/planet_black_padding.svg'
                      }
                      alt={member.name}
                      width={300}
                      height={300}
                      className="object-cover w-full h-full"
                      priority
                    />
                  </div>
                  
                  <div className="py-2 md:py-3 px-3 md:px-4">
                    <div className="flex flex-col mb-2">
                    <h3 className="text-xl font-display font-bold">{member.name}</h3>
                    <p className="text-sm text-primary/60">{member.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection; 