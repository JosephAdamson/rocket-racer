import express from 'express';
import morgan from 'morgan';
import router from './routes/snippets';
import errorHandler from './middleware/errorHandler';
import cors, { CorsOptions } from 'cors';

const app = express();

// for now just the port React is using
const whiteList: string[] = ['http://localhost:3000'];
const options: cors.CorsOptions = {
    origin: whiteList
}
app.use(cors(options));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', router);

// middleware for routes
app.use(errorHandler);

export default app;