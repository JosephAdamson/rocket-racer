import { useEffect, useState, ChangeEvent, KeyboardEvent, useRef } from "react";
import { Snippet, Results } from "../types";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import RocketTrack from "./RocketTrack";
import rocket_red from "../assets/rocket_red.png";
import rocket_blue from "../assets/rocket_blue.png";


interface GameWindowProps {
    timeLimit: number;
    timeDelay: number;
    snippet: Snippet;
    isTwoPlayer: boolean;
    player2Cursor: number;
    setResultsHandler: (results: Results | null) => void;
    progressHandler?: (cursor: number) => void;
}

/*
Main interface panel for active game session. 
*/
export default function GameWindow(props: GameWindowProps) {
    const [textDisplay, setTextDisplay] = useState<string[]>([]);
    const [textDisplayHighlight, setTextDisplayHighlight] = useState<number[]>([]);
    const [displaySnippet, setDisplaySnippet] = useState<Snippet>(props.snippet);
    const [cursor, setCursor] = useState<number>(0);
    const [inputField, setInputField] = useState<string>("");
    const inputElement = useRef<HTMLInputElement | null>(null);
    const [completed, setCompleted] = useState<boolean>(false);

    // state for timer
    const [showTimer, setShowTimer] = useState<boolean>(false);
    const [minutes, setMinutes] = useState<number>(Math.floor(props.timeLimit / 60));
    const [seconds, setSeconds] = useState<number>(props.timeLimit % 60);
    const [timeLimit, setTimeLimit] = useState<number>(props.timeLimit + props.timeDelay);

    const [keyStrokes, setKeyStrokes] = useState<number>(0);
    const [errors, setErrors] = useState<number>(0);
    const navigate = useNavigate();

    /*
    Compare to string for a match of partial match.

    @param  {string}    current     user-typed value in the input field
    @param  {string}    actual      word/string in the text (up to the point of the cursor)    
    */
    const isWordMatch = (current: string, actual: string) => {
        if (!current || !actual) {
            return false;
        }
        return actual === current || actual.startsWith(current);
    }


    /*
    Wrap each letter of a word in a span
    
    @param  {string}    word    String to be wrapped.
    @param  {number}    pos     Position a given word in the text.
    */
    const spanify = (word: string, pos: number) => {
        const wordArr = word.split('');

        return wordArr.map((letter, i) => {
            // The sublength of the word the user has typed out.
            const subLen = textDisplayHighlight[cursor];
            // checking for already completed words.
            let cssClass = `border-[1px] border-[#f9fcfe] `;
            if (cursor >= pos) {
                const highlight = 
                    (textDisplayHighlight[cursor] > 0 && i < subLen) || cursor > pos ?
                         `text-highlightGreen border-[#f9fcfe]` 
                         : `bg-red-200 border-red-200`;
                cssClass = cssClass.concat(highlight);
                if (inputElement?.current?.value === word && pos === cursor
                    && i === subLen - 1) {
                    cssClass = cssClass.concat(" caretPulseRight");
                }
                if (cursor === pos && i === textDisplayHighlight[cursor]) {
                    cssClass = cssClass.concat(" caretPulseLeft");
                }
            }
            return <span className={cssClass} key={uuidv4()}>{letter}</span>
        });
    }


    /*
    track user keyboard input in order to dynamically highlight display text 

    @param  {ChangeEvent}   e   User input in text field.  
    */
    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const expected = textDisplay[cursor];
        const actual = e.currentTarget.value;
        setInputField(actual);

        const textDipslayHighlightUpdate = { ...textDisplayHighlight }
        if (isWordMatch(actual, expected) || actual === expected + " ") {
            const subLen = actual.length;
            textDipslayHighlightUpdate[cursor] = subLen;
        } else if (!actual) {
            textDipslayHighlightUpdate[cursor] = 0;
        } else {
            textDipslayHighlightUpdate[cursor] = -1;
            setErrors(error => error + 1);
        }
        setTextDisplayHighlight(textDipslayHighlightUpdate);
        setKeyStrokes(keyStrokes => keyStrokes + 1);
    }


    /*
    Clear user input on spacebar

    @param  {KeybooardEvent}   e   User keystroke.  
    */
    const keyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 32 || e.key === " " || e.code === "Space") {
            const expected = textDisplay[cursor];
            const actual = inputField;

            if (cursor >= textDisplay.length - 1 && isWordMatch(expected, actual) ) {
                setCompleted(true);
            }

            if (isWordMatch(expected, actual)) {
                setInputField("");
                // skip space between words
                setCursor(cursor => cursor + 2);
                if (props.isTwoPlayer && props.progressHandler) {
                    props.progressHandler(cursor + 2);
                }
            }
        }
    }

    /*
    Set up initial time delay.
    */
    useEffect(() => {
        // timer delay
        setTimeout(() => {
            setShowTimer(true);
            inputElement.current?.focus();
        }, props.timeDelay * 1000);
    }, []);


    /*
    Grab Snippet and set up current display state 
    The raw snippet text is in a bit of a state so it needs some extra formatting.
    */
    useEffect(() => {
        if (displaySnippet) {
            let newDisplayTextArr: string[] = displaySnippet.text.split(' ');
            let newDisplayText = newDisplayTextArr.join('* *');
            newDisplayTextArr = newDisplayText.split('*');
            setTextDisplay(newDisplayTextArr);
            setTextDisplayHighlight(Array.from({
                length: newDisplayTextArr.length
            }, _ => 0));
        }
    }, [displaySnippet]);


    /*
    Initiate timer 
    */
    useEffect(() => {
        if (timeLimit === 0 || completed) {
            if (displaySnippet) {
                const results: Results = {
                    snippet: props.snippet,
                    timeRemaining: timeLimit,                  
                    baseTime: props.timeLimit,
                    cursor: cursor,
                    keyStrokes: keyStrokes,
                    errors: errors,
                    wordCount: textDisplay.length
                }
                props.setResultsHandler(results);
            }
            return;
        }

        const timerID = setInterval(() => {
            setTimeLimit(timeLimit => timeLimit - 1);
            setMinutes(Math.floor(timeLimit / 60));
            setSeconds(timeLimit % 60);
        }, 1000);

        return () => {
            clearInterval(timerID)
        }
    }, [timeLimit, completed]);


    return (
        <div className="flex flex-col w-full md:w-2/3 h-auto border-2 rounded-md p-4 text-sm md:text-base bg-white">
            <div className="flex justify-between m-2">
                <h2 className="font-bold text-xs md:text-base">3...2...1..LIFT OFF! Type the text below:</h2>
                {showTimer ? <h1 className={`font-bold md:text-2xl ${minutes === 0 && seconds <= 10
                    ? "text-red-500" : ""}`
                }>{minutes}: {seconds < 10 ? 0 + seconds.toString() : seconds}
                </h1> : ""}
            </div>
            <div className="flex flex-col w-full h-auto p-0 md:p-4">
                <RocketTrack rocket_img={rocket_blue}
                            username={"Guest (You)"}
                            // pass text display / 2 (text without whitespace)
                            textDisplayArrLength={textDisplay.length / 2}
                            position={cursor} />
                {props.isTwoPlayer &&
                    <RocketTrack rocket_img={rocket_red}
                        username={props.player2Cursor >= textDisplay.length ? "Winner!" : "Guest"}
                        textDisplayArrLength={textDisplay.length / 2}
                        position={props.player2Cursor} />
                }
                <div className="flex flex-col gap-4 p-4 bg-clearBlue/[0.03] 
                border-2 border-coolGrey rounded-md my-4">
                    <p className="h-auto w-full p-4 font-sourceCode">
                        {textDisplay.map((word, i) => {
                            return spanify(word, i);
                        })}
                    </p>
                    <input ref={inputElement} className={`p-2 border-2 border-coolGrey rounded-md
                            ${textDisplayHighlight[cursor] < 0 ? "bg-red-200" : "text-black/[0.5]"}`}
                        type="text"
                        onChange={inputHandler}
                        onKeyUp={keyUpHandler}
                        value={inputField}
                    />
                </div>
            </div>
        </div>
    );
}