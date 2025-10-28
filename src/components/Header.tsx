import { useState } from 'react';
import Signup from '../pages/Signup';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-30 py-4 px-6 sm:py-5 sm:px-8 md:py-6 md:px-12 lg:py-8 lg:px-16">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
          Elearning
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:space-x-8 lg:space-x-10">
          <a href="#contact" className="text-white hover:text-gray-300 transition-colors duration-300 md:text-lg lg:text-xl">
            En savoir plus
          </a>
          <button 
            className="text-white hover:text-gray-300 transition-colors duration-300 md:text-lg lg:text-xl"
            onClick={() => setShowSignup(true)}
          >
            Signup
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0   backdrop-blur-sm md:hidden">
            <div className="flex flex-col space-y-4 p-6">
              <a href="#contact" className="text-white text-lg hover:text-gray-300 transition-colors duration-300 py-2" onClick={() => setIsMenuOpen(false)}>
                Nous contacter
              </a>
              <button className="text-white text-lg hover:text-gray-300 transition-colors duration-300 py-2 text-left" onClick={() => { setShowSignup(true); setIsMenuOpen(false); }}>
                Signup
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Signup Modal */}
      {showSignup && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          {/* Semi-transparent background */}
          <div 
            className="absolute inset-0  bg-opacity-90 backdrop-blur-sm" 
            onClick={() => setShowSignup(false)}
          ></div>

          {/* Modal content */}
          <div className="relative z-10 w-full max-w-md">
            <button
              className="absolute top-2 right-2 text-white text-2xl z-20"
              onClick={() => setShowSignup(false)}
            >
              ✕
            </button>
            <Signup onClose={function (): void {
              throw new Error('Function not implemented.');
            } } />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
