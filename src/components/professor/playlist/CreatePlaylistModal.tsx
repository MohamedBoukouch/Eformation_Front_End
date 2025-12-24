import React, { useState, useContext } from "react";
import { createPlaylist,type PlaylistData } from "../../../services/playlistService";
import Toast, { type ToastType } from "../../../components/ui/Toast";
import { AuthContext } from "../../../context/AuthContext";

interface CreatePlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePlaylistModal: React.FC<CreatePlaylistModalProps> = ({ isOpen, onClose }) => {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("AuthContext missing");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const [miniature, setMiniature] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setMiniature("");
      setPreview(null);
      return;
    }

    if (!file.type.startsWith("image/")) {
      setToast({ message: "Please select an image file", type: "error" });
      setTimeout(() => setToast(null), 4000);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setMiniature(String(reader.result || ""));
      setPreview(String(reader.result || ""));
    };
    reader.onerror = () => {
      setToast({ message: "Failed to read image", type: "error" });
      setMiniature("");
      setPreview(null);
      setTimeout(() => setToast(null), 4000);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!auth.user?.id) {
      setToast({ message: "User not authenticated", type: "error" });
      setTimeout(() => setToast(null), 4000);
      return;
    }

    if (!title.trim()) {
      setToast({ message: "Title is required", type: "error" });
      setTimeout(() => setToast(null), 4000);
      return;
    }

    const payload: PlaylistData = {
      profId: auth.user.id,
      title: title.trim(),
      description: description.trim(),
      visibility,
      miniature: miniature || null,
    };

    try {
      setLoading(true);
      const created = await createPlaylist(payload);
      setToast({ message: `Playlist "${created.title}" created successfully!`, type: "success" });

      // Reset form
      setTitle("");
      setDescription("");
      setVisibility("public");
      setMiniature("");
      setPreview(null);

      setTimeout(() => {
        setToast(null);
        onClose();
      }, 1500);
    } catch (error: any) {
      console.error(error);
      setToast({ message: error?.message || "Failed to create playlist", type: "error" });
      setTimeout(() => setToast(null), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Modal overlay */}
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-3">
        <div className="bg-neutral-800 text-neutral-200 rounded-xl shadow-xl w-full max-w-md md:max-w-lg p-6 relative animate-fadeIn">
          {/* Header */}
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-bold">Create a new playlist</h2>
            <button onClick={onClose} className="text-neutral-400 hover:text-white text-xl">✕</button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm mb-1">Title (required)</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
              />
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2">Visibility and Miniature</h3>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <select
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value as "public" | "private")}
                  className="w-full sm:w-1/2 bg-neutral-800 border border-neutral-700 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>

                <div className="flex items-center gap-3">
                  <label className="bg-neutral-700 hover:bg-neutral-600 text-sm rounded-lg px-4 py-2 cursor-pointer">
                    Add image
                    <input type="file" accept="image/*" onChange={handleFileChange} hidden />
                  </label>
                  {preview && (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-16 h-16 object-cover rounded-lg border border-neutral-600"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg px-5 py-2 transition flex items-center gap-2 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {loading ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Toast notification */}
      {toast && <Toast message={toast.message} type={toast.type} duration={4000} />}
    </>
  );
};

export default CreatePlaylistModal;
