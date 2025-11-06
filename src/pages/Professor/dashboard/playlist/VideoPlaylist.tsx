import React, { useEffect, useRef, useState } from "react";
import {
  Plus,
  BookOpen,
  Video,
  FileText,
  ListChecks,
  ChevronDown,
  ChevronRight,
  Edit,
  Trash2,
} from "lucide-react";
import AlertModal from "../../../../components/professor/playlist/AlertModal";
import AddDetailModal from "../../../../components/professor/playlist/AddDetailModal";
import Toast, { type ToastType } from "../../../../components/ui/Toast";
import {
  createChapter,
  getChaptersByPlaylist,
  deleteChapter,
  updateChapter,
} from "../../../../services/chapterService";
import { getElementsByChapitre } from "../../../../services/elementService";
import { useParams } from "react-router-dom";

interface Chapter {
  id: number;
  title: string;
  videos: string[];
  documents: string[];
  qcms: string[];
  expanded: boolean;
  playlistId: number;
}

interface Element {
  id: number;
  titre: string;
  type: "VIDEO" | "DOCUMENT" | "QCM";
  lien?: string;
}

const VideoPlaylist: React.FC = () => {
  const { playlistId: rawId } = useParams<{ playlistId: string }>();
  const playlistId = Number(rawId);

  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [showActionMenu, setShowActionMenu] = useState<number | null>(null);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddDetails, setShowAddDetails] = useState(false);

  const [uploadType, setUploadType] = useState<"Video" | "Document" | "QCM" | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterToEdit, setChapterToEdit] = useState<number | null>(null);

  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<ToastType>("success");
  const [showToast, setShowToast] = useState(false);
  const toastTimerRef = useRef<number | null>(null);
  const TOAST_DURATION = 4000;

  const showNotification = (message: string, type: ToastType = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);

    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setShowToast(false);
      toastTimerRef.current = null;
    }, TOAST_DURATION);
  };

  // Fetch chapters and their elements
  useEffect(() => {
    if (!playlistId) return;

    const fetchChaptersWithElements = async () => {
      try {
        const chapterData = await getChaptersByPlaylist(playlistId);

        const chaptersWithContent = await Promise.all(
          chapterData.map(async (c: any) => {
            const elements: Element[] = await getElementsByChapitre(c.id);

            const videos: string[] = [];
            const documents: string[] = [];
            const qcms: string[] = [];

            elements.forEach((el) => {
              switch (el.type) {
                case "VIDEO":
                  videos.push(el.titre ?? "Untitled");
                  break;
                case "DOCUMENT":
                  documents.push(el.titre ?? "Untitled");
                  break;
                case "QCM":
                  qcms.push(el.titre ?? "Untitled");
                  break;
              }
            });

            return {
              id: c.id,
              title: c.titre ?? "Untitled",
              videos,
              documents,
              qcms,
              expanded: false,
              playlistId,
            };
          })
        );

        setChapters(chaptersWithContent);
      } catch (err: any) {
        console.error("Fetch chapters error:", err?.message ?? err);
        showNotification(`Failed to load chapters: ${err?.message ?? "Unknown error"}`, "error");
      }
    };

    fetchChaptersWithElements();

    return () => {
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    };
  }, [playlistId]);

  // Add, rename, delete, toggle functions (unchanged)
  const confirmAddChapter = async () => {
    if (!chapterTitle.trim()) return;
    try {
      const newChapter = await createChapter({ titre: chapterTitle.trim(), playlistId });
      setChapters((prev) => [
        ...prev,
        {
          id: newChapter.id,
          title: newChapter.titre ?? chapterTitle.trim(),
          videos: [],
          documents: [],
          qcms: [],
          expanded: true,
          playlistId,
        },
      ]);
      setShowAddModal(false);
      showNotification("Chapter added successfully!", "success");
    } catch (err: any) {
      console.error(err);
      showNotification(`Failed to add chapter: ${err?.message ?? "Unknown error"}`, "error");
    }
  };

  const confirmRename = async () => {
    if (!chapterTitle.trim() || !chapterToEdit) return;
    try {
      await updateChapter(chapterToEdit, { titre: chapterTitle.trim(), playlistId });
      setChapters((prev) =>
        prev.map((c) => (c.id === chapterToEdit ? { ...c, title: chapterTitle.trim() } : c))
      );
      setShowRenameModal(false);
      showNotification("Chapter updated successfully!", "success");
    } catch (err: any) {
      console.error(err);
      showNotification(`Failed to update chapter: ${err?.message ?? "Unknown error"}`, "error");
    }
  };

  const confirmDelete = async () => {
    if (!chapterToEdit) return;
    try {
      await deleteChapter(chapterToEdit);
      setChapters((prev) => prev.filter((c) => c.id !== chapterToEdit));
      setShowDeleteModal(false);
      showNotification("Chapter deleted successfully!", "success");
      setChapterToEdit(null);
    } catch (err: any) {
      console.error(err);
      showNotification(`Failed to delete chapter: ${err?.message ?? "Unknown error"}`, "error");
    }
  };

  const toggleChapterExpand = (id: number) => {
    setChapters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, expanded: !c.expanded } : c))
    );
  };

  const handleAddContent = (chapterId: number, type: "Video" | "Document" | "QCM") => {
    setSelectedChapter(chapterId);
    setUploadType(type);
    setShowUploadModal(true);
    setShowActionMenu(null);
  };

  const handleRename = (chapterId: number) => {
    const chapter = chapters.find((c) => c.id === chapterId);
    if (!chapter) return;
    setChapterTitle(chapter.title);
    setChapterToEdit(chapterId);
    setShowRenameModal(true);
    setShowActionMenu(null);
  };

  const handleDelete = (chapterId: number) => {
    setChapterToEdit(chapterId);
    setShowDeleteModal(true);
    setShowActionMenu(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedChapter || !uploadType) return;

    setChapters((prev) =>
      prev.map((chapter) => {
        if (chapter.id === selectedChapter) {
          const updated = { ...chapter };
          const filename = file.name;
          if (uploadType === "Video" && !updated.videos.includes(filename)) updated.videos.push(filename);
          if (uploadType === "Document" && !updated.documents.includes(filename)) updated.documents.push(filename);
          if (uploadType === "QCM" && !updated.qcms.includes(filename)) updated.qcms.push(filename);
          return updated;
        }
        return chapter;
      })
    );

    setShowUploadModal(false);
  };

  return (
    <div className="bg-neutral-800 text-neutral-100 min-h-screen pt-10 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 px-6">
        <h1 className="text-2xl font-semibold">Formation Chapters</h1>
        <button
          onClick={() => { setChapterTitle(""); setShowAddModal(true); }}
          className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700 transition"
        >
          <Plus size={18} /> <span>Add Chapter</span>
        </button>
      </div>

      {/* Empty State */}
      {chapters.length === 0 && (
        <div className="text-center mt-20 text-gray-400">
          <BookOpen className="mx-auto mb-4" size={40} />
          <p>No chapters yet. Click “Add Chapter” to start your formation.</p>
        </div>
      )}

      {/* Chapters List */}
      <div className="space-y-3">
        {chapters.map((chapter) => (
          <div key={chapter.id} className="bg-neutral-800 border-t border-b border-neutral-700 p-4 relative">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <button onClick={() => toggleChapterExpand(chapter.id)} className="text-gray-400 hover:text-white transition">
                  {chapter.expanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </button>
                <h2 className="text-lg font-semibold">{chapter.title}</h2>
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowActionMenu(showActionMenu === chapter.id ? null : chapter.id)}
                  className="flex items-center gap-1 px-3 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-md transition"
                >
                  <Plus size={16} />
                </button>

                {showActionMenu === chapter.id && (
                  <div className="absolute right-0 mt-2 w-44 bg-neutral-700 border border-neutral-600 rounded-lg shadow-lg z-10">
                    <ul className="py-2 text-sm">
                      <li onClick={() => handleAddContent(chapter.id, "Video")} className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-600 cursor-pointer"><Video size={16} /> Add Video</li>
                      <li onClick={() => handleAddContent(chapter.id, "Document")} className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-600 cursor-pointer"><FileText size={16} /> Add Document</li>
                      <li onClick={() => handleAddContent(chapter.id, "QCM")} className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-600 cursor-pointer"><ListChecks size={16} /> Add QCM</li>
                      <li onClick={() => handleRename(chapter.id)} className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-600 cursor-pointer text-yellow-400"><Edit size={16} /> Rename</li>
                      <li onClick={() => handleDelete(chapter.id)} className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-600 cursor-pointer text-red-400"><Trash2 size={16} /> Delete</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {chapter.expanded && (
              <div className="mt-3 border-t border-neutral-700 pt-3 space-y-2 text-sm text-gray-300">
                {chapter.videos.length === 0 && chapter.documents.length === 0 && chapter.qcms.length === 0 ? (
                  <p className="text-gray-500 text-sm pl-6">No content added yet.</p>
                ) : (
                  <>
                    {chapter.videos.map((v, i) => (<div key={i} className="pl-6">🎬 {v}</div>))}
                    {chapter.documents.map((d, i) => (<div key={i} className="pl-6">📄 {d}</div>))}
                    {chapter.qcms.map((q, i) => (<div key={i} className="pl-6">📝 {q}</div>))}
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modals */}
      {showAddModal && <AlertModal title="Add New Chapter" description="Enter a name for your new chapter." showInput inputValue={chapterTitle} setInputValue={setChapterTitle} onConfirm={confirmAddChapter} onClose={() => setShowAddModal(false)} />}
      {showRenameModal && <AlertModal title="Rename Chapter" description="Edit the chapter title below." showInput inputValue={chapterTitle} setInputValue={setChapterTitle} onConfirm={confirmRename} onClose={() => setShowRenameModal(false)} confirmText="Save" />}
      {showDeleteModal && <AlertModal title="Delete Chapter" description="Are you sure you want to delete this chapter? This action cannot be undone." onConfirm={confirmDelete} onClose={() => setShowDeleteModal(false)} confirmText="Delete" danger />}
      
      {showUploadModal && uploadType && <AlertModal title={`Upload ${uploadType}`} description={`Choose your ${uploadType.toLowerCase()} file from your computer.`} uploadType={uploadType} onFileUpload={(file) => handleFileUpload({ target: { files: [file] } } as any)} onShowAddDetails={(file) => { handleFileUpload({ target: { files: [file] } } as any); setShowUploadModal(false); setTimeout(() => setShowAddDetails(true), 300); }} onClose={() => setShowUploadModal(false)} />}

      {showAddDetails && selectedChapter !== null && (
        <AddDetailModal chapitreId={selectedChapter} onClose={() => setShowAddDetails(false)} onSave={(data) => { console.log("Saved data:", data); setShowAddDetails(false); }} />
      )}

      {/* Toast Notification */}
      {showToast && <Toast message={toastMessage} type={toastType} duration={TOAST_DURATION} />}
    </div>
  );
};

export default VideoPlaylist;
