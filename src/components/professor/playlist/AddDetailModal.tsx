import React, { useState, useEffect } from "react";
import { X, Image, Upload } from "lucide-react";
import { createElement } from "../../../services/elementService";
import Toast, { type ToastType } from "../../ui/Toast";

interface AddDetailElementProps {
  onClose: () => void;
  onSave?: (data: { title: string; description: string; miniature?: string }) => void;
  selectedFile?: string; // video URL
  chapitreId: number;
  type?: "VIDEO" | "DOCUMENT" | "QCM";
}

const AddDetailModal: React.FC<AddDetailElementProps> = ({
  onClose,
  onSave,
  selectedFile,
  chapitreId,
  type = "VIDEO",
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  useEffect(() => {
    if (thumbnail) {
      // simulate static link generation
      setThumbnailUrl(`/static/${thumbnail.name}`);
    }
  }, [thumbnail]);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setThumbnail(file);
  };

  const handleSave = async () => {
    if (!title.trim()) {
      setToast({ message: "Title is required", type: "error" });
      return;
    }

    setSaving(true);
    try {
      const data = {
        titre: title,
        description,
        lien: selectedFile,       // video URL
        miniature: thumbnailUrl || undefined,
        type,
        chapitreId,
      };

      const result = await createElement(data);
      console.log("Element created:", result);

      setToast({ message: "Element created successfully!", type: "success" });

      if (onSave) onSave({ title, description, miniature: thumbnailUrl || undefined });
      onClose();
    } catch (err: any) {
      console.error("Error creating element:", err?.message ?? err);
      setToast({
        message: `Failed to create element: ${err?.message ?? "Unknown error"}`,
        type: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0f0f0f] text-white rounded-2xl shadow-2xl w-full max-w-4xl relative animate-fadeIn border border-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold">Element details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-800"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Left */}
          <div className="lg:w-1/2 p-6 space-y-6 border-r border-gray-800">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Title (required)
              </label>
              <input
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Description
              </label>
              <textarea
                placeholder="Describe the element"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">
                Thumbnail
              </label>
              <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-blue-500 transition-colors bg-gray-900/50">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="hidden"
                />
                <Upload size={24} className="text-gray-400 mb-2" />
                <span className="text-gray-400 text-sm text-center">
                  {thumbnail ? thumbnail.name : "Upload thumbnail"}
                </span>
                <span className="text-gray-500 text-xs mt-1">JPG, PNG, WebP</span>
              </label>
            </div>
          </div>

          {/* Right */}
          <div className="lg:w-1/2 p-6 space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-3">Video preview</h3>
              <div className="bg-black rounded-lg overflow-hidden">
                {selectedFile ? (
                  <video src={selectedFile} controls className="w-full h-64 object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-400 text-sm h-64 w-full border-2 border-dashed border-gray-700 rounded-lg">
                    <Image size={36} />
                    <span>No file selected</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-800">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-transparent hover:bg-gray-800 rounded-lg text-white font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`px-6 py-2.5 rounded-lg text-white font-medium transition-colors ${
              saving ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

export default AddDetailModal;
