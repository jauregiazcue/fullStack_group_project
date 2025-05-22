// App.jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider, AuthContext } from "./components/authContext/AuthContext";
import { useContext } from "react";
import JoinGameButton from "./components/joinGameButton/JoinGameButton";
import MakeGameForm from "./components/makeGameForm/MakeGameForm";
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
        <span>{token && <Link to="/create">Create game!</Link>}</span>
      </nav>
      <main>
        <Routes>
          <Route path="/create" element={<MakeGameForm/>} />
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