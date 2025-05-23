import WaitingRoom from "./WaitingRoom.jsx";
import "./waitingRoom.css";


// Carga datos dummy
function getAllPlayers() {
  const players = [];
  for (let i = 0; i <= 0; i++) {
    players.push({
      idPlayer: i,
      idUser: i,
      nick: `Player${i}`,
      avatar: `/src/assets/avatars/avatar (${i}).svg`
    });
  }
  return players;
}

const players = getAllPlayers();

const socket=null; // pendiente de implementar con sockets


const loggedPlayer = players[0];


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
