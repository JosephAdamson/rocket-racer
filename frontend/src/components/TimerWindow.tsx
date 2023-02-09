import { useEffect, useState } from 'react';
import GameWindow from './GameWindow';

interface TimerProps {
    timeLimit: number
}

/*
Initialize a timer of a given game session

@param  {number}    timeLimit duration of countdown (seconds)
@param  {Function}  handler function managing parent state indicating whether time is active.
*/
export default function TimerWindow(props: TimerProps) {
    const [minutes, setMinutes] = useState<number>(Math.floor(props.timeLimit / 60));
    const [seconds, setSeconds] = useState<number>(props.timeLimit % 60);
    const [timeLimit, setTimeLimit] = useState<number>(props.timeLimit);
    const [isActive, setIsActive] = useState<boolean>(true);
    const [dummyVal, setDummyVal] = useState<number>(0);

    const resetHandler = () => {
        setDummyVal(dummyVal => dummyVal + 1);
        setTimeLimit(props.timeLimit);
        console.log(dummyVal);
    }


    useEffect(() => {
        if (timeLimit < 0) {
            setIsActive(false);
            return;
        }

        const timerID = setInterval(() => {
            setTimeLimit(timeLimit => timeLimit - 1);
            setMinutes(Math.floor(timeLimit / 60));
            setSeconds(timeLimit % 60);

        }, 1000);

        return () => {
            clearInterval(timerID)
        }
    },[timeLimit]);


    return (
        <div className="flex flex-col w-2/3 h-auto border-2 rounded-md p-4">
            <div className="flex justify-between m-2">
                <h2>3...2...1..LIFT OFF! Type the text below:</h2>
                <h1 className={`font-bold ${minutes === 0 && seconds <= 10 
                    ? "text-red-500" : ""}`
                    }>{minutes}: {seconds}
                </h1>
            </div>
            <GameWindow key={dummyVal} isActive={isActive}/>
            {!isActive ? <button onClick={resetHandler}>RESET</button> : ""}
        </div>
    );
}