import { nanoid } from 'nanoid'
import { useState } from 'react'
const QuestionComponent = ({ question }) => {
    const [resultado, setResultado] = useState(false);

    const checkAnswer = (answerIdentifier, keyAnswers) => {
        return (keyAnswers.find((element) => {
            return element[0] == answerIdentifier;
        }))[1].toString();
    }

    const fragments = question.match(/([#@][^#@]+[#@])/g);
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
    console.log("Los ids son", keyAnswers)
    console.log("Los fragments son", idFragments);

    const handleClick = (text) => {
        setResultado(checkAnswer(text[0], keyAnswers))
    }
    return (
        <div>
            {idFragments.map((text) => {
                return (<p onClick={handleClick(text)} key={text[0]}>
                    {text[1]}
                </p>)
            })}
        </div>
    )
}

const QuestionComponent = () => {
    const [clickedId, setClickedId] = useState(null);
    const [resultado, setResultado] = useState(null); 

    const mockData = "El equipo de los X-men está compuesto por personajes como @Popeye@ , #Lobezno# o #Ciclope#.";


    const { phraseFragments, keyAnswers } = useMemo(() => {
        const fragments = mockData.split(/([#@][^#@]+[#@])/g);  

        const keyAnswers = [];
        const phraseFragments = fragments.map(fragment => {
            if (fragment.match(/^[#@][^#@]+[#@]$/)) {
                const identifier = nanoid();
                const isCorrect = fragment.startsWith('@');
                const cleanText = fragment.slice(1, -1);
                keyAnswers.push([identifier, isCorrect]);
                return { id: identifier, text: cleanText, selectable: true };
            }
            return { text: fragment, selectable: false };
        });

        return { phraseFragments, keyAnswers };
    }, []);

    const checkAnswer = (id) => {
        const answer = keyAnswers.find(el => el[0] === id);
        return answer ? answer[1] : false;
    };

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
                                    onClick={() => {
                                        setClickedId(fragment.id);
                                        setResultado(checkAnswer(fragment.id));
                                    }}
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
