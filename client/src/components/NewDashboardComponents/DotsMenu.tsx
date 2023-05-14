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
        id={`dropdownDots${id}`}
        className={`${
          isOpen ? 'block' : 'hidden'
        } bg-gray-600 divide-y divide-gray-100 rounded-lg shadow w-44 z-30 absolute right-10 top-0 border-bg-alt border text-gray-100`}
      >
        <ul
          className='py-2 text-sm text-gray-100 '
          aria-labelledby={`dropdownMenuIconButton${id}`}
        >
          <li>
            <a
              href='#'
              className='block px-4 py-2 hover:bg-bg-muigrey '
            >
              Edit Details
            </a>
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
          <li>
            <a
              href='#'
              className='block px-4 py-2 hover:bg-bg-muigrey '
            >
              {}
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
