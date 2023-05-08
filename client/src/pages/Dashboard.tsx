import React, { useState, useEffect, useRef } from 'react';
import Footer from '../components/HomePageComponents/Footer';
import TopNavBar from '../components/HomePageComponents/TopNavBar';
import ListContainer from '../components/DashboardComponents/ListContainer';
import CreateRecordingButton from '../components/DashboardComponents/CreateRecordingButton';

interface DashboardPageProps {}

const DashboardPage: React.FC<DashboardPageProps> = ({}) => {
  const [showCreateRecording, setShowCreateRecording] = useState(false);

  const createRecordingButtonRef = useRef(null);

  useEffect(() => {
    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.boundingClientRect.top <= 1 && entry.intersectionRatio === 0) {
          setShowCreateRecording(true);
        } else {
          setShowCreateRecording(false);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0,
    });

    if (createRecordingButtonRef.current) {
      observer.observe(createRecordingButtonRef.current);
    }

    return () => {
      if (createRecordingButtonRef.current) {
        observer.unobserve(createRecordingButtonRef.current);
      }
    };
  }, []);

  console.log('showCreateRecording', showCreateRecording);

  return (
    <div className="bg-gradient-primary h-screen overflow-auto">
      <TopNavBar showSearch={true} showCreateRecording={showCreateRecording} />
      <div>
        <CreateRecordingButton ref={createRecordingButtonRef} />
        <ListContainer />
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;
