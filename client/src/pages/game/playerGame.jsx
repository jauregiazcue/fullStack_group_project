import { useLoaderData } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../components/authContext/AuthContext.jsx";
import { getQuestion } from "../../utils/api/game.js";
import { io } from "socket.io-client";

import { getGameById } from "../../utils/api/game.js";
import Timer from "../../components/game/Timer.jsx";

import "./Game.css";

function playerGame() {
    const userData = useContext(AuthContext);
    
    const game = useLoaderData(); // change useLoaderData to useEffect

    const [question, setQuestion] = useState(null);
    const [socket, setSocket] = useState(null);
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        if(userData) {
            getGameById(userData._id);
        }
        const newSocket = io("http://localhost:3003");
        let nickname = null;
        userData ? nickname = (userData.nickname) : nickname = ({ nickname: "anonimous" }) // TODO sacar player
        setPlayer(nickname);
        newSocket.emit("join", { nickname: nickname, gameId: game._id });

        newSocket.on("gameStarted", (newGame) => {
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

        if (game.state === "started") {
            handleGetQuestion();
        }

        return () => {
            newSocket.off("gameStarted");
            newSocket.disconnect();
        }

    }, [game]);

    const handleGetQuestion = async () => {
        const newQuestion = await getQuestion(game._id);
        setQuestion(newQuestion);
    }

    return (
        <section className="game">
            <h1>Game</h1>
        </section>
    );
}

export default Game; 
