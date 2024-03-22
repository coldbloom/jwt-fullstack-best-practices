import React from 'react';
import s from './loginForm.module.css'
import { useForm, SubmitHandler } from "react-hook-form";

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
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data, formState);

    console.log(watch("example"));
    console.log(watch("exampleRequired"));

    return (
        <form onSubmit={handleSubmit(onSubmit)}
              className={s.form_wrapper}
        >
            <input
                type="text"
                defaultValue="test"
                {...register("example")}
            />

            <input
                type="text"
                defaultValue="required value"
                {...register("exampleRequired")}
            />

            <button type="submit">
                Войти
            </button>
        </form>
    );
};

export default LoginForm;