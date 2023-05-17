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
    <TopNavBar
          showSearch={true}
          showCreateRecording={false}
          showDashboard={true}
        />
    <div className="mt-6 flex items-center justify-center">
    <div className=' bg-bg-pri border-solid w-[96vw] lg:w-[80vw] overflow-y-scroll border border-gray-600  rounded-2xl hide-scrollbar'>
      {' '}
      <div className='bg-bg-pri overflow-auto'>
        
  
        <div className='w-full px-10 mx-auto'>
          <RecorderEditor />
        </div>
      </div>
      </div></div>
    </>
  );
};

export default CreateRecordingPage;
