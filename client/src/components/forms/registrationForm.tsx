import React from 'react';
import {useForm, SubmitHandler} from "react-hook-form"
import s from "./form.module.css"
import {getValue} from "@testing-library/user-event/dist/utils";
import axios from "axios";

type Inputs = {
    login: string,
    password: string,
    confirmPassword: string
}

const defaultValues = {
    login: '',
    password: '',
    confirmPassword: ''
}

const RegistrationForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: {isValid, errors}
    } = useForm<Inputs>({
        defaultValues: defaultValues,
        mode: "onBlur"
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/signUp`, {
            name: data.login,
            password: data.password
        }).then(res => console.log(res.data))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}
              className={s.form_wrapper}
        >
            <div className={s.input_wrapper}>
                <input
                    placeholder='Логин'
                    {...register("login", {
                        required: "Введите логин!"
                    })}
                />
                {errors.login &&
                    <span className={s.error_text}>{errors.login.message}</span>
                }

            </div>
            <div className={s.input_wrapper}>
                <input
                    placeholder="пароль"
                    {...register("password", {
                        required: "Введите пароль!"
                    })}
                />
                {errors.password &&
                    <span className={s.error_text}>{errors.password.message}</span>
                }
            </div>
            <div className={s.input_wrapper}>
                <input
                    placeholder="подтвердите пароль"
                    {...register("confirmPassword", {
                        required: "Введите пароль!",
                        validate: (value) => value === watch("password") || "Пароли не совпадают"
                    })}
                />
                {errors.confirmPassword &&
                    <span className={s.error_text}>{errors.confirmPassword.message}</span>
                }
            </div>

            <button type="submit">
                Зарегистрироваться
            </button>
        </form>
    );
};

export default RegistrationForm;