import { useNavigate } from "react-router-dom";
import WaitingList from "./WaitingList";
import { startGame } from "../../utils/api/game.js";

function WaitingRoomHost({ game, onRemove }) {
    const navigate = useNavigate();

    const handleStartGame = async () => {
        const newGame = await startGame(game.code);
        navigate(`/game/${newGame.code}`);
    }

    return (
        <section className="waiting__room">
            <h1>{game.questionnaireId.title}</h1>
            <WaitingList players={game.players} gameCode={game.code} onRemove={onRemove} />
            <button className="waiting__room__start__button" onClick={handleStartGame}>Start</button>
        </section>
    );
}

export default WaitingRoomHost;