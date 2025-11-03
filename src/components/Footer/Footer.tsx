import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn
} from "@fortawesome/free-brands-svg-icons";

import LogoImg from "../../assets/react.svg";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* BRAND / LOGO */}
        <div className="flex flex-col items-start">
          <img src={LogoImg} alt="Logo" className="w-32 mb-4" />
          <p className="text-gray-400 mb-4">
            Fournir un service fiable et efficace pour tous nos clients.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className="hover:text-white">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" className="hover:text-white">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" className="hover:text-white">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white font-bold mb-4 uppercase">Liens rapides</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white transition">Accueil</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">À propos</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">Services</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">Contact</a>
            </li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="text-white font-bold mb-4 uppercase">Support</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white transition">FAQ</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">Assistance technique</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">Conditions</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">Politique de confidentialité</a>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-white font-bold mb-4 uppercase">Contact</h3>
          <p className="mb-2">Email: contact@votreplateforme.com</p>
          <p className="mb-2">Téléphone: +212 123 456 789</p>
          <p>Adresse: 123 Rue Exemple, Ville, Maroc</p>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} VotrePlateforme. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
