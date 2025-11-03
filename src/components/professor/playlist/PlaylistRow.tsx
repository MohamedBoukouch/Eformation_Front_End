// // src/components/playlist/PlaylistRow.tsx
// import React from 'react';
// import type { Playlist } from './types';
// import { MoreVertical, Play, Clock, Calendar } from 'lucide-react';

// type Props = {
//   item: Playlist;
//   index: number;
//   onToggle?: (id: number) => void;
// };

// const PlaylistRow: React.FC<Props> = ({ item, index }) => {
//   return (
//     <>
//       {/* Table row (visible on lg+) */}
//       <tr className="hidden lg:table-row group/row">
//         <td className="px-4 py-3">
//           <input type="checkbox" aria-label={`Select playlist ${item.title}`} className="w-4 h-4 accent-yellow-400" />
//         </td>

//         <td className="px-4 py-3">
//           <div className="flex items-center gap-3">
//             <div className="w-28 h-16 rounded overflow-hidden bg-gray-800 flex-shrink-0">
//               <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
//             </div>
//             <div className="hidden md:block">
//               <div className="text-sm font-medium text-white">{item.title}</div>
//               <div className="text-xs text-gray-400 mt-1">{new Date(item.date).toLocaleDateString()}</div>
//             </div>
//           </div>
//         </td>

//         <td className="px-4 py-3 text-sm text-gray-300">{item.visibility}</td>

//         <td className="px-4 py-3 text-sm text-gray-400">{item.restrictions ?? '-'}</td>

//         <td className="px-4 py-3 text-sm text-gray-400">{new Date(item.date).toLocaleDateString()}</td>

//         <td className="px-4 py-3 text-sm text-gray-300">{item.views}</td>

//         <td className="px-4 py-3 text-sm text-gray-300">{item.comments}</td>

//         <td className="px-4 py-3 text-sm text-gray-300">
//           <div className="flex items-center gap-2">
//             <div className="text-sm">{item.likes}</div>
//             <div className="w-16 h-1 bg-gray-700 rounded overflow-hidden">
//               <div className="h-1 bg-yellow-400" style={{ width: `${Math.min(100, item.likes)}%` }} />
//             </div>
//           </div>
//         </td>

//         <td className="px-4 py-3 text-right">
//           <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition" aria-label="More">
//             <MoreVertical className="w-4 h-4 text-gray-300" />
//           </button>
//         </td>
//       </tr>

//       {/* Card row for small screens */}
//       <div className="lg:hidden bg-gray-900 border border-gray-800 rounded-xl p-4 mb-4 flex gap-4 items-start">
//         <input type="checkbox" aria-label={`Select ${item.title}`} className="w-4 h-4 mt-1 accent-yellow-400" />
//         <img src={item.thumbnail} alt={item.title} className="w-28 h-16 object-cover rounded" />
//         <div className="flex-1">
//           <div className="flex justify-between items-start">
//             <div>
//               <div className="text-sm font-semibold text-white">{item.title}</div>
//               <div className="text-xs text-gray-400 mt-1">{new Date(item.date).toLocaleDateString()}</div>
//             </div>
//             <div className="flex items-center gap-2">
//               <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition" aria-label="More">
//                 <MoreVertical className="w-4 h-4 text-gray-300" />
//               </button>
//             </div>
//           </div>

//           <div className="mt-3 text-xs text-gray-400 flex flex-wrap gap-3">
//             <div className="flex items-center gap-1"><Calendar className="w-3 h-3" />{item.visibility}</div>
//             <div className="flex items-center gap-1"><Play className="w-3 h-3" /> {item.views} views</div>
//             <div className="flex items-center gap-1"><Clock className="w-3 h-3" /> {item.likes} likes</div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PlaylistRow;
