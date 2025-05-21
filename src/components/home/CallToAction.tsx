
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
            <Link
              href="https://x.com/intrinsic_labs"
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary text-center flex flex-row gap-2 items-center">
              <FiPhone size={20} />
              Give us a call
            </Link>

            <Link
              href="https://x.com/intrinsic_labs"
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary text-center flex flex-row gap-2 items-center">
              <FiMail size={20} />
              Email us
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction; 