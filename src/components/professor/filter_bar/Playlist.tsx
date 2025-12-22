// src/pages/professor/PlaylistSection.tsx
import React, { useState, useEffect, useContext } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { LayoutDashboard, Video } from "lucide-react";
import { fetchPlaylistsByProfId } from "../../../services/playlistService";
import placeholderImage from "../../../assets/cover.jpg";
import { AuthContext } from "../../../context/AuthContext";

// Type for a playlist item
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
}

const PlaylistSection: React.FC = () => {
  const { changeSidebarMenu } = useOutletContext<{
    changeSidebarMenu: (menu: any[] | null) => void;
  }>();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  if (!auth) throw new Error("AuthContext is undefined");

  const professorId = auth.user?.id;

  const [playlists, setPlaylists] = useState<PlaylistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch playlists
  useEffect(() => {
    if (!professorId) {
      setError("Professor ID not found.");
      setLoading(false);
      return;
    }

    const getPlaylists = async () => {
      try {
        const data = await fetchPlaylistsByProfId(professorId);
        setPlaylists(data);
      } catch (err: any) {
        setError(err.message || "Error fetching playlists");
      } finally {
        setLoading(false);
      }
    };

    getPlaylists();
  }, [professorId]);

  const handleVideoClick = (playlist: PlaylistItem) => {
    const editMenu = [
      { icon: <LayoutDashboard size={20} />, label: "Details", path: `/professor/edit/${playlist.id}` },
      { icon: <Video size={20} />, label: "Videos", path: `/professor/playlist/${playlist.id}/videos` },
      { icon: <Video size={20} />, label: "Analyse", path: "/professor/edit/analyse" },
    ];
    changeSidebarMenu(editMenu);
    navigate(`/professor/edit/${playlist.id}`);
  };

  if (loading) return <div className="p-4 text-white">Loading playlists...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="bg-neutral-800 text-white h-full flex flex-col">
      <div className="overflow-x-auto flex-1">
        {playlists.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-gray-400 text-lg">
            No playlists available yet.
          </div>
        ) : (
          <table className="min-w-full text-left text-gray-300 text-sm border-neutral-800 bg-neutral-700">
            <thead className="bg-neutral-800 border-neutral-600 text-gray-400 uppercase text-xs">
              <tr className="border-y-2 border-neutral-700">
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3 font-medium">Video</th>
                <th className="px-4 py-3 font-medium">Visibility</th>
                <th className="px-4 py-3 font-medium">Restrictions</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Views</th>
                <th className="px-4 py-3 font-medium">Comments</th>
                <th className="px-4 py-3 font-medium">Likes</th>
              </tr>
            </thead>
            <tbody>
              {playlists.map((playlist) => (
                <tr
                  key={playlist.id}
                  className="cursor-pointer hover:bg-neutral-900 transition-colors border-y-2 border-neutral-700"
                  onClick={() => handleVideoClick(playlist)}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={playlist.miniature || placeholderImage}
                        alt={playlist.title}
                        className="w-28 h-16 rounded object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-white line-clamp-1">{playlist.title}</p>
                        <p className="text-xs text-gray-400 line-clamp-1">{playlist.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{playlist.title}</td>
                  <td className="px-4 py-3">{playlist.visibility}</td>
                  <td className="px-4 py-3">{playlist.restriction || "N/A"}</td>
                  <td className="px-4 py-3">{new Date(playlist.dateCreation).toLocaleDateString()}</td>
                  <td className="px-4 py-3">{playlist.views}</td>
                  <td className="px-4 py-3">{playlist.comments}</td>
                  <td className="px-4 py-3">{playlist.likes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {playlists.length > 0 && (
        <div className="flex items-center justify-between px-4 py-3 text-xs text-gray-400 border-t border-neutral-700 bg-neutral-800">
          <span>Rows per page: <b className="text-white">30</b></span>
          <span>1–{playlists.length} of {playlists.length}</span>
        </div>
      )}
    </div>
  );
};

export default PlaylistSection;
