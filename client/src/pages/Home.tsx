import { getAuth, signOut } from 'firebase/auth';

const HomePage = () => {
  const auth = getAuth();

  function logOut() {
    signOut(auth)
      .then(() => {
        localStorage.removeItem('token');
        console.log('signed out');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <p>Hello, I am a functional component! protected by firebase</p>
      <button onClick={logOut}>Sign out</button>
    </div>
  );
};

export default HomePage;
