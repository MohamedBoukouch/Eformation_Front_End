// src/pages/professor/playlist/EditPlaylist.tsx
import React, { useState } from "react";

const EditPlaylist: React.FC = () => {
  const [title, setTitle] = useState("TEST");
  const [description, setDescription] = useState("GGGG");
  const [visibility, setVisibility] = useState("Public");
  const [order, setOrder] = useState("Date published (newest)");

  return (
    <div className="flex flex-col gap-6 p-6 bg-neutral-800 text-neutral-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Playlist details</h1>
        <div className="flex gap-2">
          <button
            disabled
            className="bg-neutral-700 text-neutral-500 px-4 py-2 rounded-md cursor-not-allowed"
          >
            Undo changes
          </button>
          <button
            disabled
            className="bg-neutral-800 text-neutral-500 px-4 py-2 rounded-md cursor-not-allowed"
          >
            Save
          </button>
        </div>
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left side */}
        <div className="flex flex-col gap-6">
          {/* Title */}
          <div className="flex flex-col border border-neutral-700 rounded-md p-4">
            <label className="text-sm text-neutral-400 mb-2">
              Title (required)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-transparent border-none outline-none text-neutral-100 placeholder-neutral-500"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col border border-neutral-700 rounded-md p-4">
            <label className="text-sm text-neutral-400 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="bg-transparent border-none outline-none resize-none text-neutral-100 placeholder-neutral-500"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col gap-6">
          {/* Visibility */}
          <div className="flex flex-col border border-neutral-700 rounded-md p-4">
            <label className="text-sm text-neutral-400 mb-2">Visibility</label>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              className="bg-neutral-800 border border-neutral-700 rounded-md p-2 text-neutral-100 focus:outline-none"
            >
              <option>Public</option>
              <option>Unlisted</option>
              <option>Private</option>
            </select>
          </div>

          {/* Default video order */}
          <div className="flex flex-col border border-neutral-700 rounded-md p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-neutral-400">
                Default video order
              </label>
              <span className="text-xs text-neutral-500">ⓘ</span>
            </div>
            <select
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="bg-neutral-800 border border-neutral-700 rounded-md p-2 text-neutral-100 focus:outline-none"
            >
              <option>Date published (newest)</option>
              <option>Date published (oldest)</option>
              <option>Most popular</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPlaylist;
