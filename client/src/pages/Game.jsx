import { useLoaderData } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getQuestion } from "../utils/api/game";
import { io } from "socket.io-client";
import { getGameById } from "../utils/api/game";

import Timer from "../components/game/Timer";

import "./Game.css";

function Game() {

    const userData = useContext(AuthContext);

    const game = useLoaderData();

    const [question, setQuestion] = useState(null);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        
        const newSocket = io("http://localhost:3003");
        userData? setPlayer(userData) : setPlayer({nickname:"anonimous"}) // TODO sacar player
        newSocket.emit("join", { nickname: player.nickname, gameId: game._id });

        newSocket.on("gameSessionStarted", (newGame) => {
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

        if (gameSession.state === "started") {
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

        </section>
    );
}