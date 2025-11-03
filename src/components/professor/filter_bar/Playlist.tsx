import { useState } from "react";
import type { VideoItem } from "../../../components/professor/playlist/types";
import VideosSection from "../../../components/professor/playlist/VideoTable";
import { useOutletContext, useNavigate } from "react-router-dom";
import { LayoutDashboard, Video } from "lucide-react";

const PlaylistSection: React.FC = () => {
  const { changeSidebarMenu } = useOutletContext<{
    changeSidebarMenu: (menu: any[] | null) => void;
  }>();
  const navigate = useNavigate();

  const [videos] = useState<VideoItem[]>([
    {
      id: 1,
      title: "Learn React with TailwindCSS",
      description: "A beginner-friendly tutorial to build a React project using Tailwind.",
      thumbnail: "https://i.ytimg.com/vi_webp/2T4O-m_Mc6s/hqdefault.webp",
      visibility: "Public",
      restriction: "Made for kids",
      date: "2025-11-03",
      views: 123,
      comments: 10,
      likes: 24,
    },
  ]);

  const handleVideoClick = () => {
    const editMenu = [
      { icon: <LayoutDashboard size={20} />, label: "Details", path: "/professor/edit/details" },
      { icon: <Video size={20} />, label: "Videos", path: "/professor/edit/videos" },
      { icon: <Video size={20} />, label: "Analyse", path: "/professor/edit/analyse" },
    ];

    // Update sidebar menu
    changeSidebarMenu(editMenu);

    // Navigate to edit page
    navigate("/professor/edit");
  };

  return (
    <div className="text-white">
      <VideosSection videos={videos} onVideoClick={handleVideoClick} />
    </div>
  );
};

export default PlaylistSection;
