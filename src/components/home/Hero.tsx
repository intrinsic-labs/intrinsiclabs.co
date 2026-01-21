import Image from "next/image";

const Hero = () => (
  <div className="min-h-[40vh] flex items-center relative overflow-hidden bg-background parallax-section">
    {/* Graph paper grid background */}
    <div
      className="absolute -inset-40 opacity-7"
      // style={{
      //   backgroundImage: `
      //     linear-gradient(to right, currentColor 1px, transparent 1px),
      //     linear-gradient(to bottom, currentColor 1px, transparent 1px)
      //   `,
      //   backgroundSize: "100px 60px",
      //   maskImage:
      //     "linear-gradient(to bottom, black 0%, black 50%, transparent 100%)",
      //   WebkitMaskImage:
      //     "linear-gradient(to bottom, black 0%, black 50%, transparent 100%)",
      // }}
    />
    <div className="container-custom relative z-10 mt-24 md:py-12 flex flex-col items-center justify-center">
      <div className="max-w-7xl w-full flex flex-col items-center justify-center text-center">
        <div className="relative mx-auto rounded-3xl overflow-hidden w-full h-[40vh] md:h-[50vh]">
          {/*<Image
            src="/images/sunset.webp"
            alt="Intrinsic Labs Logo"
            width={2000}
            height={2000}
            className="w-full h-full object-cover object-center opacity-80"
          />*/}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 lg:max-w-4xl mx-auto">
            <h1 className="heading-xl font-bold mb-8 text-foreground max-w-2xl">
              {/*Your website either <span className="font-bold">helps</span> your business or <span className=" font-bold">hurts</span> it.*/}
              We will fix your life
              with code.
            </h1>

            <div>
              <h4 className="heading-sm max-w-xl mx-auto line-spacing-lg mb-8 md:mb-0 text-foreground">
                Let&apos;s grow your{" "}
                <span className="text-orange">revenue</span> with top notch
                apps.
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Hero;
