import React, { useState, useEffect } from 'react';
import { FaChevronRight, FaEdit, FaPlus, FaTrash, FaUser, FaUserSecret } from 'react-icons/fa';

/* ---------- TYPES ---------- */
type Status = 'verified' | 'unverified';

interface Student {
  id: string;
  fullName: string;
  email: string;
  dateCreated: string;
  status: Status;
}

interface StudentTableProps {
  students: Student[];
  title: string;
  onStudentClick: (id: string) => void;
}

/* ---------- MOCK ---------- */
const mockStudents: Student[] = Array.from({ length: 30 }, (_, i) => ({
  id: `STU-${String(i + 1).padStart(3, '0')}`,
  fullName: ['Sophie Martin', 'Thomas Bernard', 'Camille Dubois', 'Lucas Moreau', 'Emma Laurent'][i % 5],
  email: `user${i + 1}@example.com`,
  dateCreated: new Date(2024, 0, 15 + i).toISOString().slice(0, 10),
  status: i % 3 === 0 ? 'unverified' : 'verified',
}));

/* ---------- TABLE ---------- */
const StudentTable: React.FC<StudentTableProps> = ({ students, title, onStudentClick }) => {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const total = students.length;
  const pages = Math.ceil(total / pageSize);

  useEffect(() => setPage(1), [students]);

  const rows = students.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="bg-white border border-neutral-200 rounded-sm shadow-sm">
      {/* header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200">
        <div>
          <h2 className="text-sm font-semibold text-neutral-700">{title}</h2>
        </div>
        <span className="text-xs text-neutral-400">
          Page {page} of {pages}
        </span>
      </div>

      {/* table */}
      <div className="overflow-auto">
        <table className="w-full text-xs">
          <thead className="bg-neutral-50 text-neutral-600">
            <tr >
              {['ID', 'Name', 'Email', 'Joined', 'Status','Actions'].map(h => (
                <th key={h} className="px-4 py-2 text-center font-medium uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {rows.length ? (
              rows.map(s => (
                <tr
                  key={s.id}
                  onClick={() => onStudentClick(s.id)}
                  className="hover:bg-neutral-50 cursor-pointer transition-colors text-center"
                >
                  <td className="px-4 py-2 text-neutral-500">{s.id}</td>
                  <td className="px-4 py-2 text-neutral-800">{s.fullName}</td>
                  <td className="px-4 py-2 text-neutral-600">{s.email}</td>
                  <td className="px-4 py-2 text-neutral-600">
                    {new Date(s.dateCreated).toLocaleDateString('en-CA')}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-block px-2 py-0.5 text-[10px] font-medium rounded ${
                        s.status === 'verified'
                          ? 'bg-neutral-100 text-green-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>

                    <td className="py-2 px-3 text-center">
                <div className="flex items-center justify-center gap-3">
                  {/* Edit button */}
                  <button
                    onClick={() => onStudentClick(s.id)}
                    className="p-1 text-blue-300 hover:text-blue-800 transition"
                    title="Edit Student"
                  >
                    <FaEdit size={14} />
                  </button>

                  {/* Delete button */}
                  <button
                    onClick={() => console.log("Delete", s.id)}
                    className="p-1 text-rose-300 hover:text-rose-600 transition"
                    title="Delete Student"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-neutral-400 text-xs">No students</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      {pages > 1 && (
        <div className="flex items-center justify-between px-4 py-2 border-t border-neutral-200 text-xs">
          <span className="text-neutral-500">
            {((page - 1) * pageSize + 1)}–{Math.min(page * pageSize, total)} of {total}
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-2 py-1 border border-neutral-300 rounded-sm disabled:opacity-40 disabled:cursor-default hover:bg-neutral-50"
            >
              Prev
            </button>
            <button
              onClick={() => setPage(p => Math.min(pages, p + 1))}
              disabled={page === pages}
              className="px-2 py-1 border border-neutral-300 rounded-sm disabled:opacity-40 disabled:cursor-default hover:bg-neutral-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* ---------- PAGE ---------- */
const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStudents(mockStudents);
      setLoading(false);
    }, 600);
  }, []);

  const handleClick = (id: string) => {
    /* navigate to /students/:id */
    console.log(id);
  };

  if (loading)
    return (
      <div className="min-h-screen grid place-items-center text-neutral-500 text-sm">
        Loading…
      </div>
    );

return (
  <main className="min-h-screen bg-neutral-50 px-4">
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <nav className="flex items-center space-x-2 text-sm text-gray-500">
          <a href="/professor" className="hover:text-gray-700">Professor</a>
          <span>/</span>
          <span className="text-gray-900 font-medium">Student Management</span>
        </nav>
        <button className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-1 rounded-lg transition-colors duration-200">
          <FaPlus className="w-3 h-3" />
          <span>New Student</span>
        </button>
      </div>
      <div className="space-y-6">
        <StudentTable
          students={students.filter(s => s.status === 'verified')}
          title="Verified Students"
          onStudentClick={handleClick}
        />
        <StudentTable
          students={students.filter(s => s.status === 'unverified')}
          title="Pending Verification"
          onStudentClick={handleClick}
        />
      </div>
    </div>
  </main>
);
};

export default StudentManagement;