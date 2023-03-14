import { useState } from "react";
import { Snippet } from "../types";
import { useNavigate } from "react-router-dom";


export default function useFetch(url: string, method: string, headers: HeadersInit, body: string) {
    const [errorStatus, setErrorStatus] = useState<boolean>();
    const navigate = useNavigate();


    const request = async (): Promise<Snippet> => {
        try {
            console.log(`url: ${url}`);
            console.log(`method: ${method}`);
            const response = await fetch(url, {
                method: method,
                headers: headers,
            });
            if (response.status === 404) {
                throw new Error("Oops something went wrong with the fetch");
            }
            const content = await response.json();
            return content.data[0];

        } catch (error) {
            setErrorStatus(true);
            navigate("*");
            throw new Error("fetch failed");
        }
    }


    return {request, errorStatus} 
}