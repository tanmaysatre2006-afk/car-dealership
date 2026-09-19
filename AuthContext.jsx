import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const ADMIN_EMAIL = "admin@germanmotors.com";
const ADMIN_PASSWORD = "admin123";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { role: 'admin'|'user', name, email }

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("session") || "null");
    if (session) setUser(session);
  }, []);

  const login = ({ email, password }) => {
    // Admin login
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const session = { role: "admin", name: "Admin", email };
      localStorage.setItem("session", JSON.stringify(session));
      setUser(session);
      return { ok: true, role: "admin" };
    }

    // User login
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) return { ok: false, message: "Invalid email or password" };

    const session = { role: "user", name: found.name, email: found.email };
    localStorage.setItem("session", JSON.stringify(session));
    setUser(session);
    return { ok: true, role: "user" };
  };

  const signup = ({ name, email, password }) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const exists = users.some((u) => u.email === email);
    if (exists) return { ok: false, message: "Email already registered" };

    const newUser = { id: String(Date.now()), name, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    const session = { role: "user", name, email };
    localStorage.setItem("session", JSON.stringify(session));
    setUser(session);

    return { ok: true, role: "user" };
  };

  const logout = () => {
    localStorage.removeItem("session");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}