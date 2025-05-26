import { useState, useEffect } from "react";
import './Timer.css';

function Timer ({ socket }) {

    const [time, setTime] = useState(15);

    useEffect(() => {
        socket.on("timer", (timeLeft) => {
            setTime(timeLeft);
        })
        return () => {
            socket.off("timer");
        }
    }, [socket]);
    
    return (
        <section className="timer">
            <h4>Time Left</h4>
            <div>{time}</div>
        </section>
    );
}  

export default Timer;