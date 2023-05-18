import React, { useEffect, useState } from 'react';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { BsGoogle, BsGithub } from 'react-icons/bs';
import http from '../services/userApi';
import { setUser } from '../redux/userSlice';
import { useAppDispatch } from '../redux/hooks';
import LoginArt from '../components/HomePageComponents/LoginArt';
import { setLoadingPage } from '../redux/spinnerSlice';
import { toast } from 'react-toastify';

export interface ILoginPageProps {}

const LoginPage: React.FC<ILoginPageProps> = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);
  const [alerts, setAlerts] = useState<string>('');
  const dispatch = useAppDispatch();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    dispatch(setLoadingPage(true));
    const token = localStorage.getItem('token');
    if (token) {
      login();
    } else dispatch(setLoadingPage(false));
  }, []);

  const signInWithGoogle = async () => {
    setAuthing(true);
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(async (response) => {
        const token = await response.user.getIdToken();
        if (token) {
          localStorage.setItem('token', token);
          login();
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
          localStorage.setItem('token', token);
          login();
        }
      })
      .catch((error) => {
        if (error.code === 'auth/account-exists-with-different-credential') {
          toast.error(
            'This email is connected to an account that is signed in with google. Please sign in with Google instead.',
            {
              position: 'bottom-left',
              autoClose: 10000,
            }
          );
        }
        console.error(error);
        setAuthing(false);
      });
  };

  async function login() {
    dispatch(setLoadingPage(true));
    http
      .creatorLogin()
      .then((response) => {
        console.log('user from backend response: ', response.data);
        dispatch(setUser({ user: response.data.user }));
        navigate('/dashboard');
      })
      .catch((error) => {
        console.log(error);
        setShowError(true);
      })
      .finally(() => {
        setAuthing(false);
        dispatch(setLoadingPage(false));
      });
  }

  return (
    <>
      {/* {showError && !showLoading && <ErrorBackend />} */}
      <div className='bg-bg-pri h-screen w-full flex overflow-hidden justify-center sm:justify-start'>
        <div className='bg-bg-pri w-full h-full flex items-center justify-center mx-6 sm:w-1/3 min-w-[300px]'>
          <Link to='/'>
            <div className='absolute top-20 z-20 text-5xl max-lg:mx-auto ml:24 flex items-center mx-12 font-title'>
              <span className='text-white'>You</span>
              &nbsp;
              <span className='text-bg-sec'>{`{`}</span>
              <span className='text-white'> </span>
              <span className='text-white'>Coder</span>
              <span className='text-bg-sec'>{`}`}</span>
            </div>
          </Link>
          <div className='flex flex-col justify-evenly h-1/3 min-w-[200px] '>
            <button
              className='bg-bg-pri z-20 flex items-center w-full h-1/8 t-[10px] border-solid !border-2 border-bg-sec rounded-lg !text-white lg:text-xl    p-3 hover:border-bg-alt whitespace-nowrap'
              onClick={() => signInWithGoogle()}
              disabled={authing}
            >
              Sign in with Google
              <span className='ml-2 text-2xl text-bg-alt'>
                <BsGoogle />
              </span>
            </button>
            <button
              className='bg-bg-pri z-20 flex items-center w-full h-1/8 t-[10px] border-solid !border-2 border-bg-sec rounded-lg !text-white lg:text-xl p-3 hover:border-bg-alt whitespace-nowrap'
              onClick={() => signInWithGithub()}
              disabled={authing}
            >
              Sign in with GitHub{' '}
              <span className='ml-2 text-2xl text-bg-alt'>
                <BsGithub />
              </span>
            </button>
          </div>
        </div>
        <div className='hidden sm:block w-2/3 min-w-[400px] -ml-12'>
          <LoginArt />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
