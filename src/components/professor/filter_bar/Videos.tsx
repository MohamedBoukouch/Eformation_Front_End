import type { VideoItem } from "../../../components/professor/playlist/types";
import VideoTable from "../../../components/professor/playlist/VideoTable";

interface VideosSectionProps {
  videos: VideoItem[];
}

const VideosSection: React.FC<VideosSectionProps> = ({ videos }) => {
  return (
    <div className="bg-neutral-800 text-white h-full flex flex-col">
      {videos.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-gray-400 text-lg">
          No videos available yet.
        </div>
      ) : (
        <VideoTable videos={videos} />
      )}
    </div>
  );
};

export default VideosSection;
