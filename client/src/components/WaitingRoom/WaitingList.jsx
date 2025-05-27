
const BASE_URL = "http://localhost:3003";
const WaitingList = ({ players, gameCode, onRemove}) => {

  return (
    <section className="waiting-list">
      {players.map((player) => (
        <div key={player._id} className="player-card">
          <img src={BASE_URL + player.avatar} alt="avatar" className="avatar" />
          <p>{player.nick}</p>
          <button className="remove-player" onClick={onRemove(player._id)}>Remove</button>
        </div>
      ))}
    </section>
  );
};

export default WaitingList;
