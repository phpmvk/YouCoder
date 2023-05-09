import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { Recording } from '../../types/Creator';
import { useState } from 'react';
import Modal from '../Modal';

interface RecordingItemProps {
  recording: Recording;
}

// recording_id: number;
// creator: Creator;
// creator_uid: string;
// thumbnail_link: string;
// title: string;
// description: string;
// public: boolean;
// language: string;
// recorder_actions: RecorderAction[];
// audio_link: string;

const RecordingItem = ({ recording }: RecordingItemProps) => {
  const [showEditTitle, setShowEditTitle] = useState(false);
  const [showEditDescription, setShowEditDescription] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const editTitle = () => {
    setShowEditTitle(true);
  };

  const editDescription = () => {
    setShowEditDescription(true);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      if (e.target.id === 'title') {
        // if title send the upfdasted title to the backend

        setShowEditTitle(false);
      } else if (e.target.id === 'description') {
        // if description send the updated description to the backend

        setShowEditDescription(false);
      }
    }
  };

  const showCopied = (text: string) => {
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 1000);
  };

  return (
    <>
      <div className='bg-bg-gptdark h-96 flex flex-col items-center justify-center p-4 rounded-md'>
        <div className='w-full flex items-center'>
          <div
            className='relative w-4/12 h-60 bg-bg-pri bg-cover bg-center mr-1 rounded-md'
            style={{ backgroundImage: `url(${recording.thumbnail_link})` }}
          >
            <div className='bg-gray-900 w-10 h-10 z-20 absolute top-2 right-2 rounded'>
              <IconButton
                aria-label='edit image'
                aria-roledescription='button'
              >
                <EditIcon className='stroke-white' />
              </IconButton>
            </div>
          </div>

          <div className=' w-7/12 h-60 z-10 ml-1 text-white rounded-md flex flex-col justify-start relative flex-1 box-content'>
            {showEditTitle ? (
              <>
                <div className='relative'>
                  <input
                    id='title'
                    type='text'
                    className='text-4xl w-full mx-4 bg-transparent border-white border rounded-md'
                    defaultValue={recording.title}
                    onBlur={() => setShowEditTitle(false)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </>
            ) : (
              <>
                <div className='text-4xl w-full mx-4'>{recording.title}</div>
              </>
            )}

            {showEditDescription ? (
              <>
                <div className='relative'>
                  <textarea
                    id='description'
                    className='text-base w-full m-4 h-full bg-transparent border-white border rounded-md'
                    defaultValue={recording.description}
                    onBlur={() => setShowEditDescription(false)}
                    onKeyDown={handleKeyDown}
                    rows={4}
                  />
                </div>
              </>
            ) : (
              <>
                <div className='text-base text-slate-300 w-full m-4 multiline-ellipsis6'>
                  {recording.description || '... add a description'}
                </div>
              </>
            )}

            <div className='text-1xl text-slate-300 w-full mx-4 absolute bottom-0 lef '>
              3 Weeks Ago
            </div>
          </div>

          <div className='ml-10 w-1/12 h-full z-10 text-white rounded-md flex flex-col justify-start'>
            <div>
              <IconButton
                aria-label='edit image'
                onClick={editTitle}
              >
                <EditIcon className='stroke-white' />
              </IconButton>
            </div>
            <div className='h-2'></div>
            <div>
              <IconButton
                aria-label='edit image'
                onClick={editDescription}
              >
                <EditIcon className='stroke-white' />
              </IconButton>
            </div>
          </div>
        </div>
        <div className='w-full mt-2'>
          <div className='flex'>
            <div className='w-2/12 h-10 z-10 m-1 rounded-md flex items-center justify-center'>
              <Button
                variant='outlined'
                className='w-[100%] h-[100%] !border-bg-alt !text-white'
                onClick={() => {
                  showCopied('copied');
                  navigator.clipboard.writeText(recording.full_link);
                }}
              >
                COPY LINK
              </Button>
            </div>
            <div className='bg-bg-pri w-10/12 h-10 px-4 z-10 m-1 rounded-md flex items-center text-white font-console overflow-hidden'>
              {recording.full_link}
            </div>
          </div>
          <div className='flex mt-2'>
            <div className='w-2/12 h-10 z-10 m-1 rounded-md flex items-center justify-center'>
              <Button
                variant='outlined'
                className='w-full h-full !border-bg-sec !text-white'
                onClick={() => {
                  showCopied('copied');
                  navigator.clipboard.writeText(recording.iframe_link);
                }}
              >
                COPY EMBED
              </Button>
            </div>
            <div className='bg-bg-pri w-10/12 h-10 px-4 z-10 m-1 rounded-md flex items-center text-white font-console overflow-hidden whitespace-nowrap'>
              {recording.iframe_link}
            </div>
          </div>
        </div>
      </div>
      {showModal && <Modal text={'copied'} />}
    </>
  );
};

export default RecordingItem;
