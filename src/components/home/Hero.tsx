import Image from 'next/image';

const Hero = () => (
  <div className="min-h-[40vh] flex items-center relative overflow-hidden bg-background parallax-section">
    <div className="container-custom relative z-10 mt-24 md:py-12 flex flex-col items-center justify-center">
      <div className="max-w-7xl w-full flex flex-col items-center justify-center text-center">
        <div className="relative mx-auto rounded-3xl overflow-hidden w-full h-[40vh] md:h-[50vh]">
          <Image
            src="/images/sunset.webp"
            alt="Intrinsic Labs Logo"
            width={2000}
            height={2000}
            className="w-full h-full object-cover object-center opacity-80"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 lg:max-w-4xl mx-auto">
            <h1 className="heading-xl font-bold mb-8 text-white">
              Your website either <span className="font-bold">helps</span> your business or <span className=" font-bold">hurts</span> it.
            </h1>

            <div>       
              <h4 className="heading-sm max-w-xl mx-auto line-spacing-lg mb-8 md:mb-0 text-white">
              There is no middle ground.
              </h4>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
);

export default Hero; 