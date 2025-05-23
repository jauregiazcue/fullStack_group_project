import { createBrowserRouter } from "react-router-dom";
import WaitingRoomPage from "./components/WaitingRoom/WaitingRoomPage.jsx";
import MakeGameForm from "./components/makeGameForm/MakeGameForm";
import App from "./App.jsx";

// Carga datos dummy
function getAllAvatars() {
  const avatars = [];
  for (let i = 0; i < 10; i++) {
    const index = String(i + 1).padStart(2, '0');
    const avatarUrl = `/src/assets/avatars/avatar (${index}).svg`;
    avatars.push({
      idAvatar: i,
      avatarUrl: avatarUrl,
    });
  }
  return avatars;
}

function getAllPlayers() {
  const players = [];
  const avatars=getAllAvatars();
  for (let i = 0; i <= 0; i++) {
    players.push({
      idPlayer: i,
      idUser: i,
      nick: `Player${i}`,
      avatar: avatars[i],
    });
  }
  return players;
}

const avatars = getAllAvatars();
const players = getAllPlayers();

const socket=null; // pendiente de implementar con sockets


const loggedPlayer = players[0];

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "create", element: <MakeGameForm /> }
    ]
  }
]);

export default router;
