import { createContext, ReactNode, useState } from "react";

interface User {
  username: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (username: string, email: string, password: string) => void;
}

// Create Context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    // Simulate authentication
    // In a real application, you'd verify credentials with a server
    setUser({ username: "User", email, password });
  };

  const logout = () => {
    setUser(null);
  };

  const register = (username: string, email: string, password: string) => {
    // Simulate a registration process
    setUser({ username, email, password });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
