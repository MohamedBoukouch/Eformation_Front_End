import { useState } from 'react';
import Signup from '../../pages/Signup';
import Login from '../../pages/Login';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Function to show the signup modal when "Login" is clicked
  const handleSignupClick = () => {
    setShowSignup(true); // Show the signup modal
  };

  const handleLoginClick = () => {
    setShowLogin(true); // Show the signup modal
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-30 py-4 px-6 sm:py-5 sm:px-8 md:py-6 md:px-12 lg:py-8 lg:px-16">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
          Eformation
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:space-x-8 lg:space-x-10">
          <button
            className="text-white hover:text-gray-300 transition-colors duration-300 md:text-lg lg:text-xl"
            onClick={handleLoginClick} // Trigger modal on Login click
          >
            Login
          </button>
          <button 
            className="text-white hover:text-gray-300 transition-colors duration-300 md:text-lg lg:text-xl"
            onClick={() => setShowSignup(true)} // Trigger modal on Signup click
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
          <div className="absolute top-full left-0 right-0 backdrop-blur-sm md:hidden">
            <div className="flex flex-col space-y-4 p-6">
              <button
                className="text-white text-lg hover:text-gray-300 transition-colors duration-300 py-2"
                onClick={() => { handleLoginClick(); setIsMenuOpen(false); }} // Trigger modal on Login click in mobile menu
              >
                Login
              </button>
              <button
                className="text-white text-lg opacity-15 hover:text-gray-300 transition-colors duration-300 py-2 text-left"
                onClick={() => { setShowSignup(true); setIsMenuOpen(false); }} // Trigger modal on Signup click in mobile menu
              >
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
            className="absolute inset-0 bg-opacity-90 backdrop-blur-sm" 
            onClick={() => setShowSignup(false)} // Close modal when background is clicked
          ></div>

          {/* Modal content */}
          <div className="relative z-10 w-full max-w-md">
            <button
              className="absolute top-2 right-2 text-white text-2xl z-20"
              onClick={() => setShowLogin(false)} // Close modal when "X" button is clicked
            >
              ✕
            </button>
            <Signup onClose={() => setShowSignup(false)} /> Render Signup modal
          </div>
        </div>
      )}


      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          {/* Semi-transparent background */}
          <div 
            className="absolute inset-0 bg-opacity-90 backdrop-blur-sm" 
            onClick={() => setShowLogin(false)} // Close modal when background is clicked
          ></div>

          {/* Modal content */}
          <div className="relative z-10 w-full max-w-md">
            <button
              className="absolute top-2 right-2 text-white text-2xl z-20"
              onClick={() => setShowLogin(false)} // Close modal when "X" button is clicked
            >
              ✕
            </button>
            <Login onClose={() => setShowLogin(false)} /> {/* Render Signup modal */}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
