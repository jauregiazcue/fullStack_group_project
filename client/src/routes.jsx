import { createBrowserRouter } from "react-router-dom";
import GameManager from "./pages/game/GameManager.jsx";

import Login from "./pages/auth/Login";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
          <Login />
          <GameManager />
      </>
    ),
  },
]);

export default router;
