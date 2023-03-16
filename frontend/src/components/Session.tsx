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

    @param: {Results | null}   results Value to be set at a session's conclusion/start
    */
    const setResultHandler = (results : Results | null) => {
        if (results) {
            setResults(results);
        } else {
            setResults(null);
        }
    }


    return (
        <div className="flex flex-col justify-center items-center">
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
                : <>
                <CountdownModal/>
                <GameWindow timeLimit={120}
                    timeDelay={3}
                    setResultsHandler={setResultHandler}
                    snippet={props.snippet} 
                    isTwoPlayer={props.isTwoPlayer}
                    // should only pass if progress handler is NOT null
                    progressHandler={props.progressHandler}
                    player2Cursor={props.player2Cursor ? props.player2Cursor : 0}
                    />
                </>
            }
        </div>
    )
}