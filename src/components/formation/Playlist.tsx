// Playlist.tsx
import { motion } from "framer-motion";
import type { VideoModule } from "../../pages/FormationPlayer";
import VideoCard from "./VideoCard";

interface Props {
  videos: VideoModule[];
  currentVideo: VideoModule;
  completed: number[];
  onSelect: (video: VideoModule) => void;
}

export default function Playlist({ videos, currentVideo, completed, onSelect }: Props) {
  return (
    <div className="h-full flex flex-col">
      {/* Playlist Header */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">Playlist</h3>
        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <span>Search playlist</span>
          </div>
          <div className="flex items-center">
            <span>Skill Checks</span>
          </div>
          <div className="flex items-center">
            <span>Auto Play</span>
          </div>
        </div>
      </div>

      {/* Module Sections */}
      <div className="flex-1 overflow-y-auto space-y-6">
        {/* Module 1 */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-3">1. Exadata - Overview</h4>
          <ul className="space-y-2">
            {videos.slice(0, 2).map((video) => (
              <motion.li
                key={video.id}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <VideoCard
                  video={video}
                  active={currentVideo.id === video.id}
                  completed={completed.includes(video.id)}
                  onClick={() => onSelect(video)}
                />
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Module 2 */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-3">2. Exadata Database Service Overview</h4>
          <ul className="space-y-2">
            {videos.slice(2).map((video) => (
              <motion.li
                key={video.id}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <VideoCard
                  video={video}
                  active={currentVideo.id === video.id}
                  completed={completed.includes(video.id)}
                  onClick={() => onSelect(video)}
                />
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Course Duration */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span className="font-semibold">Course Duration</span>
          <span>6h 51m</span>
        </div>
      </div>
    </div>
  );
}