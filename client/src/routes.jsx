import { createBrowserRouter } from "react-router-dom";
import WaitingRoomPage from "./components/WaitingRoomPage.jsx";

// Carga datos dummy
function getAllAvatars() {
  const avatars = [];
  for (let i = 0; i < 10; i++) {
    avatars.push({
      idAvatar: i,
      avatarUrl: `/src/assets/avatars/avatar (${i+1}).svg`,
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
    element: (
      <WaitingRoomPage
        players={players}
        avatars={avatars}
        socket={socket}
        loggedPlayer={loggedPlayer}
      />
    ),
  },
]);

export default router;
