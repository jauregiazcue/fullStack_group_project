
const BASE_URL = "http://localhost:3000";
const WaitingList = ({ players, gameCode, onRemove}) => {
  console.log("Players");
  console.log(players);
  return (
    <section className="waiting-list">
      {players && players.map((player) => (
        <div key={player._id} className="player-card">
          <img src={BASE_URL + player.avatar} alt="avatar" className="avatar" />
          <p>{player.nickname}</p>
          <button className="remove-player" onClick={() => onRemove(player._id)}>Remove</button>
        </div>
      ))}
    </section>
  );
};

export default WaitingList;
