import { nanoid } from 'nanoid'
import { useState } from 'react'
const QuestionComponent = ({question}) => {
    const [resultado, setResultado] = useState(false);
    const checkAnswer = (answerIdentifier, keyAnswers) =>{
        return (keyAnswers.find((element)=>{
            return element[0] == answerIdentifier;
        }))[1].toString();
    }
    
    const fragments = question.match(/([#@][^#@]+[#@])/g);
    const keyAnswers = []
    const idFragments = fragments.map((fragment)=>{
        const identifier = nanoid();
        if(fragment[0] === "@"){
            keyAnswers.push([identifier, true])
        }else{
            keyAnswers.push([identifier, false])
        }
        return [identifier, fragment.substring(1,fragment.length-1)];
    })
    console.log("Los ids son", keyAnswers)
    console.log("Los fragments son", idFragments);
    return(
        <div>
            <h3>La respuesta clickada es: {resultado}</h3>
            {idFragments.map((text)=>{
                return(<p onClick={()=>{setResultado(checkAnswer(text[0], keyAnswers))}} key={text[0]}>{text[1]}</p>)
            })}
        </div>
    )
}

export default QuestionComponent;