import { createContext, useContext, useState, ReactNode } from "react";
import { getUserRoleFromToken } from "../utils/auth";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  error: string | null;
  setError: (message: string | null) => void;
  role: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState<string | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem("token");
  });

  const [role, setRole] = useState<string | null>(() => {
    const token = localStorage.getItem("token");
    return token ? getUserRoleFromToken(token) : null;
  });

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        if (token) {
          localStorage.setItem("token", token);
          setIsAuthenticated(true);
          setRole(getUserRoleFromToken(token));
          setError(null);
          return true;
        } else {
          setError("Token no recibido");
          return false;
        }
      } else {
        const message = await response.text();
        setError(message || "Error al iniciar sesión");
        return false;
      }
    } catch (error) {
      setError("Login failed");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, error, setError, role }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error(" ");
  return context;
};
