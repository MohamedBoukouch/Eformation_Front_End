// src/services/playlistService.ts

export interface PlaylistData {
  profId: number;
  title: string;
  description: string;
  visibility: string;
  miniature?: string | null; // string, not File
}

// Create a new playlist
export const createPlaylist = async (data: PlaylistData) => {
  const response = await fetch("http://localhost:8080/api/playlists/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      profId: data.profId,
      title: data.title,
      description: data.description,
      visibility: data.visibility,
      miniature: data.miniature || null,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(err || "Failed to create playlist");
  }

  return response.json();
};

// Fetch all playlists for a specific professor
export const fetchPlaylistsByProfId = async (profId: number): Promise<any[]> => {
  try {
    const response = await fetch(`http://localhost:8080/api/playlists/by-prof/${profId}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch playlists");
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "An error occurred while fetching playlists");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

// Fetch a single playlist by its ID
export const fetchPlaylistById = async (playlistId: number) => {
  try {
    const response = await fetch(`http://localhost:8080/api/playlists/${playlistId}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch playlist");
    }

    const data = await response.json();
    return data; // Returns single playlist object
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "An error occurred while fetching the playlist");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

// Update an existing playlist
export const updatePlaylist = async (id: number, data: PlaylistData) => {
  const response = await fetch(`http://localhost:8080/api/playlists/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      profId: data.profId,
      title: data.title,
      description: data.description,
      visibility: data.visibility,
      miniature: data.miniature || null,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(err || "Failed to update playlist");
  }

  return response.json();
};

// 🟢 Delete playlist by ID
export const deletePlaylist = async (id: number) => {
  const response = await fetch(`http://localhost:8080/api/playlists/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(err || "Failed to delete playlist");
  }

  // Expect plain text message like "Playlist deleted successfully"
  return response.text();
};