import { useState } from "react";
import { motion } from "framer-motion";
import VideoPlayer from "../components/formation/VideoPlayer";
import Playlist from "../components/formation/Playlist";

// Keep your interface here, no import needed
export interface VideoModule {
  id: number;
  title: string;
  duration: string;
  description?: string;
}

// Video data
const videoModules: VideoModule[] = [
  { id: 1, title: "Oracle Analytics Cloud Overview", duration: "2m" },
  { id: 2, title: "Product Strategy", duration: "4m" },
  { id: 3, title: "Oracle Analytics Products", duration: "9m" },
  { id: 4, title: "Explain Transactional System", duration: "5m" },
  { id: 5, title: "Key Features of Oracle Analytics", duration: "4m" },
  { id: 6, title: "Data Preparation & Enrichment", duration: "4m" },
  { id: 7, title: "Augmented Analytics Capabilities", duration: "7m" },
];

export default function FormationPlayer() {
  const [currentVideo, setCurrentVideo] = useState<VideoModule>(videoModules[0]);
  const [completed, setCompleted] = useState<number[]>([]);

  const handleVideoSelect = (video: VideoModule) => setCurrentVideo(video);

  const handleMarkComplete = (id: number) => {
    setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Left Side - Player */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 flex justify-center items-center p-4"
      >
        <VideoPlayer video={currentVideo} onComplete={handleMarkComplete} />
      </motion.div>

      {/* Right Side - Playlist */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/3 bg-white/80 border-l border-gray-200 shadow-inner overflow-y-auto p-5"
      >
        <Playlist
          videos={videoModules}
          currentVideo={currentVideo}
          completed={completed}
          onSelect={handleVideoSelect}
        />
      </motion.div>
    </div>
  );
}
