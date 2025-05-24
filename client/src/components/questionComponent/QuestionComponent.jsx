import { nanoid } from 'nanoid';
import { useState, useMemo } from 'react';
import './QuestionComponent.css';

const QuestionComponent = () => {

    const [resultado, setResultado] = useState(false);// para almacenar la respuesta correcta
    const [clickedId, setClickedId] = useState(null); //para poder cambiar la clase de la opción seleccionada

    const mockQuestions = "El equipo de los X-men esta compuesto por personajes como:";
    const mockData = "@Popeye@ #Lobezno# #Ciclope#";

    const { idFragments, keyAnswers } = useMemo(() => { //para que guarde los ids originales y no cambien con cada click
        const fragments = mockData.match(/([#@][^#@]+[#@])/g); //expresión regular para dividir el string en fragmentos que empienzan con # o @
        //El /g asegura que captura todos los fragmentos coincidentes.
    
        const keyAnswers = []

        const idFragments = fragments.map((fragment)=>{ //Mapea el resultado de fragments, si el primer elemento coincide con @ ese será true, todos los demás que tendrán # serán falsos
            const identifier = nanoid();
            if(fragment[0] === "@"){
                keyAnswers.push([identifier, true])
            }else{
                keyAnswers.push([identifier, false])
            }
            return [identifier, fragment.substring(1,fragment.length-1)]; //para quitar los # o @ del inicio y final del string
        })

        return { idFragments, keyAnswers };
    }, []);

    const checkAnswer = (answerIdentifier, keyAnswers) =>{ //retorna el valor booleano de la id pasada como parámetro
        return (keyAnswers.find((element)=>{
            return element[0] == answerIdentifier; //element[0] el 1er elemento del par (nanoid/boolean)
        }))[1].toString(); //pasa a string el booleano(2ndo elemento del par)
    }

    /* console.log("Los ids:", keyAnswers)
    console.log("Los fragments:", idFragments);
    console.log("clickedId actual:", clickedId) */;
    
    return(
        <div className='question__section__wrapper'>
            
            <section className='question__img'>
                <img src="src/assets/images/Error_finder.png" alt="img" />
            </section>

            <section className="question__container">

                <p className='question__text'>{mockQuestions}</p> {/* Solo se muestra una vez */}

                {idFragments.map((text) => { //itera sobre fragments y para cada par y los renderiza a modo de párrafo
                    return (
                        <button 
                            key={text[0]} //key - id para renderizar la lista de elementos en forma de <p>
                            onClick={() => {
                                setResultado(checkAnswer(text[0], keyAnswers));  //al clicar en el fragmento se llama a la fnc checkAnswer y se le pasan los  params: identificador del fragmento y keyAnswers
                                setClickedId(text[0]);  //además guarda el id de la opción que se ha clicado
                            }}
                            className={clickedId === text[0] ? 'clicked__answer' : 'answer'} //clase para las diferentes secciones
                        >
                            {text[1]} {/*texto a renderizar*/}
                        </button>
                    );
                })}

                {resultado === "true" 
                ? <p className='correct__answer'>¡Correcto!</p> 
                : <p className='incorrect__answer'>¡Incorrecto!</p>}

            </section>
        </div>
    )
}

export default QuestionComponent;
