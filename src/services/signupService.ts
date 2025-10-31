
export interface SignupData {
  fullName: String,
  email: string;
  password: string;
  role: String;
  uniquePath: String
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
    throw new Error(errorText || "signup failed");
  }

  return response.json(); // returns user info
};
