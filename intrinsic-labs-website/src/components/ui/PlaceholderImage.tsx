import { FC, CSSProperties } from 'react';

interface PlaceholderImageProps {
  width?: number | string;
  height?: number | string;
  text?: string;
  className?: string;
  aspectRatio?: string | number;
  style?: CSSProperties;
}

const PlaceholderImage: FC<PlaceholderImageProps> = ({
  width = '100%',
  height = '100%',
  text = "Image Placeholder",
  className = "",
  aspectRatio = "1/1",
  style = {}
}) => {
  // Handle aspect ratio
  const getAspectRatioStyle = () => {
    if (typeof aspectRatio === 'string') {
      return aspectRatio;
    } else if (typeof aspectRatio === 'number') {
      return `${aspectRatio}`;
    }
    return "1/1";
  };

  // Convert width/height to string with px if they're numbers
  const widthStyle = typeof width === 'number' ? `${width}px` : width;
  const heightStyle = typeof height === 'number' ? `${height}px` : height;

  return (
    <div 
      className={`relative overflow-hidden w-full h-full ${className}`}
      style={{ 
        width: widthStyle,
        height: heightStyle,
        aspectRatio: getAspectRatioStyle(),
        ...style
      }}
    >
      {/* Modern dark background */}
      <div className="absolute inset-0 bg-neutral-500/60" />
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10">
        <div className="w-12 h-12 sm:w-16 sm:h-16 mb-2 sm:mb-4 border border-neutral-100 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-neutral-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="text-center">
          <span className="text-xs sm:text-sm text-neutral-100">{text}</span>
        </div>
      </div>
      
      {/* Subtle gradient overlay */}
      {/* <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(18, 16, 9, 0.5))'
        }}
      /> */}
      
      {/* Subtle accent glow on hover */}
      {/* <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 hovered:opacity-100 transition-opacity duration-500">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-[150%] opacity-30"
          style={{
            background: 'radial-gradient(ellipse at bottom, rgba(125, 155, 118, 0.6) 0%, transparent 70%)',
            filter: 'blur(30px)'
          }}
        />
      </div> */}
    </div>
  );
};

export default PlaceholderImage; 