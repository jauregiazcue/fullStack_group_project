import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getPlayerNickname } from "../../utils/localStorage.js";

import Avatar from "../Avatar/Avatar";
import AvatarSelector from "./AvatarSelector";
import fetchData from "../../utils/fetchData";

import socket from "../../utils/socket";

async function getAvatars() {
    const response = await fetch("/avatar");
    return response;
}

function WaitingRoomPlayer({ game }) {

    const [name, setName] = useState("");
    const [playerAvatar, setPlayerAvatar] = useState("");
    const [playerID, setPlayerID] = useState("");

    const avatars = getAvatars();

    const navigate = useNavigate();

    const [avatarSelectionActive, setAvatarSelectionActive] = useState(false);

    useEffect(() => {
        const nick = getPlayerNickname();
        setName(nick);
        if (game.players) {
            game.players.map((player) => {
                if (player.nickname === nick) {
                    setPlayerAvatar(player.avatar);
                    setPlayerID(player._id);
                }
            })
        }

        socket.on("PlayerRemoved", (data) => {
            console.log("PlayerRemoved");
            console.log(data);
            if (data === playerID) {
                alert("You've been removed from the game");
                navigate("/home")
            }
        })
    }, [])

    useEffect(() => {
        setAvatarSelectionActive(false);
    }, [playerAvatar])

    let handleAvatarClick = () => {
        setAvatarSelectionActive(!avatarSelectionActive);
    };

    let handleAvatarChange = async (newAvatar) => {
        setPlayerAvatar(newAvatar);

        const editedAvatar = await fetchData(`/game/edit/${game.code}/${playerID}`, "PUT", { avatar: newAvatar });

    };

    return (
        <section className="waiting-room">

            <h1>{game.title}</h1>

            <section className="waiting-room__player">
                <Avatar imageUrl={playerAvatar} onClick={handleAvatarClick} />
                <h2>{name}</h2>
            </section>

            <section className="waiting-room__avatars">
                {avatarSelectionActive && <AvatarSelector avatars={avatars} currentAvatar={playerAvatar} onAvatarSelect={handleAvatarChange} />}
            </section>

        </section>
    )
}

export default WaitingRoomPlayer;