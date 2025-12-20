// services/signupService.ts
export interface SignupData {
  fullName: string;
  email: string;
  password: string;
  role: "PROFESSEUR"; // always professor
  uniquePath: string;
  packId: number;
}

export const signupUser = async (data: SignupData) => {
  const response = await fetch("http://localhost:8080/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Signup failed");
  }

  return response.json(); // returns signup info
};
