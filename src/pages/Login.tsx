import React, { useState, useContext } from "react";
import SocialButtons from "../components/Auth/SocialButtons";
import CloseIcon from "../assets/icons/close.svg";
import EyeOpen from "../assets/icons/eye.gif";
import EyeClose from "../assets/icons/eye.gif";
import { loginUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onClose?: () => void;
}

const checkPasswordStrength = (password: string) => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  return strength;
};

const LoginPasswordStep: React.FC<{
  email: string ;
  goBack: () => void;
}> = ({ email, goBack }) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext)!;

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const strength = checkPasswordStrength(password);
  const strengthColors = ["red", "orange", "yellow", "blue", "green"];
  const isValid = strength >= 3;


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const userData = await loginUser({ email, password });
      auth.login(userData); // store in context
      navigate("/home"); // redirect on success
    } catch (err: any) {
      // setErrorMsg(err.message || "Email ou mot de passe incorrect");
      setErrorMsg("Email ou mot de passe incorrect");
    }
  };
  

  return (
    <div className="flex flex-col gap-4 mt-4">

      {/* ✅ Display prefilled Email */}
      <div className="bg-gray-100 px-3 py-2 rounded-md border">
        {email}
      </div>

      {/* ✅ Password */}
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">
          Mot de passe <span className="text-red-600">*</span>
        </label>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10"
          />

          <img
            src={showPassword ? EyeClose : EyeOpen}
            alt="eye"
            className="absolute right-3 top-3 cursor-pointer w-5 h-5"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>

        {password.length > 0 && (
          <>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${(strength / 5) * 100}%`,
                  backgroundColor: strengthColors[strength - 1] || "gray",
                }}
              ></div>
            </div>
            <p className="text-xs text-gray-500">
              {strength < 3
                ? "Mot de passe faible"
                : strength === 3
                ? "Mot de passe moyen"
                : "Mot de passe fort"}
            </p>
          </>
        )}
      </div>

      {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

      <button
        disabled={!isValid}
        onClick={handleSubmit}
        className={`w-full px-4 py-2 rounded-md transition ${
          !isValid
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        Continuer
      </button>

      <button
        onClick={goBack}
        className="w-full px-4 py-2 border border-blue-600 rounded-md text-blue-600 hover:bg-blue-50"
      >
        Retour
      </button>
    </div>
  );
};

const Login: React.FC<LoginProps> = ({ onClose }) => {
  const [useEmail, setUseEmail] = useState(false);
  const [email, setEmail] = useState("");

  const closeModal = () => {
    if (onClose) onClose();
    window.location.reload();
  };

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">

      {/* Dark Background */}
      <div
        className="absolute inset-0 bg-opacity-50 backdrop-blur-sm"
        onClick={closeModal}
      ></div>

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-xl p-6">

        <img
          src={CloseIcon}
          className="absolute top-3 right-3 w-5 h-5 cursor-pointer"
          onClick={closeModal}
        />

        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          Se connecter ou créer un compte
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Profitez de votre temps libre pour apprendre.
        </p>

        {/* ✅ Email Screen */}
        {!useEmail ? (
          <>
            <div className="flex flex-col gap-1 mb-4">
              <label className="font-medium text-gray-700">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                value={email}
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
                className={`border rounded-md px-3 py-2 focus:outline-none ${
                  emailValid ? "border-green-500" : "border-red-400"
                }`}
              />

              {!emailValid && email.length > 0 && (
                <p className="text-xs text-red-500">Email invalide</p>
              )}
            </div>

            <SocialButtons
              onEmailClick={() => emailValid && setUseEmail(true)}
            />
          </>
        ) : (
          <LoginPasswordStep
            email={email}
            goBack={() => setUseEmail(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
function setSuccessMsg(arg0: string) {
  throw new Error("Function not implemented.");
}

