
const BASE_URL = "http://localhost:3003";
const WaitingList = ({ players, gameCode, onRemove}) => {

  return (
    <section className="waiting__list__wrapper">
      {players && players.map((player) => (
        <div key={player._id} className="player__card">
          <img src={BASE_URL + player.avatar} alt="avatar" className="avatar" />
          <p>{player.nick}</p>
          <button className="remove__player__button" onClick={onRemove(player._id)}>Remove</button>
        </div>
      ))}
    </section>
  );
};

export default WaitingList;
