import { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form'
import { AuthContext } from "../../context/AuthContext";
import s from './form.module.css'
import {InputField} from "./InputField";

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
    const { handleSignUp } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        watch,
        formState: {isValid, errors}
    } = useForm<Inputs>({
        defaultValues: defaultValues,
        mode: "onBlur"
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            await handleSignUp({ login: data.login, password: data.password })
        } catch (error) {
            console.log('ddd')
        }
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
                {errors.login && <span className={s.error_text}>{errors.login.message}</span>}
            </div>
            <div className={s.input_wrapper}>
                <input
                    placeholder="Пароль"
                    {...register("password", {
                        required: "Введите пароль!"
                    })}
                />
                {errors.password && <span className={s.error_text}>{errors.password.message}</span>}
            </div>
            <div className={s.input_wrapper}>
                <input
                    placeholder="подтвердите пароль"
                    {...register("confirmPassword", {
                        required: "Введите пароль!",
                        validate: (value) => value === watch("password") || "Пароли не совпадают"
                    })}
                />
                {errors.confirmPassword && <span className={s.error_text}>{errors.confirmPassword.message}</span>}
            </div>

            {/*<InputField placeholder="Логин" name="login" error={errors.login} register={register} watch={watch} />*/}

            {/*<InputField placeholder="Пароль" name="password" error={errors.password} register={register} watch={watch} />*/}

            <button type="submit">
                Зарегистрироваться
            </button>
        </form>
    );
};

export default RegistrationForm;