import React from "react";

const Footer2: React.FC = () => {
  return (
    <footer className="bg-[#2b2724] text-gray-300 py-6 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
      {/* Left side */}
      <p className="text-center md:text-left">
        © 2025 <span className="font-semibold">Oracle University</span>
      </p>

      {/* Right side links */}
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-gray-400">
        {[
          "Privacy / Do Not Sell My Info",
          "Contact Us",
          "Terms of Use",
          "Ad Choices",
        ].map((link, index) => (
          <React.Fragment key={index}>
            {index !== 0 && <span className="hidden md:inline text-gray-600">|</span>}
            <a
              href="#"
              className="hover:text-white transition-colors duration-300"
            >
              {link}
            </a>
          </React.Fragment>
        ))}
      </div>
    </footer>
  );
};

export default Footer2;
