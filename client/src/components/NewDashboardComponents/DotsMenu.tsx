import { MouseEvent, useEffect, useRef, useState } from 'react';
import { Recording, updateRecording } from '../../types/Creator';
import Modal from '../Modal';
import EditDetailsform from './EditDetailsForm';

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
    setDetails(updatedDetails);
    setShowModal(false);
  };

  return (
    <>
      <Modal
        show={showModal}
        closeModal={() => setShowModal(false)}
      >
        <EditDetailsform
          detailsToEdit={details}
          save={handleSave}
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
              className='block px-4 py-2 hover:bg-bg-muigrey w-full text-left'
            >
              Edit Details
            </button>
          </li>
          <li>
            <a
              href='#'
              className='block px-4 py-2 hover:bg-bg-muigrey '
            >
              Copy Link
            </a>
          </li>
          <li>
            <a
              href='#'
              className='block px-4 py-2 hover:bg-bg-muigrey '
            >
              Copy Embed Link
            </a>
          </li>
        </ul>
        <div className='py-2'>
          <a
            href='#'
            className='block px-4 py-2 text-sm hover:bg-bg-muigrey'
          >
            Delete Recording
          </a>
        </div>
      </div>
    </>
  );
};

export default DotsMenu;
