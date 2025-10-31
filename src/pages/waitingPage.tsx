import React from 'react';

const WaitingPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="text-center bg-white shadow-lg rounded-xl p-8 max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Vérification en attente
        </h1>
        <p className="text-gray-600 text-base">
          Vous devez attendre que votre compte soit vérifié par l'administrateur.
        </p>
      </div>
    </div>
  );
};

export default WaitingPage;
