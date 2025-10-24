import React, { useRef, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import logo from "../../assets/teachers/prof.png";
import teacher_2 from "../../assets/teachers/truck_right.png";

const logos = [logo, teacher_2, logo, teacher_2, logo, teacher_2];

const Section_5: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-scroll on mobile
  useEffect(() => {
    if (!isMobile || !scrollRef.current) return;

    const container = scrollRef.current;
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % logos.length;
      container.scrollTo({
        left: index * container.clientWidth,
        behavior: "smooth",
      });
    }, 3000); // change image every 3s

    return () => clearInterval(interval);
  }, [isMobile]);

  // Manual scroll on mobile
  const scrollMobile = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const width = container.clientWidth;
    const scrollLeft = container.scrollLeft;
    let index = Math.round(scrollLeft / width);

    if (direction === "left") {
      index = index > 0 ? index - 1 : logos.length - 1;
    } else {
      index = (index + 1) % logos.length;
    }

    container.scrollTo({ left: index * width, behavior: "smooth" });
  };

  return (
    <section className="py-12 md:py-20 bg-white relative">
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-2xl xl:text-4xl font-bold text-gray-900 mb-4 uppercase">
          Nos Partenaires
        </h2>
        <p className="text-2xl xl:text-2xl font-semibold text-yellow-500 mb-6 leading-tight uppercase">
          Ils nous font confiance
        </p>
      </div>

      {/* Slider */}
      <div className="relative w-full overflow-hidden px-4 md:px-20">
        {/* Mobile arrows */}
        {isMobile && (
          <>
            <button
              onClick={() => scrollMobile("left")}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-50 p-2 bg-gray-200 rounded-full opacity-70 hover:opacity-100"
            >
              <FaChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={() => scrollMobile("right")}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-50 p-2 bg-gray-200 rounded-full opacity-70 hover:opacity-100"
            >
              <FaChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </>
        )}

        {/* Logos container */}
        <div
          ref={scrollRef}
          className={`flex gap-10 md:gap-16 ${
            isMobile
              ? "overflow-x-hidden scroll-smooth snap-x snap-mandatory"
              : "animate-scroll whitespace-nowrap"
          }`}
        >
          {[...logos, ...logos, ...logos].map((logoImg, idx) => (
            <div
              key={idx}
              className={`flex-shrink-0 ${
                isMobile ? "w-full snap-center" : "w-60 md:w-60"
              } flex justify-center`}
            >
              <img
                src={logoImg}
                alt={`Logo Partenaire ${idx}`}
                className={`object-contain ${
                  isMobile ? "h-64" : "h-28 sm:h-32 md:h-36"
                } opacity-90 hover:opacity-100 transition duration-300`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop animation */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Section_5;
