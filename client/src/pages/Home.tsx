import React, { useState} from 'react';
import { getAuth, signOut } from 'firebase/auth';
import './Home.css';
import { Parallax } from 'react-parallax';
import TopNavBar from './TopNavBar.tsx';
import TeachInteractively from './TeachInteractively.tsx';
import Heading from './Heading.tsx';
import ExampleFrame from './ExampleFrame.tsx';
import TopBall from './TopBall.tsx';
import MiddleBall from './MiddleBall.tsx';
import BottomBall from './BottomBall.tsx';

const HomePage: React.FC = () => {
  const auth = getAuth();

  return (
    <div className="home">
      {/* <button onClick={() => signOut(auth)}>Sign out</button> */}
      <TopNavBar style={{ position: 'sticky', top: 0, zIndex: 100 }} />
      <Parallax
        strength={600}
        renderLayer={(percentage) => (
          <>
            <Heading percentage={percentage}></Heading>
            <TopBall percentage={percentage} />
            <BottomBall percentage={percentage} />
            <TeachInteractively />
            <MiddleBall percentage={percentage} />
            <ExampleFrame />
          </>
        )}
      />
    </div>
  );
};

export default HomePage;