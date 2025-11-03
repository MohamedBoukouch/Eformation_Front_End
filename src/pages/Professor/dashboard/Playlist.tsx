import { useState } from "react";
import type { VideoItem } from "../../../components/professor/playlist/types";
import VideoTable from "../../../components/professor/playlist/VideoTable";

const Playlist = () => {
  const [videos] = useState<VideoItem[]>([
    {
      id: 1,
      title: "Palindrome Number – Python Solution - LeetCode #1",
      description: "This is the Python solution to Palindrome Number LeetCode problem.",
      thumbnail: "https://i.ytimg.com/vi_webp/2T4O-m_Mc6s/hqdefault.webp",
      visibility: "Public",
      restriction: "Made for kids",
      date: "2025-03-13",
      views: 7,
      comments: 0,
      likes: 2,
    },
  ]);

  return (
    <main className="min-h-screen bg-neutral-800 text-white pt-10 ">
      <div className=" mx-auto">
        <h1 className="text-xl font-semibold mb-10 ml-10">Play Lists</h1>

        {/* Tabs */}
        <div className="flex items-center gap-8 text-sm text-gray-400 border-neutral-700 mb-6">
          {["Inspiration", "Videos", "Shorts", "Live", "Posts", "Playlists", "Podcasts", "Courses", "Promotions", "Collaborations"].map((tab) => (
            <button
              key={tab}
              className={` ml-10 pb-3 border-b-2 transition ${
                tab === "Videos"
                  ? "text-white font-semibold"
                  : "border-transparent hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table Section */}
        <VideoTable videos={videos} />
      </div>
    </main>
  );
};

export default Playlist;
