import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, setEmail } from '../../store';
import style from './login-page.module.css';

export const LoginPage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector(({ userInfo: { email } }: RootState) => email);

  useEffect(() => {
    if (!email) {
      navigate('/login');
    }
  }, [email, navigate]);

  return (
    <div className={style.container}>
      <div className={style.label}>
        To use the file service storage, please log in!
      </div>
      <GoogleLogin
        onSuccess={(res) => {
          if (res && res.credential) {
            dispatch(setEmail(jwtDecode(res.credential)));
            navigate('/');
          }
        }}
      />
    </div>
  );
};
