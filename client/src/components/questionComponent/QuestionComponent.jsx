import { nanoid } from 'nanoid';
import './QuestionComponent.css';
import { useState, useContext } from 'react';
import { SocketContext } from '../../components/socketContext/SocketContext.jsx';

const QuestionComponent = ({ question }) => {
    const socket = useContext(SocketContext);
    const [resultado, setResultado] = useState(false);
    const [clickedId, setClickedId] = useState(null);

    if (typeof question === 'object' && question !== null) {
        question = question.question;
    }

    const keyAnswers = [];
    const fragments = typeof question === 'string'
        ? question.split(/([#@][^#@]+[#@])/g).filter(Boolean)
        : [];

    const idFragments = fragments.map(fragment => {
        if (fragment.startsWith('@') || fragment.startsWith('#')) {
            const identifier = nanoid();
            const isCorrect = fragment.startsWith('@');
            keyAnswers.push([identifier, isCorrect]);
            return { id: identifier, text: fragment.slice(1, -1), isAnswer: true };
        }
        return { id: nanoid(), text: fragment, isAnswer: false };
    });

    const checkAnswer = (id) => {
        const entry = keyAnswers.find(([storedId]) => storedId === id);
        return entry?.[1] || false;
    };

    const handleClick = (id) => {
        setClickedId(id);
        const isCorrect = checkAnswer(id);
        setResultado(isCorrect);
        socket.emit('playerToHost', { response: isCorrect.toString() });
    };

    return (
        <div className='question__section__wrapper'>
            <section className='question__img'>
                <img src='http://localhost:5173/src/assets/images/erraton.png' alt='img' />
            </section>

            <section className='question__container'>
                <p className='question__text'>
                    {idFragments.map(({ id, text, isAnswer }) =>
                        isAnswer ? (
                            <span
                                key={id}
                                onClick={() => handleClick(id)}
                                className={clickedId === id ? 'clicked__answer' : 'answer'}
                            >
                                {text}
                            </span>
                        ) : (
                            <span key={id}>{text}</span>
                        )
                    )}
                </p>

                {clickedId !== null && (
                    resultado
                        ? <p className='correct__answer'>¡Correcto!</p>
                        : <p className='incorrect__answer'>¡Incorrecto!</p>
                )}
            </section>
        </div>
    );
};

export default QuestionComponent;
