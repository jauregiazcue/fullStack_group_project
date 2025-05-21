import "./WaitingRoom.css";
// import { useState } from "react";
// import {useLoaderData} from "react-router-dom";
import WaitingList from "./WaitingList";
import AvatarSelector from "../Avatar/AvatarSelector";


function WaitingRoom(loggedUser, socket, players, avatars) {

  // Paso por Loader
  // const [players, setPlayers] = useState([]);
  // const [avatars, setAvatars] = useState([]);

  // setPlayers(useLoaderData("players"));
  // setAvatars(useLoaderData("avatars"));

  // useEffect(() => {
  //   setPlayers(players);
  // }, [players]);

  // useEffect(() => {
  //   setAvatars(loaderAvatars);
  // }, [avatars]);


  //manejador cuando un usuario entra a la sala de espera

  return (
    <section className="waiting-room__container">
      <section className="waiting-list__container">
        <h1>Waiting Room</h1>
        <WaitingList
          loggedUser={loggedUser}
          socket={socket}
          players={players}
          avatars={avatars}
        />
      </section>
      <section className="avatar-selector__container">
        <h1>Select your avatar</h1>
        <AvatarSelector
          loggedUser={loggedUser}
          socket={socket}
          avatars={avatars}
        />
      </section>
    </section>
  );
}


export default WaitingRoom;
