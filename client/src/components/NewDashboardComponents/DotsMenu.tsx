import { MouseEvent, useEffect, useRef, useState } from 'react';
import { Recording, updateRecording } from '../../types/Creator';
import Modal from '../Modal';
import EditDetailsform from './EditDetailsForm';
import http from '../../services/recordingApi';
import { useAppDispatch } from '../../redux/hooks';
import {
  deleteUserRecording,
  updateUserRecording,
} from '../../redux/userSlice';
import { setLoadingSpinner } from '../../redux/spinnerSlice';
import { toast } from 'react-toastify';

interface DotsMenuProps {
  activeMenu: string | null;
  setActiveMenu: React.Dispatch<React.SetStateAction<string | null>>;
  id: string;
  recording: Recording;
}

const DotsMenu = ({
  activeMenu,
  setActiveMenu,
  id,
  recording,
}: DotsMenuProps) => {
  const optionsMenu = useRef<HTMLDivElement | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [details, setDetails] = useState<updateRecording>({
    title: recording.title,
    description: recording.description,
    thumbnail_link: recording.thumbnail_link,
    published: recording.published,
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const dispatch = useAppDispatch();

  const closeOpenMenus = (e: Event) => {
    if (
      optionsMenu.current &&
      !optionsMenu.current.contains(e.target as Node) &&
      e.target !== document.getElementById(`dropdownMenuIconButton${id}`)
    ) {
      setActiveMenu(null);
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeOpenMenus);
    return () => {
      document.removeEventListener('click', closeOpenMenus);
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === id ? null : id);
  };

  const handleSave = (updatedDetails: updateRecording) => {
    http
      .patchRecording(recording.recording_id, updatedDetails)
      .then((res) => {
        console.log('res.data: ', res);
        dispatch(updateUserRecording({ recording: res.data }));
        setShowModal(false);
        dispatch(setLoadingSpinner(false));
      })
      .catch((err) => {
        console.log('err: ', err);
      });
  };

  const handleDelete = () => {
    http
      .deleteRecording(recording.recording_id)
      .then((res) => {
        console.log('res from deleting recording: ', res);
        dispatch(deleteUserRecording({ recordingId: recording.recording_id }));
        setShowDeleteModal(false);
      })
      .catch((err) => {
        console.log('err from deleting recording: ', err);
      });
  };

  return (
    <>
      <Modal
        show={showDeleteModal}
        closeModal={() => setShowDeleteModal(false)}
      >
        <p className='pb-5'>Are you sure you want to delete this recording?</p>
        <button
          className='bg-bg-muilightgrey mr-5 text:white py-1 px-2 rounded border border-gray-300 hover:bg-gray-300/50'
          onClick={handleDelete}
        >
          Confirm
        </button>
        <button
          className='bg-bg-gptdark text-white py-1 px-2 rounded border border-gray-300 hover:bg-gray-300/20'
          onClick={() => setShowDeleteModal(false)}
        >
          Cancel
        </button>
      </Modal>

      <Modal
        show={showModal}
        closeModal={() => setShowModal(false)}
      >
        <EditDetailsform
          detailsToEdit={details}
          setDetailsToEdit={setDetails}
          save={handleSave}
          cancel={() => setShowModal(false)}
        />
      </Modal>
      <button
        id={`dropdownMenuIconButton${id}`}
        data-dropdown-toggle='dropdownDots'
        className='inline-flex items-center text-sm font-medium text-center text-gray-200 hover:bg-gray-300/20 rounded-md p-1 '
        type='button'
        onClick={handleClick}
      >
        <svg
          className='w-6 h-6'
          aria-hidden='true'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z'></path>
        </svg>
      </button>

      {/* <!-- Dropdown menu --> */}
      <div
        ref={optionsMenu}
        id={`dropdownDots${id}`}
        className={`${
          activeMenu === id ? 'block' : 'hidden'
        } bg-gray-600 divide-y divide-gray-100 rounded-lg shadow w-44 z-30 absolute right-10 top-0 border-bg-alt border text-gray-100`}
      >
        <ul
          className='py-2 text-sm text-gray-100 '
          aria-labelledby={`dropdownMenuIconButton${id}`}
        >
          <li>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(true);
              }}
              className='block px-4 py-2 hover:bg-bg-muigrey w-full text-left active:bg-bg-sec/20'
            >
              Edit Details
            </button>
          </li>
          <li>
            <button
              onClick={(e) => {
                navigator.clipboard.writeText(recording.full_link);
                toast.success('Link copied to clipboard');
              }}
              className='block px-4 py-2 hover:bg-bg-muigrey w-full text-left active:bg-bg-sec/20'
            >
              Copy Link
            </button>
          </li>
          <li>
            <button
              onClick={(e) => {
                navigator.clipboard.writeText(recording.iframe_link);
                toast.success('Link copied to clipboard');
              }}
              className='block px-4 py-2 hover:bg-bg-muigrey w-full text-left active:bg-bg-sec/20'
            >
              Copy {'<iframe>'}
            </button>
          </li>
        </ul>
        <div className='py-2'>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowDeleteModal(true);
            }}
            className='block px-4 py-2 text-sm hover:bg-bg-muigrey w-full text-left active:bg-bg-sec/20'
          >
            Delete Recording
          </button>
        </div>
      </div>
    </>
  );
};

export default DotsMenu;
