import { Server, IncomingMessage } from 'http'
import { getTimeStamp } from '../util/util';
import internal from 'stream';
import { WebSocket, WebSocketServer } from 'ws';
import { v4 as uuidv4 } from 'uuid';
import Snippet from '../models/snippet';

// extending websocket to include id and sessionIDx
declare module "ws" {
    interface WebSocket {
        sessionID: string;
        playerID: string;
    }
}


interface DataTransfer {
    dataType: string;
    matchMakeSuccess?: boolean;
    content?: string;
}


export default async function setUpWebServer(expressServer: Server) {

    // 2 connections per session
    const sessions = new Map<string, WebSocket[]>();

    // Don't need to create an addtional http server, we will use express.
    const wss = new WebSocketServer({
        noServer: true,
        path: "/websocket"
    });

    // hook our express http server with our newly made scoket server
    expressServer.on("upgrade", (request: IncomingMessage, socket: internal.Duplex, head: Buffer) => {

        wss.handleUpgrade(request, socket, head, (ws: WebSocket) => {
            // trigger on.('connection') listener
            wss.emit("connection", ws, request);
        })
    });


    wss.on("connection", (ws: WebSocket, request: IncomingMessage) => {
        logSessions();

        const dataTransfer: DataTransfer = {
            dataType: "CONNECTION"
        }

        ws.playerID = uuidv4();

        // find a joinable session
        if (sessions.size > 0) {
            for (let [id, clients] of sessions.entries()) {
                if (clients.length < 2) {
                    ws.sessionID = id;
                    sessions.get(id)!.push(ws);
                    dataTransfer.matchMakeSuccess = true;
                    // call api to get snippet for both users ->
                    sendSnippet(dataTransfer, [...clients, ws]);
                }
            }
        }

        if (!ws.sessionID) {
            ws.sessionID = uuidv4();
            sessions.set(ws.sessionID, [ws]);
            dataTransfer.matchMakeSuccess = false;
            broadcast(JSON.stringify(dataTransfer), [ws]);
        }
        logSessions();


        // every time wss gets data from client
        ws.on("message", (data: Buffer | ArrayBuffer | Buffer[]) => {
            const timestamp = getTimeStamp();
            // temp logging
            const raw = data.toString();
            console.log(`[from client @ ${timestamp}]: ${raw}`);

            const dataTransfer: DataTransfer = JSON.parse(raw);
            switch (dataTransfer.dataType) {

                case "MESSAGE": 
                    let opponent = 
                            sessions.get(ws.sessionID)?.filter(player => 
                                player.playerID !== ws.playerID);
                    if (opponent) {
                        broadcast(raw, opponent);
                    }
                    
                    break;

                default: 
                    console.log(raw);
            }
        });


        ws.on('close', () => {
            for (let [id, clients] of sessions.entries()) {
                if (id === ws.sessionID) {
                    const minusClient = clients.filter(client => client.sessionID !== id);
                    // inform other participant of disconnect
                    for (let other of minusClient) {
                        other.send(JSON.stringify({
                            dataType: "DISCONNECT",
                        }));
                    }
                    sessions.delete(id);
                }
            }
        });
    });


    const broadcast = (msg: string, recipients: WebSocket[]) => {
        recipients.forEach(client => {
            client.send(msg, (error) => {
                if (error) {
                    console.log(error);
                }
            });
        });
    }


    const sendSnippet = async (data: DataTransfer, recipients: WebSocket[]) => {
       
        const getSnippetServerSide = async (limit: number) => {
            try {
                const result = await Snippet.aggregate([
                    { $sample: { size: limit } },
                ]);
                return result;
            } catch (error) {
                console.error(error);
            }
        }

        const snippet = await getSnippetServerSide(1)
        data.content = JSON.stringify(snippet);
        broadcast(JSON.stringify(data), recipients);

    } 


    const logSessions = () => {
        console.log(`current client connections: ${wss.clients.size}`);
        console.log(`current sessions:${sessions.size}`);
        for (let [id, session] of sessions) {
            console.log(`${id}: ${session}`);
        }
    }



    return wss;
}