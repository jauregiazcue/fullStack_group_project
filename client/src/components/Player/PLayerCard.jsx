import Avatar from "../Avatar/Avatar";

function PlayerCard({viewProps, side}) {
    return (
        {
        side=="down" ? (
            <section className="player-card__down">
                <Avatar {viewProps.avatarImageUrl}>
                {viewProps.forEach(prop) => {prop}} 
            </section>
        ) : (
            <section className="player-card__right">
                <Avatar {viewProps.avatarImageUrl}>
                {viewProps.forEach(prop) => {prop}} 
            </section>
        }
    )
}

export default PlayerCard;