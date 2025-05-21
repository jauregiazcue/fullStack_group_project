import { createBrowserRouter } from "react-router-dom";
import AvatarList from "./startFromScratch/AvatarList.jsx";

// Carga datos dummy
function getAllAvatars() {
  const avatars = [];
  for (let i = 1; i <= 30; i++) {
    avatars.push({
      idAvatar: i,
      avatarUrl: `/src/assets/avatar (${i}).svg`,
    });
  }
  return avatars;
}

function getAllPlayers() {
  const players = [];
  for (let i = 1; i <= 5; i++) {
    players.push({
      idPlayer: i,
      userId: i,
      nick: `Player${i}`,
      avatarUrl: `../assets/icons/avatar (${i}).svg`,
    });
  }
  return players;
}

const avatars = getAllAvatars();
const players = getAllPlayers();

// function waitingRoomLoader() {
//   return { avatars, players };
// }

const socket="http://192.168.1.130:3002";

const player=players[0];


const router = createBrowserRouter([
  {
    path: "/waitingRoom",
    element: <AvatarList avatars={avatars} />,
  }
]);

export default router;
