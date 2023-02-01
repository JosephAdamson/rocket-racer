import { useEffect, useState } from "react";
import { BaseURL } from "../shared";
import { Snippet } from "../types"; 


export default function GameWindow() {
    const [textDisplay, setTextDisplay] = useState<string>('');
    const [snippets, setSnippets] = useState<Snippet[]>([]);
    const [displaySnippet, setDisplaySnippet] = useState<Snippet>();


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
            // load snippet
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        const url = `${BaseURL}/api/rand?page=1&limit=20`;
        fetchData(url);
    }, []);


    useEffect(() => {
        if (snippets && snippets.length > 0) {
            setDisplaySnippet(snippets[snippets.length -1]);
        }
    }, [snippets]);


    useEffect(() => {
        if (displaySnippet) {
            setTextDisplay(displaySnippet.text);
        }
    }, [displaySnippet])


    return (
        <div>
            <p className="border-2 border-black h-40">
                {textDisplay}
            </p>
        </div>
    );
}