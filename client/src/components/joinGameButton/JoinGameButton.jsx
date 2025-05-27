import fetchData from "../../utils/fetchData";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./JoinGameButton.css";
const JoinGameButton = ({nickname}) => {
    const [gameId, setGameId] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const gameId = e.target.gameIdField.value;
        const response = await fetchData(`/joinPlayer/${gameId}`, "POST");
        Navigate(`/${gameId}`);
        console.log(response);
    }
    //Get info into sessionStorage
    return(
        <div className="joinButton__wrapper">
            <form className="joinButton__form" onSubmit={handleSubmit}>
                <label htmlFor="gameIdField">Game Id: </label><input type="text" name="gameIdField" id="gameIdField" />
                <label htmlFor="userNickname">Nickname: </label><input type="text" name="userNickname" id="userNickname" value={nickname} />
                <button type="submit">Join Game!</button>
            </form>
        </div>
    )
}

export default JoinGameButton;