import { Server, IncomingMessage } from 'http'
import { RawData, WebSocketServer } from 'ws';
import queryString from "query-string";
import { getTimeStamp } from '../util/util';
import internal from 'stream';


export default async function setUpWebServer(expressServer: Server) {
    // set up our web socket server without creating an additional http server
    // as we are going to use the express http server.
    const wss = new WebSocketServer({
        noServer: true,
        path: "/websockets"
    });


    // hook our express http server with our newly made scoket server
    expressServer.on("upgrade", (request: IncomingMessage, socket: internal.Duplex, head: Buffer) => {

        wss.handleUpgrade(request, socket, head, (ws) => {
            // trigger on.('connection') listener
            wss.emit("connection", ws, request);
        })
    });


    wss.on("connection", (ws, request) => {
        
        const [path, params] = request?.url?.split("?") as string[];
        const connectionParams = queryString.parse(params);

        console.log(connectionParams);

        // send test message on connection
        ws.send("Welcome....");

        // every time wss gets data from client
        ws.on("message", (data) => {
            const timestamp = getTimeStamp();
            const msg = JSON.parse(data.toString());
            console.log(`[from client @ ${timestamp}]: ${msg}`);

            // test reply
            ws.send("loud and clear");
        });

    });

    return wss;
}