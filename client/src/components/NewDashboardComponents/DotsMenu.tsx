import { useState } from 'react';

interface DotsMenuProps {
  activeMenu: string | null;
  setActiveMenu: React.Dispatch<React.SetStateAction<string | null>>;
  id: string;
}

const DotsMenu = ({ activeMenu, setActiveMenu, id }: DotsMenuProps) => {
  const isOpen = activeMenu === id;

  const handleClick = () => {
    setActiveMenu(isOpen ? null : id);
  };

  return (
    <>
      <button
        id='dropdownMenuIconButton'
        data-dropdown-toggle='dropdownDots'
        className='inline-flex items-center text-sm font-medium text-center text-bg-pri/60  '
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
        id={`dropdownDots${id}`}
        className={`z-10 ${
          isOpen ? 'block' : 'hidden'
        } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 z-[9999999] absolute right-10 top-0 border-green-600 border`}
      >
        <ul
          className='py-2 text-sm text-gray-700 '
          aria-labelledby={`dropdownMenuIconButton${id}`}
        >
          <li>
            <a
              href='#'
              className='block px-4 py-2 hover:bg-gray-100 '
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href='#'
              className='block px-4 py-2 hover:bg-gray-100 '
            >
              Settings
            </a>
          </li>
          <li>
            <a
              href='#'
              className='block px-4 py-2 hover:bg-gray-100 '
            >
              Earnings
            </a>
          </li>
        </ul>
        <div className='py-2'>
          <a
            href='#'
            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
          >
            Separated link
          </a>
        </div>
      </div>
    </>
  );
};

export default DotsMenu;
