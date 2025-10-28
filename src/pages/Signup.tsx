import React, { useState } from "react";
import SocialButtons from "../components/Auth/SocialButtons";
import CloseIcon from "../assets/icons/close.svg";

interface SignupProps {
  onClose?: () => void; 
}

const SignupForm: React.FC<{ prefillEmail?: string; onBack: () => void }> = ({ prefillEmail = "", onBack }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(prefillEmail);
  const [password, setPassword] = useState("");

  const handleReset = () => {
    setUsername("");
    setEmail(prefillEmail);
    setPassword("");
  };

  const handleSignup = () => {
    console.log({ username, email, password });
    alert("Signup successful");
    handleReset();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your username"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="******"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      <div className="flex justify-between flex-col">
        <button
        // onClick={}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Continuer avec Email
      </button>
        <button
        // onClick=
        className=" mt-3 w-full px-4 py-2 bg-withe border border-blue-600 p-4 rounded-md text-blue-600rounded-md hover:bg-blue-700 transition"
      >
        Retour
      </button>
      </div>
    </div>
  );
};

const Signup: React.FC<SignupProps> = ({ onClose = () => {} }) => {
  const [useEmail, setUseEmail] = useState(false);
  const [prefillEmail, setPrefillEmail] = useState("");
  const [email, setEmail] = useState(prefillEmail);

  const handleRefresh = () => {
    window.location.reload(); // refresh the page
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {/* Dark semi-transparent background */}
      <div
        className="absolute inset-0 bg-opacity-50 backdrop-blur-sm"
        onClick={handleRefresh}
      ></div>

      {/* Modal content */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-xl p-6">
      <button
          className="absolute top-3 right-3 w-6 h-6"
          onClick={handleRefresh}
        >
          <img src={CloseIcon} alt="Close" className="w-full h-full" />
        </button>

        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          Se connecter ou créer un compte
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Profitez de votre temps libre pour apprendre auprès des meilleures universités et entreprises.
        </p>

        <div className="flex flex-col gap-1 mb-4">
        <label className="font-medium text-gray-700">Adresse e-mail<span className="text-red-600">*</span> </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

        {!useEmail ? (
          <SocialButtons
            onEmailClick={(email?: string) => {
              setPrefillEmail(email || "");
              setUseEmail(true);
            }}
          />
        ) : (
          <SignupForm prefillEmail={prefillEmail} onBack={() => setUseEmail(false)} />
        )}
      </div>
    </div>
  );
};

export default Signup;
