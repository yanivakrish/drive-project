import { FC } from 'react';
import style from './card.module.css';
import { FileReponse } from '../../store';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import fileDownload from 'js-file-download';

interface CardProps {
  data: FileReponse;
}

export const Card: FC<CardProps> = ({ data }) => {
  const handleClick = async (id: string) => {
    axios({
      url: 'http://localhost:5000/download-file',
      method: 'POST',
      responseType: 'blob',
      data: { id },
    }).then((response) => {
      fileDownload(response.data, data.filename);
      console.log(response);
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
