import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const ADMIN_EMAIL = "admin@germanmotors.com";
const ADMIN_PASSWORD = "admin123";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const session = JSON.parse(localStorage.getItem("session") || "null");
      if (session) setUser(session);
    } catch (_) {}
  }, []);

  const login = (email, password, name = "User") => {
    const role =
      email === ADMIN_EMAIL && password === ADMIN_PASSWORD ? "admin" : "user";

    const session = { role, name, email };
    setUser(session);
    localStorage.setItem("session", JSON.stringify(session));
    return session;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("session");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// IMPORTANT: hook MUST be a function like this
export function useAuth() {
  return useContext(AuthContext);
}
