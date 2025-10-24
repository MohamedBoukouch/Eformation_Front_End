// Section_2.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Import images directly
import missionImage from "../../assets/section_2_1.webp";
import expertiseImage from "../../assets/section_2_2.webp";
import engagementsImage from "../../assets/section_2_3.webp";

const images = {
  mission: missionImage,
  expertise: expertiseImage,
  engagements: engagementsImage,
};

const tabs = [
  { key: "mission", label: "NOTRE MISSION" },
  { key: "expertise", label: "EXPERTISE" },
  { key: "engagements", label: "ENGAGEMENTS" },
];

const Section_2: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("mission");
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const getContent = () => {
    switch (selectedTab) {
      case "mission":
        return {
          description:
            "Notre mission est d’offrir aux enseignants un espace professionnel pour créer, diffuser et monétiser leurs formations en toute simplicité.",
          features: [
            "Créer et organiser des playlists vidéo et QCM.",
            "Monétiser son expertise facilement.",
            "Disposer d'un espace dédié pour gérer ses cours et ses étudiants.",
            "Rendre l’apprentissage accessible et flexible pour tous."
          ]
        };
  
      case "expertise":
        return {
          description:
            "Nous mettons à disposition des outils modernes pour permettre aux formateurs de partager leur savoir avec impact.",
          features: [
            "Interface intuitive pour mettre en ligne vos contenus.",
            "Gestion des étudiants et suivi de progression.",
            "Support des formats vidéo, quiz, et ressources téléchargeables.",
            "Accompagnement et bonnes pratiques pédagogiques."
          ]
        };
  
      case "engagements":
        return {
          description:
            "Nous nous engageons à garantir une expérience sécurisée et valorisante pour enseignants et étudiants.",
          features: [
            "Paiements sécurisés et protection des contenus.",
            "Confidentialité et protection des données.",
            "Qualité pédagogique vérifiée et mise en avant.",
            "Support technique réactif et fiable."
          ]
        };
  
      default:
        return { description: "", features: [] };
    }
  };
  

  const content = getContent();

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      className="bg-white pt-20 pb-12 px-6 sm:pt-40 sm:pb-16 sm:px-28 md:pt-24 md:pb-20 md:px-30 lg:pt-32 lg:pb-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Mobile Layout - Stacked */}
        <div className="block lg:hidden">
          {/* Headings - Mobile */}s
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-3 sm:text-4xl">
              QUI SOMMES-NOUS ?
            </h1>
            <h2 className="text-xl font-semibold text-yellow-500 leading-tight sm:text-2xl">
              LIQUIDATION SIMPLE,<br />
              RAPIDE, SÛRE
            </h2>
          </div>

          {/* Image - Mobile */}
          <motion.div
            key={selectedTab + "_mobile"}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8 sm:mb-12"
          >
            <img
              src={images[selectedTab as keyof typeof images]}
              alt="illustration"
              className="w-full h-90 sm:h-80  shadow-lg object-cover"
            />
          </motion.div>

          {/* Content - Mobile */}
          <motion.div
            key={selectedTab + "_mobile_content"}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:hidden w-full"
          >
            {/* Tabs - Mobile Full Width Underline */}
            <div className="flex flex-col items-center w-full">
              {tabs.map((tab) => (
                <div key={tab.key} className="w-full text-center">
                  <button
                    onClick={() => setSelectedTab(tab.key)}
                    className={`relative w-full py-3 uppercase font-semibold text-sm tracking-wide transition-colors ${
                      selectedTab === tab.key ? "text-yellow-500" : "text-gray-700"
                    }`}
                  >
                    {tab.label}

                    {selectedTab === tab.key && (
                      <span className="absolute left-0 bottom-0 w-full h-[2px] bg-yellow-500"></span>
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Description - Mobile */}
            <p className="text-gray-700 text-base sm:text-lg mb-6 text-center leading-relaxed px-4">
              {content.description}
            </p>

            {/* Features List - Mobile */}
            <div className="space-y-3 sm:space-y-4 px-2">
              {content.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-gray-50 rounded-lg p-3 sm:p-4"
                >
                  <div
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                      selectedTab === "mission"
                        ? "border-yellow-500 bg-yellow-500"
                        : "border-yellow-400 bg-yellow-400"
                    }`}
                  >
                    <svg
                      className="w-3 h-3 sm:w-3 sm:h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base flex-1">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Desktop Layout - Side by Side */}
        <div className="hidden lg:flex flex-row items-start gap-12 xl:gap-16">
          {/* Larger Image on the left - Desktop */}
          <motion.div
            key={selectedTab}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-3/5 xl:w-3/5 wl:h-150"
          >
            <img
              src={images[selectedTab as keyof typeof images]}
              alt="illustration"
              className="w-full h-[700px] xl:h-[700px]  shadow-1xl object-cover"
            />
          </motion.div>

          {/* Content on the right with same height as image - Desktop */}
          <motion.div
            key={selectedTab + "_text"}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-2/5 xl:w-2/5 flex flex-col justify-center min-h-[500px] xl:min-h-[600px]"
          >
            {/* Main Headings - Desktop */}
            <div className="mb-8 xl:mb-12">
              <h1 className="text-2xl xl:text-4xl font-bold text-gray-900 mb-4">
                QUI SOMMES-NOUS ?
              </h1>
              <h2 className="text-2xl xl:text-2xl font-semibold text-yellow-500 mb-6 leading-tight">
                LIQUIDATION SIMPLE, RAPIDE, SÛRE
              </h2>
            </div>

            {/* Tabs - Desktop */}
            <div className="flex gap-6 mb-8 xl:mb-10 flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedTab(tab.key)}
                  className={`font-bold text-lg xl:text-xl pb-2 border-b-2 transition-all duration-300 ${
                    selectedTab === tab.key
                      ? "border-yellow-500 text-yellow-600"
                      : "border-gray-300 text-gray-500 hover:text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Description - Desktop */}
            <p className="text-gray-700 text-lg xl:text-xl mb-8 xl:mb-10 leading-relaxed">
              {content.description}
            </p>

            {/* Features List - Desktop */}
            <div className="space-y-4 xl:space-y-5">
              {content.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={`w-6 h-6 xl:w-7 xl:h-7 rounded-full border-2 flex items-center justify-center mt-1 flex-shrink-0 ${
                    selectedTab === "mission" 
                      ? "border-yellow-500 bg-yellow-500" 
                      : "border-yellow-400 bg-yellow-400"
                  }`}>
                    <svg className="w-3 h-3 xl:w-4 xl:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-lg xl:text-xl flex-1">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Section_2;