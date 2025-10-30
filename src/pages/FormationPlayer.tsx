// FormationPlayer.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import VideoPlayer from "../components/formation/VideoPlayer";
import Playlist from "../components/formation/Playlist";
import Header2 from "../components/Header2";

// Interface
export interface VideoModule {
  id: number;
  title: string;
  duration: string;
  description?: string;
  src: string;
}

// Video data with video URLs
const videoModules: VideoModule[] = [
  {
    id: 1,
    title: "Exadata Overview",
    duration: "6m",
    description: "Learn about Exadata architecture and features",
    src: "/public/cour_exemple.mp4",
  },
  {
    id: 2,
    title: "Skill Check: Exadata - Overview",
    duration: "5m",
    description: "Test your knowledge with this skill check",
    src: "/public/cour_exemple.mp4",
  },
  {
    id: 3,
    title: "Exadata Database Service Overview",
    duration: "25m",
    description: "Deep dive into Exadata Database Service capabilities",
    src: "/public/cour_exemple.mp4",
  },
];

export default function FormationPlayer() {
  const [currentVideo, setCurrentVideo] = useState<VideoModule>(videoModules[0]);
  const [completed, setCompleted] = useState<number[]>([]);

  const handleVideoSelect = (video: VideoModule) => setCurrentVideo(video);

  const handleMarkComplete = (id: number) => {
    setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Header */}
      <Header2 />

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Side - Video Player and Content (Takes remaining space) */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 flex flex-col bg-transparent p-4 md:p-8 overflow-y-auto"
        >
          <div className="w-full max-w-6xl mx-auto">
            <VideoPlayer video={currentVideo} onComplete={handleMarkComplete} />
            
            {/* Course Information Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 bg-white rounded-2xl shadow-lg p-6"
            >
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Exadata Database Service Deep Dive Workshop
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <span className="font-semibold">All Users</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="font-semibold">16 Modules</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="font-semibold">6h 51m</span>
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Course Information</h2>
                <p className="text-gray-600 leading-relaxed">
                  Learn how to provision and administer the Oracle Database on Exadata Cloud Service. 
                  This comprehensive workshop covers all aspects of Exadata Database Service with 
                  hands-on exercises and real-world scenarios.
                </p>
              </div>

              <div className="border-t pt-6 mt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">About this Module</h2>
                <p className="text-gray-600 leading-relaxed">
                  {currentVideo.description || "No description available for this module."}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Playlist (Fixed width) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-[360px] md:w-[400px] bg-white/95 border-l border-gray-200 shadow-inner overflow-y-auto p-5"
        >
          <Playlist
            videos={videoModules}
            currentVideo={currentVideo}
            completed={completed}
            onSelect={handleVideoSelect}
          />
        </motion.div>
      </div>
    </div>
  );
}