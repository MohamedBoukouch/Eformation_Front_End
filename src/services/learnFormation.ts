export interface LearnPlaylistRequest {
  studentId: number;
  playlistId: number;
}

export interface LearnPlaylistResponse {
  id: number;
  verified: boolean;
  student: {
    id: number;
    fullName: string;
    email: string;
  };
  playlist: {
    id: number;
    titre: string;
    description: string;
  };
  professor: {
    id: number;
    fullName: string;
    email: string;
  };
}

// API: Student requests access
export const requestAccess = async (data: LearnPlaylistRequest) => {
  const response = await fetch(
    "http://localhost:8080/api/learn-playlist/request-access",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) throw new Error(await response.text());
  return response.json() as Promise<LearnPlaylistResponse>;
};

// API: Professor fetches students
export const getAllStudentsByProfessor = async (profId: number) => {
  const response = await fetch(
    `http://localhost:8080/api/learn-playlist/prof/${profId}/students`,
    { headers: { Accept: "application/json" } }
  );

  if (!response.ok) throw new Error("Failed to fetch students");
  return response.json() as Promise<LearnPlaylistResponse[]>;
};

// API: Verify student
export const verifyStudent = async (
  learnPlaylistId: number,
  verified: boolean
) => {
  const response = await fetch(
    `http://localhost:8080/api/learn-playlist/${learnPlaylistId}/verify`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ verified }),
    }
  );

  if (!response.ok) throw new Error("Failed to verify student");
  return response.json() as Promise<LearnPlaylistResponse>;
};

// API: Delete student
export const deleteStudentFromPlaylist = async (learnPlaylistId: number) => {
  const response = await fetch(
    `http://localhost:8080/api/learn-playlist/delete/${learnPlaylistId}`,
    { method: "DELETE", headers: { Accept: "application/json" } }
  );

  if (!response.ok) throw new Error("Failed to delete student");
  return response.json() as Promise<{ message: string }>;
};

// API: Send invitation
export interface SendInvitationRequest {
  studentEmail: string;
  studentName: string;
  loginLink: string;
  playlistId: number;
  professorId: number;
}

export const sendInvitation = async (data: SendInvitationRequest) => {
  const response = await fetch("http://localhost:8080/api/learn-playlist/invite", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error(await response.text());
  const result = await response.json();
  return {
    message: result.message || `Invitation sent successfully to ${data.studentEmail}`,
  };
};

// --- NEW API: Fetch playlists by student ---
export interface StudentPlaylist {
  studentId: number;
  studentName: string;
  studentEmail: string;
  playlistId: number;
  playlistTitle: string;
  verified: boolean;
  inProgress?: boolean;
}

export const getPlaylistsByStudent = async (studentId: number) => {
  const response = await fetch(
    `http://localhost:8080/api/learn-playlist/student/${studentId}/playlists`,
    { headers: { Accept: "application/json" } }
  );

  if (!response.ok) throw new Error("Failed to fetch student playlists");
  return response.json() as Promise<StudentPlaylist[]>;
};
