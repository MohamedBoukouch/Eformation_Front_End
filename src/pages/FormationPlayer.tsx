import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getChaptersByPlaylist } from "../services/chapterService";
import { getElementsByChapitre, type ElementResponse } from "../services/elementService";

// Types pour les chapitres
interface Chapter {
  id: number;
  titre: string;
  description?: string;
  datePublication: string;
  ordre?: number;
  playlistId: number;
}

// Types pour les éléments adaptés à l'API
interface Element {
  id: number;
  titre: string;
  description?: string;
  lien?: string;
  miniature?: string;
  type: "VIDEO" | "DOCUMENT" | "QCM" | string;
  contenu?: string; // Pour la compatibilité
  duree?: number;
  chapitreId: number;
  dateCreation: string;
}

// Type pour mapper les éléments API vers les éléments UI
type ApiElement = ElementResponse;

const FormationPlayer: React.FC = () => {
  const { playlistId } = useParams<{ playlistId: string }>();
  const navigate = useNavigate();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [elementsByChapter, setElementsByChapter] = useState<{ [key: number]: Element[] }>({});
  const [loading, setLoading] = useState(true);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [currentElement, setCurrentElement] = useState<Element | null>(null);

  // Fonction pour convertir ElementResponse (API) en Element (UI)
  const convertApiElementToUiElement = (apiElement: ApiElement): Element => {
    return {
      id: apiElement.id,
      titre: apiElement.titre,
      description: apiElement.description,
      lien: apiElement.lien,
      miniature: apiElement.miniature,
      type: apiElement.type,
      contenu: apiElement.lien || apiElement.description || "", // Utiliser lien ou description comme contenu
      duree: undefined, // L'API ne fournit pas de durée pour l'instant
      chapitreId: apiElement.chapitreId,
      dateCreation: apiElement.dateCreation
    };
  };

  useEffect(() => {
    if (!playlistId) {
      navigate('/student');
      return;
    }

    const fetchFormationData = async () => {
      try {
        setLoading(true);
        
        // Fetch chapters
        const chaptersData = await getChaptersByPlaylist(Number(playlistId));
        
        // Type assertion et tri si ordre existe
        const typedChapters = chaptersData as unknown as Chapter[];
        const sortedChapters = typedChapters.sort((a, b) => {
          const orderA = a.ordre || 0;
          const orderB = b.ordre || 0;
          return orderA - orderB;
        });
        
        setChapters(sortedChapters);
        
        // Fetch elements for each chapter
        const elementsMap: { [key: number]: Element[] } = {};
        
        for (const chapter of sortedChapters) {
          try {
            const apiElements = await getElementsByChapitre(chapter.id);
            
            // Convertir les éléments API en éléments UI
            const uiElements: Element[] = apiElements.map(convertApiElementToUiElement);
            
            elementsMap[chapter.id] = uiElements;
          } catch (error) {
            console.error(`Error fetching elements for chapter ${chapter.id}:`, error);
            elementsMap[chapter.id] = [];
          }
        }
        
        setElementsByChapter(elementsMap);
        
        // Select first chapter if exists
        if (sortedChapters.length > 0) {
          const firstChapterId = sortedChapters[0].id;
          setSelectedChapter(firstChapterId);
          
          if (elementsMap[firstChapterId]?.length > 0) {
            setCurrentElement(elementsMap[firstChapterId][0]);
          }
        }
      } catch (err) {
        console.error("Error loading formation data:", err);
        alert("Failed to load formation content");
      } finally {
        setLoading(false);
      }
    };

    fetchFormationData();
  }, [playlistId, navigate]);

  const handleChapterSelect = (chapterId: number) => {
    setSelectedChapter(chapterId);
    const elements = elementsByChapter[chapterId];
    if (elements && elements.length > 0) {
      setCurrentElement(elements[0]);
    } else {
      setCurrentElement(null);
    }
  };

  const handleElementSelect = (element: Element) => {
    setCurrentElement(element);
  };

  const handleBackToDashboard = () => {
    navigate('/student');
  };

  const handlePreviousElement = () => {
    if (!selectedChapter || !currentElement) return;
    
    const elements = elementsByChapter[selectedChapter];
    if (!elements) return;
    
    const currentIndex = elements.findIndex(el => el.id === currentElement.id);
    if (currentIndex > 0) {
      setCurrentElement(elements[currentIndex - 1]);
    }
  };

  const handleNextElement = () => {
    if (!selectedChapter || !currentElement) return;
    
    const elements = elementsByChapter[selectedChapter];
    if (!elements) return;
    
    const currentIndex = elements.findIndex(el => el.id === currentElement.id);
    if (currentIndex < elements.length - 1) {
      setCurrentElement(elements[currentIndex + 1]);
    }
  };

  const handleMarkAsComplete = () => {
    if (currentElement) {
      console.log(`Marked element ${currentElement.id} as complete`);
      // Appeler API pour mettre à jour la progression
      handleNextElement();
    }
  };

  // Fonction pour obtenir le contenu à afficher
  const getDisplayContent = (element: Element) => {
    if (element.type === "VIDEO" && element.lien) {
      return element.lien;
    }
    if (element.type === "DOCUMENT" && element.lien) {
      return element.lien;
    }
    if (element.type === "QCM" && element.description) {
      return element.description;
    }
    return element.contenu || element.description || "No content available";
  };

  // Fonction pour obtenir le type d'affichage
  const getDisplayType = (element: Element): 'video' | 'pdf' | 'quiz' | 'text' => {
    switch (element.type) {
      case "VIDEO": return 'video';
      case "DOCUMENT": return 'pdf';
      case "QCM": return 'quiz';
      default: return 'text';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading formation content...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={handleBackToDashboard}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center gap-2 transition-colors"
        >
          ← Back to Dashboard
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          Formation Player - Playlist #{playlistId}
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar - Chapters List */}
        <div className="lg:w-1/4 bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Chapters</h2>
          <div className="space-y-2">
            {chapters.map((chapter) => (
              <div
                key={chapter.id}
                className={`p-3 rounded cursor-pointer transition-colors ${
                  selectedChapter === chapter.id
                    ? 'bg-blue-100 border-l-4 border-blue-500'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => handleChapterSelect(chapter.id)}
              >
                <h3 className="font-medium">{chapter.titre}</h3>
                <p className="text-sm text-gray-500 truncate">{chapter.description || "No description"}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-400">
                    {elementsByChapter[chapter.id]?.length || 0} elements
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(chapter.datePublication).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content - Elements List */}
        <div className="lg:w-1/4 bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">
            {selectedChapter 
              ? chapters.find(c => c.id === selectedChapter)?.titre + " - Elements"
              : "Select a Chapter"
            }
          </h2>
          {selectedChapter && elementsByChapter[selectedChapter] ? (
            <div className="space-y-2">
              {elementsByChapter[selectedChapter].map((element) => {
                const displayType = getDisplayType(element);
                return (
                  <div
                    key={element.id}
                    className={`p-3 rounded cursor-pointer transition-colors ${
                      currentElement?.id === element.id
                        ? 'bg-green-100 border-l-4 border-green-500'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleElementSelect(element)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded ${
                        displayType === 'video' ? 'bg-red-100 text-red-600' :
                        displayType === 'pdf' ? 'bg-blue-100 text-blue-600' :
                        displayType === 'quiz' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {displayType === 'video' ? '▶' :
                         displayType === 'pdf' ? '📄' :
                         displayType === 'quiz' ? '❓' : '📝'}
                      </div>
                      <div>
                        <h4 className="font-medium">{element.titre}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span className="capitalize">{displayType}</span>
                          {element.duree && <span>• {element.duree} min</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              No elements available for this chapter
            </p>
          )}
        </div>

        {/* Element Player/Viewer */}
        <div className="lg:w-2/4 bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">
            {currentElement ? currentElement.titre : "Select an Element"}
          </h2>
          
          {currentElement ? (
            <div className="h-[500px] overflow-y-auto p-4">
              {(() => {
                const displayType = getDisplayType(currentElement);
                const content = getDisplayContent(currentElement);
                
                switch (displayType) {
                  case 'video':
                    return (
                      <div className="aspect-video bg-black rounded-lg mb-4">
                        {currentElement.lien ? (
                          <iframe
                            src={currentElement.lien}
                            className="w-full h-full rounded-lg"
                            title={currentElement.titre}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        ) : (
                          <div className="flex items-center justify-center h-full text-white">
                            <div className="text-center">
                              <div className="text-6xl mb-4">▶</div>
                              <p>Video Content</p>
                              <p className="text-sm text-gray-400 mt-2">
                                {currentElement.description || "No video URL available"}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                    
                  case 'pdf':
                    return (
                      <div className="h-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <div className="text-6xl mb-4">📄</div>
                        <h3 className="text-xl font-semibold mb-2">Document</h3>
                        <p className="text-gray-600 mb-4">
                          {currentElement.description || "Document content"}
                        </p>
                        {currentElement.lien && (
                          <a
                            href={currentElement.lien}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                          >
                            Open Document
                          </a>
                        )}
                      </div>
                    );
                    
                  case 'quiz':
                    return (
                      <div className="h-full p-6">
                        <div className="text-4xl mb-6 text-center">❓</div>
                        <h3 className="text-xl font-semibold mb-4">Quiz</h3>
                        <p className="mb-6">{currentElement.description || "Quiz content"}</p>
                        <div className="space-y-3">
                          {['Option A', 'Option B', 'Option C', 'Option D'].map((opt, idx) => (
                            <div key={idx} className="p-3 border rounded hover:bg-gray-50 cursor-pointer">
                              {opt}
                            </div>
                          ))}
                        </div>
                        <div className="mt-6">
                          <button className="w-full px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded">
                            Submit Answer
                          </button>
                        </div>
                      </div>
                    );
                    
                  default:
                    return (
                      <div className="h-full p-6">
                        <div className="text-4xl mb-6">📝</div>
                        <h3 className="text-xl font-semibold mb-4">Content</h3>
                        <div className="prose max-w-none">
                          {content.split('\n').map((line, idx) => (
                            <p key={idx} className="mb-4">{line}</p>
                          ))}
                        </div>
                      </div>
                    );
                }
              })()}
              
              <div className="mt-6 pt-4 border-t flex justify-between">
                <button 
                  onClick={handlePreviousElement}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                  disabled={!selectedChapter || !currentElement}
                >
                  Previous
                </button>
                <button 
                  onClick={handleMarkAsComplete}
                  className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded transition-colors"
                  disabled={!currentElement}
                >
                  Mark as Complete
                </button>
                <button 
                  onClick={handleNextElement}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                  disabled={!selectedChapter || !currentElement}
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
            <div className="h-[500px] flex items-center justify-center text-gray-500">
              Select an element from the list to start learning
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-8 bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">Progress</span>
          <span className="text-sm text-gray-500">25% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '25%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default FormationPlayer;