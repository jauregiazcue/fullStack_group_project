import WaitingRoom from "./WaitingRoom.jsx";
import "./waitingRoom.css";


const socket = null; // Pendiente de implementación con sockets

// BORRAR
// crear de forma artificial el player logueado hasta usar sockets
const loggedPlayer = {
  idPlayer: 0,
  idUser: 0,
  nick: `Player0`,
  avatar: {
    idAvatar: 0,
    used: true,
    avatarUrl: "/src/assets/avatars/avatar (01).svg"
  }
};
const players=[loggedPlayer];

function WaitingRoomPage() {
  return (
    <section>
      <WaitingRoom
        players={players}
        socket={socket}
        loggedPlayer={loggedPlayer}
      />
    </section>
  );
}

export default WaitingRoomPage;
