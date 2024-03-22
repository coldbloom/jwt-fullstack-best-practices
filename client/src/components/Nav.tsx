import React from 'react';
import {Link} from "react-router-dom";

const Nav = () => {
    return (
        <nav>
            <Link to="sign-in">Вход</Link>
            <Link to="sign-up">Регистрация</Link>
            <Link to="demo">Демо</Link>
        </nav>
    );
};

export default Nav;