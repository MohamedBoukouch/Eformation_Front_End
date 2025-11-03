// src/components/professor/playlist/VideoTable.tsx
import React from "react";
import type { VideoItem } from "./types";
import VideoRow from "./VideoRow";

interface VideosSectionProps {
  videos: VideoItem[];
  onVideoClick?: (video: VideoItem) => void; // callback when row clicked
}

const VideosSection: React.FC<VideosSectionProps> = ({ videos, onVideoClick }) => {
  return (
    <div className="bg-neutral-800 text-white h-full flex flex-col">

      {/* Table */}
      <div className="overflow-x-auto flex-1">
        <table className="min-w-full text-left text-gray-300 text-sm border-neutral-700 bg-neutral-700">
          <thead className="bg-neutral-800 text-gray-400 uppercase text-xs">
            <tr>
              <th className="px-4 py-3"></th>
              <th className="px-4 py-3 font-medium">Video</th>
              <th className="px-4 py-3 font-medium">Visibility</th>
              <th className="px-4 py-3 font-medium">Restrictions</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Views</th>
              <th className="px-4 py-3 font-medium">Comments</th>
              <th className="px-4 py-3 font-medium">Likes (vs. dislikes)</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video) => (
              <VideoRow
                key={video.id}
                video={video}
                onClick={() => onVideoClick && onVideoClick(video)} // call parent
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3 text-xs text-gray-400 border-neutral-700 bg-neutral-800">
        <span>
          Rows per page: <b className="text-white">30</b>
        </span>
        <span>
          1–{videos.length} of {videos.length}
        </span>
      </div>
    </div>
  );
};

export default VideosSection;
