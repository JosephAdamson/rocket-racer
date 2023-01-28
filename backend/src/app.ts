import express from 'express';
import morgan from 'morgan';
import router from './routes/snippets';
import errorHandler from './middleware/errorHandler';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api', router);

// middleware for routes
app.use(errorHandler);

export default app;