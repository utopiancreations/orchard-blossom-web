
import { ReactNode } from "react";
import { Link } from "react-router-dom";

type HeroProps = {
  backgroundImage?: string;
  backgroundVideo?: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  overlay?: boolean;
  children?: ReactNode;
  imageOverlay?: string;
  useUrbandale?: boolean;
};

const Hero = ({
  backgroundImage,
  backgroundVideo,
  title,
  subtitle,
  buttonText,
  buttonLink,
  overlay = true,
  children,
  imageOverlay,
  useUrbandale = false
}: HeroProps) => {
  return (
    <div 
      className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden"
    >
      {backgroundVideo ? (
        <video 
          className="absolute w-full h-full object-cover"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src={backgroundVideo} type="video/mp4" />
          {backgroundImage && <img src={backgroundImage} alt="Fallback" className="w-full h-full object-cover" />}
        </video>
      ) : backgroundImage && (
        <div 
          className="absolute w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      
      {overlay && (
        <div className="absolute inset-0 bg-black opacity-40"></div>
      )}
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        {imageOverlay ? (
          <img 
            src={imageOverlay} 
            alt="Moffatt Ranch Peaches" 
            className="max-w-full w-auto max-h-[50vh] mx-auto"
          />
        ) : (
          <>
            {title && (
              <h1 className={`text-4xl md:text-6xl font-bold text-white mb-4 ${useUrbandale ? 'font-urbandale' : 'font-sans'}`}>
                {title}
              </h1>
            )}
            
            {subtitle && (
              <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </>
        )}
        
        {buttonText && buttonLink && (
          <Link to={buttonLink} className="btn-primary inline-block mt-8">
            {buttonText}
          </Link>
        )}
        
        {children}
      </div>
    </div>
  );
};

export default Hero;
