import { useState } from "react";
import { X, Upload } from "lucide-react";

const UploadModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      alert(`You uploaded: ${file.name}`);
    }
  };

  return (
    <div>
      {/* Button to open modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Add video
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-[#181818] text-white p-8 rounded-2xl shadow-lg w-full max-w-lg relative">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>

            {/* Upload Section */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="bg-[#222] rounded-full p-5">
                <Upload size={48} />
              </div>
              <h2 className="text-xl font-semibold">Upload file</h2>
              <p className="text-gray-400 text-sm">
                Drag and drop video, document, or image file here
              </p>
              <label className="mt-4 cursor-pointer">
                <input
                  type="file"
                  accept="video/*,image/*,.pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <span className="px-4 py-2 bg-white text-black rounded-md font-medium hover:bg-gray-200 transition">
                  Select file
                </span>
              </label>
            </div>

            <p className="text-xs text-gray-500 mt-6 text-center">
              Your file will remain private until you publish it.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadModal;
