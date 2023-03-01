import { Snippet, Results } from "../types";
import { useEffect, useState } from 'react';
import clock from '../assets/clock.png';
import keyboard from '../assets/keyboard.png';
import checkmark from '../assets/checkmark.png';


interface resultWindowProps {
    results: Results
}


export default function ResultWindow(props: resultWindowProps) {
    const [wpmDisplay, setWpmDisplay] = useState<number>(0);
    const [displaySnippet, setDisplaySnippet] = useState<Snippet>(props.results.snippet);


    /*
    Based on equations found here:
    https://www.speedtypingonline.com/typing-equations 
    WPM = (characters / 5) / mins

    @param  {number}    interval Time passed in seconds
    @param  {string[]}  processed text from snippet;
    */
    const computeGrossWpm = (textDisplay: string[], cursor: number, timeRemaining: number): void => {
        console.log(`baseTime: ${props.results.baseTime}`);
        console.log(`time remaining: ${timeRemaining}`);
        console.log(`key strokes: ${props.results.keyStrokes}`);
        console.log(`errors: ${props.results.errors}`)
        const timeInMins = (props.results.baseTime - timeRemaining) / 60;
        const completed = textDisplay.slice(0, cursor);
        // note: polyfill for replaceAll() would be .replace('/blah/g'/);
        const characterStr = completed.join('').replaceAll(' ', '');
        const res = Math.floor((characterStr.length / 5) / timeInMins);
        setWpmDisplay(res);
    }


    /*
    compute accuracy based on errors / total keystrokes.

    @param  {number}    keystrokes  Total number of keystrokes for a session.
    @param  {errors}    errors      Total number of errors for a session.   
    */
    const computeAccuracy = (keyStrokes: number, errors: number) => {
        const res = keyStrokes > 0 ? ((keyStrokes - errors) / keyStrokes) * 100 : 100;
        return res < 100 ? res.toFixed(2) : res;
    }


    /*
    Render time taken for session in display format.

    @param  {number}        baseTime        Time alloted for a single session.
    @param  {number}        timeRemaining   Remaining minutes/seconds from a completed session.     
    */
    const formatTimeTaken = (baseTime: number, timeRemaining: number) => {
        const dif = baseTime - timeRemaining;
        return `${Math.floor(dif / 60)}:${dif % 60}`;
    }


    useEffect(() => {
        computeGrossWpm(displaySnippet.text.split(' '), props.results.cursor, props.results.timeRemaining);
    }, []);


    return (
        <div className="flex flex-col h-1/2 w-full md:w-2/3 bg-slateblue rounded-md m-6">
            <div className="border-b-[1px] border-slate-300 p-4">
                <h3 className="text-md text-white">You just typed an excerpt from the song:</h3>
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="flex justify-center items-center w-80">
                    <img className="h-40 w-40 m-2" src={displaySnippet.img} alt="song" />
                </div>
                <div className="flex flex-col w-full md:border-l-[1px] border-slate-200">
                    <div className="border-b-[1px] border-t-[1px] md:border-t-0 border-slate-300 p-4">
                        <h2 className="text-white text-2xl capitalize">{displaySnippet.title}</h2>
                        <h2 className="text-slate-300 text-lg">by {displaySnippet.artist}</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center">
                            <img className="w-6 h-6 my-2 bg-white rounded-full p-1" src={keyboard} alt="keyboard" />
                            <div className="flex justify-between text-white md:w-1/3">
                                <h3 className="mx-2">Your speed:</h3>
                                <h2 className="text-lg md:text-xl text-bold">{wpmDisplay} wpm</h2>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <img className="w-6 h-6 my-2 bg-white rounded-full p-1" src={clock} alt="clock" />
                            <div className="flex justify-between text-white md:w-1/3">
                                <h3 className="text-white mx-2">Time:</h3>
                                <h2 className="text-lg md:text-xl">
                                    {formatTimeTaken(props.results.baseTime, props.results.timeRemaining)}
                                </h2>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <img className="w-6 h-6 my-2 bg-white rounded-full p-1" src={checkmark} alt="clock" />
                            <div className="flex justify-between text-white md:w-1/3">
                                <h3 className="text-white mx-2">Accuracy:</h3>
                                <h2 className="text-lg md:text-xl">
                                    {computeAccuracy(props.results.keyStrokes, props.results.errors)}%
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}