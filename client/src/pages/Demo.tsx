import React from 'react';
import PostForm from "../components/forms/postForm";

const Demo = () => {
    return (
        <div className='page'>
            <h1>Демо</h1>
            <p>Тестируем typeORM на сервере typeScript Express</p>
            <PostForm />
        </div>
    );
};

export default Demo;