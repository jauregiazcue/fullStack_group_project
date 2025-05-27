import { useContext } from "react";
import "./Home.css"
import { AuthContext } from "../../components/authContext/AuthContext";
import Login from "../auth/Login";
// import JoinGameButton from "../../components/joinGameButton/JoinGameButton";
import MakeGameForm from "../../components/makeGameForm/MakeGameForm.jsx";

import { useNavigate } from "react-router-dom";

const Home = () =>{
    const { token, nickname, email, _id } = useContext(AuthContext);
    const navigate = useNavigate();
    return(
        
            <div>
                <button className="home__join__button" onClick={() => navigate('/join')}>Join!</button>
                {!_id ? <Login /> : <MakeGameForm /> }
            </div>
        
    )
}

export default Home;