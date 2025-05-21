// import PlayerCard from "../Player/PlayerCard";
// import { useEffect } from "react";

// Muestra una cuadricula con los jugadores que se han añadido al lobby
const WaitingList = ({ players }) => {
  return (
    <div className="waiting-list">
      {players.map((player) => (
        <div key={player.idPlayer} className="player-card">
          <img src={player.avatar.avatarUrl} alt="avatar" className="avatar" />
          <p>{player.nick}</p>
        </div>
      ))}
    </div>
  );
};

export default WaitingList;

// function WaitingList({ loggedUser, socket, players, avatars }) {
//   // const [players, setPlayers] = useState([]);
//   // const player = context.player;
  
//   //cambiar el avatar del jugador cuando es seleccionado en AvatarSelector
//   useEffect(
//     (avatar) => {
//       loggedUser.avatarImageUrl = avatar.avatarImageUrl;
//     },
//     [loggedUser]
//   );

//   //extraer todos los players excepto el del usuario logeado
//   const filteredPlayers = players.filter((player) => player !== loggedUser);

//   //mostrar el avatar y su nick
//   return (
//     <section className="waiting-list">
//       {filteredPlayers.map((player) => (
//         <PlayerCard
//           key={player.idPlayer}
//           socket={socket}
//           viewProps={{
//             nick: player.nick,
//             avatarImageUrl: player.avatarImageUrl,
//           }}
//           side="down"
//         />
//       ))}
//     </section>
//   );
// }
// export default WaitingList;
