import { Recording } from '../../types/Creator';
import { BiPlayCircle } from 'react-icons/bi';
import { IoEyeSharp } from 'react-icons/io5';
import { formatLanguage, formatTime } from '../../utils/editorUtils';
import DotsMenu from './DotsMenu';
import { useState } from 'react';

interface RecordingCardProps {
  recording: Recording;
  allowEdit?: boolean;
  activeMenu: string | null;
  setActiveMenu: React.Dispatch<React.SetStateAction<string | null>>;
}

const RecordingCard = ({
  recording,
  allowEdit,
  activeMenu,
  setActiveMenu,
}: RecordingCardProps) => {
  return (
    <>
      <div className='flex flex-col justify-center items-center w-96 rounded-md bg-bg-pri hover:bg-gradient-to-r from-white via-bg-alt to-bg-sec'>
        <div className='w-[23.875rem] h-[19rem] pt-px'>
          <a
            href={recording.full_link}
            className='text-gray-200 shadow-black border-b border-b-gray-200 relative flex justify-center items-center w-full h-48 bg-gradient-to-b from-gray-900 to-gray-600 rounded-t-md'
          >
            {recording.thumbnail_link ? (
              <img
                className='absolute object-cover w-full h-full rounded-t-md'
                src={recording.thumbnail_link}
                alt={`cover image for ${recording.title}`}
              />
            ) : (
              <span className='z-10 text-black'>Youcoder Recording</span>
            )}
            <BiPlayCircle className='absolute left-auto right-auto text-7xl text-white/30 z-10' />
            <div className='absolute text-sm bottom-2 w-full flex justify-between px-2'>
              <small className='bg-gray-800/70 text-white/70 rounded-sm px-1 '>
                {formatLanguage(recording.language)}
              </small>
              <small className='bg-gray-800/70 text-white/70 rounded-sm px-1'>
                {formatTime(recording.duration)}
              </small>
            </div>
          </a>
          <div className='relative flex flex-col w-full h-[6.875rem] rounded-b-md bg-bg-gptdark p-2 text-gray-200'>
            {allowEdit && (
              <div className='absolute top-2 right-1'>
                <DotsMenu
                  activeMenu={activeMenu}
                  setActiveMenu={setActiveMenu}
                  id={recording.recording_id}
                  recording={recording}
                />
              </div>
            )}
            <a
              href={recording.full_link}
              className='max-w-11/12 w-fit line-clamp-2 font-semibold text-lg decoration-transparent'
            >
              {recording.title}
            </a>
            <div className='absolute bottom-1 left-0 px-2 w-full text-sm grid grid-cols-3'>
              <div className='flex items-center col-start-1 col-end-2 text-gray-200'>
                {' '}
                <IoEyeSharp className='text-md  mr-1' />
                {recording.view_count}
              </div>
              {allowEdit && (
                <div
                  className={`text-center rounded ${
                    recording.published ? 'bg-green-500/10' : 'bg-red-500/10'
                  }`}
                >
                  {recording.published ? 'Published' : 'Not published'}
                </div>
              )}
              <div className='col-start-3 text-right'>
                {/* 2 months ago */}
                {recording.time_since_creation}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecordingCard;
