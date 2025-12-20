export interface Pack {
    id: number;
    type: string;
    description: string;
    old_price: number;
    new_price: number;
    count_playlst: number;
    features: string[];
  }
  
  export const fetchAllPacks = async (): Promise<Pack[]> => {
    const response = await fetch("http://localhost:8080/api/packs/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to fetch packs");
    }
  
    return response.json();
  };
  