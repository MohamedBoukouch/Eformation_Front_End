// src/services/signupService.ts
export interface SignupData {
    fullName: string;
    email: string;
    password: string;
    role: "ETUDIANT" | "PROFESSEUR";
    uniquePath?: string;
  }
  
  export interface SignupResponse {
    id: number;
    fullName: string;
    email: string;
    role: string;
    codeOtp: string;
    active: boolean;
    uniquePath?: string;
    verifiedByAdmin: boolean;
  }
  
  export const signupUser = async (data: SignupData): Promise<SignupResponse> => {
    const response = await fetch("http://localhost:8080/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Signup failed: ${errText}`);
    }
  
    return response.json();
  };
  