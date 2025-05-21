
const Hero = () => (
  <div className="min-h-[40vh] flex items-center relative overflow-hidden bg-background parallax-section">
    <div className="container-custom relative z-10 mt-24 md:py-12 flex flex-col items-start justify-center">
      <div className="max-w-3xl w-full flex flex-col items-start justify-center text-left">
        {/* <Image
          src="/images/logo/vertical_black.svg"
          alt="Intrinsic Labs Logo"
          width={300}
          height={300}
          className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] mx-auto"
        /> */}
        <h1 className="heading-xl mb-8">
          Let&apos;s grow your <span className="text-orange font-bold">revenue</span> with top notch apps and websites
        </h1>

        <div>       
          <h4 className="heading-sm max-w-xl mx-auto line-spacing-lg mb-8 md:mb-0">
          Intrinsic Labs brings you exceptional quality with great, modern, secure software. 
          </h4>
        </div>

      </div>
    </div>
  </div>
);

export default Hero; 