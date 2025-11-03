import {
  LayoutDashboard,
  Video,
  BarChart2,
  Users,
  Languages,
  Shield,
  DollarSign,
  Wand2,
  Music,
  Settings,
  MessageSquare,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import profile from "../assets/main_teache.jpg";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();

  const menus = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/professor" },
    { icon: <Video size={20} />, label: "Playlists", path: "/professor/playlists" },
    { icon: <BarChart2 size={20} />, label: "Analytics", path: "/professor/analytics" },
    { icon: <Users size={20} />, label: "Community", path: "/professor/students" },
    { icon: <Languages size={20} />, label: "Languages", path: "/professor/languages" },
    { icon: <Shield size={20} />, label: "Content detection", path: "/professor/detection" },
    { icon: <DollarSign size={20} />, label: "Earn", path: "/professor/earn" },
    { icon: <Wand2 size={20} />, label: "Customization", path: "/professor/customization" },
    { icon: <Music size={20} />, label: "Audio library", path: "/professor/playlists" },
  ];

  return (
    <aside
      className={`fixed top-[56px] left-0 h-[calc(100vh-56px)] bg-neutral-800 border-r border-neutral-700 transition-all duration-300 ease-in-out z-40
        ${isOpen ? "w-60" : "w-20"}
        hidden md:flex flex-col`}
    >
      {/* Profile */}
      <div className="flex flex-col items-center py-4 border-b border-neutral-800">
        <img
          src={profile}
          alt="User"
          className={`rounded-full object-cover transition-all duration-300 ${
            isOpen ? "w-20 h-20 ring-2 ring-neutral-700" : "w-10 h-10"
          }`}
        />
        {isOpen && (
          <>
            <p className="mt-2 text-sm font-semibold text-gray-200">Your channel</p>
            <p className="text-xs text-neutral-400">Mohamed Boukouch</p>
          </>
        )}
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-1 mt-4 px-2">
        {menus.map((item, i) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={i}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
                isOpen ? "justify-start" : "justify-center"
              } ${
                isActive
                  ? "bg-neutral-700 text-white"
                  : "text-gray-300 hover:bg-neutral-800"
              }`}
            >
              {item.icon}
              {isOpen && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto mb-4 ">
        <NavLink
          to="/professor/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
              isOpen ? "justify-start" : "justify-center"
            } ${
              isActive
                ? "bg-neutral-700 text-white"
                : "hover:bg-neutral-800 text-gray-300"
            }`
          }
        >
          <Settings size={20} />
          {isOpen && <span>Settings</span>}
        </NavLink>
        <NavLink
          to="/professor/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
              isOpen ? "justify-start" : "justify-center"
            } ${
              isActive
                ? "bg-neutral-700 text-white"
                : "hover:bg-neutral-800 text-gray-300"
            }`
          }
        >
          <MessageSquare size={20} />
          {isOpen && <span>Send feedback</span>}
        </NavLink>

      </div>
    </aside>
  );
};

export default Sidebar;
