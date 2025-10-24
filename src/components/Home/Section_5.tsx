import React from "react";

import logo from "../../assets/teachers/logo.png"; // Replace with your own

const logos = [
  logo, logo, logo, logo, logo, logo,
];

const Section_5: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-white">
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-gray-900 font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight">
          Nos Partenaires
        </h2>
        <p className="text-gray-600 mt-2 text-sm md:text-lg">
          Ils nous font confiance
        </p>
      </div>

      {/* Slider */}
      <div className="relative w-full overflow-hidden px-6 sm:px-10 md:px-20">
        {/* Left Shadow */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-28 bg-gradient-to-r from-white to-transparent z-30"></div>

        {/* Right Shadow */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-28 bg-gradient-to-l from-white to-transparent z-30"></div>

        {/* Logos scrolling */}
        <div className="flex gap-10 sm:gap-16 md:gap-24 animate-logoScroll hover:pause-animation">
          {[...logos, ...logos, ...logos].map((logo, idx) => (
            <div key={idx} className="flex-shrink-0">
              <img
                src={logo}
                alt={`Logo Partenaire ${idx}`}
                className="h-10 sm:h-12 md:h-16 object-contain opacity-80 hover:opacity-100 transition duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section_5;
