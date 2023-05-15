import React, { useState } from 'react';
import { FiInfo } from 'react-icons/fi';

const Tooltip: React.FC = () => {
  const [show, setShow] = useState(false);

  return (
    <div className='relative inline-block text-left'>
      <div>
        <button
          className='flex items-center justify-center w-8 h-8 bg-bg-alt transition duration-150 ease-in-out rounded-full hover:bg-bg-alt focus:outline-none'
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          <FiInfo />
        </button>
      </div>
      {show && (
        <div className='absolute right-0 w-48 mt-2 -mr-1 text-sm leading-tight text-bg-pri transition-opacity opacity-100 bg-bg-alt border border-bg-pri rounded py-2 shadow-lg z-20'>
          <div className='px-3 py-2'>
            If the audio is unsynchronized, try dragging the scrubber.
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
