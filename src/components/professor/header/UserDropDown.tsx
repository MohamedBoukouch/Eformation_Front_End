import { useState, useRef, useEffect } from "react";
import profile from "../../../assets/main_truck.avif"; // your profile image
import { LogOut, Settings, User } from "lucide-react";

const UserDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile picture button */}
      <button onClick={toggleDropdown} className="focus:outline-none">
        <img
          src={profile}
          alt="User profile"
          className="w-9 h-9 rounded-full object-cover border border-neutral-700 hover:ring-2 hover:ring-blue-500 transition-all"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-44 bg-neutral-800 border border-neutral-700 rounded-xl shadow-lg overflow-hidden animate-fadeIn z-50">
          <ul className="flex flex-col text-sm text-neutral-200">
            <li className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-700 cursor-pointer">
              <User size={16} /> Profile
            </li>
            <li className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-700 cursor-pointer">
              <Settings size={16} /> Settings
            </li>
            <hr className="border-neutral-700 my-1" />
            <li className="flex items-center gap-2 px-4 py-2 hover:bg-red-600/30 cursor-pointer text-red-400">
              <LogOut size={16} /> Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
