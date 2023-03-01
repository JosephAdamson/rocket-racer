import { useState } from 'react';
import GameWindow from "../components/GameWindow";
import ResultWindow from '../components/ResultWindow';
import { Snippet, Results } from '../types';

export default function PracticeSession() {
    const [results, setResults] = useState<Results | null>();


    /*
    Set results of Practice session once Game Window has expired.
    
    @param  {Snippet}       snippet         Object containing song data (text, img etc.)
    @param  {number}        timeRemaining   Remaining minutes/seconds from a completed session.
    @param  {number}        baseTime        Time alloted for a single session.
    @param  {number}        keystrokes      Total keystrokes for a single session.
    @param  {number}        errors          Total errors for a  single session.  
    */
    const setResultHandler = (
        snippet: Snippet, 
        timeRemaining: number, 
        cursor: number, 
        baseTime: number,
        keyStrokes: number,
        errors: number
        ) => {
        setResults({
            snippet: snippet,
            timeRemaining: timeRemaining,
            cursor: cursor,
            baseTime: baseTime,
            keyStrokes: keyStrokes,
            errors: errors
        });
    }


    return (
        <div className="flex justify-center items-center">
            {results ? <ResultWindow results={results} /> : <GameWindow timeLimit={120} 
                                                                setResultsHandler={setResultHandler} />}
        </div>
    )
}