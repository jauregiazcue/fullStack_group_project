import { nanoid } from 'nanoid'
import { useState, useContext } from 'react'
import { SocketContext } from "../../components/socketContext/SocketContext.jsx";

const QuestionComponent = ({ question }) => {
    
    const socket = useContext(SocketContext);
    const [resultado, setResultado] = useState(false);

    const checkAnswer = (answerIdentifier, keyAnswers) => {
        return (keyAnswers.find((element) => {
            return element[0] == answerIdentifier;
        }))[1].toString();
    }
    if (typeof question == "object"){
        question = question.question;
    }
    const fragments = question && question.match(/([#@][^#@]+[#@])/g);
    const keyAnswers = []
    const idFragments = fragments.map((fragment) => {
        const identifier = nanoid();
        if (fragment[0] === "@") {
            keyAnswers.push([identifier, true])
        } else {
            keyAnswers.push([identifier, false])
        }
        return [identifier, fragment.substring(1, fragment.length - 1)];
    })
    
    const handleClick = (socket, text) => {
        console.log(checkAnswer(text[0], keyAnswers));
        socket.emit("playerToHost", {response: checkAnswer(text[0], keyAnswers)});
    }
    return (
        <div>
            <h3>{resultado}</h3>
            {idFragments.map((text) => {
                return (<p onClick={()=>handleClick(socket, text)} key={text[0]}>
                    {text[1]}
                </p>)
            })}
        </div>
    )
}

export default QuestionComponent;