import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import router from './routes';

const PORT = process.env.PORT;
const app = express();

app.use(cors( { origin: process.env.CLIENT_URL || '*' }));

app.use(express.json());

app.use('/', router);

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.error(e);
    }
}

start()





