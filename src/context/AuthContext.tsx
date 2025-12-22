import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

/* =======================
   User model
======================= */
export interface UserData {
  id: number;
  fullName: string;
  email: string;
  role: string; // <-- change from "ETUDIANT" | "PROFESSEUR" to string
  token: string;
  profVerified: boolean;
}

/* =======================
   Context type
======================= */
interface AuthContextType {
  user: UserData | null;
  login: (userData: UserData) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

/* =======================
   Context
======================= */
export const AuthContext = createContext<AuthContextType | null>(null);

/* =======================
   Provider
======================= */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);

  /* 🔹 Load user from localStorage on app start */
  useEffect(() => {
    const savedUser = localStorage.getItem("authUser");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Invalid authUser in localStorage");
        localStorage.removeItem("authUser");
      }
    }
  }, []);

  /* 🔹 Login */
  const login = (userData: UserData) => {
    setUser(userData);
    localStorage.setItem("authUser", JSON.stringify(userData));
  };

  /* 🔹 Logout */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  const isLoggedIn = Boolean(user);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
