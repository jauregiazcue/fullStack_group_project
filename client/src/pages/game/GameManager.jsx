import { useContext,useEffect } from "react";

import { AuthContext } from "../../components/authContext/AuthContext.jsx";
import { getGameById } from "../../utils/api/game.js";

function GameManager() {
    let userData = useContext(AuthContext);
    console.log("User Data", userData);

    useEffect(() => { 
        if(userData) {
            //getGameById(); //instead of gameById it needs to be getGameByHostId
        }
    });

    return (
        <section className="gameManager">
            <h1>GameManager</h1>
            {userData && <h1>{userData.nickname}</h1>}
        </section>
    );
}

export default GameManager;