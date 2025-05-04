
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <NavLink to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/2399ad98-c225-4056-8b5d-14fa66f5396b.png" 
              alt="Moffatt Ranch Logo" 
              className="h-12 md:h-16"
            />
            <span className="sr-only">Moffatt Ranch Peaches</span>
          </NavLink>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu}
            className="text-ranch-dark hover:text-peach focus:outline-none"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </button>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center">
          <ul className="flex space-x-8 text-lg font-medium">
            <li>
              <NavLink 
                to="/" 
                className={({isActive}) => 
                  isActive ? "text-peach" : "text-ranch-dark hover:text-peach transition-colors"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about" 
                className={({isActive}) => 
                  isActive ? "text-peach" : "text-ranch-dark hover:text-peach transition-colors"
                }
              >
                Our Story
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/fruit" 
                className={({isActive}) => 
                  isActive ? "text-peach" : "text-ranch-dark hover:text-peach transition-colors"
                }
              >
                Our Fruit
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/visit" 
                className={({isActive}) => 
                  isActive ? "text-peach" : "text-ranch-dark hover:text-peach transition-colors"
                }
              >
                Visit Us
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact" 
                className={({isActive}) => 
                  isActive ? "text-peach" : "text-ranch-dark hover:text-peach transition-colors"
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="bg-white border-t border-gray-200 py-4">
            <ul className="flex flex-col space-y-4 px-4 text-center">
              <li>
                <NavLink 
                  to="/" 
                  className={({isActive}) => 
                    isActive ? "text-peach text-xl font-medium" : "text-ranch-dark text-xl font-medium"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/about" 
                  className={({isActive}) => 
                    isActive ? "text-peach text-xl font-medium" : "text-ranch-dark text-xl font-medium"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Our Story
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/fruit" 
                  className={({isActive}) => 
                    isActive ? "text-peach text-xl font-medium" : "text-ranch-dark text-xl font-medium"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Our Fruit
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/visit" 
                  className={({isActive}) => 
                    isActive ? "text-peach text-xl font-medium" : "text-ranch-dark text-xl font-medium"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Visit Us
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/contact" 
                  className={({isActive}) => 
                    isActive ? "text-peach text-xl font-medium" : "text-ranch-dark text-xl font-medium"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
