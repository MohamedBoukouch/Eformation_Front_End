import React from "react";
import type { VideoItem } from "./types";
import VideoRow from "./VideoRow";

interface VideosSectionProps {
  videos: VideoItem[];
  onVideoClick?: (video: VideoItem) => void; // callback when row clicked
}

const VideosSection: React.FC<VideosSectionProps> = ({ videos, onVideoClick }) => {
  return (
    <tbody>
      {videos.map((video) => (
        <VideoRow
          key={video.id}
          video={video}
          onClick={() => onVideoClick?.(video)} // use optional chaining
        />
      ))}
    </tbody>
  );
};

export default VideosSection;
