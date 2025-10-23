import React from 'react';
import Header from '../Header';

const Section_1: React.FC = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        src="/vid_1.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Header */}
      <Header />

      {/* Main Content - Mobile First Approach */}
      <div className="absolute inset-0 flex flex-col items-start justify-end text-white z-20 
                      pb-12 px-6
                      sm:pb-16 sm:px-8
                      md:pb-20 md:pl-16
                      lg:pb-24 lg:pl-20">
        
        {/* Main Heading */}
        <h1 className="text-3xl font-bold mb-4 leading-tight drop-shadow-lg tracking-tight
                       sm:text-4xl sm:mb-5
                       md:text-5xl md:mb-6
                       lg:text-6xl">
          TRANSFORMEZ VOTRE STOCK MORT <br className="hidden sm:block" />
          EN CASH
        </h1>

        {/* Subtitle */}
        <p className="text-base mb-8 text-gray-100 max-w-lg
                      sm:text-lg sm:mb-10
                      md:text-xl md:mb-12 md:max-w-2xl
                      lg:text-2xl">
          Libérez de l'espace et valorisez vos invendus en toute simplicité.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-4 w-full max-w-xs
                        sm:flex-row sm:gap-6 sm:max-w-none
                        md:gap-8">
          <button className="bg-white text-black px-6 py-3 text-base font-medium hover:bg-gray-100 transition-all duration-300 w-full
                             sm:px-8 sm:py-3 sm:text-base sm:w-auto
                             md:px-10 md:py-4 md:text-lg
                             lg:px-12 lg:py-4">
            Nous contacter
          </button>

          <button className="border-2 border-white text-white px-6 py-3 text-base font-medium hover:bg-white hover:text-black transition-all duration-300 w-full
                             sm:px-8 sm:py-3 sm:text-base sm:w-auto
                             md:px-10 md:py-4 md:text-lg
                             lg:px-12 lg:py-4">
            En savoir plus
          </button>
        </div>
      </div>
    </section>
  );
};

export default Section_1;