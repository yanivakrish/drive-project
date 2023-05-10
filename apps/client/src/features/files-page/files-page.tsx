import { FC } from 'react';
import { Card, FilesCard } from '../../components';
import { useGetFilesQuery } from '../../store';
import style from './files-page.module.css';

export const FilesPage: FC = () => {
  const { data, isLoading } = useGetFilesQuery();

  if (isLoading || !data) {
    return <div className={style.container}>Loading...</div>;
  } else {
    return (
      <div className={style.container}>
        <FilesCard>
          {data?.map((data) => (
            <Card key={data.id} data={data} />
          ))}
        </FilesCard>
      </div>
    );
  }
};
