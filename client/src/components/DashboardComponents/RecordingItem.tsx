import { Button, FormControlLabel, FormGroup, Switch } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { Recording } from '../../types/Creator';
import { useState } from 'react';
import Modal from '../Toast';
import http from '../../services/recordingApi';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import PublishModal from './PublishModal';
import MoreOptionsToggle from './MoreOptionsToggle';

interface RecordingItemProps {
  recording: Recording;
}

const theme = createTheme({ palette: { primary: { main: '#b300ff' } } });

const RecordingItem = ({ recording }: RecordingItemProps) => {
  const [showEditTitle, setShowEditTitle] = useState(false);
  const [showEditDescription, setShowEditDescription] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [published, setPublished] = useState(recording.published);

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
        http
          .patchRecording(recording.recording_id, { title: e.target.value })
          .then((res) => {
            console.log('res from updating title: ', res);
          })
          .catch((err) => {
            console.log('err from updating title', err);
          });

        setShowEditTitle(false);
      } else if (e.target.id === 'description') {
        // if description send the updated description to the backend
        http
          .patchRecording(recording.recording_id, {
            description: e.target.value,
          })
          .then((res) => {
            console.log('res from updating description: ', res);
          })
          .catch((err) => {
            console.log('err from updating title', err);
          });

        setShowEditDescription(false);
      }
    }
  };

  const showCopied = (text: string) => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 1000);
  };

  const handlePublish = () => {
    if (published) {
      setShowModal(true);
    } else {
      setPublished(true);
      http
        .patchRecording(recording.recording_id, { published: true })
        .then((res) => {
          console.log('res from publishing: ', res);
        })
        .catch((err) => {
          // setPublished(false);
          console.log('err from publishing: ', err);
        });
    }
  };

  return (
    <>
      <div className='bg-bg-gptdark h-96 flex flex-col items-center justify-center p-4 rounded-md'>
        <div className='w-full flex items-center relative'>
          <div
            className='relative w-4/12 h-60 bg-bg-pri bg-cover bg-center mr-1 rounded-md'
            style={{ backgroundImage: `url(${recording.thumbnail_link})` }}
          >
            <div className='bg-gray-900 w-10 h-10 z-10 absolute top-2 right-2 rounded'>
              <IconButton
                aria-label='edit image'
                aria-roledescription='button'
              >
                <EditIcon className='stroke-white' />
              </IconButton>
            </div>
          </div>

          <div className='w-9/12 z-10 ml-1 h-60 text-white/80 rounded-md flex flex-col justify-between flex-1 box-content'>
            <div>
              {showEditTitle ? (
                <>
                  <div className='relative'>
                    <input
                      id='title'
                      type='text'
                      className='text-4xl w-full mx-4 bg-transparent'
                      defaultValue={recording.title}
                      onBlur={() => setShowEditTitle(false)}
                      onKeyDown={handleKeyDown}
                      autoFocus
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
                      className='text-base w-full m-4 h-full bg-transparent'
                      defaultValue={recording.description}
                      onBlur={() => setShowEditDescription(false)}
                      onKeyDown={handleKeyDown}
                      rows={5}
                      autoFocus
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className='text-base text-white/80 w-full m-4 multiline-ellipsis6'>
                    {recording.description || '... add a description'}
                  </div>
                </>
              )}
            </div>
            <div className='flex items-end justify-between'>
              <div className='text-white/70 w-full mx-4'>3 Weeks Ago</div>
              <div className=''>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <ThemeProvider theme={theme}>
                        <Switch
                          checked={published}
                          onChange={handlePublish}
                          color='primary'
                        />
                      </ThemeProvider>
                    }
                    label='Published'
                  />
                </FormGroup>
              </div>
            </div>
          </div>

          <div className='ml-10 h-60 z-10 text-white/80 rounded-md flex flex-col justify-between'>
            <div>
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
            <MoreOptionsToggle recording_id={recording.recording_id} />
          </div>
        </div>
        <div className='w-full mt-2'>
          <div className='flex'>
            <div className='w-2/12 h-10 z-10 m-1 rounded-md flex items-center justify-center min-w-[150px]'>
              <Button
                variant='outlined'
                className='!w-full !h-full !border-bg-alt !text-white/80 hover:!bg-bg-alt hover:!bg-opacity-10'
                onClick={() => {
                  showCopied('copied');
                  navigator.clipboard.writeText(recording.full_link);
                }}
              >
                COPY LINK
              </Button>
            </div>
            <div className='bg-bg-pri w-10/12 h-10 px-4 z-10 m-1 rounded-md flex items-center text-white/80 font-console overflow-hidden hover:underline hover:cursor-pointer'>
              <a
                className='no-underline text-white/80'
                href={recording.full_link}
                target='_blank'
                rel='noreferrer'
              >
                {recording.full_link}
              </a>
            </div>
          </div>
          <div className='flex mt-2'>
            <div className='w-2/12 h-10 z-10 m-1 rounded-md flex items-center justify-center min-w-[150px]'>
              <Button
                variant='outlined'
                className='w-full h-full !border-bg-sec !text-white/80 hover:!bg-bg-sec hover:!bg-opacity-10'
                onClick={() => {
                  showCopied('copied');
                  navigator.clipboard.writeText(recording.iframe_link);
                }}
              >
                COPY EMBED
              </Button>
            </div>
            <div className='bg-bg-pri w-10/12 h-10 px-4 z-10 m-1 rounded-md flex items-center text-white/80 font-console overflow-hidden whitespace-nowrap'>
              {recording.iframe_link}
            </div>
          </div>
        </div>
      </div>
      {showToast && <Modal text={'copied'} />}
      <PublishModal
        recording={recording}
        isModalOpen={showModal}
        setIsModalOpen={setShowModal}
        setPublished={setPublished}
        title={'Warning'}
        description={
          'If you unpublish this recording, all the links where this recording is embedded will stop working until you publish it again. Are you sure you want to proceed?'
        }
        yesBtnText={'Yes, Unpublish'}
      />
    </>
  );
};

export default RecordingItem;
