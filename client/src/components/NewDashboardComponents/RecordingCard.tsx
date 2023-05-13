import { Recording } from '../../types/Creator';
import { BiPlayCircle } from 'react-icons/bi';
import { IoEyeSharp } from 'react-icons/io5';
import { formatLanguage } from '../../utils/editorUtils';
import DotsMenu from './DotsMenu';
import { useState } from 'react';

interface RecordingCardProps {
  recording: Recording;
  edit?: boolean;
}

const RecordingCard = ({ recording, edit }: RecordingCardProps) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  return (
    <>
      <div className='flex flex-col justify-center items-center w-96 rounded-md mb-10 mx-5 hover:opacity-95'>
        <div className='relative flex justify-center items-center w-full h-48 bg-bg-sec rounded-t-md'>
          <BiPlayCircle className='absolute left-auto right-auto text-7xl text-bg-alt/50' />
          <div className='absolute text-sm bottom-2 w-full flex justify-between px-2'>
            <small className='bg-red-300 rounded-sm px-1 opacity-30'>
              {formatLanguage(recording.language)}
            </small>
            <small className='bg-red-300 rounded-sm px-1 opacity-30'>
              {'00:27:30'}
              {/* {recording.duration} */}
            </small>
          </div>
        </div>
        <div className='relative flex flex-col w-full h-28 rounded-b-md bg-white p-2'>
          {edit && (
            <div className='absolute top-2 right-1'>
              <DotsMenu
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                id={recording.recording_id}
              />
            </div>
          )}
          <div className='w-11/12 line-clamp-2 font-semibold text-lg'>
            {recording.title}
          </div>
          <div className='absolute bottom-1 left-0 px-2 w-full flex items-center justify-between text-sm'>
            <div className='flex items-center flex-grow'>
              {' '}
              <IoEyeSharp className='text-md text-bg-pri mr-1' />
              2k
              {/* {recording.views} */}
            </div>
            <div>
              2 months ago
              {/* {recording.date} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecordingCard;
