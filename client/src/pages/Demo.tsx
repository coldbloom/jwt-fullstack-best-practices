import { useContext } from 'react';
import { AuthContext} from "../context/AuthContext";

const Demo = () => {
  const { data, handleLogOut, handleFetchProtected } = useContext(AuthContext);

  return (
    <div className='page'>
      <p>{JSON.stringify(data)}</p>
      <button onClick={handleFetchProtected}>
        Запрос на защищенный роут
      </button>
      <button onClick={handleLogOut}>
        Выйти
      </button>
      <h1>Демо</h1>
    </div>
  );
};

export default Demo;