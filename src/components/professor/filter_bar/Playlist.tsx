// src/pages/professor/PlaylistSection.tsx
import React, { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { LayoutDashboard, Video } from "lucide-react";
import { fetchPlaylistsByProfId } from "../../../services/playlistService"; // Backend fetch
import placeholderImage from "../../../assets/cover.jpg";

// Type for a playlist item
interface PlaylistItem {
  id: number;
  title: string;
  description: String;
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

  // State
  const [playlists, setPlaylists] = useState<PlaylistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch playlists from backend
  useEffect(() => {
    const profId = 40; // replace with dynamic ID
    const getPlaylists = async () => {
      try {
        const data = await fetchPlaylistsByProfId(profId);
        setPlaylists(data);
      } catch (err: any) {
        setError(err.message || "Error fetching playlists");
      } finally {
        setLoading(false);
      }
    };

    getPlaylists();
  }, []);

  // Handle click on a playlist row
  const handleVideoClick = (playlist: PlaylistItem) => {
    const editMenu = [
      { icon: <LayoutDashboard size={20} />, label: "Details", path: `/professor/edit/${playlist.id}` },
      { icon: <Video size={20} />, label: "Videos", path: `/professor/playlist/${playlist.id}/videos` },
      { icon: <Video size={20} />, label: "Analyse", path: "/professor/edit/analyse" },
    ];
    changeSidebarMenu(editMenu);
    navigate(`/professor/edit/${playlist.id}`);
  
  };

  if (loading) return <div>Loading playlists...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-neutral-800 text-white h-full flex flex-col">
      <div className="overflow-x-auto flex-1">
        <table className="min-w-full text-left text-gray-300 text-sm border-neutral-800 bg-neutral-700">
          <thead className="bg-neutral-800 border-neutral-600 text-gray-400 uppercase text-xs">
            <tr className="border-y-2 border-neutral-700">
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3 font-medium">Video</th>
              <th className="px-4 py-3 font-medium">Visibility</th>
              <th className="px-4 py-3 font-medium">Restrictions</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Videos</th>
              <th className="px-4 py-3 font-medium">QCM</th>
              <th className="px-4 py-3 font-medium">Docs</th>
            </tr>
          </thead>
          <tbody className="bg-neutral-800 ">
            {playlists.map((playlist) => (
              <tr
                key={playlist.id}
                className="cursor-pointer hover:bg-neutral-900 transition-colors border-y-2 border-neutral-700"
                onClick={() => handleVideoClick(playlist)}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      // src={playlist.miniature || placeholderImage}
                      src={placeholderImage}
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
                <td className="px-4 py-3">
                  {new Date(playlist.dateCreation).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">{playlist.views}</td>
                <td className="px-4 py-3">{playlist.comments}</td>
                <td className="px-4 py-3">{playlist.likes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between px-4 py-3 text-xs text-gray-400 border-t border-neutral-700 bg-neutral-800">
        <span>Rows per page: <b className="text-white">30</b></span>
        <span>1–{playlists.length} of {playlists.length}</span>
      </div>
    </div>
  );
};

export default PlaylistSection;
