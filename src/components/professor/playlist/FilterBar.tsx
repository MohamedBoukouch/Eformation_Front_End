// src/components/ui/FilterBar.tsx
import { Filter } from "lucide-react";

export default function FilterBar() {
  return (
    <div className="flex items-center justify-between bg-[#202020] px-4 py-3 border-b border-[#303030]">
      <div className="flex items-center gap-2 text-gray-300">
        <Filter className="w-4 h-4" />
        <span className="text-sm">Filter</span>
      </div>
      <select className="bg-[#202020] text-sm text-gray-300 border border-[#303030] rounded-md px-2 py-1 focus:outline-none">
        <option>All videos</option>
        <option>Public</option>
        <option>Private</option>
      </select>
    </div>
  );
}
