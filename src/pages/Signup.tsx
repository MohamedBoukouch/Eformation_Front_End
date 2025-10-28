import React, { useState } from "react";
import SocialButtons from "../components/Auth/SocialButtons";
import CloseIcon from "../assets/icons/close.svg";
import EyeOpen from "../assets/icons/eye.gif";
import EyeClose from "../assets/icons/eye.gif";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../services/signupService";
import type { SignupData } from "../services/signupService";

interface SignupProps {
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

const SignupForm: React.FC<{ prefillEmail: string; onBack: () => void }> = ({
  prefillEmail,
  onBack,
}) => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<"ETUDIANT" | "PROFESSEUR" | "">("");
  const [uniquePath, setUniquePath] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const strength = checkPasswordStrength(password);
  const strengthColors = ["red", "orange", "yellow", "blue", "green"];
  const isValid =
    strength >= 3 &&
    fullName.trim() !== "" &&
    role !== "" &&
    (role === "ETUDIANT" ? uniquePath.trim() !== "" : true);

  const handleSubmit = async () => {
    if (!isValid) return;

    setLoading(true);
    setErrorMsg("");

    const data: SignupData = {
      fullName,
      email: prefillEmail,
      password,
      role,
      uniquePath: role === "ETUDIANT" ? uniquePath : undefined,
    };

    try {
      const res = await signupUser(data);

      if (res.role === "PROFESSEUR") {
        alert("Wait to be accepted by admin");
      } else {
        navigate("/home");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* Prefilled Email */}
      <div className="bg-gray-100 px-3 py-2 rounded-md border">{prefillEmail}</div>

      {/* Full Name */}
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">
          Nom complet <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="John Doe"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
        />
      </div>

      {/* Password */}
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
              />
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

      {/* Role Selection */}
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">
          Rôle <span className="text-red-600">*</span>
        </label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as "ETUDIANT" | "PROFESSEUR" | "")}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
        >
          <option value="">Sélectionner le rôle</option>
          <option value="ETUDIANT">Étudiant</option>
          <option value="PROFESSEUR">Professeur</option>
        </select>
      </div>

      {/* Unique Path for Students */}
      {role === "PROFESSEUR" && (
        <div className="flex flex-col gap-1">
          <label className="font-medium text-gray-700">
            Identifiant unique <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={uniquePath}
            onChange={(e) => setUniquePath(e.target.value)}
            placeholder="Ex: aderdour_20"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
          />
        </div>
      )}

      {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

      <button
        onClick={handleSubmit}
        disabled={!isValid || loading}
        className={`w-full px-4 py-2 rounded-md transition ${
          !isValid || loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {loading ? "En cours..." : "Continuer"}
      </button>

      <button
        onClick={onBack}
        className="w-full px-4 py-2 border border-blue-600 rounded-md text-blue-600 hover:bg-blue-50"
      >
        Retour
      </button>
    </div>
  );
};

const Signup: React.FC<SignupProps> = ({ onClose }) => {
  const [useEmail, setUseEmail] = useState(false);
  const [email, setEmail] = useState("");
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRefresh = () => {
    if (onClose) onClose();
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={handleRefresh}
      ></div>

      <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-xl p-6">
        <img
          src={CloseIcon}
          className="absolute top-3 right-3 w-5 h-5 cursor-pointer"
          onClick={handleRefresh}
        />
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          Se connecter ou créer un compte
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Profitez de votre temps libre pour apprendre.
        </p>

        {!useEmail ? (
          <div>
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
          </div>
        ) : (
          <SignupForm prefillEmail={email} onBack={() => setUseEmail(false)} />
        )}
      </div>
    </div>
  );
};

export default Signup;
