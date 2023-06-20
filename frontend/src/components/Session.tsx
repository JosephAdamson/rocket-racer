import { useState, useEffect } from 'react';
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
    // store isTwoplayer in state so we can change from play mode to practice mode
    const [isTwoPlayer, setIsTwoPlayer] = useState<boolean>(false);


    /*
    Set results of Practice session once Game Window has expired.

    @param: {Results | null}   results Value to be set at a session's conclusion/start
    */
    const setResultHandler = (results: Results | null) => {
        if (results) {
            setResults(results);
        } else {
            setResults(null);
        }
    }


    useEffect(() => {
        setIsTwoPlayer(props.isTwoPlayer);
    }, [results]);


    return (
        <div className="flex flex-col justify-center items-center">
            {results ? <>
                <ResultWindow results={results} />
                <div className="flex bg-slateBlue w-full border-t-[1px] border-slate-300 md:border-none
                        border md:w-2/3 p-4 rounded-b-md justify-between">
                    <div className="flex gap-2 w-fit">
                        <button className="bg-softGreen font-bold text-white rounded-md p-4
                             hover:brightness-[0.85]"
                            onClick={() => {
                                setResults(null);
                            }}> {isTwoPlayer
                                ? <NavLink to={"/practice"}
                                    state={{ snippet: props.snippet }}>Try again</NavLink>
                                : "Try again"
                            }
                        </button>
                        <button className="bg-rocketRed font-bold text-white rounded-md 
                            p-4 hover:brightness-[0.85]"
                            onClick={() => {
                                window.location.reload();
                            }}> 
                            <NavLink to={"/practice"}>Another one</NavLink>
                        </button>
                    </div>
                    <button className="bg-mellowOrange font-bold text-white rounded-md 
                            p-4 hover:brightness-[0.85]">
                        <NavLink to={"/"}>Home</NavLink>
                    </button>
                </div>
            </>
                : <>
                    <CountdownModal />
                    <GameWindow timeLimit={120}
                        timeDelay={3}
                        setResultsHandler={setResultHandler}
                        snippet={props.snippet}
                        isTwoPlayer={isTwoPlayer}
                        // should only pass if progress handler is NOT null
                        progressHandler={props.progressHandler}
                        player2Cursor={props.player2Cursor ? props.player2Cursor : 0}
                    />
                </>
            }
        </div>
    )
}