import React, { useState, useEffect, useRef } from 'react';
import Footer from '../components/HomePageComponents/Footer';
import TopNavBar from '../components/HomePageComponents/TopNavBar';
import RecordingsList from '../components/DashboardComponents/RecordingsList';
import CreateRecordingButton from '../components/DashboardComponents/CreateRecordingButton';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import NoRecordings from '../components/DashboardComponents/NoRecordings';

interface DashboardPageProps {}

const DashboardPage: React.FC<DashboardPageProps> = ({}) => {
  const [showCreateRecording, setShowCreateRecording] = useState(false);

  const createRecordingButtonRef = useRef(null);

  // import the user from the reducer
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    const observerCallback = (entries: any, observer: any) => {
      entries.forEach((entry: any) => {
        if (
          entry.boundingClientRect.top <= 1 &&
          entry.intersectionRatio === 0
        ) {
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

  const recordingsList = user.recordings || [
    {
      recording_id: '46af9ea2-43fa-4703-b960-54b1f920d013',
      title: 'test 1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      thumbnail_link: 'https://picsum.photos/id/237/200/300',
      audio_link:
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      language: 'javascript',
      full_link:
        'https://youcoder.io/23409fjhkhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkj34ljhr0894',
      iframe_link:
        '<iframe src="https://www.w3schools.com" title="W3Schools Free Online Web Tutorials"></iframe>',
    },
    {
      recording_id: '79fdd1ad-1048-48e1-abf6-30d941c6a097',
      title: 'test 2',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      thumbnail_link: 'https://picsum.photos/id/238/200/300',
      audio_link:
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      language: 'javascript',
      full_link:
        'https://youcoder.io/23409fjhkhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkj34ljhr0894',
      iframe_link:
        '<iframe src="https://www.w3schools.com" title="W3Schools Free Online Web Tutorials"></iframe>',
    },
  ];

  return (
    <div className='bg-bg-pri h-screen overflow-auto'>
      <TopNavBar
        showSearch={true}
        showCreateRecording={showCreateRecording}
        showDashboard={false}
        showFeatures={false}
        showExamples={false}
      />
      <div>
        <CreateRecordingButton ref={createRecordingButtonRef} />
        {/* {user?.recordings?.length > 0 ? ( */}
        {recordingsList.length > 0 ? (
          // <RecordingsList recordings={user.recordings} />
          <RecordingsList recordings={recordingsList} />
        ) : (
          <NoRecordings />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;
