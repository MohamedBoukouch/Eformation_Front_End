import type { VideoItem } from "../../../components/professor/playlist/types";
import VideoTable from "../../../components/professor/playlist/VideoTable";

interface VideosSectionProps {
  videos: VideoItem[];
}

const VideosSection: React.FC<VideosSectionProps> = ({ videos }) => {
  return (
    <div>
      <VideoTable videos={videos} />
    </div>
  );
};

export default VideosSection;
