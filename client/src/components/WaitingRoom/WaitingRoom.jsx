import "./WaitingRoom.css";
import { useState } from "react";
import {useLoaderData} from "react-router-dom";
import WaitingList from "./WaitingList";
import AvatarSelector from "../Avatar/AvatarSelector";

function WaitingRoom() {
  const [players, setPlayers] = useState([]);
  const [avatars, setAvatars] = useState([]);

  const useEffect(() => {
    setPlayers(players);
  }, [players]);

  const useEffect(() => {
    setAvatars(loaderAvatars);
  }, [avatars]);
  //manejador cuando un usuario entra a la sala de espera

  return (
    <section className="waiting-room__container">
      <section className="waiting-list__container">
        <h1>Waiting Room</h1>
        <WaitingList players={players}/>
      </section>
      <section className="avatar-selector__container">
        <h1>Select your avatar</h1>
        <AvatarSelector player={player} setPlayer={setPlayer} avatars={avatars} /> {/*???: si AvatarSelector necesita un player solo, como se lo paso si aqui tengo el array con todos*/}
      </section>
    </section>
  )
}

export default WaitingRoom;
