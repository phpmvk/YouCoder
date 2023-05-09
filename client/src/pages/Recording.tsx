import React from 'react';
import { RecorderEditor } from '../components/RecorderEditor';

interface RecordingPageProps {}

const RecordingPage: React.FC<RecordingPageProps> = ({}) => {
  return (
    <>
      <div>Recording Page</div>
      <RecorderEditor />
    </>
  );
};

export default RecordingPage;
