import React from 'react';
import LoginForm from "../components/forms/loginForm";
import axios from 'axios'

const SignIn = () => {
    const handleGetRequest = () => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/testRequest`)
            .then(res => console.log(res.data))
    }
    return (
        <div className='page'>
            <h1>Авторизация</h1>
            <LoginForm />
            <button onClick={() => handleGetRequest()}>
                Test Get Request
            </button>
        </div>
    );
};

export default SignIn;