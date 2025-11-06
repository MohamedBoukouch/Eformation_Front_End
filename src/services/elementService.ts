// services/elementService.ts

export interface CreateElementData {
    titre: string;
    description?: string;
    lien?: string;       // video/document URL as string
    miniature?: string;  // thumbnail URL as string
    type: "VIDEO" | "DOCUMENT" | "QCM";
    chapitreId: number;
  }
  
  export interface ElementResponse {
    id: number;
    titre: string;
    description?: string;
    lien?: string;
    miniature?: string;
    type: "VIDEO" | "DOCUMENT" | "QCM";
    chapitreId: number;
    dateCreation: string;
  }
  
  // CREATE ELEMENT
  export const createElement = async (data: CreateElementData): Promise<ElementResponse> => {
    const response = await fetch("http://localhost:8080/api/elements/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to create element");
    }
  
    return response.json();
  };
  
  // FETCH ELEMENTS BY CHAPITRE
  export const getElementsByChapitre = async (chapitreId: number): Promise<ElementResponse[]> => {
    const response = await fetch(`http://localhost:8080/api/elements/chapitre/${chapitreId}`);
  
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to fetch elements");
    }
  
    return response.json();
  };
  