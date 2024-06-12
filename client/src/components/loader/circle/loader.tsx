import s from './loader.module.css'

export const Loader = () => {
  return (
    <div className={s.zoomLoaderContainer}>
      <div className={s.zoomLoader}></div>
    </div>
  );
};