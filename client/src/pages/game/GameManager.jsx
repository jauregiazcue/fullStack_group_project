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

    useEffect(() => {
        (async () => {
            const result = await getGameById(code);
            const actualResult = result[0];
            setGame(actualResult);
            if (userData) {
                if (actualResult.host === userData._id) {
                    setIsHost(true);
                }
            }
            if (actualResult.state === "started") {
                setQuestion(await handleGetQuestion(code));
            }
        })();

        //Define the socket
        // defineSockets();



        const newSocket = defineSockets();
        return () => {
            newSocket.off("gameStarted");
            newSocket.disconnect();
        }

    }, [])

    const handleGetQuestion = async (gameCode) => {
        const newQuestion = await getQuestion(gameCode);
        setQuestion(newQuestion);
    }

    const setShowingStats = async () => {
        //TO DO
    }

    const defineSockets = () => {
        const newSocket = io("http://localhost:3000");


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
        newSocket.on("answer", (answer) => {
            console.log(answer);
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