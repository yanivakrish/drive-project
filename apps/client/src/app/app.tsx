import { FC } from 'react';
import style from './app.module.css';
import { FilesPage, LoginPage } from '../features';

export const App: FC = () => {
  return (
    <div className={style.container}>
      <FilesPage />
      <LoginPage />
    </div>
  );
};
