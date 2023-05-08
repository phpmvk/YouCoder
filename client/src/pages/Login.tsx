import React from 'react';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export interface ILoginPageProps {}

const LoginPage: React.FC<ILoginPageProps> = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [authing, setAuthing] = React.useState(false);

  const signInWithGoogle = async () => {
    setAuthing(true);
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        console.log('user from google: ', response.user);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        setAuthing(false);
      });
  };

  const signInWithGithub = async () => {
    setAuthing(true);
    signInWithPopup(auth, new GithubAuthProvider())
      .then((response) => {
        console.log('user from github: ', response.user);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        setAuthing(false);
      });
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button
        onClick={() => signInWithGoogle()}
        disabled={authing}
      >
        Sign in with Google
      </button>
      <button
        onClick={() => signInWithGithub()}
        disabled={authing}
      >
        Sign in with Github
      </button>
    </div>
  );
};

export default LoginPage;
