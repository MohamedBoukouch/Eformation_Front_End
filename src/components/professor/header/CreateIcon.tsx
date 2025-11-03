import { useState } from "react";
import { Plus, ListPlus, Upload } from "lucide-react";
import CreatePlaylistModal from "../playlist/CreatePlaylistModal";

const CreateIcon: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaylistModal, setIsPlaylistModal] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden md:flex items-center gap-1 border border-neutral-600 rounded-full px-3 py-1.5 text-sm hover:bg-neutral-800 transition"
      >
        <Plus size={16} />
        Create
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-48 bg-neutral-800 border border-neutral-700 rounded-xl shadow-lg overflow-hidden animate-fadeIn z-50">
          <ul className="flex flex-col text-sm text-neutral-200">
            <li
              onClick={() => alert('Upload video clicked')}
              className="flex items-center gap-3 px-4 py-2 hover:bg-neutral-700 cursor-pointer transition"
            >
              <Upload size={16} /> Upload Video
            </li>
            <li
              onClick={() => {
                setIsPlaylistModal(true);
                setIsOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-2 hover:bg-neutral-700 cursor-pointer transition"
            >
              <ListPlus size={16} /> New Playlist
            </li>
          </ul>
        </div>
      )}

      {/* Playlist Modal */}
      <CreatePlaylistModal
        isOpen={isPlaylistModal}
        onClose={() => setIsPlaylistModal(false)}
      />
    </div>
  );
};

export default CreateIcon;
