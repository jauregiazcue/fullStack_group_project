
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
