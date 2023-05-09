import React, { useState } from 'react';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { BsGoogle, BsGithub } from 'react-icons/bs';
import http from '../services/userApi';
import { rootUser, setUser } from '../redux/userSlice';
import { useAppDispatch } from '../redux/hooks';
import { Button } from '@mui/material';
import LoginArt from './LoginArt';
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
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        setAuthing(false);
      });
  }

  return (
    <div className="bg-bg-pri h-screen w-full flex overflow-hidden">
    <div className="bg-bg-pri w-1/2 h-full flex items-center justify-center ml-3">
      <div className="bg-bg-pri w-[22vw] h-[50vh] max-w-l flex flex-col items-center justify-center rounded-lg">
      <div className="absolute top-20 z-20 lg:text-6xl sm:text-4xl left-5 flex items-center mx-12 font-title">
  
  <span className="text-white">You</span>
  &nbsp;
  <span className="text-bg-sec">{`{`}</span>
  <span className="text-white"> </span>
  <span className="text-white">Coder</span>
  <span className="text-bg-sec">{`}`}</span>
</div>
      <div className="flex flex-col justify-evenly h-full m">
        <button
          // variant="outlined"
          className="bg-bg-pri z-20 flex items-center py- w-full h-1/6 t-[10px] border-solid !border-2 border-bg-sec rounded-lg !text-white lg:text-xl sm:text-sm p-6 hover:border-bg-alt whitespace-nowrap"
          onClick={() => signInWithGoogle()}
          disabled={authing}
        >
          Sign in with Google
          <span className="ml-2 text-2xl text-bg-alt">
            <BsGoogle />
          </span>
        </button>
        <button
          // variant="outlined"
          className="bg-bg-pri z-20 flex items-center py- w-full h-1/6 t-[10px] border-solid !border-2 border-bg-sec rounded-lg !text-white lg:text-xl sm:text-sm p-6 hover:border-bg-alt whitespace-nowrap"
          onClick={() => signInWithGithub()}
          disabled={authing}
        >
          Sign in with GitHub{" "}
          <span className="ml-2 text-2xl text-bg-alt">
            <BsGithub />
          </span>
        </button>
      </div>
    </div>
  </div>
  <div className="w-2/3">
    <LoginArt/>
  </div>
  
</div>

  );
};

export default LoginPage;
