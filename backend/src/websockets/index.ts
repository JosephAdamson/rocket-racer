import { Server, IncomingMessage } from 'http'
//import queryString from "query-string";
import { getTimeStamp } from '../util/util';
import internal from 'stream';
import { WebSocket, WebSocketServer } from 'ws';
import { v4 as uuidv4 } from 'uuid';
import { DataType } from '../util/util';

// extending websocket to include id
declare module "ws" {
    interface WebSocket {
        sessionID: string;
    }
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

        // find a joinable session
        if (sessions.size > 0) {
            let sessionID;
            for (let [id, clients] of sessions.entries()) {
                if (clients.length < 2) {
                    sessionID = id;
                    sessions.get(sessionID)!.push(ws);
                    broadcast(JSON.stringify({
                        dataType: DataType.CONNECTION,
                        matchMakeSuccess: true
                    }), [...clients, ws]);
                }
            }
            if (!sessionID) {
                sessionID = uuidv4();
                ws.sessionID;
                sessions.set(sessionID, [ws]);
                broadcast(JSON.stringify({
                    dataType: DataType.CONNECTION,
                    matchMakeSuccess: false
                }), [ws]);
            }
        } else {
            let sessionID = uuidv4();
            ws.sessionID = sessionID;
            sessions.set(sessionID, [ws]);
            console.log(sessions.size);
            broadcast(JSON.stringify({
                dataType: DataType.CONNECTION,
                matchMakeSuccess: false
            }), [ws]);
        }
        logSessions();


        ws.send(JSON.stringify({
            dataType: DataType.MESSAGE,
            content: "Welcome..."
        }));

        // every time wss gets data from client
        ws.on("message", (data: Buffer | ArrayBuffer | Buffer[]) => {
            const timestamp = getTimeStamp();
            //const msg = JSON.parse(data.toString());
            const msg = data.toString();
            console.log(`[from client @ ${timestamp}]: ${msg}`);
            ws.send(JSON.stringify({
                dataType: DataType.MESSAGE,
                content: `Echo: ${msg}`
            }));
        });


        ws.on('close', () => {
            for (let [id, clients] of sessions.entries()) {
                if (id === ws.sessionID) {
                    const minusClient = clients.filter(client => client.sessionID !== id);
                    // inform other participant of disconnect
                    for (let other of minusClient) {
                        other.send(JSON.stringify({
                            dataType: DataType.DISCONNECT,
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