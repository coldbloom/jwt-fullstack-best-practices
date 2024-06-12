import {createContext, ReactNode, useEffect, useState} from "react";
import axios, {AxiosInstance, InternalAxiosRequestConfig} from "axios";

import inMemoryJWT from "../services/inMemoryJWT";
import showErrorMessage from "../services/showErrorMessage";
//import { Loader } from "../components/loader/badZoom/loader";
import { Zoom } from "../components/loader/zoom";

type ContextProps = {
  data: any; // Замените any на тип данных, который вы ожидаете хранить в контексте
  handleFetchProtected: () => void;
  handleLogOut: () => void;
  handleSignUp: (data: { login: string; password: string }) => void;
  handleSignIn: (data: { login: string; password: string }) => void;
  isUserLogged: boolean;
  isAppReady: boolean;
}

export const AuthContext = createContext<ContextProps>({
  data: null,
  handleFetchProtected: () => {},
  handleLogOut: () => {},
  handleSignUp: () => {},
  handleSignIn: () => {},
  isUserLogged: false,
  isAppReady: false,
});

const resourceClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
})

resourceClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = inMemoryJWT.getToken();

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const instanceAxios: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true, // запросы, отправляемые с помощью этого экземпляра Axios, будут отправлять куки (cookies) при кросс-доменных запросах.
});

const AuthProvider = ({children}: {children: ReactNode}) => {
  const [isAppReady, setIsAppReady] = useState(false); // отвечает за готовность приложения к работе
  const [isUserLogged, setIsUserLogged] = useState(false); // является ли пользователь авторизованным
  const [data, setData] = useState();

  useEffect(() => {
    instanceAxios.post('auth/refresh')
      .then(res => {
        const { accessToken, accessTokenExpiration } = res.data;
        inMemoryJWT.setToken(accessToken, accessTokenExpiration);

        setIsAppReady(true);
        setIsUserLogged(true);
      })
      .catch(() => {
        setIsAppReady(true);
        setIsUserLogged(false);
      });
  }, []);

  useEffect(() => {
    const handlePersistedLogout = (event: StorageEvent) => {
      if (event.key === process.env.REACT_APP_LOGOUT_STORAGE_KEY) {
        inMemoryJWT.deleteToken();
        setIsUserLogged(false);
      }
    };

    window.addEventListener("storage", handlePersistedLogout);
  }, []);

  const handleFetchProtected = () => {
    resourceClient.get("/resource/protected")
      .then(res => setData(res.data))
      .catch(showErrorMessage);
  };

  const handleLogOut = () => {
    instanceAxios.post('/auth/logout')
      .then(() => {
        inMemoryJWT.deleteToken();
        setIsUserLogged(false);
      })
      .catch(showErrorMessage);
  };

  const handleSignUp = async (data: { login: string; password: string }) => {
    await instanceAxios.post('/auth/sign-up', data)
      .then(res => {
        const { accessToken, accessTokenExpiration } = res.data;

        inMemoryJWT.setToken(accessToken, accessTokenExpiration);
        setIsUserLogged(true);
      })
      .catch(error => showErrorMessage(error));
  };

  const handleSignIn = async (data: { login: string; password: string }) => {
    await instanceAxios.post('/auth/sign-in', data).then(res => {
      const { accessToken, accessTokenExpiration } = res.data;

      inMemoryJWT.setToken(accessToken, accessTokenExpiration);
      setIsUserLogged(true);
    })
    .catch(showErrorMessage);
  };

  return (
    <AuthContext.Provider
      value={{
        data,
        handleFetchProtected,
        handleLogOut,
        handleSignUp,
        handleSignIn,
        isUserLogged,
        isAppReady
      }}
    >
      {isAppReady
        ? children
        : <Zoom />
      }
    </AuthContext.Provider>
  );
}

export default AuthProvider;