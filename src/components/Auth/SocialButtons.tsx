import React from "react";
import GoogleIcon from "../../assets/icons/google.svg"; 
import FacebookIcon from "../../assets/icons/facebook.svg"; 
import AppleIcon from "../../assets/icons/apple.svg"; 

interface SocialButtonsProps {
  onEmailClick: (email?: string) => void;
}

const SocialButtons: React.FC<SocialButtonsProps> = ({ onEmailClick }) => {
  const socialButtonClasses =
    "w-full px-4 py-2 border rounded-md flex items-center hover:bg-gray-50 transition";

  const iconWrapperClasses = "w-5 h-5 flex-shrink-0 flex items-center justify-center";

  return (
    <div className="flex flex-col gap-3">
      {/* Email Button */}
      <button
        onClick={() => onEmailClick()}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Continuer avec Email
      </button>

      {/* Divider */}
      <div className="flex items-center my-2 text-gray-400">
        <hr className="flex-grow border-gray-300" />
        <span className="px-2 text-sm">ou</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      {/* Google */}
      <button className={socialButtonClasses}>
        <span className={iconWrapperClasses}>
          <img src={GoogleIcon} alt="Google" className="w-full h-full" />
        </span>
        <span className="flex-1 text-center">Continuer avec Google</span>
      </button>

      {/* Facebook */}
      <button className={socialButtonClasses}>
        <span className={iconWrapperClasses}>
          <img src={FacebookIcon} alt="Facebook" className="w-full h-full" />
        </span>
        <span className="flex-1 text-center">Continuer avec Facebook</span>
      </button>

      {/* Apple */}
      <button className={socialButtonClasses}>
        <span className={iconWrapperClasses}>
          <img src={AppleIcon} alt="Apple" className="w-full h-full" />
        </span>
        <span className="flex-1 text-center">Continuer avec Apple</span>
      </button>
    </div>
  );
};

export default SocialButtons;
