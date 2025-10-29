import { Play } from "lucide-react";
import { Button } from "../ui/button";
import type { VideoModule } from "../../pages/FormationPlayer";

interface Props {
  video: VideoModule;
  onComplete: (id: number) => void;
}

export default function VideoPlayer({ video, onComplete }: Props) {
  return (
    <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6">
      <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center relative overflow-hidden">
        <button className="bg-black/60 p-6 rounded-full hover:bg-black/80 transition">
          <Play size={40} color="white" />
        </button>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800">{video.title}</h2>
        <p className="text-gray-500 mt-1">Duration: {video.duration}</p>
        <Button onClick={() => onComplete(video.id)} className="mt-4">
          Mark as Completed
        </Button>
      </div>
    </div>
  );
}
