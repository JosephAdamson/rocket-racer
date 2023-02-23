import { Snippet } from "../types";
import { useEffect, useState } from 'react';


interface resultWindowProps {
    remainingTime: number;
    snippet: Snippet;
    cursor: number;
}

export default function ResultWindow(props: resultWindowProps) {
    const [wpmDisplay, setWpmDisplay] = useState<number>(0);
    const [displaySnippet, setDisplaySnippet] = useState<Snippet>(props.snippet);


    /*
    Based on equations found here:
    https://www.speedtypingonline.com/typing-equations 
    WPM = (characters / 5) / mins

    @param  {number}    interval Time passed in seconds
    @param  {string[]}  processed text from snippet;
    */
    const computeGrossWpm = (textDisplay: string[], cursor: number): void => {
        const completed = textDisplay.slice(0, cursor);
        // note: polyfill for replace all .replace('/blah/g'/);
        const characterStr = completed.join('').replaceAll(' ', '');
        const res = (characterStr.length / 5) / 60;
        setWpmDisplay(res); 
    }


    useEffect(() => {
        computeGrossWpm(displaySnippet.text.split(' '), props.cursor);
    },[]);


    return (
        <div>
            <h2>{wpmDisplay}</h2>
        </div>
    )
}