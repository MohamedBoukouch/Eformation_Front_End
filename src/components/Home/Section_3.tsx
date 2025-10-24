import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Section_3: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  const [counters, setCounters] = useState({
    clients: 0,
    produits: 0,
    satisfaction: 0,
    experience: 0
  });

  const targetValues = {
    clients: 150,
    produits: 500,
    satisfaction: 98,
    experience: 5
  };

  useEffect(() => {
    if (inView) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      const animateCounter = (key: keyof typeof targetValues) => {
        let currentStep = 0;
        const targetValue = targetValues[key];
        const stepValue = targetValue / steps;

        const timer = setInterval(() => {
          currentStep++;
          setCounters(prev => ({
            ...prev,
            [key]: Math.min(Math.floor(stepValue * currentStep), targetValue)
          }));

          if (currentStep >= steps) {
            clearInterval(timer);
          }
        }, stepDuration);
      };

      // Animate all counters
      Object.keys(targetValues).forEach(key => {
        animateCounter(key as keyof typeof targetValues);
      });
    }
  }, [inView]);

  const stats = [
    {
      id: 1,
      number: counters.clients,
      suffix: '+',
      label: 'Clients satisfaits',
      description: 'Entreprises accompagnées'
    },
    {
      id: 2,
      number: counters.produits,
      suffix: '+',
      label: 'Produits valorisés',
      description: 'Tonnes d\'invendus recyclés'
    },
    {
      id: 3,
      number: counters.satisfaction,
      suffix: '%',
      label: 'Taux de satisfaction',
      description: 'Clients recommandent nos services'
    },
    {
      id: 4,
      number: counters.experience,
      suffix: '+',
      label: 'Ans d\'expérience',
      description: 'Expertise sectorielle'
    }
  ];

  return (
    <section ref={ref} className=" py-1 px-4 sm:px-6 lg:py-20 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.1
              }}
              className="text-center  p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Animated Number */}
              <div className="mb-3">
                <span className="text-4xl font-bold text-yellow-600">
                  {stat.number}
                  <span className="text-3xl">{stat.suffix}</span>
                </span>
              </div>
              
              {/* Description */}
              <p className="text-sm text-gray-600">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 text-sm">
            * Chiffres mis à jour annuellement - Données certifiées
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Section_3;