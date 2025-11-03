import React from 'react';
import Header from '../Header/Header';

const Section_1: React.FC = () => {
  return (
    <section className="relative w-full 
                      h-[80vh]  /* 80% of viewport height on mobile */
                      md:h-screen /* Full screen on tablet and desktop */
                      overflow-hidden">
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

      {/* Main Content */}
      <div className="absolute inset-0 flex flex-col items-start justify-end text-white z-20 
                      pb-8 px-6
                      sm:pb-12 sm:px-8
                      md:pb-20 md:pl-16
                      lg:pb-24 lg:pl-20">
        
        {/* Main Heading */}
        <h1 className="text-2xl font-bold mb-3 leading-tight drop-shadow-lg tracking-tight
                       sm:text-3xl sm:mb-4
                       md:text-4xl md:mb-5
                       lg:text-5xl lg:mb-6
                       xl:text-6xl">
          TRANSFORMEZ VOTRE STOCK MORT <br className="hidden sm:block" />
          EN CASH
        </h1>

        {/* Subtitle */}
        <p className="text-sm mb-6 text-gray-100 max-w-md
                      sm:text-base sm:mb-8 sm:max-w-lg
                      md:text-lg md:mb-10 md:max-w-xl
                      lg:text-xl lg:mb-12
                      xl:text-2xl">
          Libérez de l'espace et valorisez vos invendus en toute simplicité.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3 w-full max-w-xs
                        sm:flex-row sm:gap-4 sm:max-w-none
                        md:gap-6
                        lg:gap-8">
          <button className="bg-white text-black px-5 py-2 text-sm font-medium hover:bg-gray-100 transition-all duration-300 w-full
                             sm:px-6 sm:py-2 sm:text-base sm:w-auto
                             md:px-8 md:py-3 md:text-lg
                             lg:px-10 lg:py-4">
            Nous contacter
          </button>

          <button className="border-2 border-white text-white px-5 py-2 text-sm font-medium hover:bg-white hover:text-black transition-all duration-300 w-full
                             sm:px-6 sm:py-2 sm:text-base sm:w-auto
                             md:px-8 md:py-3 md:text-lg
                             lg:px-10 lg:py-4">
            En savoir plus
          </button>
        </div>
      </div>
    </section>
  );
};

export default Section_1;