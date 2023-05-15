import React, { useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';

import TopNavBar from './../components/HomePageComponents/TopNavBar';
import TeachInteractively from './../components/HomePageComponents/TeachInteractively';
import Heading from './../components/HomePageComponents/Heading';
import ExampleFrame from './../components/HomePageComponents/ExampleFrame';
import TopBall from './../components/HomePageComponents/TopBall';
import MiddleBall from './../components/HomePageComponents/MiddleBall';
import BottomBall from './../components/HomePageComponents/BottomBall';
import Footer from './../components/HomePageComponents/Footer';
import { useAppSelector } from '../redux/hooks';
import GotoBottom from '../components/HomePageComponents/GotoBottom';

const HomePage: React.FC = () => {
  const user = useAppSelector((state) => state.user);

  return (
    <div className='overflow-x-hidden w-screen text-center bg-bg-pri font-title'>
      <TopNavBar
        showFeatures={true}
        showExamples={true}
        showSearch={false}
        showCreateRecording={false}
        showDashboard={true}
      />

      <Heading />
      <TopBall />
      <MiddleBall />
      <BottomBall />
      <ExampleFrame/>

      <div className="bg-bg-pri h-[280vw] w-full rounded-tr-full rounded-tl-full"></div>

      <GotoBottom/>
    </div>
  );
};

export default HomePage;


 {/* <Parallax
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
      /> */}
