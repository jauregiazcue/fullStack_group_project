// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, AuthContext } from "./components/authContext/AuthContext";
import { useContext } from "react";

import Login from "./pages/auth/Login";
// asdasd2@asd.com

function AppContent() {
  const { token, nickname, email } = useContext(AuthContext);
  return (
    <>
      <nav>
        <h1>Erratón</h1>
          {nickname ? <p>Logeado como {nickname} !</p> : <Login />}
        <p>El token es: {token}</p>
      </nav>
    </>
  );
}

function App() {
  return (
  <BrowserRouter>
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  </BrowserRouter>
  );
}

export default App;