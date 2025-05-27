import { useState, useContext, useEffect } from "react";
import WaitingRoomHost from "../../../components/WaitingRoom/WaitingRoomHost";
import WaitingRoomPlayer from "../../../components/WaitingRoom/WaitingRoomPlayer";
import { AuthContext } from "../../../components/authContext/AuthContext";
import fetchData from "../../../utils/fetchData";

function WaitingRoom() {

    const userData = useContext(AuthContext);

    const [game, setGame] = useState({});
    const [isHost, setIsHost] = useState(false);

    const [playerRemoved, setPlayerRemoved] = useState(false);

    useEffect(async () => {
        const result = await getGameById(code);
        setGame(result);

        if (userData) {
            if (result.host === userData._id) {
                setIsHost(true);
            }
        }
    }, [])

    useEffect(async () => {
        const result = await getGameById(code);
        setGame(result);
    }, [playerRemoved])

    handleRemovePlayer = async (playerId) => {
        const response = await fetchData(`/game/remove/${game.code}/${playerId}`, "DELETE");
        setPlayerRemoved(!playerRemoved);
    }

    return (
        <>
            {isHost ? <WaitingRoomHost game={game} hostData={userData} onRemove={handleRemovePlayer} /> : <WaitingRoomPlayer game={game} />}
        </>
    )
}