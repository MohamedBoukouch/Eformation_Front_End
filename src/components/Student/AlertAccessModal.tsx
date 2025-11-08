import React from "react";
import { X, HelpCircle } from "lucide-react";

interface AlertAccessModalProps {
  title: string;
  description?: string;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

const AlertAccessModal: React.FC<AlertAccessModalProps> = ({
  title,
  description,
  onClose,
  onConfirm,
  confirmText = "Confirmer",
  cancelText = "Annuler",
}) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md relative transform transition-all duration-300 scale-100">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        {/* Icon */}
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-orange-100 rounded-full p-4">
            <HelpCircle size={40} className="text-orange-500" />
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-center">{title}</h2>

          {/* Description */}
          {description && (
            <p className="text-gray-600 text-sm text-center px-3 leading-relaxed">
              {description}
            </p>
          )}

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 transition font-medium"
            >
              {cancelText}
            </button>

            {onConfirm && (
              <button
                onClick={onConfirm}
                className="px-5 py-2 rounded-md bg-orange-500 hover:bg-orange-600 text-white font-medium transition"
              >
                {confirmText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertAccessModal;
