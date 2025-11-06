import React from "react";
import { X, Upload } from "lucide-react";

interface AlertModalProps {
  title: string;
  description?: string;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  showInput?: boolean;
  inputValue?: string;
  setInputValue?: (val: string) => void;
  danger?: boolean;
  // New props for file upload
  uploadType?: "Video" | "Document" | "QCM";
  onFileUpload?: (file: File) => void;
  onShowAddDetails?: (file: File) => void; // 👈 added prop for opening 2nd alert
}

const AlertModal: React.FC<AlertModalProps> = ({
  title,
  description,
  onClose,
  onConfirm,
  confirmText = "Save",
  showInput,
  inputValue,
  setInputValue,
  danger,
  uploadType,
  onFileUpload,
  onShowAddDetails,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (onFileUpload) onFileUpload(file);
      if (onShowAddDetails) {
        onClose(); // 👈 close current alert
        setTimeout(() => onShowAddDetails(file), 300); // 👈 show second alert
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#181818] text-white p-8 rounded-2xl shadow-lg w-full max-w-lg relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="bg-[#222] rounded-full p-4">
            <Upload size={40} />
          </div>
          <h2 className="text-xl font-semibold text-center">{title}</h2>
          {description && (
            <p className="text-gray-400 text-sm text-center px-2">
              {description}
            </p>
          )}

          {showInput && (
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue?.(e.target.value)}
              className="w-full bg-neutral-700 border border-neutral-600 rounded-md px-3 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          )}

          {uploadType && onFileUpload && (
            <label className="flex gap-3 justify-center mt-2 cursor-pointer">
              <input
                type="file"
                accept={
                  uploadType === "Video"
                    ? "video/*"
                    : uploadType === "Document"
                    ? ".pdf,.doc,.docx"
                    : "application/json"
                }
                onChange={handleFileChange}
                className="hidden"
              />
              <span className="px-4 py-2 bg-white text-black rounded-md font-medium hover:bg-gray-200 transition">
                Select File
              </span>
              <button
                onClick={onClose}
                type="button"
                className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-md"
              >
                Cancel
              </button>
            </label>
          )}

          {!uploadType && (
            <div className="flex gap-3 mt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-md"
              >
                Cancel
              </button>
              {onConfirm && (
                <button
                  onClick={onConfirm}
                  className={`px-4 py-2 rounded-md ${
                    danger
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {confirmText}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
