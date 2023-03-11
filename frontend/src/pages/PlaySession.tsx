import { useState, useRef, useEffect } from "react";

// This is just a temp component to test browser websocket API against
// our webscoket server
export default function PlaySession() {
    const [connection, setConnection] = useState<WebSocket | null>(null);
    const [msg, setMsg] = useState<string>("Hello")
    const inputDisplay = useRef<HTMLInputElement | null>(null);
    // hard code url for websocket server for now

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:5000/websocket");


        ws.addEventListener("message", (e: MessageEvent<any>) => {
            const txt = e.data;
            setMsg(txt);
        });


        ws.addEventListener("close", (e: CloseEvent) => {
            console.log("Client socket closed succesfully");
            if (e.reason) {
                console.log(e.reason);
            }
            ws.close();
        });


        setConnection(ws);
    }, []);


    return (
        <div className="flex flex-col">
            <div>{msg}</div>
            <input className="p-1" ref={inputDisplay} type="text"></input>
            <input className="bg-slateBlue p-1 rounded-md text-white my-1" type="submit" onClick={() => {
                const msg: string | undefined = inputDisplay.current?.value;
                if (msg && connection) {
                    connection.send(msg);
                    inputDisplay!.current!.value = "";
                }
            }}/>
        </div>
        
    );
}