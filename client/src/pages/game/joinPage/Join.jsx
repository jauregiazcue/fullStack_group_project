import { useNavigate, useParams} from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { joinGame } from "../../../utils/api/game.js";
import { savePlayerNickname } from "../../../utils/localStorage";

import { AuthContext } from "../../../components/authContext/AuthContext.jsx";

function Join() {

    const userData = useContext(AuthContext);
    const [playerName,setPlayerName] = useState("");
    const [code,setCode] = useState("");

    const [error,setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if(userData) {
            setPlayerName(userData.nickname);
        }
    },[userData])

    const handleJoin = async(e) => {
        e.preventDefault();
        const result = await joinGame(code,playerName);
        console.log("Result");
        console.log(result);

        if (!userData.nickname){
            savePlayerNickname(playerName);
        }
        if (result.error){
            console.log(result.error);
            setError(result.error);
        }
        navigate("/waiting/"+code);
    }

    return(
        <div>
            <h1>Unirse a una partida</h1>

            {error && <p className="error">{error}</p>}

            <form onSubmit={handleJoin}>
                <label>Player's nickname </label>
                <input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
                <label>Game Code</label>
                <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
                <button type="submit">Join</button>
            </form>
        </div>
    )
}

export default Join