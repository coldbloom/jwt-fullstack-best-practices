import dotenv from 'dotenv';
dotenv.config(); // используется для загрузки переменных среды из файла .env и их добавления в объект process.env в приложении Node.js

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import fingerprint from 'express-fingerprint';

import "reflect-metadata" // для typeORM
import { AppDataSource } from "./data-source";

import router from './routes';
import { TokenService } from "./services/Token";

const PORT = process.env.PORT;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors( { credentials: true, origin: process.env.CLIENT_URL }));

app.use(fingerprint());

app.use('/', router);

// @ts-ignore
app.get("/resource/protected", TokenService.checkAccess, (_, res) => {
  return res.status(200).json("Добро пожаловать" + Date.now());
});

const start = async () => {
  try {
    AppDataSource.initialize()
      .then(() => console.log("AppDataSource initialized"))
      .catch((err) => console.log("Error during Data Source initialization", err));

    app.listen(PORT, () => console.log(`server started on port ${PORT}`))

  } catch (e) {
    console.error(e);
  }
}

start();





