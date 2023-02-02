import { useEffect, useState , ChangeEvent, KeyboardEvent} from "react";
import { BaseURL } from "../shared";
import { Snippet } from "../types";


export default function GameWindow() {
    const [textDisplay, setTextDisplay] = useState<string[]>([]);
    const [snippets, setSnippets] = useState<Snippet[]>([]);
    const [displaySnippet, setDisplaySnippet] = useState<Snippet>();
    const [cursor, setCursor] = useState<number>(0);


    /*
    Fetch Snippet data from Rocket Racer API
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
            console.log(error)
        }
    }


    /*
    compare to string for a match of partial match.

    @param  {string}    current     user-typed value in the input field
    @param  {string}    actual      word/string in the text (up to the point of the cursor)    
    */
    const isWordMatch = (current: string, actual: string) => {
        if (!current || !actual) {
            return false;
        }
        return actual === current || 
            current.startsWith(current.slice(Math.max(actual.length -1, 1)));
    }


    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault(); 
        const expected: string = textDisplay[cursor];
        const actual: string = e.currentTarget.value;
        console.log(isWordMatch(actual, expected));
        console.log(`${expected} : ${actual}`);

        if (isWordMatch(actual, expected)) {
                            
        }
    }


    const keyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === " " || e.code === "Space") {
            console.log("Spacebar, hell yeah!");
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
            setTextDisplay(newDisplaySnippet.text.split(' '));
        }
    }, [snippets]);


    return (
        <div className="flex flex-col w-2/3 h-auto border-2 border-purple-500 p-4">
            <h2>3...2...1..LIFT OFF! Type the text below:</h2>
            <div>
            </div>
            <div className="flex flex-col border-2 border-pink-500 gap-4 p-4">
                <p className="border-2 border-black rounded-md h-auto p-4">
                    {textDisplay.join(' ')}
                </p>
                <input className="border-2 border-green-500 p-1 rounded-md" 
                        type="text"
                        onChange={inputHandler}
                        onKeyUp={keyUpHandler}
                        />
            </div>
        </div>
    );
}