// // src/components/playlist/PlaylistTable.tsx
// import React, { useState } from 'react';
// import type { Playlist } from './types';
// import PlaylistRow from './PlaylistRow';
// import { Plus } from 'lucide-react';

// const initialData: Playlist[] = [
//   {
//     id: 1,
//     title: 'Palindrome Number - Python Solution - LeetCode #1',
//     thumbnail: '/assets/thumb1.jpg',
//     visibility: 'Public',
//     restrictions: 'Made for kids',
//     date: '2025-03-13',
//     views: 7,
//     comments: 0,
//     likes: 2
//   },
//   {
//     id: 2,
//     title: 'Web Development Fundamentals',
//     thumbnail: 'https://grafikart.fr/uploads/attachments/2023/intro-laravel-6426f436a59c8644725273.jpg',
//     visibility: 'Public',
//     date: '2024-01-15',
//     views: 1234,
//     comments: 12,
//     likes: 200
//   },
//   // ... ajoute d'autres éléments si besoin
// ];

// const PlaylistTable: React.FC = () => {
//   const [playlists, setPlaylists] = useState<Playlist[]>(initialData);

//   const handleNew = () => {
//     // logique de creation (ouvrir modal, etc.)
//     console.log('New playlist');
//   };

//   return (
//     <main className="min-h-screen p-6 bg-gradient-to-br from-gray-900 to-black text-white">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//           <div>
//             <nav className="text-sm text-gray-400 flex items-center gap-2">
//               <a className="hover:text-white" href="#">Channel content</a>
//               <span className="text-gray-600">/</span>
//               <span className="text-white font-semibold">Videos</span>
//             </nav>
//             <h1 className="text-2xl font-bold mt-3">Videos</h1>
//             <p className="text-sm text-gray-400 mt-1">Manage your uploaded videos and playlists</p>
//           </div>

//           <div className="flex items-center gap-3">
//             <button
//               onClick={handleNew}
//               className="inline-flex items-center gap-2 bg-yellow-400 text-black px-3 py-2 rounded-lg font-semibold shadow hover:brightness-95 transition"
//             >
//               <Plus className="w-4 h-4" />
//               New Playlist
//             </button>
//             {/* actions supplémentaires si nécessaires */}
//           </div>
//         </div>

//         {/* Table container */}
//         <div className="bg-[#0f1720] border border-gray-800 rounded-2xl overflow-hidden">
//           <div className="hidden lg:block">
//             <table className="min-w-full divide-y divide-gray-800">
//               <thead className="bg-gray-900/40">
//                 <tr>
//                   <th className="px-4 py-3 text-left text-xs text-gray-400"><input type="checkbox" className="w-4 h-4 accent-yellow-400" /></th>
//                   <th className="px-4 py-3 text-left text-xs text-gray-400">Video</th>
//                   <th className="px-4 py-3 text-left text-xs text-gray-400">Visibility</th>
//                   <th className="px-4 py-3 text-left text-xs text-gray-400">Restrictions</th>
//                   <th className="px-4 py-3 text-left text-xs text-gray-400">Date</th>
//                   <th className="px-4 py-3 text-left text-xs text-gray-400">Views</th>
//                   <th className="px-4 py-3 text-left text-xs text-gray-400">Comments</th>
//                   <th className="px-4 py-3 text-left text-xs text-gray-400">Likes</th>
//                   <th className="px-4 py-3 text-right text-xs text-gray-400">Actions</th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-gray-800">
//                 {playlists.map((p, idx) => (
//                   <PlaylistRow item={p} key={p.id} index={idx} />
//                 ))}
//               </tbody>
//             </table>

//             {/* pager / rows per page (similaire à ton image) */}
//             <div className="flex items-center justify-between px-4 py-3 bg-gray-900/20">
//               <div className="text-sm text-gray-400">Rows per page: <strong className="text-white">30</strong></div>
//               <div className="text-sm text-gray-400">1–{playlists.length} of {playlists.length}</div>
//             </div>
//           </div>

//           {/* Mobile list (cards) */}
//           <div className="p-4 lg:hidden">
//             {playlists.map((p) => (
//               <div key={p.id} className="mb-4">
//                 <PlaylistRow item={p} index={p.id} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default PlaylistTable;
