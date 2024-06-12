import { useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
import {Link} from "react-router-dom";

const Nav = () => {
  const { isUserLogged } = useContext(AuthContext);

  return (
    <nav>
      {!isUserLogged && (
        <>
          <Link to="sign-in">Вход</Link>
          <Link to="sign-up">Регистрация</Link>
        </>
      )}
    </nav>
  );
};

export default Nav;