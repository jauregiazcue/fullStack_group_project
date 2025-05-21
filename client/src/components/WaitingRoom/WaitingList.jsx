import PlayerCard from "../Player/PlayerCard";
import { useEffect } from "react";

function WaitingList({ loggedUser, socket, players, avatars }) {
  // const [players, setPlayers] = useState([]);
  // const player = context.player;
  
  //cambiar el avatar del jugador cuando es seleccionado en AvatarSelector
  useEffect(
    (avatar) => {
      loggedUser.avatarImageUrl = avatar.avatarImageUrl;
    },
    [loggedUser]
  );

  //extraer todos los players excepto el del usuario logeado
  const filteredPlayers = players.filter((player) => player !== loggedUser);

  //mostrar el avatar y su nick
  return (
    <section className="waiting-list">
      {filteredPlayers.map((player) => (
        <PlayerCard
          key={player.idPlayer}
          socket={socket}
          viewProps={{
            nick: player.nick,
            avatarImageUrl: player.avatarImageUrl,
          }}
          side="down"
        />
      ))}
    </section>
  );
}

export default WaitingList;
