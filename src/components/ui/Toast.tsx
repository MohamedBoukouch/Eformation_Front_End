import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  message: string;
  type: ToastType;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, type, duration = 4000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  const toastStyle = {
    success: {
      icon: <CheckCircle className="text-green-500 w-5 h-5" />,
      title: "Successfully",
      border: "border-green-500/20",
    },
    error: {
      icon: <XCircle className="text-red-500 w-5 h-5" />,
      title: "An error occurred!",
      border: "border-red-500/20",
    },
    warning: {
      icon: <AlertTriangle className="text-yellow-500 w-5 h-5" />,
      title: "Warning!",
      border: "border-yellow-500/20",
    },
    info: {
      icon: <Info className="text-blue-500 w-5 h-5" />,
      title: "Information",
      border: "border-blue-500/20",
    },
  }[type];

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 flex items-start gap-3 bg-neutral-800 text-white px-4 py-3 rounded-lg shadow-lg border ${toastStyle.border} animate-slideIn`}
    >
      {toastStyle.icon}
      <div className="flex flex-col">
        <span className="font-semibold">{toastStyle.title}</span>
        <span className="text-sm text-gray-400">{message}</span>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="ml-3 text-gray-400 hover:text-gray-200 transition"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
