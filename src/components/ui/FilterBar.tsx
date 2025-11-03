// src/components/ui/FilterBar.tsx
const FilterBar = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-neutral-800 text-sm text-gray-400 border-t border-neutral-700 ">
      <div className="flex items-center gap-4">
        <button className="hover:text-white">Filter</button>
        <button className="hover:text-white">Sort</button>
      </div>
      <button className="text-xs bg-[#272727] hover:bg-[#333] px-3 py-1 rounded-md text-gray-300">
        Learn more
      </button>
    </div>
  );
};

export default FilterBar;
