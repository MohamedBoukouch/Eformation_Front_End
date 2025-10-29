import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
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
    <div>
      <h3 className="text-xl font-bold mb-4 text-gray-800">Playlist</h3>
      <ul className="space-y-3">
        {videos.map((video) => (
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
  );
}
