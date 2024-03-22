import React from 'react';
import s from './loginForm.module.css'
import {useForm, SubmitHandler} from "react-hook-form";

type Inputs = {
    example: string,
    exampleRequired: string,
}

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: formState,
    } = useForm<Inputs>({
        mode: "onBlur" // режим валидации ошибок - на onBlur (популярный)
    })
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data, formState, formState.isSubmitting, formState.errors);

    console.log(watch("example"));
    console.log(watch("exampleRequired"));

    return (
        <form onSubmit={handleSubmit(onSubmit)}
              className={s.form_wrapper}
        >
            <input
                // defaultValue="test"
                placeholder="Логин"
                {...register("example", {
                    required: "Поле обязательно к заполнению",
                    minLength: 4,
                    maxLength: 20
                })}
            />

            <input
                placeholder="Пароль"
                // defaultValue="required value"
                {...register("exampleRequired", {
                    required: true,
                    minLength: 4,
                    maxLength: 8
                })}
            />

            <div>
                {formState.errors.example && <p>{formState.errors.example.message || 'Другая ошибка'}</p>}
            </div>

            <button type="submit"
                // disabled={formState.isDirty}
            >
                Войти
            </button>
        </form>
    );
};

export default LoginForm;