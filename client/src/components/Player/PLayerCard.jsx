import Avatar from "../Avatar/Avatar";

// Muestra el Avatar junto con los datos que se le pasen, debajo o a la derecha, segun side
function PlayerCard({ key, socket, viewProps, side }) {
  const { avatarImageUrl, ...otherProps } = viewProps;

  return (
    <section className={side === "down" ? "player-card__down" : "player-card__right"}>
      <Avatar imageUrl={avatarImageUrl} />
      {Object.entries(otherProps).map(([key, value]) => (
        <div key={key}>{value}</div>
      ))}
    </section>
  );
}



export default PlayerCard;