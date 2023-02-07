import { useEffect, useState , ChangeEvent, KeyboardEvent} from "react";
import { BaseURL } from "../shared";
import { Snippet } from "../types";
import { v4 as uuidv4 } from 'uuid';


export default function GameWindow() {
    const [textDisplay, setTextDisplay] = useState<string[]>([]);
    const [textDisplayHighlight, setTextDisplayHighlight] = useState<number[]>([]);
    const [snippets, setSnippets] = useState<Snippet[]>([]);
    const [displaySnippet, setDisplaySnippet] = useState<Snippet>();
    const [cursor, setCursor] = useState<number>(0);
    const [inputField, setInputField] = useState<string>("");


    /*
    Fetch Snippet data from Rocket Racer API

    @param  {string}    API end point.
    */
    const fetchData = async (url: string) => {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const content = await response.json();
            setSnippets(content.data);
        } catch (error) {
            console.error(error)
        }
    }


    /*
    Compare to string for a match of partial match.

    @param  {string}    current     user-typed value in the input field
    @param  {string}    actual      word/string in the text (up to the point of the cursor)    
    */
    const isWordMatch = (current: string, actual: string) => {
        if (!current || !actual) {
            return false;
        }
        return actual === current || 
            actual.startsWith(current);
    }


    /*
    Wrap each letter of a word in a span
    
    @param {string}     word    string to be wrapped
    */
    const spanify = (word: string, pos: number) => {
        const wordArr = word.split('');

        return wordArr.map((letter, i) => {
            const subLen = textDisplayHighlight[cursor];
            if (cursor >= pos) {
                return <span className={
                    (textDisplayHighlight[cursor] > 0 && i < subLen) || cursor > pos ? 
                    `text-green-500`:
                    'bg-red-200'
                } key={uuidv4()}>{letter}</span>
            } else {
                return <span key={uuidv4()}>{letter}</span>
            }
        });
    }


    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault(); 
        const expected = textDisplay[cursor];
        const actual = e.currentTarget.value;
        setInputField(actual);
        // console.log(isWordMatch(actual, expected));
        // console.log(`${expected} : ${actual}`);
         
        const textDipslayHighlightUpdate = {...textDisplayHighlight}
        if (isWordMatch(actual, expected)) {
            const subLen = actual.length;
            textDipslayHighlightUpdate[cursor] = subLen;
        } else if (!actual) {
            textDipslayHighlightUpdate[cursor] = 0;
        } else {
            textDipslayHighlightUpdate[cursor] = -1;
        }
        setTextDisplayHighlight(textDipslayHighlightUpdate);
    }


    const keyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === " " || e.code === "Space") {
            const expected = textDisplay[cursor];
            const actual = inputField;

            if (isWordMatch(expected, actual)) {
                // clear input field
                setInputField("");
                // skip space between words
                setCursor(cursor => cursor + 2);
            }
        }
    }


    useEffect(() => {
        const url = `${BaseURL}/api/rand?page=1&limit=20`;
        fetchData(url);
    }, []);


    useEffect(() => {
        if (snippets && snippets.length > 0) {
            const newDisplaySnippet: Snippet = snippets[snippets.length - 1];
            setDisplaySnippet(newDisplaySnippet);
            // preserve white space in text
            let newDisplayText: string = newDisplaySnippet.text.replaceAll('\n', ' ');
            let newDisplayTextArr: string[] = newDisplayText.split(' ');
            newDisplayText = newDisplayTextArr.join('* *');
            newDisplayTextArr = newDisplayText.split('*');
            setTextDisplay(newDisplayTextArr);
            setTextDisplayHighlight(Array.from({
                length: newDisplayTextArr.length
            }, _ => 0));
        }
    }, [snippets]);


    useEffect(() => {
    }, [textDisplayHighlight]);


    return (
        <div className="flex flex-col w-2/3 h-auto border-2 border-purple-500 p-4">
            <h2>3...2...1..LIFT OFF! Type the text below:</h2>
            <div>
            </div>
            <div className="flex flex-col border-2 border-pink-500 gap-4 p-4">
                <p className="border-2 border-black rounded-md h-auto w-full p-4">
                    {textDisplay.map((word, i) => {
                        return spanify(word, i);
                    })}
                </p>
                <input className="border-2 border-green-500 p-2 rounded-md" 
                        type="text"
                        onChange={inputHandler}
                        onKeyUp={keyUpHandler}
                        value={inputField}
                        />
            </div>
        </div>
    );
}