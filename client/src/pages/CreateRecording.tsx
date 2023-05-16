import { RecorderEditor } from '../components/RecorderEditor';
import TopNavBar from '../components/HomePageComponents/TopNavBar';
import { MultiEditorRecorder } from '../components/MultiEditorRecorder';
import { FC, useEffect } from 'react';

interface RecordingPageProps {}

const CreateRecordingPage: FC<RecordingPageProps> = ({}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // create a useEffect if there is a token in local storage and get the user data from the backend and update the store
  return (
    <>
      {' '}
      <div className='bg-bg-pri h-screen overflow-auto'>
        <TopNavBar
          showSearch={true}
          showCreateRecording={true}
          showDashboard={true}
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

export default CreateRecordingPage;
