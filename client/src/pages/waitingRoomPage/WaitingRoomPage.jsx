import WaitingRoom from "../../components/waitingRoom/WaitingRoom.jsx";
// import { useEffect } from "react";

function WaitingRoomPage({ loggedUser, socket, players, avatars }) {
  // useEffect(() => {
    // const loadData = async () => {
    //   DESCOMENTAR CUANDO TENGAMOS LAS RUTAS OPERATIVAS
    //   const avatars = await fetch("/api/getAvatars");
    //   const players = await fetch("/api/getPlayers");
    //   const player = await fetch("/api/getCurrentPlayer");

    //   setPlayer(player);
    // };
    // loadData();
  // }, []);

  // Página de presupuestos
  function WaitingRoomPage() {
    return (
      <section>
        <WaitingRoom
          loggedUser={loggedUser}
          socket={socket}
          players={players}
          avatars={avatars}
        />
      </section>
    );
  }
}
export default WaitingRoomPage;
