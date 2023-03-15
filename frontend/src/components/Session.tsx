import { useState } from 'react';
import GameWindow from "./GameWindow";
import ResultWindow from './ResultWindow';
import { Snippet, Results } from '../types';
import { NavLink } from 'react-router-dom';
import CountdownModal from './CountdownModal';


interface sessionProps {
    snippet: Snippet;
    isTwoPlayer: boolean;
    player2Cursor?: number;
    progressHandler?: (cursor: number) => void;
}

export default function Session(props: sessionProps) {
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
            <CountdownModal />
            {results ? <>
                <ResultWindow results={results} />
                <div className="flex bg-slateBlue w-full border-t-[1px] border-slate-300 md:border-none
                        border md:w-2/3 p-4 rounded-b-md justify-between">
                    <button className="bg-softGreen font-bold text-white rounded-md p-4
                             hover:brightness-[0.85]"
                        onClick={() => {
                            setResults(null);
                        }}>Try again</button>
                    <button className="bg-mellowOrange font-bold text-white rounded-md 
                            p-4 hover:brightness-[0.85]">
                        <NavLink to={"/"}>Home (leave practice)</NavLink>
                    </button>
                </div>
            </>
                : <GameWindow timeLimit={120}
                    timeDelay={3}
                    setResultsHandler={setResultHandler}
                    snippet={props.snippet} 
                    isTwoPlayer={props.isTwoPlayer}
                    // should only pass if progress handler is NOT null
                    progressHandler={props.progressHandler}
                    player2Cursor={props.player2Cursor ? props.player2Cursor : 0}
                    />
            }
        </div>
    )
}