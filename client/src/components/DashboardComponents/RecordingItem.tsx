import { Button, FormControlLabel, FormGroup, Switch } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { Recording } from '../../types/Creator';
import { useEffect, useState } from 'react';
import Toast from '../Toast';
import http from '../../services/recordingApi';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import PublishModal from './PublishModal';
import MoreOptionsToggle from './MoreOptionsToggle';
import Modal from '../Modal';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { editUser } from '../../redux/userSlice';
import { BsCheckLg } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import { MdOutlineEdit } from 'react-icons/md';

interface RecordingItemProps {
  recording: Recording;
}

type Field = 'title' | 'description';

const theme = createTheme({ palette: { primary: { main: '#b300ff' } } });

const RecordingItem = ({ recording }: RecordingItemProps) => {
  const [showEditTitle, setShowEditTitle] = useState(false);
  const [showEditDescription, setShowEditDescription] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showdeleteModal, setShowdeleteModal] = useState(false);
  const [published, setPublished] = useState(recording.published);
  const [fieldValue, setFieldValue] = useState('');
  const [toastText, setToastText] = useState('');
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const editTitle = () => {
    setFieldValue(recording.title);
    setShowEditTitle(true);
  };

  const editDescription = () => {
    setFieldValue(recording.description);
    setShowEditDescription(true);
  };

  const deleteRecording = () => {
    http
      .deleteRecording(recording.recording_id)
      .then((res) => {
        console.log('res from deleting recording: ', res);
        setShowdeleteModal(false);
      })
      .catch((err) => {
        console.log('err from deleting recording: ', err);
      });
  };

  const updateRecording = (field: Field, value: string): Promise<void> => {
    console.log('field: ', field, 'value: ', value);
    return http
      .patchRecording(recording.recording_id, { [field]: value })
      .then((res) => {
        console.log(`res from updating ${field}: `, res.data);
        // dispatch(editUser({ ...user, recordings: res.data }));
        const updatedRecording = res.data.find(
          (recording) => recording.recording_id === recording.recording_id
        );
        updateUserRecording(updatedRecording!);
        setToastText('updated');
        showMiniToast();

        if (field === 'title') {
          setShowEditTitle(false);
        } else if (field === 'description') {
          setShowEditDescription(false);
        }
      })
      .catch((err) => {
        console.log(`err from updating ${field}`, err);
      });
  };

  const updateUserRecording = (updatedRecording: Recording) => {
    const updatedRecordings = user.recordings!.map((recording) =>
      recording.recording_id === updatedRecording.recording_id
        ? updatedRecording
        : recording
    );
    dispatch(editUser({ ...user, recordings: updatedRecordings }));
  };

  const handleSubmit = (field: Field): any => {
    // const handleSubmit = (field: Field, value: string): void => {
    console.log('HANDLE SUBMIT:\nfield: ', field, 'value: ', fieldValue);

    updateRecording(field, fieldValue);
  };

  const showMiniToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setToastText('');
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
          dispatch(editUser({ ...user, recordings: res.data }));
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
                      onKeyUp={(e) => setFieldValue(e.currentTarget.value)}
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
                      className='text-base w-full m-4 h-full bg-transparent resize-none'
                      defaultValue={recording.description}
                      onKeyUp={(e) => setFieldValue(e.currentTarget.value)}
                      rows={5}
                      autoFocus
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className='text-base text-white/80 w-full m-4 line-clamp-5'>
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
              <div className='h-10'>
                {showEditTitle ? (
                  <button
                    id='titleCheckmark'
                    onClick={() => {
                      handleSubmit('title');
                    }}
                    className=' rounded-md flex items-center justify-around h-10 w-10 hover:bg-green-500/5 active:bg-green-500/20'
                  >
                    <BsCheckLg className='text-green-500 text-[34px] ' />
                  </button>
                ) : (
                  <button
                    onClick={editTitle}
                    className='hover:bg-white/5 rounded-md flex items-center justify-around h-10 w-10'
                  >
                    <MdOutlineEdit className='text-white text-[28px]' />
                  </button>
                )}
              </div>
              <div className='h-2'></div>
              <div className='h-10'>
                {showEditDescription ? (
                  <button
                    id='descriptionCheckmark'
                    onClick={() => handleSubmit('description')}
                    className=' rounded-md flex items-center justify-around h-10 w-10 hover:bg-green-500/5'
                  >
                    <BsCheckLg className='text-green-500 text-[34px]' />
                  </button>
                ) : (
                  <button
                    onClick={editDescription}
                    className='hover:bg-white/5 rounded-md flex items-center justify-around h-10 w-10'
                  >
                    <MdOutlineEdit className='text-white text-[28px]' />
                  </button>
                )}
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
                  setToastText('copied');
                  showMiniToast();
                  navigator.clipboard.writeText(recording.full_link);
                }}
              >
                COPY LINK
              </Button>
            </div>
            <div className='bg-bg-pri w-10/12 h-10 px-4 z-10 m-1 rounded-md flex items-center text-white/80 font-console overflow-hidden whitespace-nowrap hover:underline hover:cursor-pointer'>
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
                  setToastText('copied');

                  showMiniToast();
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
      {showToast && <Toast text={toastText} />}
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
      <Modal
        isModalOpen={showdeleteModal}
        handleClickYes={deleteRecording}
        setIsModalOpen={setShowdeleteModal}
      />
    </>
  );
};

export default RecordingItem;
