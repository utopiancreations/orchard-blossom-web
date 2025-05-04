
import { ReactNode } from "react";
import { Link } from "react-router-dom";

type HeroProps = {
  backgroundImage: string;
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  overlay?: boolean;
  children?: ReactNode;
};

const Hero = ({
  backgroundImage,
  title,
  subtitle,
  buttonText,
  buttonLink,
  overlay = true,
  children
}: HeroProps) => {
  return (
    <div 
      className="relative h-[60vh] md:h-[70vh] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {overlay && (
        <div className="absolute inset-0 bg-black opacity-40"></div>
      )}
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">
          {title}
        </h1>
        
        {subtitle && (
          <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}
        
        {buttonText && buttonLink && (
          <Link to={buttonLink} className="btn-primary inline-block">
            {buttonText}
          </Link>
        )}
        
        {children}
      </div>
    </div>
  );
};

export default Hero;
