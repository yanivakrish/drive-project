import { FC } from 'react';
import style from './files-page.module.css';
import { useGetFilesQuery } from '../../store';
import { Card } from '../../components';

export const FilesPage: FC = () => {
  const { data, isLoading } = useGetFilesQuery();

  if (isLoading || !data) {
    return <div className={style.container}>Loading...</div>;
  } else {
    return (
      <div className={style.container}>
        {data?.map((data) => (
          <Card key={data.id} data={data}/>
        ))}
      </div>
    );
  }
};
