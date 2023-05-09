import React, { useState } from 'react';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import EmailLogin from '../components/EmailLogin';
import { BsGoogle, BsGithub } from 'react-icons/bs';
import http from '../services/userApi';
import { rootUser, setUser } from '../redux/userSlice';
import { useAppDispatch } from '../redux/hooks';

export interface ILoginPageProps {}

const LoginPage: React.FC<ILoginPageProps> = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);
  const [alerts, setAlerts] = useState<string>('');
  const dispatch = useAppDispatch();

  const signInWithGoogle = async () => {
    setAuthing(true);
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(async (response) => {
        const token = await response.user.getIdToken();
        if (token) {
          console.log('----token: ', token);
          localStorage.setItem('token', token);
          login(token);
        }
      })
      .catch((error) => {
        console.log(error);
        setAuthing(false);
      });
  };

  const signInWithGithub = async () => {
    setAuthing(true);
    signInWithPopup(auth, new GithubAuthProvider())
      .then(async (response) => {
        const token = await response.user.getIdToken();
        if (token) {
          console.log('----token: ', token);
          localStorage.setItem('token', token);
          login(token);
        }
      })
      .catch((error) => {
        console.log(error);
        setAuthing(false);
      });
  };

  async function login(token: string) {
    http
      .creatorLogin(token)
      .then((response) => {
        console.log('user from response: ', response.data);
        dispatch(setUser(response.data));
        navigate('/dashboard');
      })
      .catch((error) => {
        console.log(error);
        setAuthing(false);
      });
  }

  // const signInWithEmail = async (email: string, password: string) => {
  //   setAuthing(true);
  //   // signInWithEmailAndPassword(auth, email, password)
  //   //   .then((response) => {
  //   //    console.log('user from email: ', response.user);
  //   //    navigate('/');
  //   //  })
  //   //  .catch((error) => {
  //   //    console.log(error);
  //   //    setAuthing(false);
  //   //  });
  // };

  return (
    <div className='w-full max-w-xs'>
      <h1 className='mb-6'>Login</h1>
      {/* <EmailLogin
        login={signInWithEmail}
        alerts={alerts}
        setAlerts={setAlerts}
        authing={authing}
      /> */}
      <div className='flex justify-evenly'>
        <button
          className='flex items-center'
          onClick={() => signInWithGoogle()}
          disabled={authing}
        >
          Sign in with
          <span className='ml-2'>
            <BsGoogle />
          </span>
        </button>
        <button
          className='flex items-center'
          onClick={() => signInWithGithub()}
          disabled={authing}
        >
          Sign in with{' '}
          <span className='ml-2 text-lg'>
            <BsGithub />
          </span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
