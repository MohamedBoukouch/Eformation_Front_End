export interface LoginData {
  email: string;
  password: string;
}

export interface UserData {
  fullName: string;
  email: string;
  role: string;
  token: string;
  profVerified: boolean;
}

export const loginUser = async (data: LoginData): Promise<UserData> => {
  const response = await fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message || "Login failed");
  }

  return json; // returns UserData
};
