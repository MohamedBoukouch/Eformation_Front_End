import React, { useState } from "react";
import EyeOpen from "../../assets/icons/eye.gif";
import EyeClose from "../../assets/icons/eye.gif";
import { signupUser } from "../../services/signupService";
import type { SignupData } from "../../services/signupService";

interface SignupSecondViewProps {
  email: string;
  onBack: () => void;
  onOtpSent: (email: string, role: "ETUDIANT" | "PROFESSEUR") => void;
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

const SignupSecondView: React.FC<SignupSecondViewProps> = ({ email, onBack, onOtpSent }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<"ETUDIANT" | "PROFESSEUR" | "">("");
  const [uniquePath, setUniquePath] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const strength = checkPasswordStrength(password);
  const strengthColors = ["red", "orange", "yellow", "blue", "green"];
  const isValid = strength >= 3 && fullName.trim() !== "" && role !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);
    setErrorMsg("");

    const data: SignupData = { fullName, email, password, role, uniquePath: uniquePath || "" };

    try {
      await signupUser(data);
      onOtpSent(email, role); // ✅ pass role
    } catch (err: any) {
      setErrorMsg("Erreur d'inscription : " + (err.message || "Veuillez réessayer."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-gray-100 px-3 py-2 rounded-md border">{email}</div>

      <input
        type="text"
        placeholder="Nom complet"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2"
      />

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10"
        />
        <img
          src={showPassword ? EyeClose : EyeOpen}
          alt="eye"
          className="absolute right-3 top-3 cursor-pointer w-5 h-5"
          onClick={() => setShowPassword(!showPassword)}
        />
      </div>

      {password && (
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${(strength / 5) * 100}%`,
              backgroundColor: strengthColors[strength - 1] || "gray",
            }}
          />
        </div>
      )}

      <select
        value={role}
        onChange={(e) => setRole(e.target.value as "ETUDIANT" | "PROFESSEUR" | "")}
        className="border border-gray-300 rounded-md px-3 py-2"
      >
        <option value="">Sélectionner le rôle</option>
        <option value="ETUDIANT">Étudiant</option>
        <option value="PROFESSEUR">Professeur</option>
      </select>

      {role === "PROFESSEUR" && (
        <input
          type="text"
          value={uniquePath}
          onChange={(e) => setUniquePath(e.target.value)}
          placeholder="Identifiant unique"
          className="border border-gray-300 rounded-md px-3 py-2"
        />
      )}

      {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

      <button
        onClick={handleSubmit}
        disabled={!isValid || loading}
        className={`w-full px-4 py-2 rounded-md transition ${
          !isValid || loading ? "bg-gray-400" : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {loading ? "En cours..." : "Continuer"}
      </button>

      <button
        onClick={onBack}
        className="w-full px-4 py-2 border border-blue-600 rounded-md text-blue-600"
      >
        Retour
      </button>
    </div>
  );
};

export default SignupSecondView;
