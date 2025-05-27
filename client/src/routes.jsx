import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/home/Home";
import Join from "./pages/game/joinPage/Join";
import WaitingRoom from "./pages/game/waitingRoom/WaitingRoom";
import GameManager from "./pages/game/GameManager";

import { Outlet } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Outlet/>
      </>
    ),
    children: [
      {
        path: "/home",
        element: <Home/>
      },
      {
        path: "/join",
        element: <Join/>
      },
      {
        path: "/waiting/:gameId",
        element: <WaitingRoom/>
      },
      {
        path: "/game/:gameId",
        element: <GameManager/>
      }
    ],
  },
]);

export default router;