// pages/Home.jsx
import React from "react";
import Section_1 from "../components/Home/Section_1.jsx";
import Section_2 from "../components/Home/Section_2.jsx";
import "../styles/App.css";

const Home : React.FC = ()=> {
  return (
    <div className="w-full min-h-screen overflow-x-hidden">

      <Section_1/>

      <Section_2/>

      <section className="bg-gray-900 text-white py-20 px-8 md:px-16 text-center">
        <h2 className="text-3xl font-bold mb-6 md:text-2xl sm:text-xl">Prêt à commencer votre parcours ?</h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto md:text-base sm:text-sm">
          Rejoignez notre communauté d'apprenants et commencez dès aujourd'hui votre aventure vers le succès.
        </p>
        <button className="bg-white text-black px-10 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 md:px-8 md:py-3">
          Créer un compte
        </button>
      </section>

    </div>
  );
};

export default Home;