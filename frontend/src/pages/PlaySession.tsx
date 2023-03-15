import { useState, useEffect } from "react";
import WaitingModal from "../components/WaitingModal";
import Session from "../components/Session";
import { useNavigate } from "react-router-dom";
import { Snippet, DataTransfer } from "../types";

// This is just a temp component to test browser websocket API against
// our webscoket server
export default function PlaySession() {
    const [connection, setConnection] = useState<WebSocket | null>(null);
    const navigate = useNavigate();
    const [displaySnippet, setDisplaySnippet] = useState<Snippet | null>(null)
    const [isWaiting, setIsWaiting] = useState<boolean>(true);
    const [player2Cursor, setPlayer2Cursor] = useState<number>(0);


    useEffect(() => {
        // hard code url for websocket server for now
        const ws = new WebSocket("ws://localhost:5000/websocket");

        ws.addEventListener("message", (e: MessageEvent<any>) => {
            const data = JSON.parse(e.data);
            if (data.dataType) {
                switch (data.dataType) {
                    case "CONNECTION":
                        if (data.matchMakeSuccess) {
                            const wrappedSnippet = JSON.parse(data.content);
                            setDisplaySnippet(wrappedSnippet[0]);
                            setIsWaiting(false);
                        }
                        break;
                    case "MESSAGE":
                        console.log(data);
                        setPlayer2Cursor(parseInt(data.content));
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


        ws.addEventListener("error", () => {
            navigate("*");
        });


        setConnection(ws);
    }, []);


    useEffect(() => {
        return () => {
            connection?.close()
        }
    }, [connection]);


    /*
    Broadcast cursor progress via socket connection 
    */
    const progressHandler = (cursor: number) => {
        if (connection) {
            const data: DataTransfer = {
                dataType: "MESSAGE",
                content: `${cursor}`
            }
            connection.send(JSON.stringify(data));
        }
    }


    return (
        <div>
            {isWaiting ?
                <WaitingModal /> :
                displaySnippet && <Session snippet={displaySnippet}
                                    isTwoPlayer={true} 
                                    progressHandler={progressHandler}
                                    player2Cursor={player2Cursor}
                                     />
            }
        </div>
    );
}