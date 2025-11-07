import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Plus, Trash2, X, ChevronDown } from "lucide-react";
import {
  getAllStudentsByProfessor,
  verifyStudent,
  deleteStudentFromPlaylist,
  sendInvitation,
} from "../../../../services/learnFormation";
import Toast, { type ToastType } from "../../../../components/ui/Toast";
import AlertModal from "../../../../components/professor/playlist/AlertModal";

// ---------- INTERFACE ----------
interface LearnPlaylistItem {
  id: number;
  verified: boolean;
  student: {
    id: number;
    fullName: string;
    email: string;
  };
  playlist: {
    id: number;
    titre: string;
    description: string;
  };
  professor: {
    id: number;
    fullName: string;
    email: string;
  };
  status?: "Verified" | "Pending";
}

// ---------- STATUS STYLES ----------
const STATUS_STYLES: Record<"Verified" | "Pending", { background: string; color: string; border: string }> =
{
  Verified: { background: "#ecfdf5", color: "#065f46", border: "#86efac" },
  Pending: { background: "#fff7ed", color: "#7c2d12", border: "#fdba74" },
};

// ---------- PORTAL STATUS MENU ----------
type AnchorRect = { top: number; left: number; right: number; bottom: number; width: number; height: number } | null;

const StatusMenu: React.FC<{
  anchorRect: AnchorRect;
  currentStatus: "Verified" | "Pending";
  onSelect: (status: "Verified" | "Pending") => void;
  onClose: () => void;
}> = ({ anchorRect, currentStatus, onSelect, onClose }) => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!(e.target instanceof Node)) return;
      if (!menuRef.current.contains(e.target as Node)) onClose();
    };
    const handleScrollResize = () => onClose();
    document.addEventListener("mousedown", handleOutside);
    window.addEventListener("scroll", handleScrollResize, true);
    window.addEventListener("resize", handleScrollResize);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      window.removeEventListener("scroll", handleScrollResize, true);
      window.removeEventListener("resize", handleScrollResize);
    };
  }, [onClose]);

  if (!anchorRect) return null;

  const top = anchorRect.bottom + 6 + window.scrollY;
  const left = anchorRect.left + window.scrollX;

  const menu = (
    <div ref={menuRef} style={{ position: "fixed", top, left, zIndex: 9999, minWidth: 140 }}>
      <div className="bg-neutral-800 border border-neutral-700 rounded-md shadow-lg overflow-hidden">
        {(["Verified", "Pending"] as const).map((status) => (
          <button
            key={status}
            onClick={() => {
              onSelect(status);
              onClose();
            }}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-neutral-700 ${
              status === currentStatus ? "text-green-400" : "text-gray-300"
            }`}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );

  return ReactDOM.createPortal(menu, document.body);
};

// ---------- ADD STUDENT MODAL ----------
const AddStudentModal: React.FC<{
  onClose: () => void;
  onSave: (email: string) => void;
}> = ({ onClose, onSave }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (email.trim() === "") return;
    onSave(email);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-neutral-800 rounded-xl shadow-lg p-6 w-[90%] max-w-md border border-neutral-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">Add New Student</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <label className="block text-sm text-gray-300 mb-2">Student Email:</label>
        <input
          type="email"
          placeholder="Enter student's email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 rounded-md bg-neutral-700 text-white border border-neutral-600 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
        />
        <div className="mt-5 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-neutral-700 hover:bg-neutral-600 text-gray-300 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white text-sm font-medium"
          >
            Add Student
          </button>
        </div>
      </div>
    </div>
  );
};

// ---------- MAIN COMPONENT ----------
const Student: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<"Verified" | "Not Verified">("Verified");
  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useState<LearnPlaylistItem[]>([]);
  const [menuAnchor, setMenuAnchor] = useState<AnchorRect>(null);
  const [menuOpenFor, setMenuOpenFor] = useState<number | null>(null);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const [deleteAlert, setDeleteAlert] = useState<{ show: boolean; id?: number }>({ show: false });
  const profId = 40;

  // Fetch students
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllStudentsByProfessor(profId);
        const formatted = data.map((item: any) => ({
          ...item,
          status: item.verified ? "Verified" : "Pending",
        }));
        setStudents(formatted);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchData();
  }, [profId]);

  const filters: Array<"Verified" | "Not Verified"> = ["Verified", "Not Verified"];

  const filteredStudents = students.filter((s) => {
    if (activeFilter === "Verified") return s.status === "Verified";
    if (activeFilter === "Not Verified") return s.status === "Pending";
    return true;
  });

  const openMenu = (event: React.MouseEvent, itemId: number) => {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    setMenuAnchor({
      top: rect.top,
      left: rect.left,
      right: rect.right,
      bottom: rect.bottom,
      width: rect.width,
      height: rect.height,
    });
    setMenuOpenFor(itemId);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
    setMenuOpenFor(null);
  };

  const handleStatusChange = async (id: number, newStatus: "Verified" | "Pending") => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s)));
    try {
      await verifyStudent(id, newStatus === "Verified");
      setToast({ message: `Status updated to ${newStatus}`, type: "success" });
    } catch (error) {
      console.error(error);
      setToast({ message: "Failed to update status", type: "error" });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteStudentFromPlaylist(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      setToast({ message: "Student deleted successfully", type: "success" });
    } catch (error) {
      console.error(error);
      setToast({ message: "Failed to delete student", type: "error" });
    }
  };

  const handleAddStudent = async (email: string) => {
    try {
      if (!students.length) return;
  
      const playlistId = students[0].playlist.id;
  
      const res = await sendInvitation({
        studentEmail: email,  // pass the email as required
        playlistId,
        professorId: profId,
      });
  
      setToast({ message: res.message, type: "success" });
    } catch (error: any) {
      console.error(error);
      setToast({ message: error.message || "Failed to send invitation", type: "error" });
    }
  };
  
  

  return (
    <main className="min-h-screen bg-neutral-900 text-white pt-10 pl-1 pr-5 relative">
      {toast && <Toast message={toast.message} type={toast.type} />}
      {deleteAlert.show && (
        <AlertModal
          title="Confirm Delete"
          description="Are you sure you want to delete this student?"
          onClose={() => setDeleteAlert({ show: false })}
          onConfirm={() => {
            if (deleteAlert.id) handleDelete(deleteAlert.id);
            setDeleteAlert({ show: false });
          }}
          danger
        />
      )}

      <div className="mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pl-10 pr-2">
          <h1 className="text-3xl font-semibold">All Students</h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-md transition"
          >
            <Plus size={18} /> Add Student
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-6 text-sm pl-10 text-gray-300 border-b border-neutral-700 pb-4 mb-6">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`pb-2 border-b-2 transition ${
                activeFilter === f ? "border-green-500 text-white font-semibold" : "border-transparent hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-neutral-800 rounded-xl shadow-md border border-neutral-700">
          <table className="min-w-full text-sm text-gray-300">
            <thead className="bg-neutral-700 text-gray-200 uppercase text-xs">
              <tr>
                <th className="px-5 py-3 text-left">Student</th>
                <th className="px-5 py-3 text-left">Email</th>
                <th className="px-5 py-3 text-left">Playlist</th>
                <th className="px-5 py-3 text-left">Description</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Delete</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((item) => {
                const styles = STATUS_STYLES[item.status || "Pending"];
                return (
                  <tr key={item.id} className="border-t border-neutral-700 hover:bg-neutral-700/40 transition">
                    <td className="px-5 py-4 font-medium">{item.student.fullName}</td>
                    <td className="px-5 py-4">{item.student.email}</td>
                    <td className="px-5 py-4">{item.playlist.titre}</td>
                    <td className="px-5 py-4">{item.playlist.description}</td>

                    <td className="px-5 py-4 relative">
                      <div
                        className="flex items-center gap-2 cursor-pointer select-none"
                        onClick={(e) => openMenu(e, item.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === "Enter") openMenu(e as any, item.id); }}
                      >
                        <span className="w-2 h-2 rounded-full" style={{ background: styles.color }} />
                        <span className={`capitalize ${item.status === "Verified" ? "text-green-400" : "text-orange-400"}`}>
                          {item.status}
                        </span>
                        <ChevronDown size={16} />
                      </div>
                    </td>

                    <td className="px-5 py-4 text-center">
                      <button
                        onClick={() => setDeleteAlert({ show: true, id: item.id })}
                        className="text-red-500 hover:text-red-600 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {menuOpenFor !== null && menuAnchor && (
        <StatusMenu
          anchorRect={menuAnchor}
          currentStatus={students.find((s) => s.id === menuOpenFor)?.status ?? "Pending"}
          onSelect={(status) => {
            if (menuOpenFor !== null) handleStatusChange(menuOpenFor, status);
          }}
          onClose={closeMenu}
        />
      )}

      {showModal && <AddStudentModal onClose={() => setShowModal(false)} onSave={handleAddStudent} />}
    </main>
  );
};

export default Student;
