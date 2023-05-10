import { FC, useEffect } from 'react';
import style from './login-page.module.css';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setEmail } from '../../store';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export const LoginPage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector(({ userInfo: { email } }: RootState) => email);

  useEffect(() => {
    if (!email) {
      navigate('/login');
    }
  }, [email]);

  return (
    <div className={style.container}>
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
