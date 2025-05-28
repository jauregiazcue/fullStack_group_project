import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router"

// Utils Imports
import { getGameById, nextQuestion } from "../../utils/api/game.js";
import { getQuestion } from "../../utils/api/game.js";

//Components Imports
import { AuthContext } from "../../components/authContext/AuthContext.jsx";
import { SocketContext } from "../../components/socketContext/SocketContext.jsx";
import GamePlayer from "../../components/game/GamePlayer/GamePlayer.jsx"
import GameHost from "../../components/game/GameHost/GameHost.jsx"


function GameManager() {
    let userData = useContext(AuthContext);
    const socket = useContext(SocketContext)
    const code = useParams().gameId;

    const [game, setGame] = useState();
    const [isHost, setIsHost] = useState(false);

    const [question, setQuestion] = useState(null);
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        (async () => {
            const result = await getGameById(code);
            const actualGame = result[0];
            setGame(actualGame);

            if (userData && actualGame.host === userData._id) {
            setIsHost(true);
            }
        })();
    }, [code, userData]);

    useEffect(() => {
        if (!socket || !game) return;

        const onGameStarted = () => getQuestion(code).then(setQuestion);
        const onQuestionStats = () => setShowingStats(true);
        const onNextQuestion = () => {
            console.log("nextQuestion");
            console.log(getQuestion(code));
            setShowingStats(false);
            getQuestion(code).then(setQuestion);
        };
        const onGameFinished = () => alert("partida finalizada");
        const onAnswer = (answer) => console.log(answer+"asda");
        const onPlayerData = ({ response }) => {
            if(response=="true"){
                console.log("bueno a ver");
                nextQuestion(code).then(setQuestion);                
            }
            console.log("It does get here");
        }

        socket.on("gameStarted", onGameStarted);
        socket.on("questionStats", onQuestionStats);
        socket.on("nextQuestion", onNextQuestion);
        socket.on("gameFinished", onGameFinished);
        socket.on("answer", onAnswer);
        socket.on("playerData", onPlayerData);
        console.log("Goddamnit");
        socket.emit("register", {
            gameId: code,
            userId: userData?._id,
            isHost,
        });

        return () => {
            socket.off("gameStarted", onGameStarted);
            socket.off("questionStats", onQuestionStats);
            socket.off("nextQuestion", onNextQuestion);
            socket.off("gameFinished", onGameFinished);
            socket.off("answer", onAnswer);
            socket.off("playerData", onPlayerData);
        };
    }, [socket, game, code, userData, isHost]);

    const handleGetQuestion = async (gameCode) => {
        const newQuestion = await getQuestion(gameCode);
        setQuestion(newQuestion);
    }

    const setShowingStats = async () => {
        //TO DO
    }

    return (
        <section className="gameManager">
            <section className="topInfo">
                <h1>Code : {code ? code : "CodeIsMissing"}</h1>
            </section>
            {isHost ?
                <GameHost />
                :
                <GamePlayer question={question} />}
        </section>
    );
}

export default GameManager;