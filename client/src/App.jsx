// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, AuthContext } from "./components/authContext/AuthContext";
import { useContext } from "react";
import JoinGameButton from "./components/joinGameButton/JoinGameButton";
import Login from "./pages/auth/Login";
// asdasd2@asd.com

function AppContent() {
  const { token, nickname, email } = useContext(AuthContext);
  return (
    <>
      <nav>
        <h1>Erraton</h1>
          {nickname ? <p>Logeado como {nickname} !</p> : <Login />}
        <JoinGameButton/>
        <p>El token es: {token}</p>
      </nav>
      <main>
        <Routes>
          <Route path="/create" element={<h1>Home</h1>} />
        </Routes>
      </main>
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