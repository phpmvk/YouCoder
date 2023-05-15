import React, { useEffect, useState } from 'react';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { BsGoogle, BsGithub } from 'react-icons/bs';
import http from '../services/userApi';
import { setUser } from '../redux/userSlice';
import { useAppDispatch } from '../redux/hooks';

import LoginArt from '../components/HomePageComponents/LoginArt';
import Loading from '../components/Loading';
import ErrorBackend from '../components/LoginPageComponents/ErrorBackend';

export interface ILoginPageProps {}

const LoginPage: React.FC<ILoginPageProps> = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);
  const [alerts, setAlerts] = useState<string>('');
  const dispatch = useAppDispatch();
  const [showLoading, setShowLoading] = useState(false);
  const [showError, setShowError] = useState(false)

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     login();
  //   }
  // }, []);

  const signInWithGoogle = async () => {
    setAuthing(true);
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(async (response) => {
        const token = await response.user.getIdToken();
        if (token) {
          console.log('----token: ', token);
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
          console.log('----token: ', token);
          localStorage.setItem('token', token);
          login();
        }
      })
      .catch((error) => {
        console.log(error);
        setAuthing(false);
      });
  };

  async function login() {
    setShowLoading(true);
    http
      .creatorLogin()
      .then((response) => {
        console.log('user from backend response: ', response.data);
        dispatch(setUser({ user: response.data.user }));
        navigate('/dashboard');
      })
      .catch((error) => {
        //--------------------------------------[here]
        console.log(error);
        setShowError(true);
        
      })
      .finally(() => {
        setAuthing(false);
        setShowLoading(false);
        
      });
  }

  return (
    <>
    {/* {showError && !showLoading && <ErrorBackend />} */}
      {showLoading && <Loading />}
      <div className='bg-bg-pri h-screen w-full flex overflow-hidden justify-center sm:justify-start'>
  <div className='bg-bg-pri w-full h-full flex items-center justify-center mx-6 sm:w-1/3 min-w-[300px]'>
            <div className='absolute top-20 z-20 text-5xl max-lg:mx-auto ml:24 flex items-center mx-12 font-title'>
              
              <span className='text-white'>You</span>
              &nbsp;
              <span className='text-bg-sec'>{`{`}</span>
              <span className='text-white'> </span>
              <span className='text-white'>Coder</span>
              <span className='text-bg-sec'>{`}`}</span>
            </div>
            <div className='flex flex-col flex-row justify-evenly h-1/3 min-w-[200px] '>
              <button
                // variant="outlined"
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
                // variant="outlined"
                className='bg-bg-pri z-20 flex items-center w-full h-1/8 t-[10px] border-solid !border-2 border-bg-sec rounded-lg !text-white lg:text-xl p-3 hover:border-bg-alt whitespace-nowrap'
                onClick={() => signInWithGithub()}
                disabled={authing}
              >
                Sign in with GitHub{' '}
                <span className='ml-2 text-2xl text-bg-alt'>
                  <BsGithub />
                </span>
              </button>
              {/* <div className="scale-[20%] md:hidden bottom-0 -z-30">
              <LoginArt />
            </div> */}
            
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
