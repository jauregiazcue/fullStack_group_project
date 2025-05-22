import './App.css'
import "@fontsource/fredoka";
import "@fontsource/baloo-2";
import JoinGameButton from './components/joinGameButton/JoinGameButton';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, AuthContext } from './components/authContext/AuthContext';
import Login from './pages/auth/Login';
import { useContext } from 'react';
function AppContent() {
  const { token, nickname, email } = useContext(AuthContext);
  return (
    <>
      <nav>
        <h1>Erraton</h1>
          {nickname ? <p>Logeado como {nickname} !</p> : <Login />}
            <JoinGameButton nickname={nickname}/>
        <p>El token es: {token}</p>
        <main>
          <Routes>
            <Route path="/create" element={<Register />} />
          </Routes>
        </main>
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