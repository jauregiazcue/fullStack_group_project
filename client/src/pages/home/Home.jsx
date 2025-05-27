import { useContext } from "react";

import { AuthContext } from "../../components/authContext/AuthContext";
import Login from "../auth/Login";
// import JoinGameButton from "../../components/joinGameButton/JoinGameButton";
import MakeGameForm from "../../components/makeGameForm/MakeGameForm.jsx";

import { useNavigate } from "react-router-dom";

const Home = () =>{
    const { token, nickname, email, _id } = useContext(AuthContext);
    const navigate = useNavigate();
    return(
        <>
            <button onClick={() => navigate('/join')}>Unete!</button>
            {!_id ? <Login /> : <MakeGameForm /> }
        </>
    )
}

export default Home;