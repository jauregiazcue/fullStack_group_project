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
        if (!game.players) return;
        const nick = localStorage.getItem("nickname");
        setName(nick);
        const matched = game.players.find(player => player.nickname === nick);
        if (matched) {
            setPlayerAvatar(matched.avatar);
            setPlayerID(matched._id);
        }

        socket.on("PlayerRemoved", (data) => {
            if (data === matched._id) {
                alert("You've been removed from the game");
                navigate("/home");
            }
        });
        console.log("Should add socket");
        socket.on("GameStarted", () => {
            console.log("Game started");
            navigate(`/game/${game.code}`);
        })
    }, [game]);

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

            <h1>{game.questionnaireId.title||"Waiting Room"}</h1>

            <section className="waiting-room__player">
                <Avatar avatarImageUrl={playerAvatar} onClick={handleAvatarClick} />
                <h2>{name}</h2>
            </section>

            <section className="waiting-room__avatars">
                {avatarSelectionActive && <AvatarSelector avatars={avatars} currentAvatar={playerAvatar} onAvatarSelect={handleAvatarChange} />}
            </section>
            <p>Waiting...</p>
        </section>
    )
}

export default WaitingRoomPlayer;