import React, { useState } from "react";

interface EmailFormProps {
  email?: string;
  onBack: () => void;
}

const EmailForm: React.FC<EmailFormProps> = ({ email = "", onBack }) => {
  const [userEmail, setUserEmail] = useState(email);
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    console.log({ userEmail, password });
    alert("Signup successful");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">Adresse e-mail</label>
        <input
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="nom@email.com"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="******"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <button
          onClick={handleSignup}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          S'inscrire
        </button>
        <button
          onClick={onBack}
          className="w-full px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50 transition"
        >
          ← Retour aux options
        </button>
      </div>
    </div>
  );
};

export default EmailForm;
