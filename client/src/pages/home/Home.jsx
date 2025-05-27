import { useContext } from "react";

import { AuthContext } from "../../components/authContext/AuthContext";
import Login from "../auth/Login";
import JoinGameButton from "../../components/joinGameButton/JoinGameButton";
import MakeGameForm from "../../components/makeGameForm/MakeGameForm.jsx";

const Home = () =>{
    const { token, nickname, email, _id } = useContext(AuthContext);
    
    return(
        <>
            <JoinGameButton nickname={nickname}/>
            {!_id ? <Login /> : <MakeGameForm /> }
        </>
    )
}

export default Home;