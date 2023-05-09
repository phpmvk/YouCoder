import React from 'react';
import { PlaybackEditor } from '../components/PlaybackEditor';

interface VideoPageProps {}

const VideoPage: React.FC<VideoPageProps> = ({}) => {
  return (
    <>
      <div>Video Page</div>
      <PlaybackEditor />
    </>
  );
};

export default VideoPage;
