import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { reviews } from '@/lib/reviews';

// Star Rating component
const StarRating = ({ rating }: { rating: number }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<FaStar key={i} className="text-orange" />);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<FaStarHalfAlt key={i} className="text-orange" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-orange" />);
    }
  }

  return <div className="flex gap-1">{stars}</div>;
};

const Reviews = () => {

  return (
    <section
      className="section-top-margin pb-24 md:pb-32 relative overflow-hidden bg-background"
      id="reviews"
    >
      <div className="container-custom relative z-10">
        <div
          className="max-w-4xl mx-auto mb-8 md:mb-16 text-center"
        >
          <h2 className="heading-lg mb-6 max-w-2xl mx-auto font-display">Reviews</h2>
          <p className="text-2xl max-w-2xl mx-auto">
            We've had the privilege of working with amazing clients who trusted us to find the perfect solution for their needs.
          </p>
        </div>

        {/* Reviews with organic overlapping layout */}
        <div className="relative max-w-xl md:max-w-4xl lg:max-w-5xl mx-auto">
          
          <div className="relative">
            {reviews.map((review, index) => (
              <div
                key={review.id}
                className={`
                  relative w-[300px] md:w-[400px] lg:w-[480px]
                  ${(() => {
                    if (index === 0) return 'ml-auto mr-16 -mb-3 md:mr-24 lg:mr-24 md:-mb-3 lg:-mb-4';
                    if (index === 1) return 'mr-auto ml-16 -mb-3 md:ml-28 lg:ml-36 md:-mb-3 lg:-mb-16';
                    if (index === 2) return 'ml-auto mr-16 -mb-3 md:mr-12 lg:mr-18 md:-mb-3 lg:-mb-4';
                    if (index === 3) return 'mr-auto ml-16 -mb-3 md:ml-20 lg:ml-28 md:-mb-3 lg:-mb-4';
                    return '';
                  })()}
                `}
              >
                <div 
                  className={`
                    bg-white/40 hover:bg-white/80 dark:bg-primary/20 dark:hover:bg-primary/30 backdrop-blur-sm 
                    border border-primary/20 hover:border-accent/60
                    rounded-lg p-6
                    transition-all duration-300
                    relative z-10
                  `}
                >
                  <div className="mb-4">
                    <StarRating rating={review.stars} />
                  </div>
                  <blockquote className="mb-4">
                    <p className="paragraph-serif">{review.quote}</p>
                  </blockquote>
                  <footer className="text-sm font-medium font-mono">
                    {review.credit}
                  </footer>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
