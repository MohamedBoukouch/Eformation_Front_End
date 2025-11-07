// src/api/learnFormation.ts

export interface LearnPlaylistRequest {
    studentId: number;
    playlistId: number;
    professorId: number;
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
  
  /**
   * 🔹 Student requests access to a playlist
   */
  export const requestAccess = async (data: LearnPlaylistRequest) => {
    const response = await fetch("http://localhost:8080/api/learn-playlist/request-access", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to request access");
    }
  
    return response.json() as Promise<LearnPlaylistResponse>;
  };
  
  /**
   * 🔹 Professor fetches all students (linked to him)
   */
  export const getAllStudentsByProfessor = async (profId: number) => {
    const response = await fetch(`http://localhost:8080/api/learn-playlist/prof/${profId}/students`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
  
    if (!response.ok) throw new Error("Failed to fetch students");
    return response.json() as Promise<LearnPlaylistResponse[]>;
  };
  
  /**
   * 🔹 Professor fetches pending students
   */
  export const getPendingStudents = async (profId: number) => {
    const response = await fetch(`http://localhost:8080/api/learn-playlist/prof/${profId}/students/pending`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
  
    if (!response.ok) throw new Error("Failed to fetch pending students");
    return response.json() as Promise<LearnPlaylistResponse[]>;
  };
  
  /**
   * 🔹 Professor fetches verified students
   */
  export const getVerifiedStudents = async (profId: number) => {
    const response = await fetch(`http://localhost:8080/api/learn-playlist/prof/${profId}/students/verified`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
  
    if (!response.ok) throw new Error("Failed to fetch verified students");
    return response.json() as Promise<LearnPlaylistResponse[]>;
  };
  
  /**
   * 🔹 Professor verifies a student's access request
   */
  export const verifyStudent = async (learnPlaylistId: number, verified: boolean) => {
    const response = await fetch(`http://localhost:8080/api/learn-playlist/${learnPlaylistId}/verify`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ verified }),
    });
  
    if (!response.ok) throw new Error("Failed to verify student");
    return response.json() as Promise<LearnPlaylistResponse>;
  };
  
  /**
   * 🔹 Professor deletes a student from a playlist
   */
  export const deleteStudentFromPlaylist = async (learnPlaylistId: number) => {
    const response = await fetch(`http://localhost:8080/api/learn-playlist/delete/${learnPlaylistId}`, {
      method: "DELETE",
      headers: { Accept: "application/json" },
    });
  
    if (!response.ok) throw new Error("Failed to delete student");
    return response.json() as Promise<{ message: string }>;
  };
  
  /**
   * 🔹 Professor sends an invitation email to a student
   */
  export interface SendInvitationRequest {
    studentEmail: string;
    playlistId: number;
    professorId: number;
  }
  
  export const sendInvitation = async (data: SendInvitationRequest) => {
    try {
      const response = await fetch(`http://localhost:8080/api/learn-playlist/invite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to send invitation");
      }
  
      // Parse response as JSON
      const result = await response.json();
      
      // Ensure we return a proper message
      return { message: result.message || `Invitation sent successfully to ${data.studentEmail}` };
    } catch (error: any) {
      throw new Error(error.message || "Failed to send invitation");
    }
  };
  