import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router"
import { io } from "socket.io-client";

// Utils Imports
import { getGameById } from "../../utils/api/game.js";
import { getQuestion } from "../../utils/api/game.js";

//Components Imports
import { AuthContext } from "../../components/authContext/AuthContext.jsx";
import GamePlayer from "../../components/game/GamePlayer/GamePlayer.jsx"
import GameHost from "../../components/game/GameHost/GameHost.jsx"


function GameManager() {
    //---------------Init Variables---------------
    //Set Context Variables
    let userData = useContext(AuthContext);

    //Set Params Variables
    const code = useParams().gameId;

    //Set State Variables
    const [game, setGame] = useState();
    const [isHost, setIsHost] = useState(false);

    const [question, setQuestion] = useState(null);
    const [socket, setSocket] = useState(null);
    const [player, setPlayer] = useState(null);
    //--------------------------------------------

    useEffect(() => async () => {
        const result = await getGameById(code);
        setGame(result);

        if (userData) {
            if (result.host === userData._id) {
                setIsHost(true);
            }
        }

        //Define the socket
        defineSockets();

        if (game.state === "started") {
            setQuestion(handleGetQuestion());
        }

        const newSocket = defineSockets();
        return () => {
            newSocket.off("gameStarted");
            newSocket.disconnect();
        }

    })

    const handleGetQuestion = async () => {
        const newQuestion = await getQuestion(game._id);
        setQuestion(newQuestion);
    }

    const setShowingStats = async () => {
        //TO DO
    }

    const defineSockets = () => {
        const newSocket = io("http://localhost:3003");


        newSocket.on("gameStarted", () => {
            handleGetQuestion();
        })

        newSocket.on("questionStats", (stats) => {
            setShowingStats(true);
        })

        newSocket.on("nextQuestion", (question) => {
            setShowingStats(false);
            handleGetQuestion();
        })

        newSocket.on("gameFinished", (question) => {
            alert("partida finalizada");
            // TODO mostra tus estadisticas.
        })

        setSocket(newSocket);
        return newSocket;
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