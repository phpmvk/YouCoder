import { getAuth, signOut } from 'firebase/auth';

const HomePage = () => {
  const auth = getAuth();

  return (
    <div>
      <p>Hello, I am a functional component! protected by firebase</p>
      <button onClick={() => signOut(auth)}>Sign out</button>
    </div>
  );
};

export default HomePage;
