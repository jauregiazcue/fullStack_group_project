import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("authToken") || null;
  })
  const [nickname, setNickname] = useState(() => {
    return localStorage.getItem("nickname") || null;
  })
  const [email, setEmail] = useState(() => {
    return localStorage.getItem("email") || null;
  })

  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }

    if (nickname) {
      localStorage.setItem("nickname", nickname);
    } else {
      localStorage.removeItem("nickname");
    }

    if (email) {
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("email");
    }
  }, [token, nickname, email]);

  return (
    <AuthContext.Provider value={{ token, setToken, nickname, setNickname, email, setEmail }}>
      {children}
    </AuthContext.Provider>
  );
}
