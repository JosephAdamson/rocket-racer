import { Server, IncomingMessage } from 'http'
//import queryString from "query-string";
import { getTimeStamp } from '../util/util';
import internal from 'stream';
import { WebSocket, WebSocketServer } from 'ws';
import { v4 as uuidv4 } from 'uuid';


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

        const [path, params] = request?.url?.split("?") as string[];
        //const connectionParams = queryString.parse(params);

        //console.log(connectionParams);

        //console.log(sessions.size);
        console.log(wss.clients.size);
        //find a joinable session
        if (sessions.size > 0) {
            let sessionID;
            for (let [id, clients] of sessions.entries()) {
                if (clients.length < 2) {
                    sessionID = id;
                    sessions.get(sessionID)!.push(ws);
                }
            }
            if (!sessionID) {
                sessions.set(uuidv4(), [ws]);
            }
        } else {
            sessions.set(uuidv4(), [ws]);
        }


        ws.send("Welcome....");

        // every time wss gets data from client
        ws.on("message", (data: Buffer | ArrayBuffer | Buffer[]) => {
            const timestamp = getTimeStamp();
            //const msg = JSON.parse(data.toString());
            const msg = data.toString();
            console.log(`[from client @ ${timestamp}]: ${msg}`);
            ws.send(`Echo: ${msg}`);
            console.log(`current sessions:`);
            for (let [id, session] of sessions) {
                console.log(`${id}: ${session}`);
            }
        });

    });
    return wss;
}