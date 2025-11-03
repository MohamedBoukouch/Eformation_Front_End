import React from "react";
import { Menu, Bell, HelpCircle, Plus } from "lucide-react";
import Logo from "../../../assets/react.svg";
import UserDropdown from "./UserDropDown";
import CreateIcon from "./CreateIcon";


interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-neutral-800 border-b border-neutral-900">
      <div className="flex items-center justify-between px-4 py-2 text-white">
        {/* Left: Menu + Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-neutral-800 rounded-full transition-colors"
          >
            <Menu size={22} />
          </button>

          <div className="flex items-center gap-1">
            <img src={Logo} alt="Logo" className="w-7 h-7" />
            <span className="text-lg font-semibold hidden sm:block">
              Eformation
            </span>
          </div>
        </div>

        {/* Middle: Search bar */}
        <div className="hidden md:flex flex-1 max-w-xl mx-6">
          <div className="relative w-full">
            <input
              type="text"
              aria-label="Search across your channel"
              placeholder="Search across your channel"
              className="w-full bg-neutral-800 border border-neutral-700 rounded-full py-2.5 pl-10 pr-4 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:ring-offset-neutral-900"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>

        {/* Right: Icons + UserDropdown */}
        <div className="flex items-center gap-3 pr-5">
          <button className="p-2 hover:bg-neutral-800 rounded-full">
            <HelpCircle size={20} />
          </button>

          <button className="p-2 hover:bg-neutral-800 rounded-full relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          
          <CreateIcon />

          {/* User Dropdown */}
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
