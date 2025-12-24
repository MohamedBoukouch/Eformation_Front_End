import React, { useEffect, useState } from "react";
import Header2 from "../../components/Header/Header2";
import Footer2 from "../../components/Footer/Footer2";
import AlertAccessModal from "../../components/Student/AlertAccessModal";
import { Heart } from "lucide-react";
import image from "../../assets/cover.jpg";
import { requestAccess, type LearnPlaylistRequest } from "../../services/learnFormation";
import { fetchAllPlaylists } from "../../services/playlistService";
import Toast, { type ToastType } from "../../components/ui/Toast"; 
interface Professor {
  id: number;
  fullName: string;
  email: string;
  role: string;
}

interface Playlist {
  id: number;
  title: string;
  description: string;
  visibility: string;
  miniature?: string | null;
  dateCreation: string;
  totalDuration?: string;
  professeur: Professor;
}

interface PlaylistWithStatus extends Playlist {
  status: "none" | "pending" | "accepted";
}

const StudentLibrary: React.FC = () => {
  const [playlists, setPlaylists] = useState<PlaylistWithStatus[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const studentId = 37; // logged-in student

  // Fetch all playlists
  useEffect(() => {
    const loadPlaylists = async () => {
      try {
        const data = await fetchAllPlaylists();
        const allPlaylists: PlaylistWithStatus[] = data.map((p) => ({
          ...p,
          status: "none",
        }));
        setPlaylists(allPlaylists);
      } catch (error: any) {
        console.error(error);
        setToast({ message: error.message || "Erreur lors du chargement", type: "error" });
      } finally {
        setLoading(false);
      }
    };
    loadPlaylists();
  }, []);

  const handleRequestAccess = (playlistId: number) => {
    setSelectedId(playlistId);
    setShowConfirm(true);
  };

  const confirmAccessRequest = async () => {
    if (selectedId === null) return;
  
    try {
      const playlist = playlists.find((p) => p.id === selectedId);
      if (!playlist) throw new Error("Playlist introuvable");
  
      // Only send studentId and playlistId
      const payload = {
        studentId,
        playlistId: playlist.id,
      };
  
      await requestAccess(payload);
  
      setPlaylists((prev) =>
        prev.map((p) =>
          p.id === selectedId ? { ...p, status: "pending" } : p
        )
      );
  
      setToast({
        message: "Votre demande a été envoyée !",
        type: "success",
      });
    } catch (error: any) {
      setToast({
        message: `Échec : ${error.message}`,
        type: "error",
      });
    } finally {
      setShowConfirm(false);
    }
  };
  

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9fafb]">
        <p className="text-gray-600 text-lg font-medium animate-pulse">
          Chargement des formations...
        </p>
      </div>
    );
  }

  const truncateText = (text: string, maxLength: number) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return (
    <div className="min-h-screen flex flex-col bg-[#f9fafb]">
      <main className="flex-grow px-6 md:px-16 py-10">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">
          📚 Bibliothèque des Formations
        </h2>

        {playlists.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            Aucune formation disponible pour le moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col border border-gray-100"
              >
                <img
                  // src={playlist.miniature || image}
                  src={image}
                  alt={playlist.title}
                  className="h-44 w-full object-cover"
                />

                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex justify-between items-center mb-2 relative group cursor-pointer">
                      <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                        {truncateText(playlist.title, 25)}
                        {playlist.title.length > 25 && (
                          <span className="absolute left-0 -top-8 w-max max-w-xs p-2 text-xs text-white bg-gray-800 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            {playlist.title}
                          </span>
                        )}
                      </h3>
                      <Heart
                        size={20}
                        className="text-gray-400 hover:text-red-500 cursor-pointer transition"
                      />
                    </div>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2 relative group cursor-pointer">
                      {truncateText(playlist.description, 80)}
                      {playlist.description.length > 80 && (
                        <span className="absolute left-0 bottom-full mb-2 w-max max-w-xs p-2 text-xs text-white bg-gray-800 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
                          {playlist.description}
                        </span>
                      )}
                    </p>

                    <p className="text-sm text-gray-500 mb-1">
                      {playlist.professeur.fullName}
                    </p>

                    {playlist.totalDuration && (
                      <p className="text-xs text-gray-400">
                        Durée totale: {playlist.totalDuration}
                      </p>
                    )}

                    <p className="text-xs text-gray-400">
                      Publiée le{" "}
                      {new Date(playlist.dateCreation).toLocaleDateString(
                        "fr-FR"
                      )}
                    </p>
                  </div>

                  <div className="flex justify-end mt-4">
                    {playlist.status === "none" && (
                      <button
                        onClick={() => handleRequestAccess(playlist.id)}
                        className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-orange-600 transition"
                      >
                        Demander l’accès
                      </button>
                    )}

                    {playlist.status === "pending" && (
                      <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold">
                        ⏳ En attente de vérification par le professeur
                      </div>
                    )}

                    {playlist.status === "accepted" && (
                      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                        ✅ Accès accepté
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>


      {showConfirm && (
        <AlertAccessModal
          title="Confirmer la demande d’accès"
          description="Voulez-vous vraiment demander l’accès à cette formation ?"
          onClose={() => setShowConfirm(false)}
          onConfirm={confirmAccessRequest}
          confirmText="Oui, confirmer"
          cancelText="Non"
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

export default StudentLibrary;
