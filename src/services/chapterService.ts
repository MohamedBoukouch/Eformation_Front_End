export interface ChapterData {
    titre: string;
    playlistId: number;
  }
  
  export interface ChapterResponse {
    id: number;
    titre: string;
    datePublication: string;
    playlistId: number;
  }
  

//ADD ChAPITRE
  export const createChapter = async (data: ChapterData): Promise<ChapterResponse> => {
    const response = await fetch("http://localhost:8080/api/chapitres/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to create chapter");
    }
  
    return response.json();
  };

//FETCH THE CHAPITRES
export const getChaptersByPlaylist = async (playlistId: number) => {
    const response = await fetch(`http://localhost:8080/api/chapitres/playlist/${playlistId}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to fetch chapters");
    }
  
    return response.json(); // returns array of chapters
  };


// services/chapterService.ts
export const deleteChapter = async (chapterId: number) => {
    const response = await fetch(`http://localhost:8080/api/chapitres/delete/${chapterId}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete chapter");
    return response.text();
  };
  
//UPDATE
  export const updateChapter = async (chapterId: number, data: { titre: string; playlistId: number }) => {
    const response = await fetch(`http://localhost:8080/api/chapitres/update/${chapterId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update chapter");
    return response.json();
  };
  