export interface Pack {
    id: number;
    type: string;
    description: string;
    old_price?: number;
    new_price?: number;
    count_playlst: number;
    features: string[];
  }
  
  export const fetchAllPacks = async (): Promise<Pack[]> => {
    try {
      const response = await fetch("http://localhost:8080/api/packs/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
  
      if (!response.ok) {
        const text = await response.text();
        console.error("Fetch packs error:", text);
        throw new Error(text || "Failed to fetch packs");
      }
  
      const data: Pack[] = await response.json();
      console.log("Fetched packs:", data);
      return data;
    } catch (err) {
      console.error("Error fetching packs:", err);
      throw err;
    }
  };
  