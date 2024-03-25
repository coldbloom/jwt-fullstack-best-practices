require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./routes/index')
const {connectDatabase} = require('./connctDatabase')
const Fingerprint = require("express-fingerprint");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cookieParser()); // Когда клиент отправляет запрос, содержащий cookie, этот middleware разбирает cookie и делает его доступным в вашем приложении для дальнейшей обработки.
app.use(express.json()); // Когда клиент отправляет данные в теле запроса в формате JSON, этот middleware разбирает JSON-форматированные данные и делает их доступными в вашем приложении в виде JavaScript объекта.
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));

app.use(
    Fingerprint({
        parameters: [Fingerprint.useragent, Fingerprint.acceptHeaders],
    })
);

app.use('/', router)

connectDatabase();

const start = async = () => {
    try {
        app.listen(PORT, () => console.log(`server start on port: ${PORT}`));
    } catch (e) {
        console.log(e)
    }
}

start();

