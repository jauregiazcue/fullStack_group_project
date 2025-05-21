// usara el listado de avatares
// mostrara los avatares en modo rejilla (personalizar la forma de mostrarlos)
// cuando se haga click en un avatar, se cambiara el avatar del usuario

import AvatarList from "./AvatarList";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function AvatarSelector({players, setPlayers, avatars}) {
    //se supone que el player actual estará en un contexto, le he puesto authContext a falta de saber que contexto será
    const context=useContext(AuthContext);
    const player=context.player;

    const handleClick = (avatar) => { //???: segun la IA, el parametro que se pasa es el avatar seleccionado, pero porqué, cómo o de donde viene?
        //Cambiar el avatar del usuario
        player.avatar=avatar; //TENGO QUE BUSCAR EL PLAYER QUE TIENE EL AVATAR
        setPlayers(players); //se cambia el avatar del player, en WaitingList un useEffect que lo detecte y actualice con el nuevo avatar.
    }

    return <AvatarList columns={2} avatars={avatars} onClick={handleClick}/>
}

export default AvatarSelector;
