import { useState } from "react";
import type { VideoItem } from "../../../components/professor/playlist/types";
import PlaylistSection from "../../../components/professor/filter_bar/Playlist";
import VideosSection from "../../../components/professor/filter_bar/Videos";
import QcmSection from "../../../components/professor/filter_bar/Qcm";
import DocsSection from "../../../components/professor/filter_bar/Docs";
import FilterBar from "../../../components/ui/FilterBar";

const Playlist = () => {
  const [activeTab, setActiveTab] = useState("Videos");

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

  const tabs = ["Videos", "PlayLists", "QCM", "Docs"];

  return (
    <main className="min-h-screen bg-neutral-800 text-white pt-10">
      <div className="mx-auto">
        <h1 className="text-3xl font-semibold mb-10 ml-10">Channel Content</h1>

        {/* Tabs */}
        <div className="flex items-center gap-8 text-sm text-gray-400 border-b border-neutral-700 font-bold">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`ml-10 pb-3 border-b-2 transition ${
                activeTab === tab
                  ? "border-blue-500 text-white font-semibold"
                  : "border-transparent hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="border-b border-neutral-700">
          <FilterBar />
        </div>

        {/* Dynamic Section */}
        <div className="">
          {activeTab === "Videos" && <VideosSection videos={videos} />}
          {activeTab === "PlayLists" && <PlaylistSection />}
          {activeTab === "QCM" && <QcmSection />}
          {activeTab === "Docs" && <DocsSection />}
        </div>
      </div>
    </main>
  );
};

export default Playlist;
