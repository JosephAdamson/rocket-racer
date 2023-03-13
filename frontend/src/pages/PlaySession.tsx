import { useState, useRef, useEffect } from "react";
import { DataType } from "../util";
import WaitingModal from "../components/WaitingModal";
import Session from "../components/Session";

// This is just a temp component to test browser websocket API against
// our webscoket server
export default function PlaySession() {
    const [connection, setConnection] = useState<WebSocket | null>(null);
    const [msg, setMsg] = useState<string>("Hello")
    const inputDisplay = useRef<HTMLInputElement | null>(null);
    // hard code url for websocket server for now

    const [isWaiting, setIsWaiting] = useState<boolean>(true);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:5000/websocket");


        ws.addEventListener("message", (e: MessageEvent<any>) => {
            const data = JSON.parse(e.data);
            if (data.dataType) {
                switch (data.dataType) {
                    case DataType.CONNECTION: 
                        console.log(data);
                        if (data.matchmake_success) {
                            setIsWaiting(false);
                            console.log(isWaiting);
                        }
                        break;
                    
                    case DataType.MESSAGE:
                        setMsg(data.content);
                        break;

                    default:
                        console.log(e.data);
                }
            }
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


    useEffect(() => {
        return () => {
            connection?.close()
        }
    }, [connection])


    return (
        <div>
            {isWaiting ?
                 <WaitingModal/> :
                 <Session/>
            }
        </div>
        // <div className="flex flex-col">
        //     <div>{msg}</div>
        //     <input className="p-1" ref={inputDisplay} type="text"></input>
        //     <input className="bg-slateBlue p-1 rounded-md text-white my-1" type="submit" onClick={() => {
        //         const msg: string | undefined = inputDisplay.current?.value;
        //         if (msg && connection) {
        //             connection.send(msg);
        //             inputDisplay!.current!.value = "";
        //         }
        //     }}/>
        // </div>
        
    );
}