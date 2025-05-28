import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router"

// Utils Imports
import { getGameById } from "../../../utils/api/game.js";
import fetchData from "../../../utils/fetchData";
import socket from "../../../utils/socket.js";

//Components Imports
import WaitingRoomHost from "../../../components/WaitingRoom/WaitingRoomHost";
import WaitingRoomPlayer from "../../../components/WaitingRoom/WaitingRoomPlayer";
import { AuthContext } from "../../../components/authContext/AuthContext";

function WaitingRoom() {
    const userData = useContext(AuthContext);
    const code = useParams().gameId;
    const [game, setGame] = useState({});
    const [isHost, setIsHost] = useState(false);

    const [playerRemoved, setPlayerRemoved] = useState(false);

    useEffect(() => {
        (async () => {
        const result = await handleGameInfo();
        if (userData && result) {
            if (result.host === userData._id) {
                setIsHost(true);
            }
        }
        })();
    }, [])

    useEffect(() => {
        (async () => {
            await handleGameInfo();
        })();
    }, [playerRemoved])

    useEffect(() => {
        socket.on("PlayerJoined", (player) => {
            console.log("PlayerJoined");
            console.log(player);
            setGame(prev => ({ ...prev, players: [...(prev.players || []), player] }));
        })
        socket.on("PlayerRemove", (player) => {
            console.log("PlayerRemove");
            console.log(player);
            setGame(prev => ({ ...prev, players: prev.players.filter(p => p._id !== player._id) }));
        })
        socket.on("PlayerEdit", (player) => {
            console.log("PlayerEdit");
            console.log(player);
            setGame(prev => ({ ...prev, players: prev.players.map(p => p._id === player._id ? player : p) }));
        })
        return () => {
            socket.off("PlayerJoined");
            socket.off("PlayerRemove");
            socket.off("PlayerEdit");
        }
    }, [])

    let handleRemovePlayer = async (playerId) => {
        const response = await fetchData(`/game/remove/${game.code}/${playerId}`, "DELETE");
        setPlayerRemoved(!playerRemoved);
    }

    let handleGameInfo = async () => {
        const result = await getGameById(code);
        const gameData = result[0];
        console.log("This is the result");
        console.log(result);
        setGame(gameData);
        return gameData;
    }

    return (
    <>
        {game && game.code && (
            isHost
                ? <WaitingRoomHost game={game} onRemove={handleRemovePlayer} />
                : <WaitingRoomPlayer game={game} />
        )}
    </>
    )
}

export default WaitingRoom;