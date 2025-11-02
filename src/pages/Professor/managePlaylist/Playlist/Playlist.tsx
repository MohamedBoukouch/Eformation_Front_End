import { useState } from 'react';
import { Plus, Calendar, Play, MoreVertical, Clock } from 'lucide-react';

const Playlist = () => {
  const [playlists, setPlaylists] = useState([
    {
      id: 1,
      title: "Web Development Fundamentals",
      createdAt: "2024-01-15",
      thumbnail: "https://grafikart.fr/uploads/attachments/2023/intro-laravel-6426f436a59c8644725273.jpg",
      videoCount: 12,
      duration: "4h 22m"
    },
    {
      id: 2,
      title: "Advanced React Patterns",
      createdAt: "2024-01-20",
      thumbnail: "https://fs.uit.ac.ma/wp-content/uploads/2022/12/Metiers-dEnseignement-et-de-Formation-en-Mathematiques.png",
      videoCount: 8,
      duration: "3h 45m"
    },
    {
      id: 3,
      title: "Database Design Mastery",
      createdAt: "2024-01-25",
      thumbnail: "https://i.ytimg.com/vi/Gg6GnLBKdTg/hqdefault.jpg",
      videoCount: 15,
      duration: "6h 10m"
    },
    {
      id: 4,
      title: "UI/UX Best Practices",
      createdAt: "2024-02-01",
      thumbnail: "https://i.ytimg.com/vi/L__igVGAb9o/hqdefault.jpg",
      videoCount: 10,
      duration: "5h 15m"
    },
    {
      id: 5,
      title: "UI/UX Best Practices",
      createdAt: "2024-02-01",
      thumbnail: "/api/placeholder/300/200",
      videoCount: 10,
      duration: "5h 15m"
    },
    {
      id: 4,
      title: "UI/UX Best Practices",
      createdAt: "2024-02-01",
      thumbnail: "/api/placeholder/300/200",
      videoCount: 10,
      duration: "5h 15m"
    },
    {
      id: 5,
      title: "UI/UX Best Practices",
      createdAt: "2024-02-01",
      thumbnail: "/api/placeholder/300/200",
      videoCount: 10,
      duration: "5h 15m"
    },
    {
      id: 4,
      title: "UI/UX Best Practices",
      createdAt: "2024-02-01",
      thumbnail: "/api/placeholder/300/200",
      videoCount: 10,
      duration: "5h 15m"
    },
    {
      id: 5,
      title: "UI/UX Best Practices",
      createdAt: "2024-02-01",
      thumbnail: "/api/placeholder/300/200",
      videoCount: 10,
      duration: "5h 15m"
    },
    {
      id: 4,
      title: "UI/UX Best Practices",
      createdAt: "2024-02-01",
      thumbnail: "/api/placeholder/300/200",
      videoCount: 10,
      duration: "5h 15m"
    },
    {
      id: 5,
      title: "UI/UX Best Practices",
      createdAt: "2024-02-01",
      thumbnail: "/api/placeholder/300/200",
      videoCount: 10,
      duration: "5h 15m"
    }
  ]);

  const addNewPlaylist = () => {
    // Handle new playlist creation
    console.log("Add new playlist clicked");
  };

  return (
    <main className="min-h-screen   max-w-full bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
      <div className="flex justify-between items-center ">
        <nav className="flex items-center space-x-2 text-sm text-gray-500">
          <a href="/professor" className="hover:text-gray-700">Professor</a>
          <span>/</span>
          <span className="text-white font-medium">Student Management</span>
        </nav>
     
      </div>
          
      <button
            onClick={addNewPlaylist}
            className="flex items-center space-x-2  bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-2  py-1 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            <span>New Playlist</span>
          </button>
        </div>

        {/* Playlists Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {playlists.map((playlist) => (
    <div
      key={playlist.id}
      className="group bg-gray-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105 border border-gray-700 hover:border-blue-500/50"
    >
      {/* Thumbnail Container */}
      <div className="relative overflow-hidden">
        <img
          src={playlist.thumbnail}
          alt={playlist.title}
          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay Gradient - Hidden until hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Top Info - Hidden until hover */}
        <div className="absolute top-0 left-0 right-0 p-4 opacity-1 group-hover:opacity-100 transition-opacity duration-500">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
              <Calendar className="w-3 h-3 text-blue-400" />
              <span className="text-xs text-gray-300">
                {new Date(playlist.createdAt).toLocaleDateString()}
              </span>
            </div>
            <button className="bg-black/60 backdrop-blur-sm rounded-full p-2 hover:bg-black/80 transition-colors duration-300">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Info - Hidden until hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          
          <div className="flex items-center justify-between text-sm text-gray-300">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Play className="w-3 h-3 text-green-400" />
                <span>{playlist.videoCount} videos</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3 text-yellow-400" />
                <span>{playlist.duration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hover Play Button - Hidden until hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <button className="bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500 shadow-2xl">
            <Play className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Card Footer - Hidden until hover */}
      <div className="p-4 bg-gray-800/50 backdrop-blur-sm opacity-1 group-hover:opacity-100 transition-opacity duration-500">
        <div className="flex justify-between items-center text-sm">
                   <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors duration-300">
            {playlist.title}
          </h3>
        </div>
      </div>
    </div>
  ))}
</div>

        {/* Empty State */}
        {playlists.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
              <Play className="w-10 h-10 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              No playlists yet
            </h3>
            <p className="text-gray-500 mb-6">
              Create your first playlist to get started
            </p>
            <button
              onClick={addNewPlaylist}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Create Playlist
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Playlist;