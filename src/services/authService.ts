
export interface LoginData {
    email: string;
    password: string;
  }
  
  export const loginUser = async (data: LoginData) => {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Login failed");
    }
  
    return response.json(); // returns user info
  };
  