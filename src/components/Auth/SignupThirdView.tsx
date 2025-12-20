import React from "react";

interface Props {
  email: string;
  onBack: () => void;
}

const SignupThirdView: React.FC<Props> = ({ email, onBack }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-md my-8 p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Inscription réussie !</h2>
        <p className="text-gray-700 mb-6">
          Merci <span className="font-semibold">{email}</span>.<br />
          Votre compte est en attente de validation par l'administrateur.
        </p>
        <button
          onClick={onBack}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 active:bg-blue-800 transition"
        >
          ← Retour à l'accueil
        </button>
      </div>
    </div>
  );
};

export default SignupThirdView;
