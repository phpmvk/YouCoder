import React from 'react';
import { RecorderEditor } from '../components/RecorderEditor';
import TopNavBar from '../components/HomePageComponents/TopNavBar';

interface RecordingPageProps {}

const RecordingPage: React.FC<RecordingPageProps> = ({}) => {
  return (
    <>
      {' '}
      <div className='bg-bg-pri h-screen overflow-auto'>
        <TopNavBar
          showSearch={false}
          showCreateRecording={false}
          showDashboard={true}
          showFeatures={false}
          showExamples={true}
        />
        <div>Recording Page</div>
        <div className='w-full px-10 mx-auto'>
          <RecorderEditor />
        </div>
      </div>
    </>
  );
};

export default RecordingPage;
