import { useContext } from 'react';
import s from './form.module.css'
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthContext} from "../../context/AuthContext";

type Inputs = {
  login: string,
  password: string,
}

const defaultValues = {
  login: '',
  password: '',
}

const LoginForm = () => {
  const { handleSignIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: formState,
    reset, // Добавляем метод reset
  } = useForm<Inputs>({
    defaultValues: defaultValues,
    mode: "onBlur" // режим валидации ошибок - на onBlur (популярный)
  })
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    handleSignIn({ login: data.login, password: data.password });
  }


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
          type="password"
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

      <button type="submit">
        Войти
      </button>
    </form>
  );
};

export default LoginForm;