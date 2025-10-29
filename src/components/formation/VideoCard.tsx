import { CheckCircle } from "lucide-react";
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
      className={`flex justify-between items-center p-4 rounded-xl cursor-pointer transition ${
        active ? "bg-orange-100" : "hover:bg-gray-50"
      }`}
    >
      <div>
        <p className="font-medium text-gray-700">{video.title}</p>
        <p className="text-sm text-gray-500">{video.duration}</p>
      </div>
      {completed && <CheckCircle size={20} className="text-green-500" />}
    </div>
  );
}
