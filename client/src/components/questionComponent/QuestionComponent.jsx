import { nanoid } from 'nanoid'
import { useState } from 'react'
const QuestionComponent = ({ question }) => {
    const [resultado, setResultado] = useState(false);

    const checkAnswer = (answerIdentifier, keyAnswers) => {
        return (keyAnswers.find((element) => {
            return element[0] == answerIdentifier;
        }))[1].toString();
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

    const handleClick = (text) => {
        setResultado(checkAnswer(text[0], keyAnswers))
    }
    return (
        <div>
            <h3>{resultado}</h3>
            {idFragments.map((text) => {
                return (<p onClick={()=>handleClick(text)} key={text[0]}>
                    {text[1]}
                </p>)
            })}
        </div>
    )
}

export default QuestionComponent;