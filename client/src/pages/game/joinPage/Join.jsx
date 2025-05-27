/* import { useNavigate, useParams} from "react-router-dom";
 */import { useState, useContext, useEffect } from "react";
import { joinGame } from "../../../utils/api/game.js";
import { savePlayerNickname } from "../../../utils/localStorage";

import { AuthContext } from "../../../components/authContext/AuthContext.jsx";
import "./Join.css"

function Join() {

    const userData = useContext(AuthContext);

    const [playerName,setPlayerName] = useState("");
    const [code,setCode] = useState("");

    const [error,setError] = useState(null);

/*     const navigate = useNavigate();
 */
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

        if (!userData){
            savePlayerNickname(playerName);
        }
        if (result.error){
            console.log(result.error);
            setError(result.error);
        }
/*         navigate("/waiting/"+result.gameId);
 */    }

    return(
        <section className="join__game__container">   

            <section className="join__game__img">
                <img src="src/assets/images/erraton.png" alt="img" />
            </section>

            <div className="join__game__wrapper">
                <h1>Unirse a una partida</h1>

                {error && <p className="error">{error}</p>}

                <form className="join__game__form"onSubmit={handleJoin}>
                    <label className="join__game__label">Player's nickname </label>
                    <input className="join__game__input" type="text" required="true" value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
                    <label className="join__game__label">Game Code</label>
                    <input className="join__game__input" type="text" required="true" value={code} onChange={(e) => setCode(e.target.value)} />
                    <button className="join__game__button" type="submit">Join</button>
                </form>
            </div>
        
        </section>

    )
}

export default Join;