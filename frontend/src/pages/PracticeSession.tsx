import Session from "../components/Session"
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from 'react';
import { Snippet } from "../types";
import { BaseURL } from "../shared";

export default function PracticeSession() {
    const [snippetData, setSnippetData] = useState<Snippet | null>(null);
    const url = `${BaseURL}/api/rand?page=1&limit=1`;
    const { request } = useFetch(url, "GET", {'Content-Type': 'application/json'}, "");
    

    const fetchWrap = async () => {
        const data = await request();
        setSnippetData(data);
    }


    useEffect(() => {
        fetchWrap();
        console.log(snippetData);
    },[]);


    return (
        <>
            { snippetData &&
                <Session snippet={snippetData} isTwoPlayer={false}/>
            }
        </>
    );
}