import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { handleServerError } from '../utils/Errors'
import { User, RefreshSession } from '../entities'
import { AppDataSource} from "../data-source";
import { TokenService } from "../services/Token";
import { COOKIE_SETTINGS, ACCESS_TOKEN_EXPIRATION } from  "../constants"
import jwt, {JwtPayload} from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();

type TPayload = {
  id: number;
  login: string;
  password: string; // hash password
}

class AuthController {
  static async signup(req: Request, res: Response) {
    try {
      const browserFingerprint = req.fingerprint;
      const { login, password } = req.body;

      const userRepository = AppDataSource.getRepository(User);

      //* Проверяем, существует ли пользователь с таким логином */
      const existingUser = await userRepository.findOne({ where: {login} });

      if (existingUser) {
        //* Если пользователь существует, отправляем сообщение об ошибке */
        return res.status(400).send('Пользователь с таким логином уже существует');
      }

      const hashPassword = bcrypt.hashSync(password, 8);

      const user = userRepository.create({ login, password: hashPassword });
      const { id: userId} = await userRepository.save(user);

      const accessToken = await TokenService.generateAccessToken(user);
      const refreshToken = await TokenService.generateRefreshToken(user);

      const sessionData = {
        user,
        refreshToken,
        fingerPrint: browserFingerprint?.hash
      };

      const refreshSessionRepository = AppDataSource.getRepository(RefreshSession);
      await refreshSessionRepository.save(refreshSessionRepository.create(sessionData)); // создаем хапись в бд о рефреш-сессии и сохраняем ее //
      //const refreshSession = refreshSessionRepository.create(sessionData); // создаем хапись в бд о рефреш-сессии //
      //await refreshSessionRepository.save(sessionData);

      res.cookie('refreshToken', refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN);

      res.status(200).send({ accessToken, accessTokenExpiration: ACCESS_TOKEN_EXPIRATION});
    } catch (error) {
      handleServerError(error as Error, res)
    }
  };

  static async signIn(req: Request, res: Response) {
    try {
      const browserFingerprint = req.fingerprint;
      const { login, password } = req.body;

      const userRepository = AppDataSource.getRepository(User);

      const userData = await userRepository.findOneBy({ login });
      if (!userData) {
        return res.status(404).send('Пользователь не найден');
      }

      const isPasswordValid = bcrypt.compareSync(password, userData.password);

      if (!isPasswordValid) {
        return res.status(401).send('Неправильный логин или пароль');
      }

      const accessToken = await TokenService.generateAccessToken(userData);
      const refreshToken = await TokenService.generateRefreshToken(userData);

      // создаем запись в бд
      const refreshSessionRepository = AppDataSource.getRepository(RefreshSession);
      const refreshSession = new RefreshSession();
      refreshSession.user = userData; // Устанавливаем связь с пользователем
      refreshSession.refreshToken = refreshToken;
      refreshSession.fingerPrint = browserFingerprint?.hash || ''; // fixme небольшой костыль
      await refreshSessionRepository.save(refreshSession);

      res.cookie('refreshToken', refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN);

      res.status(200).json({ accessToken, accessTokenExpiration: ACCESS_TOKEN_EXPIRATION});
    } catch (error) {
      handleServerError(error as Error, res)
    }
  };

  static async refresh(req: Request, res: Response) {
    const { fingerprint } = req;
    const currentRefreshToken = req.cookies.refreshToken;

    try {
      if (!currentRefreshToken) {
        return res.status(401).send('Отсутствует refresh token');
      }

      const refreshSessionRepository = AppDataSource.getRepository(RefreshSession);
      const refreshFromDB = await refreshSessionRepository.findOneBy({ refreshToken: currentRefreshToken });

      if (!refreshFromDB) {
        return res.status(401).send('Пользователь не авторизован');
      }

      if (refreshFromDB?.fingerPrint !== fingerprint?.hash) { // на случай если угнали токены при рефреше сравниваем fingerprint из базы и fingerprint c запроса
        return res.status(401).send('Пользователь не авторизован');
      }

      // удаляем refresh сессию из БД - ниже заменим на новую запись
      await refreshSessionRepository.remove(refreshFromDB);

      const { id, login, password } = jwt.verify(currentRefreshToken, process.env.REFRESH_TOKEN_SECRET as string) as JwtPayload & TPayload;
      //console.log(id, login, ' payload refresh id, login ');

      // const actualPayload = { id, login, password };

      const newAccessToken = await TokenService.generateAccessToken({ id, login, password });
      const newRefreshToken = await TokenService.generateRefreshToken({ id, login, password });

      const newSessionData = {
        userId: id, // устанавливаем связь с табличкой user передаем только его id
        refreshToken: newRefreshToken,
        fingerPrint: fingerprint?.hash
      };

      const newRefreshSession = refreshSessionRepository.create(newSessionData);
      await refreshSessionRepository.save(newSessionData);

      //console.log(newRefreshSession, ' newRefreshSession Ты должна была быть создана why????');

      res.cookie("refreshToken", newRefreshToken, COOKIE_SETTINGS.REFRESH_TOKEN);

      return res.status(200).json({ accessToken: newAccessToken, accessTokenExpiration: ACCESS_TOKEN_EXPIRATION });
    } catch (error) {
      handleServerError(error as Error, res);
    }
  };

  static async logout(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies.refreshToken;
      const fingerprint = req.fingerprint;

      //* удаляем табличку refresh сессии в бд */
      const refreshSessionRepository = AppDataSource.getRepository(RefreshSession);
      const refreshSession = await refreshSessionRepository.findOneBy({ refreshToken });

      if (refreshSession) {
        const deletedRefreshSession = await refreshSessionRepository.remove(refreshSession);
      }

      //* очищаем cookie на стороне сервера */
      res.clearCookie('refreshToken');

      return res.status(200).send('logout success');
    } catch (error) {
      handleServerError(error as Error, res);
    }
  };
}

export default AuthController;