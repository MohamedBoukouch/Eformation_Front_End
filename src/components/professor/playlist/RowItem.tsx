import React, { useState } from "react";
import { MoreVertical, Edit3, Trash2 } from "lucide-react";
import { deleteElement } from "../../../services/elementService";
import Toast, { type ToastType } from "../../../components/ui/Toast";
import AlertModal from "../../../components/professor/playlist/AlertModal";

interface RowItemProps {
  id: number;
  item: string;
  index: number;
  type: "video" | "document" | "qcm";
  placeholderImage: string;
  onUpdate: (item: string) => void;
  onDelete: (id: number) => void;
}

const RowItem: React.FC<RowItemProps> = ({
  id,
  item,
  index,
  type,
  placeholderImage,
  onUpdate,
  onDelete,
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteElement(id);
      onDelete(id);
      setToast({ message: "Element deleted successfully!", type: "success" });
    } catch (err) {
      console.error(err);
      setToast({ message: "Failed to delete element.", type: "error" });
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  return (
    <>
      {/* Toast notification */}
      {toast && <Toast message={toast.message} type={toast.type} />}

      {/* Delete confirmation modal */}
      {showConfirm && (
        <AlertModal
          title="Delete Confirmation"
          description="Are you sure you want to delete this element? This action cannot be undone."
          onClose={() => setShowConfirm(false)}
          onConfirm={handleDelete}
          confirmText={loading ? "Deleting..." : "Yes, Delete"}
          danger
        />
      )}

      <tr
        key={`${type}-${index}`}
        className="cursor-pointer hover:bg-neutral-900 transition-colors border-y-2 border-neutral-700 w-full relative"
      >
        {/* Content column */}
        <td className="px-4 py-3">
          <div className="flex items-center gap-3">
            <img
              src={placeholderImage}
              alt={type}
              className="w-28 h-16 rounded object-cover"
            />
            <div>
              <p className="text-sm font-medium text-white line-clamp-1">
                {item}
              </p>
              <p className="text-xs text-gray-400 line-clamp-1">{type}</p>
            </div>
          </div>
        </td>

        {/* Sample columns */}
        <td className="px-4 py-3">{item}</td>
        <td className="px-4 py-3">TRUE</td>
        <td className="px-4 py-3">HELLO</td>
        <td className="px-4 py-3">2003-03-02</td>
        <td className="px-4 py-3">{type === "video" ? "🎬" : "-"}</td>
        <td className="px-4 py-3">{type === "qcm" ? "📝" : "-"}</td>
        <td className="px-4 py-3">{type === "document" ? "📄" : "-"}</td>

        {/* Action buttons */}
        <td className="px-4 py-3 text-right relative">
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="p-1 rounded hover:bg-neutral-600 transition"
          >
            <MoreVertical size={18} />
          </button>

          {openMenu && (
            <div className="absolute right-0 mt-2 w-36 bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg z-10">
              <button
                onClick={() => {
                  onUpdate(item);
                  setOpenMenu(false);
                }}
                className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm hover:bg-neutral-700"
              >
                <Edit3 size={16} /> Update
              </button>

              <button
                onClick={() => {
                  setOpenMenu(false);
                  setShowConfirm(true); // 👈 show confirmation modal
                }}
                disabled={loading}
                className={`flex items-center gap-2 w-full text-left px-3 py-2 text-sm hover:bg-neutral-700 text-red-400 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <Trash2 size={16} /> {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
        </td>
      </tr>
    </>
  );
};

export default RowItem;
