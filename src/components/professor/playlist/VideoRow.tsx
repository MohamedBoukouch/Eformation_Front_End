// src/components/channel/VideoRow.tsx
import type { VideoItem } from "./types";

interface Props {
  video: VideoItem;
  onClick?: () => void; // optional callback
}

const VideoRow: React.FC<Props> = ({ video, onClick }) => {
  return (
    <tr
      className="border-b bg-neutral-800 hover:bg-neutral-900 transition-colors cursor-pointer"
      onClick={onClick} // call parent when row clicked
    >
      <td className="px-4 py-3 w-5">
        <input
          type="checkbox"
          className="accent-gray-500"
          onClick={(e) => e.stopPropagation()} // prevent row click
        />
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-28 h-16 rounded object-cover"
          />
          <div>
            <p className="text-sm font-medium text-white line-clamp-1">{video.title}</p>
            <p className="text-xs text-gray-400 line-clamp-1">{video.description}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-gray-300">{video.visibility}</td>
      <td className="px-4 py-3 text-sm text-gray-400">{video.restriction}</td>
      <td className="px-4 py-3 text-sm text-gray-400">
        {new Date(video.date).toLocaleDateString()}
        <p className="text-xs text-gray-500">Published</p>
      </td>
      <td className="px-4 py-3 text-sm text-gray-300">{video.views}</td>
      <td className="px-4 py-3 text-sm text-gray-300">{video.comments}</td>
      <td className="px-4 py-3 text-sm text-gray-300">
        <div className="flex flex-col">
          <span>{video.likes} likes</span>
          <div className="w-20 h-1 bg-[#303030] mt-1 rounded">
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
