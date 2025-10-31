import React, { useState } from "react";
import { verifyOtp } from "../../services/otpService";
import type { OtpData } from "../../services/otpService";
import { useNavigate } from "react-router-dom";

interface SignupOtpViewProps {
  email: string;
  role: "ETUDIANT" | "PROFESSEUR";
}

const SignupOtpView: React.FC<SignupOtpViewProps> = ({ email, role }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setErrorMsg("Le code OTP doit contenir 6 chiffres");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    const data: OtpData = { email, codeOtp: otp };

    try {
      const result = await verifyOtp(data);

      if (result === "Account verified") {
        if (role === "ETUDIANT") navigate("/student");
        else if (role === "PROFESSEUR") navigate("/waitingPage");
        else navigate("/home");
      } else {
        setErrorMsg(result || "Code OTP invalide");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Code OTP invalide ou expiré");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-gray-600 text-sm">
        Entrez le code OTP envoyé à <b>{email}</b>
      </p>

      <input
        type="text"
        maxLength={6}
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 text-center tracking-widest text-xl"
        placeholder="------"
      />

      {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

      <button
        onClick={handleVerify}
        disabled={loading}
        className="w-full px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
      >
        {loading ? "Vérification..." : "Confirmer le code"}
      </button>
    </div>
  );
};

export default SignupOtpView;
