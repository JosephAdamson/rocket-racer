import { Server, IncomingMessage } from 'http'
import { getTimeStamp } from '../util/util';
import internal from 'stream';
import { WebSocket, WebSocketServer } from 'ws';
import { v4 as uuidv4 } from 'uuid';

// extending websocket to include id
declare module "ws" {
    interface WebSocket {
        sessionID: string;
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

        // find a joinable session
        if (sessions.size > 0) {
            let sessionID;
            for (let [id, clients] of sessions.entries()) {
                if (clients.length < 2) {
                    sessionID = id;
                    sessions.get(sessionID)!.push(ws);
                    dataTransfer.matchMakeSuccess = true;
                    broadcast(JSON.stringify(dataTransfer), [...clients, ws]);
                }
            }
            if (!sessionID) {
                sessionID = uuidv4();
                ws.sessionID;
                sessions.set(sessionID, [ws]);
                dataTransfer.matchMakeSuccess = false;
                broadcast(JSON.stringify(dataTransfer), [ws]);
            }
        } else {
            let sessionID = uuidv4();
            ws.sessionID = sessionID;
            sessions.set(sessionID, [ws]);
            console.log(sessions.size);
            dataTransfer.matchMakeSuccess = false;
            broadcast(JSON.stringify(dataTransfer), [ws]);
        }
        logSessions();


        // ws.send(JSON.stringify({
        //     dataType: "MESSAGE",
        //     content: "Welcome..."
        // }));

        // every time wss gets data from client
        ws.on("message", (data: Buffer | ArrayBuffer | Buffer[]) => {
            const timestamp = getTimeStamp();
            //const msg = JSON.parse(data.toString());
            const msg = data.toString();
            console.log(`[from client @ ${timestamp}]: ${msg}`);
            // ws.send(JSON.stringify({
            //     dataType:"MESSAGE",
            //     content: `Echo: ${msg}`
            // }));
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


    const logSessions = () => {
        console.log(`current client connections: ${wss.clients.size}`);
        console.log(`current sessions:${sessions.size}`);
        for (let [id, session] of sessions) {
            console.log(`${id}: ${session}`);
        }
    }

    return wss;
}