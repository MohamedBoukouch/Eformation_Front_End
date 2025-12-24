import React from "react";
import { Search, User } from "lucide-react";
import { Link } from "react-router-dom";

const Header2: React.FC = () => {
  return (
    <header className="bg-[#1e1e1e] text-white flex items-center justify-between px-10 py-6 shadow-lg h-[90px]">
      {/* Left: Logo and Title */}
      <div className="flex items-center gap-4">
        <span className="text-red-600 font-bold text-3xl">◉</span>
        <h1 className="text-2xl font-bold tracking-wide">Eformation</h1>
        <span className="text-gray-400 text-base font-medium">| En Ligne Formations</span>
      </div>

      {/* Middle: Search bar */}
      <div className="flex items-center bg-[#2b2b2b] px-5 py-2 rounded-full w-[30%]">
        <Search size={22} className="text-gray-400" />
        <input
          type="text"
          placeholder="What do you want to learn?"
          className="bg-transparent outline-none text-base text-white px-3 w-full placeholder-gray-400"
        />
      </div>

      {/* Right: Navigation links */}
      <div className="flex items-center gap-8 text-xl font-medium">
        <Link to="/student" className="hover:text-gray-300">Home</Link>
        <Link to="/student/library" className="hover:text-gray-300">Library</Link>
        <Link to="#" className="hover:text-gray-300">Live Sessions</Link>
        <Link to="#" className="hover:text-gray-300">Dashboard</Link>
        <Link to="#" className="hover:text-gray-300">Favorites</Link>
        <User className="bg-[#ff6600] text-white rounded-full p-1 w-10 h-10" />
      </div>
    </header>
  );
};

export default Header2;
