import 'dotenv/config';
import * as songData from './lyrics.json';
import connectDB from './connect';
import env from '../util/validateEvn';
import Snippet from '../models/snippet';

/*
Reset and populate DB 
*/
const populate = async () => {
    let snippets;
    try {
        await connectDB(env.MONGO_URI);
        await Snippet.deleteMany({});
        for (let [artist, songs] of Object.entries(songData)) {
            console.log(artist);
            snippets = songs;
            await Snippet.create(snippets);
        }
        console.log("DB successfully re-populated");
        // kill the process and disconnect from db
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
populate();