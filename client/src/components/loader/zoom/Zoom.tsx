import cn from 'classnames';
import s from './Zoom.module.css';

type ZoomProps = {
  className?: string;
}

const items = new Array(5).fill('');

export const Zoom = ({ className }: ZoomProps) => (
  <div className={s.zoomLoaderContainer}>
    <div className={cn(s.zoomStyles, className)}>
      {items.map((_, key) => (
        <div key={key.toString()} className={`${s['rect' + (key + 1)]}`}/>
      ))}
    </div>
  </div>
);