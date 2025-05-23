import { createBrowserRouter } from "react-router-dom";
import WaitingRoomPage from "./components/WaitingRoom/WaitingRoomPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <WaitingRoomPage />
    ),
  },
]);

export default router;
