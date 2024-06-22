import React, {Dispatch} from 'react';
import {useForm} from "react-hook-form";
import s from './form.module.css'
import axios from "axios";

type TPost = {
  id: string,
  title: string,
  description: string
}

type TInputs = {
  title: string,
  description: string
}

const defaultValues = {
  title: '',
  description: ''
}

type TPostProps = {
  id: string,
  title: string,
  description: string,
  setPosts: Dispatch<React.SetStateAction<TPost[]>>
}
const Post = ({id, title, description, setPosts}: TPostProps) => {

  const deletePost = (id: string) =>
    axios.delete(`${process.env.REACT_APP_SERVER_URL}/posts/${id}`)
      .then(() => {
        setPosts((prev: TPost[]) => prev.filter(item => item.id !== id));
      })
      .catch(err => console.error('Возникла ошибка при удалении поста: ', err))

  return (
    <div style={{border: '1px solid black', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
      <div>
        <div style={{display: 'flex'}}>
          <p>Заголовок: </p>
          <p>&nbsp;{title}</p>
        </div>
        <div style={{display: 'flex'}}>
          <p>Описание: </p>
          <p>&nbsp;{description}</p>
        </div>
      </div>
      <button style={{border: '1px solid red', height: 'fit-content', cursor: 'pointer'}}
              onClick={() => deletePost(id)}
      >
        Удалить
      </button>
    </div>
  )
}

const PostForm = () => {
  const [posts, setPosts] = React.useState<TPost[]>([])

  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/posts`)
      .then(res => setPosts(res.data))
      .catch(err => console.error('Запрос на посты вернул ошибку!', err))
  }, [])

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors}
  } = useForm<TInputs>({
    defaultValues: defaultValues,
    mode: "onBlur"
  })

  const onSubmit = (data: TInputs) => {
    axios.post(`${process.env.REACT_APP_SERVER_URL}/posts`, data)
      .then(({data}) => setPosts(prev => [...prev, data]))
      .catch(err => console.error('Запрос на добавление поста вернул ошибку: ', err))
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}
            className={s.form_wrapper}
      >
        <div className={s.input_wrapper}>
          <input
            placeholder="Введите заголовок поста"
            {...register("title", {
              required: "Введите заголовок поста"
            })}
          />
          {errors.title &&
            <span className={s.error_text}>{errors.title.message}</span>
          }
        </div>

        <div className={s.input_wrapper}>
          <input
            placeholder="Введите содержимое поста"
            {...register("description", {
              required: "Введите содержимое поста"
            })}
          />
          {errors.description &&
            <span className={s.error_text}>{errors.description.message}</span>
          }
        </div>

        <button type="submit">
          Добавить пост
        </button>
      </form>

      <h3>Все посты: </h3>
      {
        posts.length !== 0 && (
          <div>
            {
              posts.map(post =>
                <Post
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  description={post.description}
                  setPosts={setPosts}
                />
              )
            }
          </div>
        )
      }
    </div>
  );
};

export default PostForm;