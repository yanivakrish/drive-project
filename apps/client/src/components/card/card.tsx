import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import fileDownload from 'js-file-download';
import { FC } from 'react';
import { FileResponse } from '../../store';
import style from './card.module.css';

interface CardProps {
  data: FileResponse;
}

export const Card: FC<CardProps> = ({ data }) => {
  const handleClick = async (id: string) => {
    axios
      .post(
        'http://localhost:5000/download-file',
        { id },
        { responseType: 'blob' }
      )
      .then((response) => {
        fileDownload(response.data, data.filename);
      });
  };

  return (
    <div className={style.container}>
      <div className={style.fileName}>{data.filename}</div>
      <ArrowDownTrayIcon
        className={style.downloadIcon}
        onClick={() => handleClick(data.id)}
      />
    </div>
  );
};
