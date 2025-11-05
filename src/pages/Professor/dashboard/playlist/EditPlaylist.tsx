import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  fetchPlaylistById,
  updatePlaylist,
  deletePlaylist 
} from "../../../../services/playlistService";
import Toast, { type ToastType } from "../../../../components/ui/Toast";
import { MoreVertical, Share2, Trash2 } from "lucide-react";

interface PlaylistItem {
  id: number;
  title: string;
  description: string;
  miniature?: string;
  visibility: string;
  restriction?: string;
  dateCreation: string;
  views: number;
  comments: number;
  likes: number;
  profId?: number;
}

const EditPlaylist: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get playlist ID from URL

  const [playlist, setPlaylist] = useState<PlaylistItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(
    null
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("Public");
  const [order, setOrder] = useState("Date published (newest)");
  const [isSaving, setIsSaving] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

  // Fetch playlist by ID
  useEffect(() => {
    if (!id) return;

    const getPlaylist = async () => {
      try {
        const data = await fetchPlaylistById(Number(id));
        setPlaylist(data);
        setTitle(data.title);
        setDescription(data.description);
        setVisibility(data.visibility);
      } catch (err: any) {
        setToast({
          message: err.message || "Failed to fetch playlist",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    getPlaylist();
  }, [id]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Save updated data
  const handleSave = async () => {
    if (!id || !playlist) return;

    setIsSaving(true);
    try {
      await updatePlaylist(Number(id), {
        profId: playlist.profId || 1,
        title,
        description,
        visibility,
        miniature: playlist?.miniature || null,
      });
      setToast({ message: "Playlist updated successfully!", type: "success" });
    } catch (err: any) {
      setToast({
        message: err.message || "Failed to update playlist",
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Undo changes
  const handleUndo = () => {
    if (!playlist) return;
    setTitle(playlist.title);
    setDescription(playlist.description);
    setVisibility(playlist.visibility);
    setToast({ message: "Changes reverted.", type: "info" });
  };

  // Delete playlist
  const handleDelete = async  () => {
 
    try {
       await deletePlaylist(Number(id));
        setToast({
          message: "Playlist deleted.",
          type: "success",
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
    } catch (err: any) {
      setToast({
        message: err.message || "Failed to update playlist",
        type: "error",
      });
    }      
    setMenuOpen(false);
  };

  // Share playlist link
  const handleShare = () => {
    const link = `${window.location.origin}/playlist/${id}`;
    navigator.clipboard.writeText(link);
    setToast({
      message: "Link copied to clipboard!",
      type: "success",
    });
    setMenuOpen(false);
  };

  if (loading) return <div>Loading playlist...</div>;
  if (!playlist) return <div>Playlist not found</div>;

  return (
    <div className="flex flex-col gap-6 p-6 bg-neutral-800 text-neutral-100 min-h-screen">
      <div className="flex justify-between items-center relative">
        <h1 className="text-xl font-semibold">Edit Playlist</h1>
        <div className="flex items-center gap-2 relative" ref={menuRef}>
          <button
            onClick={handleUndo}
            className="bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded-md"
          >
            Undo changes
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`px-4 py-2 rounded-md ${
              isSaving
                ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500 text-white"
            }`}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>

          {/* 3-dot menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md hover:bg-neutral-700 transition"
          >
            <MoreVertical size={20} />
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute right-0 top-10 bg-neutral-900 border border-neutral-700 rounded-md shadow-lg w-40 z-50">
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 w-full px-4 py-2 text-red-400 hover:bg-neutral-700"
              >
                <Trash2 size={16} /> Delete
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 w-full px-4 py-2 text-blue-400 hover:bg-neutral-700"
              >
                <Share2 size={16} /> Share link
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Playlist Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col border border-neutral-700 rounded-md p-4">
            <label className="text-sm text-neutral-400 mb-2">
              Title (required)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-transparent border-none outline-none text-neutral-100 placeholder-neutral-500"
            />
          </div>

          <div className="flex flex-col border border-neutral-700 rounded-md p-4">
            <label className="text-sm text-neutral-400 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="bg-transparent border-none outline-none resize-none text-neutral-100 placeholder-neutral-500"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col border border-neutral-700 rounded-md p-4">
            <label className="text-sm text-neutral-400 mb-2">Visibility</label>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              className="bg-neutral-800 border border-neutral-700 rounded-md p-2 text-neutral-100 focus:outline-none"
            >
              <option>Public</option>
              <option>Unlisted</option>
              <option>Private</option>
            </select>
          </div>

          <div className="flex flex-col border border-neutral-700 rounded-md p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-neutral-400">
                Default video order
              </label>
              <span className="text-xs text-neutral-500">ⓘ</span>
            </div>
            <select
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="bg-neutral-800 border border-neutral-700 rounded-md p-2 text-neutral-100 focus:outline-none"
            >
              <option>Date published (newest)</option>
              <option>Date published (oldest)</option>
              <option>Most popular</option>
            </select>
          </div>
        </div>
      </div>

      {/* Toast Message */}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

export default EditPlaylist;
