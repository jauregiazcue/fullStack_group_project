import { useState, useEffect } from "react";

import { getPlayerNickname } from "../../../utils/localStorage";

import Avatar from "../Avatar/Avatar";
import AvatarSelector from "./AvatarSelector";
import fetchData from "../../utils/fetchData";

async function getAvatars() {
    const response = await fetch("/avatar");
    return response;
}

function WaitingRoomPlayer({game}) {

    const [name, setName] = useState("");
    const [playerAvatar, setPlayerAvatar] = useState("");
    const [playerID, setPlayerID] = useState("");

    const avatars = getAvatars();

    const [avatarSelectionActive, setAvatarSelectionActive] = useState(false);

    useEffect(() => {
        const nick = getPlayerNickname();
        setName(nick);

        game.players.map((player) => {
            if (player.nickname === nick) {
                setPlayerAvatar(player.avatar);
                setPlayerID(player._id);
            }
        })
    },[])

    useEffect(() => {
        
    }, [playerAvatar])


    handleAvatarClick = () => {
        setAvatarSelectionActive(!avatarSelectionActive);
    };

    handleAvatarChange = async (newAvatar) => {
        setPlayerAvatar(newAvatar);

        const editedAvatar = await fetchData(`/game/edit/${game.code}/${playerID}`, "PUT", {avatar: newAvatar});

        setAvatarSelectionActive(false);
    };



    return (
        <section className="waiting-room">

            <h1>{game.title}</h1>

            <section className="waiting-room__player">
                <Avatar imageUrl={playerAvatar} onClick={handleAvatarClick}/>
                <h2>{name}</h2>
            </section>

            <section className="waiting-room__avatars">
                {avatarSelectionActive && <AvatarSelector avatars={avatars} currentAvatar={playerAvatar} onAvatarSelect={handleAvatarChange}/>}
            </section>

        </section>
    )
}

export default WaitingRoomPlayer;