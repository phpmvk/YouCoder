import React, { useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import './../components/HomePageComponents/Home.css';
import { Parallax } from 'react-parallax';
import TopNavBar from './../components/HomePageComponents/TopNavBar';
import TeachInteractively from './../components/HomePageComponents/TeachInteractively';
import Heading from './../components/HomePageComponents/Heading';
import ExampleFrame from './../components/HomePageComponents/ExampleFrame';
import TopBall from './../components/HomePageComponents/TopBall';
import MiddleBall from './../components/HomePageComponents/MiddleBall';
import BottomBall from './../components/HomePageComponents/BottomBall';
import Footer from './../components/HomePageComponents/Footer';
import { useAppSelector } from '../redux/hooks';

const HomePage: React.FC = () => {
  const user = useAppSelector((state) => state.user);

  return (
    <div className='text-center bg-bg-pri font-title'>
      {/* <button onClick={() => signOut(auth)}>Sign out</button> */}
      <div className='sticky top-0 z-50'>
        <TopNavBar
          showFeatures={true}
          showExamples={true}
          showSearch={false}
          showCreateRecording={false}
          showDashboard={false}
        />
      </div>

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
            <Footer />
          </>
        )}
      />
    </div>
  );
};

export default HomePage;
