import { useEffect, useState } from 'react';

interface TimerProps {
    timeLimit: number
}

export default function Timer(props: TimerProps) {
    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);

    const initTimer = (timeLimit: number) => {

        const timerIntervalID = setInterval(() => {
            if (timeLimit < 0) {
                clearInterval(timerIntervalID)
            } else {
                setMinutes(Math.floor(timeLimit / 60));
                setSeconds(timeLimit % 60);
                timeLimit -= 1;
            }
        }, 1000);
    }


    useEffect(() => {
        initTimer(props.timeLimit);
    },[]);


    return (
        <div>
            <h1 className={`font-bold ${minutes === 0 && seconds <= 10 
                ? "text-red-500" : ""}`
                }>{minutes}: {seconds}</h1>
        </div>
    )
}