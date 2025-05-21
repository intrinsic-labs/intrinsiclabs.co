
import Link from 'next/link';
import { FiMail, FiPhone } from 'react-icons/fi';

interface CallToActionProps {
  id?: string;
}

const CallToAction = ({ id = 'cta' }: CallToActionProps) => {

  return (
    <section 
    className="pt-8 md:pt-16 relative overflow-hidden"
    id={id}
    >

      <div
        className="container-custom relative z-10 parallax-content"
      >
        <div className="max-w-4xl mx-auto text-center">

          <div
            className="flex flex-row flex-wrap gap-6 items-center justify-center"
          >
            <a
              href="tel:+18036278166"
              className="button-primary text-center flex flex-row gap-2 items-center"
            >
              <FiPhone size={20} />
              Give us a call
            </a>

            <a
              href="mailto:helloworld@intrinsiclabs.co"
              className="button-primary text-center flex flex-row gap-2 items-center">
              <FiMail size={20} />
              Email us
            </a>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction; 