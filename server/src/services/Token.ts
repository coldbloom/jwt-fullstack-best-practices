import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import {handleServerError} from "../utils/Errors";

dotenv.config();

type TPayload = {
  id: number;
  login: string;
  password: string;
};

export class TokenService {
  static async generateAccessToken(payload: TPayload) {
    const { id, login, password } = payload;
    return await jwt.sign({ id, login, password }, process.env.ACCESS_TOKEN_SECRET as string, {
      expiresIn: "30m",
    });
  }

  static async generateRefreshToken(payload: TPayload) {
    const { id, login, password } = payload;
    return await jwt.sign({ id, login, password }, process.env.REFRESH_TOKEN_SECRET as string, {
      expiresIn: "15d",
    });
  }

  static checkAccess(req: Request & { user: any }, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    const token = authHeader?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized', message: 'Access token is missing or invalid' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (error, user) => {
      if (error) {
        handleServerError(error, res, 403)
      }

      // console.log(user, ' checkAccess');
      // req.user = user;
      next();
    });
  }
};