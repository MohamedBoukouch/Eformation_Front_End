// VideoCard.tsx
import { CheckCircle, PlayCircle } from "lucide-react";
import type { VideoModule } from "../../pages/FormationPlayer";

interface Props {
  video: VideoModule;
  active: boolean;
  completed: boolean;
  onClick: () => void;
}

export default function VideoCard({ video, active, completed, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`flex items-start p-3 rounded-xl cursor-pointer transition-all border ${
        active 
          ? "bg-orange-50 border-orange-200 shadow-sm" 
          : "bg-white border-gray-100 hover:bg-gray-50"
      }`}
    >
      <div className="flex-shrink-0 mt-1 mr-3">
        {completed ? (
          <CheckCircle size={18} className="text-green-500" />
        ) : (
          <PlayCircle size={18} className="text-gray-400" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`font-medium text-sm ${
          active ? "text-orange-700" : "text-gray-700"
        }`}>
          {video.title}
        </p>
        <p className="text-xs text-gray-500 mt-1">{video.duration}</p>
      </div>
      {completed && (
        <div className="flex-shrink-0 ml-2">
          <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            Completed
          </div>
        </div>
      )}
    </div>
  );
}