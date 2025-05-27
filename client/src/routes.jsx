import { createBrowserRouter } from "react-router-dom";
// import WaitingRoomPage from "./components/WaitingRoom/WaitingRoomPage.jsx";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider, AuthContext } from "./components/authContext/AuthContext";

// import Game from "./pages/game/Game.jsx";
// import GameManager from "./pages/game/GameManager.jsx";

// import Login from "./pages/auth/Login";

import FinalPage from "./pages/game/finalPage/FinalPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <FinalPage idGame={1} />
          {/* <Login />
          <GameManager /> */}
      </>
    ),
  },
]);

export default router;
