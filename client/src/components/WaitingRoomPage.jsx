import WaitingRoom from "./WaitingRoom.jsx";
import "./WaitingRoom/waitingRoom.css";
function WaitingRoomPage({ players, avatars, socket, loggedPlayer }) {
  return (
    <section>
      <WaitingRoom
        players={players}
        avatars={avatars}
        socket={socket}
        loggedPlayer={loggedPlayer}
      />
    </section>
  );
}

export default WaitingRoomPage;
