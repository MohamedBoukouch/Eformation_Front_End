import React, { useState, useEffect, useRef, useContext } from "react";
import ReactDOM from "react-dom";
import { Plus, Trash2, X, ChevronDown } from "lucide-react";
import {
  getAllStudentsByProfessor,
  verifyStudent,
  deleteStudentFromPlaylist,
  sendInvitation,
} from "../../../services/learnFormation";
import { fetchPlaylistsByProfId, type Playlist } from "../../../services/playlistService";
import Toast, { type ToastType } from "../../../components/ui/Toast";
import AlertModal from "../../../components/professor/playlist/AlertModal";
import { AuthContext } from "../../../context/AuthContext";

/* ===================== TYPES ===================== */
interface LearnPlaylistItem {
  id: string | number; // string to allow unique ids per playlist
  verified: boolean;
  student: {
    studentId: number;
    studentName: string;
    studentEmail: string;
  };
  playlist: {
    playlistId: number;
    playlistTitle: string;
    description: string;
  };
  professor?: {
    id?: number;
    fullName?: string;
    email?: string;
  };
  status: "Verified" | "Pending";
}

type AnchorRect =
  | {
      top: number;
      left: number;
      right: number;
      bottom: number;
      width: number;
      height: number;
    }
  | null;

/* ===================== CONSTANTS ===================== */
const STATUS_STYLES = {
  Verified: { dot: "#22c55e", text: "text-green-400" },
  Pending: { dot: "#f97316", text: "text-orange-400" },
} as const;

/* ===================== STATUS MENU ===================== */
const StatusMenu: React.FC<{
  anchorRect: AnchorRect;
  currentStatus: "Verified" | "Pending";
  onSelect: (status: "Verified" | "Pending") => void;
  onClose: () => void;
}> = ({ anchorRect, currentStatus, onSelect, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [onClose]);

  if (!anchorRect) return null;

  return ReactDOM.createPortal(
    <div
      ref={ref}
      style={{
        position: "fixed",
        top: anchorRect.bottom + 6,
        left: anchorRect.left,
        zIndex: 9999,
        minWidth: 140,
      }}
      className="bg-neutral-800 border border-neutral-700 rounded-md shadow-lg"
    >
      {(["Verified", "Pending"] as const).map((s) => (
        <button
          key={s}
          onClick={() => {
            onSelect(s);
            onClose();
          }}
          className={`block w-full px-4 py-2 text-left text-sm hover:bg-neutral-700 ${
            s === currentStatus ? "text-green-400" : "text-gray-300"
          }`}
        >
          {s}
        </button>
      ))}
    </div>,
    document.body
  );
};

/* ===================== ADD STUDENT MODAL ===================== */
const AddStudentModal: React.FC<{
  onClose: () => void;
  onSave: (data: { email: string; name: string; playlistId: number }) => void;
}> = ({ onClose, onSave }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [playlistId, setPlaylistId] = useState<number | null>(null);

  const auth = useContext(AuthContext);
  if (!auth) throw new Error("AuthContext missing");
  const profId = auth.user?.id;

  useEffect(() => {
    if (!profId) return;
    fetchPlaylistsByProfId(profId).then((res) => {
      setPlaylists(res);
      if (res.length) setPlaylistId(res[0].id);
    });
  }, [profId]);

  const submit = () => {
    if (!email || !name || !playlistId) return;
    onSave({ email, name, playlistId });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-neutral-800 p-6 rounded-xl w-[90%] max-w-md border border-neutral-700">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">Add Student</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <input
          className="w-full mb-3 p-2 bg-neutral-700 rounded"
          placeholder="Student name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full mb-3 p-2 bg-neutral-700 rounded"
          placeholder="Student email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <select
          className="w-full mb-4 p-2 bg-neutral-700 rounded"
          value={playlistId ?? ""}
          onChange={(e) => setPlaylistId(Number(e.target.value))}
        >
          {playlists.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-neutral-700 rounded">
            Cancel
          </button>
          <button
            onClick={submit}
            className="px-4 py-2 bg-green-600 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

/* ===================== MAIN COMPONENT ===================== */
const Student: React.FC = () => {
  const [students, setStudents] = useState<LearnPlaylistItem[]>([]);
  const [filter, setFilter] = useState<"Verified" | "Pending">("Verified");
  const [menuAnchor, setMenuAnchor] = useState<AnchorRect>(null);
  const [menuId, setMenuId] = useState<string | number | null>(null);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | number | null>(null);

  const auth = useContext(AuthContext);
  if (!auth) throw new Error("AuthContext missing");
  const professorId = auth.user?.id;

  // Fetch students
  useEffect(() => {
    if (!professorId) return;
    getAllStudentsByProfessor(professorId)
      .then((data: any[]) => {
        setStudents(
          data.map((i, index) => ({
            id: `${i.studentId}-${i.playlistId}-${index}`, // unique string id
            student: {
              studentId: i.studentId,
              studentName: i.studentName,
              studentEmail: i.studentEmail,
            },
            playlist: {
              playlistId: i.playlistId,
              playlistTitle: i.playlistTitle,
              description: i.playlistTitle || "",
            },
            verified: i.verified,
            status: i.verified ? "Verified" : "Pending",
          }))
        );
      })
      .catch(() => setToast({ message: "Failed to fetch students", type: "error" }));
  }, [professorId]);

  const handleInvite = async (d: { email: string; name: string; playlistId: number }) => {
    if (!professorId) return;
    try {
      const res = await sendInvitation({
        studentEmail: d.email,
        studentName: d.name,
        playlistId: d.playlistId,
        professorId,
        loginLink: "http://localhost:3000/login",
      });
      setToast({ message: res.message, type: "success" });
    } catch (error: any) {
      setToast({ message: error.message || "Failed to send invitation", type: "error" });
    }
  };

  const handleStatus = async (id: string | number, s: "Verified" | "Pending") => {
    await verifyStudent(Number(id.toString().split("-")[0]), s === "Verified"); // send correct studentId
    setStudents((prev) =>
      prev.map((x) => (x.id === id ? { ...x, status: s, verified: s === "Verified" } : x))
    );
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteStudentFromPlaylist(Number(deleteId.toString().split("-")[0]));
    setStudents((prev) => prev.filter((x) => x.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <main className="bg-neutral-900 min-h-screen p-10 text-white">
      {toast && <Toast {...toast} />}

      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-semibold">Students</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 px-4 py-2 rounded flex gap-2"
        >
          <Plus size={18} /> Add Student
        </button>
      </div>

      <div className="mb-4 flex gap-6">
        {(["Verified", "Pending"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={filter === f ? "text-white" : "text-gray-400"}
          >
            {f}
          </button>
        ))}
      </div>

      <table className="w-full bg-neutral-800 rounded">
        <thead className="bg-neutral-700 text-xs">
          <tr>
            <th className="p-3 text-left">Student</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Playlist</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          {students
            .filter((s) => s.status === filter)
            .map((s) => (
              <tr key={s.id} className="border-t border-neutral-700">
                <td className="p-3">{s.student.studentName}</td>
                <td className="p-3">{s.student.studentEmail}</td>
                <td className="p-3">{s.playlist.playlistTitle}</td>
                <td className="p-3">
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={(e) => {
                      setMenuAnchor(e.currentTarget.getBoundingClientRect());
                      setMenuId(s.id);
                    }}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: STATUS_STYLES[s.status].dot }}
                    />
                    <span className={STATUS_STYLES[s.status].text}>{s.status}</span>
                    <ChevronDown size={16} />
                  </div>
                </td>
                <td className="p-3 text-center">
                  <button onClick={() => setDeleteId(s.id)}>
                    <Trash2 className="text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {menuId && menuAnchor && (
        <StatusMenu
          anchorRect={menuAnchor}
          currentStatus={students.find((s) => s.id === menuId)?.status ?? "Pending"}
          onSelect={(s) => handleStatus(menuId, s)}
          onClose={() => setMenuId(null)}
        />
      )}

      {showModal && <AddStudentModal onClose={() => setShowModal(false)} onSave={handleInvite} />}

      {deleteId && (
        <AlertModal
          title="Delete Student"
          description="Are you sure?"
          danger
          onClose={() => setDeleteId(null)}
          onConfirm={handleDelete}
        />
      )}
    </main>
  );
};

export default Student;
