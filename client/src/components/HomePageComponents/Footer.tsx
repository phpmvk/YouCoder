import { FC, ReactElement } from 'react';

export const Footer: FC = (): ReactElement => {
  return (
    <footer className='bg-bg-pri my-4 w-full pt-5 flex justify-evenly items-center text-sm text-gray-500 font-medium'>
      <span>
        © 2023{' '}
        <a
          href='https://youcoder.io/'
          className='hover:underline'
        >
          YouCoder
        </a>
        . All Rights Reserved.
      </span>
      <ul>
        <li>
          <a
            href='#'
            className='hover:underline'
          >
            Contact
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
