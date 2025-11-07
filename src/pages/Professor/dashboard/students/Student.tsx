import React, { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";

interface StudentItem {
  id: number;
  name: string;
  email: string;
  role: string;
  accountType: string;
  rating: number;
  country: string;
  status: "Active" | "Inactive" | "Blocked";
  image: string;
}

const STATUS_STYLES: Record<
  StudentItem["status"],
  { background: string; color: string; border: string }
> = {
  Active: {
    background: "#ecfdf5",
    color: "#065f46",
    border: "#86efac",
  },
  Inactive: {
    background: "#fff7ed",
    color: "#7c2d12",
    border: "#fdba74",
  },
  Blocked: {
    background: "#fee2e2",
    color: "#991b1b",
    border: "#fca5a5",
  },
};

// ---------- Add Student Modal ----------
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
          <h2 className="text-lg font-semibold text-white">
            Add New Student
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <label className="block text-sm text-gray-300 mb-2">
          Student Email:
        </label>
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

// ---------- Main Component ----------
const Student: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<
    "Verified" | "Not Verified" | "Blocked"
  >("Verified");

  const [showModal, setShowModal] = useState(false);

  const [students, setStudents] = useState<StudentItem[]>([
    {
      id: 1,
      name: "Jese Leos",
      email: "jese@example.com",
      role: "Administrator",
      accountType: "PRO",
      rating: 4.7,
      country: "United States",
      status: "Active",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Bonnie Green",
      email: "bonnie@example.com",
      role: "Viewer",
      accountType: "PRO",
      rating: 3.9,
      country: "United States",
      status: "Inactive",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      name: "Leslie Livingston",
      email: "leslie@example.com",
      role: "Moderator",
      accountType: "PRO",
      rating: 4.8,
      country: "United States",
      status: "Blocked",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
    },
  ]);

  const handleStatusChange = (id: number, newStatus: StudentItem["status"]) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
  };

  const handleDelete = (id: number) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const handleAddStudent = (email: string) => {
    const newStudent: StudentItem = {
      id: Date.now(),
      name: "New Student",
      email,
      role: "Student",
      accountType: "BASIC",
      rating: 0,
      country: "Unknown",
      status: "Inactive",
      image: "https://randomuser.me/api/portraits/lego/1.jpg",
    };
    setStudents((prev) => [...prev, newStudent]);
  };

  const filters: Array<"Verified" | "Not Verified" | "Blocked"> = [
    "Verified",
    "Not Verified",
    "Blocked",
  ];

  const filteredStudents = students.filter((s) => {
    if (activeFilter === "Verified") return s.status === "Active";
    if (activeFilter === "Not Verified") return s.status === "Inactive";
    if (activeFilter === "Blocked") return s.status === "Blocked";
    return true;
  });

  return (
    <main className="min-h-screen bg-neutral-900 text-white pt-10 pl-1 pr-5 relative">
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
                activeFilter === f
                  ? "border-green-500 text-white font-semibold"
                  : "border-transparent hover:text-white"
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
                <th className="px-5 py-3 text-left">User</th>
                <th className="px-5 py-3 text-left">Role</th>
                <th className="px-5 py-3 text-left">Email</th>
                <th className="px-5 py-3 text-left">Account</th>
                <th className="px-5 py-3 text-left">Rating</th>
                <th className="px-5 py-3 text-left">Country</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Actions</th>
                <th className="px-5 py-3 text-left">Delete</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((student) => {
                const styles = STATUS_STYLES[student.status];
                return (
                  <tr
                    key={student.id}
                    className="border-t border-neutral-700 hover:bg-neutral-700/40 transition"
                  >
                    <td className="px-5 py-4 flex items-center gap-3">
                      <img
                        src={student.image}
                        alt={student.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-xs text-gray-400">
                          {student.email}
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">{student.role}</td>
                    <td className="px-5 py-4">{student.email}</td>
                    <td className="px-5 py-4">{student.accountType}</td>

                    <td
                      className={`px-5 py-4 font-semibold ${
                        student.rating >= 4.5
                          ? "text-green-400"
                          : student.rating >= 4
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {student.rating}
                    </td>

                    <td className="px-5 py-4">{student.country}</td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ background: styles.color }}
                        />
                        <span className="capitalize">{student.status}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <select
                        value={student.status}
                        onChange={(e) =>
                          handleStatusChange(
                            student.id,
                            e.target.value as StudentItem["status"]
                          )
                        }
                        className={`text-sm text-center rounded-md px-3 py-1 outline-none border w-28 cursor-pointer transition-colors duration-200
                          ${
                            student.status === "Active"
                              ? "bg-green-100 text-green-700 border-green-300"
                              : student.status === "Inactive"
                              ? "bg-orange-100 text-orange-700 border-orange-300"
                              : "bg-red-100 text-red-700 border-red-300"
                          }`}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Blocked">Blocked</option>
                      </select>
                    </td>

                    <td className="px-5 py-4 text-center">
                      <button
                        onClick={() => handleDelete(student.id)}
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

      {/* Modal */}
      {showModal && (
        <AddStudentModal
          onClose={() => setShowModal(false)}
          onSave={handleAddStudent}
        />
      )}
    </main>
  );
};

export default Student;
