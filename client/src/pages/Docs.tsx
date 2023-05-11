import React from 'react';
import TopNavBar from '../components/HomePageComponents/TopNavBar';
import Footer from '../components/HomePageComponents/Footer';

interface DocsPageProps {}

const DocsPage: React.FC<DocsPageProps> = ({}) => {
  return (
    <>
    <TopNavBar/>
      <div className="bg-bg-pri h-screen text-white flex">
      <div className="text-3xl ml-20 ">Getting Started</div>
      <div>How to record:</div>
      </div>
    <Footer/>
    </>
  );
};

export default DocsPage;
