import { useState, useRef } from "react";

// This is just a temp component to test browser websocket API against
// our webscoket server
export default function PlaySession() {
    const [msg, setMsg] = useState<string>("Hello")
    const textInput = useRef<HTMLInputElement | null>(null);

    // hard code url for websocket server for now
    const ws = new WebSocket("ws://localhost:5000/websocket");


    ws.addEventListener("message", (e: MessageEvent<any>) => {
        const txt = e.data;
        setMsg(txt);
        if (textInput && textInput.current) {
            textInput.current.value = "";
        }
    });


    ws.addEventListener("close", (e: CloseEvent) => {
        console.log("Client socket closed succesfully");
        if (e.reason) {
            console.log(e.reason);
        }
        ws.close();
    });


    return (
        <div className="flex flex-col">
            <div>{msg}</div>
            <input className="p-1" ref={textInput} type="text"></input>
            <input className="bg-slateBlue p-1 rounded-md text-white my-1" type="submit" onClick={() => {
                const msg: string | undefined = textInput.current?.value;
                if (msg) {
                    ws.send(msg);
                }
            }}/>
        </div>
        
    );
}