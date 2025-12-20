import React, { useRef, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import prof1 from "../../assets/teachers/1.png";
import prof2 from "../../assets/teachers/2.png";

const profs = [
  { img: prof1, name: "Professeur 1" },
  { img: prof2, name: "Professeur 2" },
  { img: prof1, name: "Professeur 3" },
  { img: prof2, name: "Professeur 4" },
];

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
      index = (index + 1) % profs.length;
      container.scrollTo({
        left: index * container.clientWidth,
        behavior: "smooth",
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [isMobile]);

  const scrollMobile = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const width = container.clientWidth;
    let index = Math.round(container.scrollLeft / width);

    if (direction === "left") {
      index = index > 0 ? index - 1 : profs.length - 1;
    } else {
      index = (index + 1) % profs.length;
    }

    container.scrollTo({ left: index * width, behavior: "smooth" });
  };

  return (
    <section className="py-16 md:py-24 bg-white relative">
      {/* Title */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 uppercase mb-3">
          Nos Professeurs
        </h2>
        <p className="text-xl md:text-2xl font-semibold text-yellow-500 uppercase">
          Une équipe d’experts passionnés
        </p>
      </div>

      {/* Slider */}
      <div className="relative w-full overflow-hidden px-4 md:px-24">
        {/* Mobile arrows */}
        {isMobile && (
          <>
            <button
              onClick={() => scrollMobile("left")}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-50 p-3 bg-white rounded-full"
            >
              <FaChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={() => scrollMobile("right")}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-50 p-3 bg-white rounded-full"
            >
              <FaChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </>
        )}

        {/* Container */}
        <div
          ref={scrollRef}
          className={`flex items-center gap-16 ${
            isMobile
              ? "overflow-x-hidden snap-x snap-mandatory"
              : "animate-scroll whitespace-nowrap"
          }`}
        >
          {[...profs, ...profs].map((prof, idx) => (
            <div
              key={idx}
              className={`flex-shrink-0 ${
                isMobile ? "w-full snap-center" : "w-[260px]"
              } flex flex-col items-center`}
            >
              <img
                src={prof.img}
                alt={prof.name}
                className={`object-contain ${
                  isMobile ? "h-72" : "h-44"
                }`}
              />
              <h3 className="mt-4 text-lg font-medium text-gray-800">
                {prof.name}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop animation */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 25s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Section_5;
