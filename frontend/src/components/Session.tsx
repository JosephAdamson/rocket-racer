import { useState } from 'react';
import GameWindow from "./GameWindow";
import ResultWindow from './ResultWindow';
import { Snippet, Results } from '../types';
import { NavLink } from 'react-router-dom';

export default function Session() {
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
        errors: number,
        wordCount: number
        ) => {
        setResults({
            snippet: snippet,
            timeRemaining: timeRemaining,
            cursor: cursor,
            baseTime: baseTime,
            keyStrokes: keyStrokes,
            errors: errors,
            wordCount: wordCount
        });
    }


    return (
        <div className="flex flex-col justify-center items-center">
            {results ? <>
                        <ResultWindow results={results}/> 
                        <div className="flex bg-slateblue w-full border-t-[1px] border-slate-300 md:border-none
                        border md:w-2/3 p-4 rounded-b-md justify-between">
                            <button className="bg-softgreen font-bold text-white rounded-md p-4"
                             onClick={() => {
                                setResults(null);
                            }}>Try again</button>
                            <button className="bg-melloworange font-bold text-white rounded-md p-4">
                                <NavLink to={"/"}>Home (leave practice)</NavLink>
                            </button>
                        </div>
                    </> 
            : <GameWindow timeLimit={120} setResultsHandler={setResultHandler} />}
        </div>
    )
}