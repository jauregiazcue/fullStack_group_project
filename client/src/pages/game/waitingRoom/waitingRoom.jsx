import { useState, useContext, useEffect } from "react";

function WaitingRoom() {

    const userData = useContext(AuthContext);

    const {code: defaultCode} = useParams();

    const [playerName,setPlayerName] = useState("");
    const [playerAvatar, setPlayerAvatar] = useState("");

    const [code,setCode] = useState(defaultCode || "");
    const navigate = useNavigate();

    useEffect(() => {

    },[])

    return (
        <div>
            <h1>Esperando a que se unan más jugadores</h1>
        </div>
    )
}