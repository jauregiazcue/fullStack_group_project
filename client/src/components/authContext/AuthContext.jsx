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
  const [_id, set_id] = useState(() => {
    return localStorage.getItem("_id") || null;
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
    if (_id) {
      localStorage.setItem("_id", _id);
    } else {
      localStorage.removeItem("_id");
    }
  }, [token, nickname, email, _id]);

  return (
    <AuthContext.Provider value={{ token, setToken, nickname, setNickname, email, setEmail, _id, set_id }}>
      {children}
    </AuthContext.Provider>
  );
}
