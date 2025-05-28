import { nanoid } from 'nanoid'
import "./QuestionComponent.css"
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
        <div className='question__section__wrapper'>
            <section className='question__img'>
                <img src="src/assets/images/Error_finder.png" alt="img" />
            </section>

            <section className="question__container">

                <p className="question__text">
                    {phraseFragments.map((fragment, index) => {
                        if (fragment.selectable) {
                            return (
                                <span
                                    key={fragment.id}
                                    onClick={()=>handleClick(socket, text)}
                                    className={clickedId === fragment.id ? 'clicked__answer' : 'answer'}
                                >
                                    {fragment.text}
                                </span>
                            );
                        }
                        return <span key={index}>{fragment.text}</span>;
                    })}
                </p>

                {clickedId && (
                    resultado === true
                        ? <p className='correct__answer'>¡Correcto!</p>
                        : <p className='incorrect__answer'>¡Incorrecto!</p>
                )}
            </section>
        </div>
    );
};

export default QuestionComponent;
