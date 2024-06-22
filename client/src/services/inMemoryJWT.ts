import { instanceAxios } from "../context/AuthContext";

export const inMemoryJWT = () => {
  let inMemoryJWT: string | null = null;
  let refreshTimeoutId: string | number | NodeJS.Timeout | null | undefined = null;

  const getToken = () => inMemoryJWT;

  const setToken = (token: string, tokenExpiration: number) => {
    inMemoryJWT = token;
    refreshToken(tokenExpiration);
  };

  const abortRefreshToken = () => {
    if (refreshTimeoutId) {
      clearInterval(refreshTimeoutId);
    }
  }

  const deleteToken = () => {
    inMemoryJWT = null;
    abortRefreshToken();

    localStorage.setItem(process.env.REACT_APP_LOGOUT_STORAGE_KEY!, String(Date.now())); // для того чтобы осуществлялся выход на всех вкладках, указывает TypeScript; "!" гарантирует, что process.env.REACT_APP_LOGOUT_STORAGE_KEY точно существует и не является undefined
  };

  const refreshToken = (expiration: number) => {
    const timeoutTrigger = expiration - 10000;

    refreshTimeoutId = setTimeout(() => {
      instanceAxios.post('/auth/refresh')
        .then(res => {
          const { accessToken, accessTokenExpiration } = res.data;
          setToken(accessToken, accessTokenExpiration);
        })
        .catch(console.error)
    }, timeoutTrigger);
  }

  return { getToken, setToken, deleteToken };
}

export default inMemoryJWT();
// экспортируем и сразу вызываем чтобы getToken и setToken были доступны через "." как методы у обхекта