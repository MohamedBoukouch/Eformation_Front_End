import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

import WarehouseImg from "../../assets/main_truck.avif";
import CargoImg from "../../assets/truck_right.png";

interface Tab {
  id: string;
  title: string;
  content: string;
}

const Section_4: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("expertise");
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  const tabs: Tab[] = [
    {
      id: "expertise",
      title: "Expertise Prouvée",
      content:
        "Notre équipe transforme vos stocks en trésorerie de manière rapide et optimale."
    },
    {
      id: "reseau",
      title: "Réseau Solide",
      content:
        "Un réseau d’acheteurs fiables pour garantir la meilleure valorisation possible."
    },
    {
      id: "service",
      title: "Service Clé En Main",
      content:
        "Nous gérons toutes les étapes de l’évaluation à la liquidation de vos invendus."
    },
    {
      id: "rapidite",
      title: "Rapidité & Confidentialité",
      content:
        "Votre image reste protégée pendant que votre trésorerie augmente immédiatement."
    }
  ];

  const activeContent = tabs.find((t) => t.id === activeTab);

  return (
    <section ref={ref} className="bg-white py-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">

        {/* LEFT IMAGE GROUP */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="relative w-full flex justify-center"
        >
          {/* MAIN IMAGE */}
          <img
            src={WarehouseImg}
            alt="Main warehouse"
            className="rounded-xl shadow-xl w-full max-h-[420px] object-cover"
          />

          {/* OVERLAY IMAGE – BOTTOM RIGHT */}
          <motion.img
            src={CargoImg}
            alt="Cargo"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: -90 } : {}}
            transition={{ duration: 1.1, delay: 0.25 }}
            className="absolute bottom-[-12%] right-[-10%] 
                       w-[60%] rounded-lg 
                       z-20 hidden md:block"
          />
        </motion.div>

        {/* RIGHT SIDE CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 tracking-tight">
            UN PARTENAIRE FIABLE<br /> ET EFFICACE
          </h2>

          <div className="space-y-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex justify-between items-center w-full px-4 py-3 rounded-md transition ${
                  activeTab === tab.id
                    ? "bg-yellow-100 border-l-4 border-yellow-500"
                    : "hover:bg-gray-100"
                }`}
              >
                <span
                  className={`text-lg font-medium ${
                    activeTab === tab.id ? "text-yellow-600" : "text-gray-800"
                  }`}
                >
                  {tab.title}
                </span>

                {/* Simple arrow */}
                <svg
                  className={`w-6 h-6 transition ${
                    activeTab === tab.id ? "text-yellow-600" : "text-gray-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
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
              className="mt-8"
            >
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {activeContent?.content}
              </p>

              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition">
                Nous contacter
              </button>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Section_4;
