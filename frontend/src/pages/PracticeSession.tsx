import Session from "../components/Session"
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from 'react';
import { Snippet } from "../types";
import { env } from "../util"
import { useLocation } from "react-router-dom";


export default function PracticeSession() {
    const [snippetData, setSnippetData] = useState<Snippet | null>(null);
    const url = `${env.REACT_APP_BASE_URL}/api/rand?page=1&limit=1`;
    const { request } = useFetch(url, "GET", {'Content-Type': 'application/json'}, "");
    const location = useLocation();
    

    const fetchWrap = async () => {
        const data = await request();
        setSnippetData(data);
    }


    useEffect(() => {
        console.log(location);
        if (location.state) {
            setSnippetData(location.state?.snippet);
        } else {
            fetchWrap();
        }
    },[]);


    return (
        <>
            { snippetData &&
                <Session snippet={snippetData} isTwoPlayer={false}/>
            }
        </>
    );
}