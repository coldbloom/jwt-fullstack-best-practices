import s from './form.module.css'
import {UseFormWatch} from 'react-hook-form'

type InputFieldProps = {
  placeholder: string,
  name: string,
  error: any,
  register: Function,
  type?: 'text' | 'password',
  watch: UseFormWatch<any>
};

export const InputField = ({ placeholder, name, error, register, type, watch }: InputFieldProps) => {
  return (
    <div  className={s.input_wrapper}>
      <input
        placeholder={placeholder}
        type={type}
        {...register(name, {
          required: `Введите ${placeholder.toLowerCase()}`,
          validate: (value: string) => name === 'confirmPassword' ? value === watch("password") || "" : true
        })}
      />
      {error &&
          <span className={s.error_text}>{error}</span>
      }
    </div>
  )
};