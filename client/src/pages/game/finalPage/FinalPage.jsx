import { useNavigate, useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../components/authContext/AuthContext";
// import { getGameById } from "../../../utils/api/game.js";
import DetailedMatchHistory from "../../../components/detailedMatchHistory/DetailedMatchHistory.jsx";

function FinalPage({ idGame }) {
  // const { idGame } = useParams(); // Si viene por parametros
  const [matchHistory, setMatchHistory] = useState([]);
  const userData = useContext(AuthContext);
  const navigate = useNavigate();
  const [match, setMatch] = useState(null);

  //carga los datos del juego con el idGame
  // useEffect(() => {
  //   fetchMockHistory((history) => {
  //     setMatchHistory(history);
  //     const foundMatch = history.find((game) => game.gameId === Number(idGame));
  //     setMatch(foundMatch);
  //     console.log("useEffect:", foundMatch);
  //   });
  // }, []);

  // useEffect(() => {
  //   console.log("en useEffect fetchMockHistory!!!");
  //   fetchMockHistory(setMatchHistory);
  // }, []);

  // useEffect(() => {
  //   console.log("en useEffect 2!!!");

  //   const foundMatch = matchHistory.find(
  //     (game) => game.gameId === Number(idGame)
  //   );
  //   if (foundMatch) {
  //     console.log("Match encontrado:", foundMatch);
  //     setMatch(foundMatch);
  //   }
  // }, [matchHistory,idGame]);

  useEffect(() => {
    fetchMockHistory((history) => {
      setMatchHistory(history);

      const foundMatch = history.find((game) => game.gameId === Number(idGame));

      if (foundMatch) {
        console.log("Match encontrado:", foundMatch);
        setMatch(foundMatch);
      } else {
        console.warn(`No se encontró partida con gameId: ${idGame}`);
      }
    });
  }, [idGame]);

  
  const fetchMockHistory = (callback) => {
    setTimeout(() => {
      const mockHistory = [
        {
          gameId: 1,
          hostId: 1,
          players: [
            { name: "paul", id: 1, score: 400 },
            { name: "joe", id: 2, score: 200 },
            { name: "bob", id: 3, score: 300 },
          ],
        },
        {
          gameId: 2,
          hostId: 2,
          players: [
            { name: "alice", id: 4, score: 500 },
            { name: "eve", id: 5, score: 150 },
            { name: "mike", id: 6, score: 350 },
          ],
        },
        {
          gameId: 3,
          hostId: 1,
          players: [
            { name: "susan", id: 7, score: 600 },
            { name: "frank", id: 8, score: 250 },
            { name: "dave", id: 9, score: 100 },
          ],
        },
        {
          gameId: 4,
          hostId: 3,
          players: [
            { name: "lisa", id: 10, score: 450 },
            { name: "john", id: 11, score: 300 },
            { name: "gary", id: 12, score: 200 },
          ],
        },
        {
          gameId: 5,
          hostId: 2,
          players: [
            { name: "emma", id: 13, score: 550 },
            { name: "oliver", id: 14, score: 400 },
            { name: "harry", id: 15, score: 350 },
          ],
        },
        {
          gameId: 6,
          hostId: 3,
          players: [
            { name: "sarah", id: 16, score: 300 },
            { name: "tom", id: 17, score: 450 },
            { name: "jane", id: 18, score: 500 },
          ],
        },
        {
          gameId: 7,
          hostId: 1,
          players: [
            { name: "maria", id: 19, score: 600 },
            { name: "peter", id: 20, score: 200 },
            { name: "laura", id: 21, score: 150 },
          ],
        },
        {
          gameId: 8,
          hostId: 2,
          players: [
            { name: "james", id: 22, score: 700 },
            { name: "chris", id: 23, score: 250 },
            { name: "kate", id: 24, score: 400 },
          ],
        },
      ];
      callback(mockHistory);
    }, 1000);
  };


  const handleRestart = async (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div>
      <h1>Resultados</h1>
      {match ? (
        <DetailedMatchHistory match={match} />
      ) : (
        <p>Cargando resultados...</p>
      )}
      <form onSubmit={handleRestart}>
        <button type="submit">Start New Game!</button>
      </form>
    </div>
  );
}

export default FinalPage;
