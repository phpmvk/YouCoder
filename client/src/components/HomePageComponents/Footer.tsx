import { FC, ReactElement } from 'react';

export const Footer: FC = (): ReactElement => {
  return (
    <footer className='bg-bg-pri mt-auto h-36 flex items-end'>
      <div className='w-full mx-auto max-w-screen-xl p-4 flex flex-wrap justify-between items-center text-sm'>
        <div className='flex items-center text-gray-300 mb-2 sm:mb-0'>
          <span className='mr-2'>© 2023 </span>
          <a
            href='https://youcoder.io/'
            className='hover:underline'
          >
            YouCoder
          </a>
          <span>・All Rights Reserved</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
