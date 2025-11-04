// src/pages/professor/dashboard/playlist/VideoPlaylist.tsx
import React, { useEffect, useState } from "react";
import { Plus, BookOpen, Video, FileText, ListChecks } from "lucide-react";
import type { VideoItem } from "../../../../components/professor/playlist/types";
import VideoTable from "../../../../components/professor/playlist/VideoTable";

const VideoPlaylist: React.FC = () => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [showMenu, setShowMenu] = useState(false);

  // Fetch or simulate videos
  useEffect(() => {
    const fakeVideos: VideoItem[] = [
      {
        id: 1,
        title: "Learn React with TailwindCSS",
        description: "Build modern React apps styled with Tailwind.",
        thumbnail: "https://i.ytimg.com/vi_webp/2T4O-m_Mc6s/hqdefault.webp",
        visibility: "Public",
        restriction: "Made for kids",
        date: "2025-11-03",
        views: 123,
        comments: 10,
        likes: 24,
      },
      {
        id: 2,
        title: "Master TypeScript Basics",
        description: "Understand TS fundamentals for modern apps.",
        thumbnail: "https://i.ytimg.com/vi_webp/BwuLxPH8IDs/hqdefault.webp",
        visibility: "Private",
        restriction: "None",
        date: "2025-10-20",
        views: 98,
        comments: 5,
        likes: 10,
      },
    ];
    setVideos(fakeVideos);
  }, []);

  // Handle Add menu actions
  const handleAdd = (type: string) => {
    setShowMenu(false);
    console.log(`Add new: ${type}`);
    // Later: open modal or navigate to add page
  };

  return (
    <div className="bg-neutral-800 text-neutral-100 min-h-screen pt-10 relative">
      {/* Header with Add button */}
      <div className="flex justify-between items-center px-5 mb-6">
        <h1 className="text-xl font-semibold">Playlist Videos</h1>

        <div className="relative">
        <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center justify-center gap-2 bg-neutral-800 border border-neutral-700 text-neutral-100 px-4 py-2 rounded-md hover:bg-neutral-700 transition-all duration-200 focus:outline-none"
            >
            <Plus size={18} />
            <span className="font-medium text-sm">Add</span>
        </button>   

          {showMenu && (
            <div className="absolute right-0 mt-2 w-44 bg-neutral-700 border border-neutral-600 rounded-xl shadow-lg z-10">
              <ul className="py-2 text-sm">
                <li
                  onClick={() => handleAdd("Chapter")}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-600 cursor-pointer"
                >
                  <BookOpen size={16} /> Add Chapter
                </li>
                <li
                  onClick={() => handleAdd("Video")}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-600 cursor-pointer"
                >
                  <Video size={16} /> Add Video
                </li>
                <li
                  onClick={() => handleAdd("QCM")}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-600 cursor-pointer"
                >
                  <ListChecks size={16} /> Add QCM
                </li>
                <li
                  onClick={() => handleAdd("Document")}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-600 cursor-pointer"
                >
                  <FileText size={16} /> Add Document
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Video Table */}
      <VideoTable videos={videos} />
    </div>
  );
};

export default VideoPlaylist;
