import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import PlaceholderImage from './PlaceholderImage';

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  image?: string;
  imageAlt?: string;
  chips?: string[];
  className?: string;
  onClick?: () => void;
  isHovered?: boolean;
  variants?: any;
}

const FeatureCard: FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  image,
  imageAlt = "Feature image",
  chips = [],
  className = "",
  onClick,
  isHovered = false,
  variants,
}) => {
  // Split description into paragraphs if it contains newlines
  const descriptionParagraphs = description.split('\n\n');
  const firstParagraph = descriptionParagraphs[0];
  const remainingParagraphs = descriptionParagraphs.slice(1);

  return (
    <motion.div
      variants={variants}
      className={`bg-background/50 backdrop-blur-sm p-6 rounded-lg border border-primary/20 hover:border-primary/40 transition-all duration-300 ${isHovered ? 'border-primary' : ''} ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      whileHover={{ 
        y: onClick ? -3 : 0,
        transition: { duration: 0.2 }
      }}
    >
      {/* Image (if provided) */}
      {image && image !== '' && (
        <div className="mb-4 overflow-hidden rounded-md">
          <div className="aspect-w-16 aspect-h-9">
            <img 
              src={image} 
              alt={imageAlt} 
              className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      )}
      
      {/* Icon (if provided) */}
      {icon && (
        <div className="text-primary mb-4">
          {icon}
        </div>
      )}
      
      {/* Content */}
      <h4 className="text-xl font-display text-primary mb-2">{title}</h4>
      
      {/* First paragraph (could be a subtitle) */}
      {firstParagraph && (
        <p className="text-sm text-secondary/70 mb-3 font-medium">
          {firstParagraph}
        </p>
      )}
      
      {/* Remaining paragraphs */}
      {remainingParagraphs.length > 0 && remainingParagraphs.map((paragraph, index) => (
        <p key={index} className="text-secondary/80 text-sm mb-3">
          {paragraph}
        </p>
      ))}
      
      {/* Chips (if provided) */}
      {chips.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {chips.map((chip, index) => (
            <span 
              key={index} 
              className="text-xs px-2 py-1 rounded-sm bg-primary/10 text-primary/80"
            >
              {chip}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default FeatureCard; 