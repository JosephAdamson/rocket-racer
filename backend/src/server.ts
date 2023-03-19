// how to import dotenv whilst using envalid
import 'dotenv/config';
import app from './app';
import connectDB from './db/connect';
import env from './util/validateEvn';
import setUpWebServer from './websockets';


const PORT = env.PORT || 5000;


const start = async () => {
    try {
        await connectDB(env.MONGO_URI);
        const httpServer = app.listen(PORT, "0.0.0.0", () => {
            console.log(`Express server listening on port ${PORT}`);
        });
        const wss = setUpWebServer(httpServer);

    } catch (error) {
        console.error(error);
    }
}

start();