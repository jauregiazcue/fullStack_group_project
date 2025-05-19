import PlayerCard from "../Player/PlayerCard";
//Componente que le da la funcionalidad de seleccion a AvatarList
function WaitingList ({players}) {
    const context=useContext(authContext);
    const player=context.player;
    const useEffect = () => {
        //cambiar el avatar del jugador cuando es seleccionado en AvatarSelector
    }[player]; //???: no se de que hacerlo depender para que al seleccionar el avatar en AvatarSelector, se actualice aqui

    return (
        {players.forEach(player)=>
            <PlayerCard {player.username, player.avatarImageUrl}>
        }
    )
}

export default WaitingList;