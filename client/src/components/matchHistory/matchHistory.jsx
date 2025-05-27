import { useEffect, useState } from "react";
import "./matchHistory.css"
import DetailedMatchHistory from "../detailedMatchHistory/DetailedMatchHistory";

const MatchHistory = () => {
    const [matchHistory, setMatchHistory] = useState([]);
    const [detailActive, setDetailActive] = useState(false);
    const [selectedMatch, setSelectedMatch] = useState(null);
    
    useEffect(() => {
        fetchMockHistory(setMatchHistory);
    }, []);

    const fetchMockHistory = (callback) => {
        setTimeout(() => {
            const mockHistory = [
                {
                    gameId: 1,
                    hostId: 1,
                    players: [
                        { name: "paul", id: 1, score: 400 },
                        { name: "joe", id: 2, score: 200 },
                        { name: "bob", id: 3, score: 300 }
                    ]
                },
                {
                    gameId: 2,
                    hostId: 2,
                    players: [
                        { name: "alice", id: 4, score: 500 },
                        { name: "eve", id: 5, score: 150 },
                        { name: "mike", id: 6, score: 350 }
                    ]
                },
                {
                    gameId: 3,
                    hostId: 1,
                    players: [
                        { name: "susan", id: 7, score: 600 },
                        { name: "frank", id: 8, score: 250 },
                        { name: "dave", id: 9, score: 100 }
                    ]
                },
                {
                    gameId: 4,
                    hostId: 3,
                    players: [
                        { name: "lisa", id: 10, score: 450 },
                        { name: "john", id: 11, score: 300 },
                        { name: "gary", id: 12, score: 200 }
                    ]
                },
                {
                    gameId: 5,
                    hostId: 2,
                    players: [
                        { name: "emma", id: 13, score: 550 },
                        { name: "oliver", id: 14, score: 400 },
                        { name: "harry", id: 15, score: 350 }
                    ]
                },
                {
                    gameId: 6,
                    hostId: 3,
                    players: [
                        { name: "sarah", id: 16, score: 300 },
                        { name: "tom", id: 17, score: 450 },
                        { name: "jane", id: 18, score: 500 }
                    ]
                },
                {
                    gameId: 7,
                    hostId: 1,
                    players: [
                        { name: "maria", id: 19, score: 600 },
                        { name: "peter", id: 20, score: 200 },
                        { name: "laura", id: 21, score: 150 }
                    ]
                },
                {
                    gameId: 8,
                    hostId: 2,
                    players: [
                        { name: "james", id: 22, score: 700 },
                        { name: "chris", id: 23, score: 250 },
                        { name: "kate", id: 24, score: 400 }
                    ]
                }
            ];
            callback(mockHistory);
        }, 1000);
    }
    const displayDetail = (match) => {
        setDetailActive(true);
        setSelectedMatch(match);
    }
    const hideDetail = () => {
        setDetailActive(false);
        setSelectedMatch(null);
    }

    function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

    return (
        <div className="history__container">
            <div className="history__graph">
                {detailActive &&
                    <DetailedMatchHistory hideDetail={hideDetail} match={selectedMatch} />}
            </div>
            {matchHistory.length > 0 ?
                <ul className="history__list">
                    {matchHistory.map((match) => (
                        <li key={match.gameId} >
                            <p className="history__winner">Winner: {capitalizeFirstLetter(match.players.reduce((max, player) => {
                                return player.score > max.score ? player : max;
                            }).name)}</p>
                            <div className="history__container--id">
                                <p>Game ID: {match.gameId}</p>
                                <p> | </p>
                                <p>Host ID: {match.hostId}</p>
                            </div>
                            <p className="history__button--stats" onClick={() => { displayDetail(match) }}>Show Stats</p>
                        </li>
                    ))}
                </ul> :
                <span>"Loading..."</span>}
        </div>
    );
}

export default MatchHistory;