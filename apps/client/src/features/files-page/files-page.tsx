import axios from 'axios';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, FilesCard } from '../../components';
import { RootState, useGetFilesQuery } from '../../store';
import style from './files-page.module.css';

export const FilesPage: FC = () => {
  const navigate = useNavigate();
  const email = useSelector(({ userInfo: { email } }: RootState) => email);

  useEffect(() => {
    if (!email) {
      navigate('/login');
    }
  }, [email, navigate]);

  const { data, isLoading, refetch } = useGetFilesQuery({ email });
  const [file, setFile] = useState<File>();

  if (isLoading || !data) {
    return <div className={style.container}>Loading...</div>;
  } else {
    return (
      <div className={style.container}>
        <div className={style.inputContainer}>
          <div>{`Hello ${email}`}</div>
          <input
            type="file"
            onChange={({
              target: { files },
            }: ChangeEvent<HTMLInputElement>) => {
              if (files && files[0]) {
                setFile(files[0]);
              }
            }}
          />
          <button
            onClick={async () => {
              if (file) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('email', email);
                await axios.post(
                  'http://localhost:5000/upload-file',
                  formData,
                  {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    },
                  }
                );
                refetch();
              } else {
                alert('No File Selected');
              }
            }}
          >
            Upload File
          </button>
        </div>
        <FilesCard>
          {data?.map((data) => (
            <Card key={data.id} data={data} />
          ))}
        </FilesCard>
      </div>
    );
  }
};
