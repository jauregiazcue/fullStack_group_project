import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WaitingList from "./WaitingList";
import { startGame } from "../../utils/api/game.js";

function WaitingRoomHost({ game, onRemove }) {
    const navigate = useNavigate();

    const handleStartGame = async () => {
        const game = await startGame(game.code);
        navigate(`/game/${game.code}`);
    }

    return (
        <>
            <h1>{game[0].questionnaireId.title}</h1>
            <WaitingList players={game.players} gameCode={game.code} onRemove={onRemove} />
            <button className="start-button" onClick={handleStartGame}>Start</button>
        </>
    );
}

export default WaitingRoomHost;