// src/components/channel/VideoRow.tsx
import React from "react";
import type { VideoItem } from "./types";

interface Props {
  video: VideoItem;
  onClick?: () => void;
}

const VideoRow: React.FC<Props> = ({ video, onClick }) => {
  return (
    <tr
      onClick={onClick}
       className="cursor-pointer hover:bg-neutral-900 transition-colors border-t border-neutral-200 w-full">
    
      {/* Image + Title + Description */}
      <td className="px-6 py-4 w-[35%]">
        <div className="flex items-center gap-4 w-full">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-36 h-20 rounded object-cover flex-shrink-0"
          />
          <div className="flex flex-col justify-center min-w-0 flex-1">
            <p className="text-sm font-medium text-white truncate">
              {video.title}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {video.description}
            </p>
          </div>
        </div>
      </td>

      {/* Visibility */}
      <td className="px-6 py-4 text-sm text-gray-300 w-[10%]">
        {video.visibility}
      </td>

      {/* Restriction */}
      <td className="px-6 py-4 text-sm text-gray-400 w-[10%]">
        {video.restriction}
      </td>

      {/* Date */}
      <td className="px-6 py-4 text-sm text-gray-400 whitespace-nowrap w-[10%]">
        {new Date(video.date).toLocaleDateString()}
        <p className="text-xs text-gray-500">Published</p>
      </td>

      {/* Views */}
      <td className="px-6 py-4 text-sm text-gray-300 w-[10%]">{video.views}</td>

      {/* Comments */}
      <td className="px-6 py-4 text-sm text-gray-300 w-[10%]">
        {video.comments}
      </td>

      {/* Likes with progress */}
      <td className="px-6 py-4 text-sm text-gray-300 w-[15%]">
        <div className="flex flex-col items-start w-full">
          <span>{video.likes} likes</span>
          <div className="w-full h-1 bg-[#303030] mt-1 rounded overflow-hidden">
            <div
              className="h-1 bg-gray-400 rounded"
              style={{ width: `${Math.min(video.likes, 100)}%` }}
            ></div>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default VideoRow;
