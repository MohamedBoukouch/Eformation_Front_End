import React from "react";
import { Search, User } from "lucide-react";

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

      {/* Right: Navigation icons */}
      <div className="flex items-center gap-8 text-xl font-medium">
        <a href="#" className="hover:text-gray-300">Home</a>
        <a href="#" className="hover:text-gray-300">Library</a>
        <a href="#" className="hover:text-gray-300">Live Sessions</a>
        <a href="#" className="hover:text-gray-300">Dashboard</a>
        <a href="#" className="hover:text-gray-300">Favorites</a>
        <User className="bg-[#ff6600] text-white rounded-full p-1 w-10 h-10" />
      </div>
    </header>
  );
};

export default Header2;
