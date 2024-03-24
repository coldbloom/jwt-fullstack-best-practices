import React from 'react';
import s from './form.module.css'
import {useForm, SubmitHandler} from "react-hook-form";
import axios from "axios";

type Inputs = {
    login: string,
    password: string,
}

const defaultValues = {
    login: '',
    password: '',
}

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: formState,
    } = useForm<Inputs>({
        defaultValues: defaultValues,
        mode: "onBlur" // режим валидации ошибок - на onBlur (популярный)
    })
    const onSubmit: SubmitHandler<Inputs> = (data) =>
        console.log(data, formState, formState.isSubmitting, formState.errors, formState.isValid, ' gg');

    console.log(watch("login"), formState.isValid);
    console.log(watch("password"));

    return (
        <form onSubmit={handleSubmit(onSubmit)}
              className={s.form_wrapper}
        >
            <div className={s.input_wrapper}>
                <input
                    // defaultValue="test"
                    placeholder="Логин"
                    {...register("login", {
                        required: "Введите логин!",
                    })}
                />

                {formState.errors.login &&
                    <span className={s.error_text}>{formState.errors.login.message}</span>
                }
            </div>

            <div className={s.input_wrapper}>
                <input
                    placeholder="Пароль"
                    // defaultValue="required value"
                    {...register("password", {
                        required: "Введите пароль!",
                    })}
                />
                {formState.errors.password &&
                    <span className={s.error_text}>{formState.errors.password.message}</span>
                }
            </div>

            <button type="submit" disabled={!formState.isValid}>
                Войти
            </button>
        </form>
    );
};

export default LoginForm;