import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardTeacher,
  faGraduationCap,
  faTasks,
  faBolt
} from "@fortawesome/free-solid-svg-icons";

import WarehouseImg from "../../assets/main_teache.jpg";
import CargoImg from "../../assets/teachers_right.png";

interface Tab {
  id: string;
  title: string;
  content: string;
  icon: any;
}

const Section_4: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("expertise");
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  const tabs: Tab[] = [
    {
      id: "expertise",
      title: "Experts en pédagogie",
      content:
        "Des professeurs qualifiés créent des formations de haut niveau.",
      icon: faChalkboardTeacher
    },
    {
      id: "reseau",
      title: "Réseau certifié",
      content:
        "Une communauté d’étudiants qui apprennent des formations authentiques.",
      icon: faGraduationCap
    },
    {
      id: "service",
      title: "Suivi et QCM",
      content:
        "Chaque formation inclut des évaluations et un accompagnement dédié.",
      icon: faTasks
    },
    {
      id: "rapidite",
      title: "Accès immédiat",
      content:
        "Les cours sont accessibles directement après l’inscription.",
      icon: faBolt
    }
  ];

  const activeContent = tabs.find((t) => t.id === activeTab);

  return (
    <section ref={ref} className="bg-white py-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* TITLE ON TOP */}
        <div className="text-center mb-16">
          <h2 className="text-2xl xl:text-4xl font-bold text-gray-900 mb-4 uppercase">
            Pourquoi nous choisir ?
          </h2>
          <p className="text-2xl xl:text-2xl font-semibold text-yellow-500 mb-6 leading-tight uppercase">
            Un partenaire fiable et efficace.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* LEFT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="relative w-full flex justify-center"
          >
            {/* Main image */}
            <img
              src={WarehouseImg}
              alt="Main warehouse"
              className="w-full max-h-[420px] object-cover relative z-10 "
            />

            {/* Second image for mobile (bottom-right) */}
            <motion.img
              src={CargoImg}
              alt="Cargo mobile"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.1, delay: 0.25 }}
              className="absolute bottom-[-5%] right-[-5%] w-[40%] md:hidden z-20  shadow-lg"
            />

            {/* Second image for desktop (bottom-right, small) */}
            <motion.img
              src={CargoImg}
              alt="Cargo desktop"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y:  20} : {}}
              transition={{ duration: 1.1, delay: 0.25 }}
              className="absolute bottom-[-5%] right-[-5%] w-[40%] z-20 hidden md:block "
            />
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex justify-between items-center pb-3 border-b-2 ${
                    activeTab === tab.id
                      ? "border-yellow-500 text-yellow-500"
                      : "border-gray-200 text-gray-800"
                  }`}
                >
                  <span className="text-lg font-medium">{tab.title}</span>
                  <FontAwesomeIcon
                    icon={tab.icon}
                    className={`text-xl transition ${
                      activeTab === tab.id ? "text-yellow-600" : "text-gray-400"
                    }`}
                  />
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="mt-10"
              >
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {activeContent?.content}
                </p>

                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3  font-semibold transition">
                  S’inscrire maintenant
                </button>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Section_4;
