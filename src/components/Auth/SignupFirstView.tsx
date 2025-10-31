import React from "react";
import SocialButtons from "./SocialButtons";

interface SignupFirstViewProps {
  email: string;
  setEmail: (email: string) => void;
  onNext: () => void;
}

const SignupFirstView: React.FC<SignupFirstViewProps> = ({ email, setEmail, onNext }) => {
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
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

      <SocialButtons onEmailClick={() => emailValid && onNext()} />
    </div>
  );
};

export default SignupFirstView;
