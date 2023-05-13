import { Recording } from '../../types/Creator';
import { BiPlayCircle } from 'react-icons/bi';
import { IoEyeSharp } from 'react-icons/io5';
import { formatLanguage, formatTime } from '../../utils/editorUtils';
import DotsMenu from './DotsMenu';
import { useState } from 'react';

interface RecordingCardProps {
  recording: Recording;
  edit?: boolean;
  activeMenu: string | null;
  setActiveMenu: React.Dispatch<React.SetStateAction<string | null>>;
}

const RecordingCard = ({
  recording,
  edit,
  activeMenu,
  setActiveMenu,
}: RecordingCardProps) => {
  return (
    <>
      <div className='flex flex-col justify-center items-center w-96 rounded-md mb-10 mx-5 border border-bg-pri hover:border-gray-200'>
        <div className='text-gray-200 shadow-black border-b border-b-gray-200 relative flex justify-center items-center w-full h-48 bg-gradient-to-b from-gray-900 to-gray-600 rounded-t-md'>
          Youcoder Recording
          <BiPlayCircle className='absolute left-auto right-auto text-7xl opacity-30' />
          <div className='absolute text-sm bottom-2 w-full flex justify-between px-2'>
            <small className='bg-gray-800/50 text-white/70 rounded-sm px-1'>
              {formatLanguage(recording.language)}
            </small>
            <small className='bg-gray-800/50 text-white/70 rounded-sm px-1'>
              {formatTime(recording.duration)}
            </small>
          </div>
        </div>
        <div className='relative flex flex-col w-full h-28 rounded-b-md bg-bg-gptdark p-2 text-gray-200'>
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
          <div className='absolute bottom-1 left-0 px-2 w-full text-sm grid grid-cols-3'>
            <div className='flex items-center col-start-1 col-end-2 text-gray-200'>
              {' '}
              <IoEyeSharp className='text-md  mr-1' />
              {recording.view_count}
            </div>
            {edit && (
              <div
                className={`text-center rounded ${
                  recording.published ? 'bg-green-500/50' : 'bg-red-500/50'
                }`}
              >
                {recording.published ? 'Published' : 'Not published'}
              </div>
            )}
            <div className='col-start-3 text-right'>
              2 months ago
              {/* {recording.created_at_str} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecordingCard;
