import React, { useState } from "react";
import CloseIcon from "../assets/icons/close.svg";
import SignupFirstView from "../components/Auth/SignupFirstView";
import SignupSecondView from "../components/Auth/SignupSecondView";
import SignupOtpView from "../components/Auth/SignupOtpView";

const Signup = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"ETUDIANT" | "PROFESSEUR">("ETUDIANT");

  const handleRefresh = () => window.location.reload();

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
          Créer un compte
        </h2>

        {step === 1 && (
          <SignupFirstView
            email={email}
            setEmail={setEmail}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <SignupSecondView
            email={email}
            onBack={() => setStep(1)}
            onOtpSent={(email: string, selectedRole: "ETUDIANT" | "PROFESSEUR") => {
              setRole(selectedRole);
              setStep(3);
            }}
          />
        )}

        {step === 3 && <SignupOtpView email={email} role={role} />}
      </div>
    </div>
  );
};

export default Signup;
