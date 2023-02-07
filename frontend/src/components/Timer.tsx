import { useEffect, useState } from 'react';

interface TimerProps {
    timeLimit: number
}

export default function Timer(props: TimerProps) {
    const [timeLimit, setTimeLimit] = useState<number>(props.timeLimit);
    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);

    const initTimer = () => {
        let timePassed = 0;

        const timerIntervalID = setInterval(() => {
            if (timePassed > timeLimit) {
                clearInterval(timerIntervalID)
            } else {
                setMinutes(Math.floor(timePassed / 60));
                setSeconds(timePassed % 60);
                timePassed = timePassed += 1;
            }
        }, 1000);
    }


    useEffect(() => {
        initTimer();
    },[]);


    return (
        <div>
            <h1>{minutes}: {seconds}</h1>
        </div>
    )
}