import React, { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

interface AuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const AuthCheck = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('user from AuthCheck: ', user);
        console.log('authorized');
        setLoading(false);
      } else {
        console.log('unauthorized');
        navigate('/login');
      }
    });

    return () => AuthCheck();
  }, [auth]);

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default AuthRoute;
