import React, { FC, ReactElement } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';

export const Footer: FC = (): ReactElement => {
  return (
    <footer className='bg-bg-pri my-4 absolute bottom-0 w-full flex justify-between items-center text-sm text-gray-500 font-medium px-10'>
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
