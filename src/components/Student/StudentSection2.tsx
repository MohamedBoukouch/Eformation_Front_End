import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPlaylistsByStudent, type StudentPlaylist } from "../../services/learnFormation";

const StudentSection2: React.FC<{ studentId: number }> = ({ studentId }) => {
  const [playlists, setPlaylists] = useState<StudentPlaylist[]>([]);
  const [filter, setFilter] = useState<"all" | "inProgress">("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPlaylistsByStudent(studentId);
        setPlaylists(data);
      } catch (err: any) {
        setError(err.message || "Failed to load playlists");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [studentId]);

  const filteredPlaylists =
    filter === "all" ? playlists : playlists.filter((p) => p.inProgress);

  const handleClickPlaylist = (playlistId: number) => {
    // Rediriger vers la page de formation avec l'ID de la playlist
    navigate(`/student/formation/${playlistId}`);
  };

  return (
    <section className="bg-[#f9f9f6] text-gray-900 py-16 px-6 md:px-16">
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold mb-3">Continue Learning</h2>
        <p className="text-lg text-gray-600 mb-5">Continue where you left off.</p>

        <div className="flex flex-wrap gap-6 border-b border-gray-300 pb-2 text-lg font-medium mb-5">
          <button
            className={`${filter === "all" ? "text-black border-b-2 border-black" : "text-gray-700"}`}
            onClick={() => setFilter("all")}
          >
            All Formations
          </button>
          <button
            className={`${filter === "inProgress" ? "text-black border-b-2 border-black" : "text-gray-700"}`}
            onClick={() => setFilter("inProgress")}
          >
            In Progress
          </button>
        </div>

        {loading ? (
          <p>Loading playlists...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : filteredPlaylists.length === 0 ? (
          <p className="text-gray-500">No playlists found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaylists.map((p) => (
              <div
                key={p.playlistId}
                className="p-6 border rounded-lg shadow-sm hover:shadow-md cursor-pointer bg-white transition-all duration-300 hover:scale-[1.02]"
                onClick={() => handleClickPlaylist(p.playlistId)}
              >
                <h3 className="font-semibold text-xl mb-2">{p.playlistTitle}</h3>
                <p className="text-gray-600 mb-2">Student: {p.studentName}</p>
                <p className={`font-medium ${p.inProgress ? "text-green-600" : "text-blue-600"}`}>
                  Status: {p.inProgress ? "In Progress" : "Not Started"}
                </p>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                  Start Learning →
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default StudentSection2;