import { useState } from 'react';
import GameWindow from "../components/GameWindow";
import ResultWindow from '../components/ResultWindow';
import { Snippet, Results } from '../types';

export default function PracticeSession() {
    const [results, setResults] = useState<Results | null>();


    const setResultHandler = (snippet: Snippet, timeRemaining: number, cursor: number, baseTime: number) => {
        setResults({
            snippet: snippet,
            timeRemaining: timeRemaining,
            cursor: cursor,
            baseTime: baseTime
        });
    }


    return (
        <div className="flex justify-center items-center">
            {/* <TimerWindow timeLimit={120}/> */}
            {results ? <ResultWindow results={results} /> : <GameWindow timeLimit={120} 
                                                                setResultsHandler={setResultHandler} />}
        </div>
    )
}