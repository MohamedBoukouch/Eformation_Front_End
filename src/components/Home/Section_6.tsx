import React from "react";
import { motion } from "framer-motion";

interface Package {
  id: string;
  name: string;
  subtitle: string;
  discount: string;
  price: string;
  oldPrice: string;
  freeMonths: string;
  features: string[];
  highlighted?: boolean;
}

const Section_6: React.FC = () => {
  const packages: Package[] = [
    {
      id: "cloud",
      name: "Cloud Startup",
      subtitle: "Idéal pour les besoins professionnels complexes",
      discount: "Réduction 73%",
      price: "7,49 $US / mois",
      oldPrice: "27,99 $US",
      freeMonths: "+3 mois gratuits",
      features: [
        "Jusqu’à 100 sites Web",
        "100 Go de stockage NVMe ultra rapide",
      ],
    },
    {
      id: "business",
      name: "Business",
      subtitle: "Plus d’outils et de puissance pour croître",
      discount: "Réduction 78%",
      price: "3,29 $US / mois",
      oldPrice: "14,99 $US",
      freeMonths: "+3 mois gratuits",
      features: [
        "Jusqu’à 50 sites Web",
        "50 Go de stockage NVMe rapide",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      subtitle: "Tout ce dont vous avez besoin pour démarrer",
      discount: "Réduction 80%",
      price: "2,49 $US / mois",
      oldPrice: "12,19 $US",
      freeMonths: "+3 mois gratuits",
      highlighted: true,
      features: [
        "Jusqu’à 3 sites Web",
        "20 Go de stockage SSD ultra rapide",
      ],
    },
    {
      id: "single",
      name: "Single",
      subtitle: "Parfait pour les projets individuels",
      discount: "Réduction 85%",
      price: "1,49 $US / mois",
      oldPrice: "9,99 $US",
      freeMonths: "+3 mois gratuits",
      features: [
        "1 site Web",
        "10 Go de stockage SSD",
      ],
    },
  ];

  return (
    <section className="bg-transparent py-20 px-6 lg:px-12 font-sans">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 uppercase">
          Nos Offres d’Hébergement
        </h2>
        <p className="mt-2 text-yellow-500 text-lg md:text-xl font-medium uppercase">
          Choisissez le plan qui vous convient
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {packages.map((pkg) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`relative flex flex-col items-center rounded-2xl border p-8 shadow-md hover:shadow-lg transition-all duration-300
              ${
                pkg.highlighted
                  ? "border-yellow-500 bg-yellow-50 scale-105 shadow-xl"
                  : "border-gray-200 bg-transparent"
              }
            `}
          >
            {/* Badge de réduction */}
            <div
              className={`absolute top-4 left-4 text-sm font-semibold px-3 py-1 rounded-full ${
                pkg.highlighted
                  ? "bg-yellow-500 text-white"
                  : "bg-pink-600 text-white"
              }`}
            >
              {pkg.discount}
            </div>

            {/* Étiquette “Populaire” */}
            {pkg.highlighted && (
              <div className="absolute top-0 -translate-y-1/2 bg-yellow-500 text-white font-bold px-4 py-1 rounded-full shadow-md uppercase text-xs">
                Le plus populaire
              </div>
            )}

            {/* Nom et sous-titre */}
            <h3 className="text-lg font-bold mt-6">{pkg.name}</h3>
            <p className="text-gray-500 text-sm mt-1 text-center">
              {pkg.subtitle}
            </p>

            {/* Prix */}
            <div className="mt-6 text-center">
              <p className="line-through text-gray-400 text-sm">{pkg.oldPrice}</p>
              <p className="text-3xl font-extrabold text-gray-900 mt-1">
                {pkg.price}
              </p>
              <p className="text-sm text-yellow-600 font-semibold">
                {pkg.freeMonths}
              </p>
            </div>

            {/* Ligne décorative */}
            <div
              className={`h-1 w-full mt-6 mb-4 rounded-full ${
                pkg.highlighted ? "bg-yellow-500" : "bg-gray-200"
              }`}
            ></div>

            {/* Fonctionnalités */}
            <ul className="space-y-3 text-sm text-gray-700 w-full text-center">
              {pkg.features.map((f, i) => (
                <li
                  key={i}
                  className="flex justify-center items-center space-x-2"
                >
                  <span className="text-yellow-500 font-bold">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {/* Bouton */}
            <button
              className={`mt-8 w-full py-3 rounded-lg border-2 font-semibold transition
                ${
                  pkg.highlighted
                    ? "border-yellow-500 bg-yellow-500 text-white hover:bg-yellow-600"
                    : "border-gray-300 text-gray-800 hover:border-yellow-500 hover:text-yellow-600"
                }
              `}
            >
              Choisir ce plan
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Section_6;
