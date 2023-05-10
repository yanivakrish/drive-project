import { FC, PropsWithChildren } from 'react';
import style from './files-card.module.css';

export const FilesCard: FC<PropsWithChildren> = ({ children }) => {
  return <div className={style.gridContainer}>{children}</div>;
};
