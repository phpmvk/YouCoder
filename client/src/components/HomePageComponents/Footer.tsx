import React, { FC, ReactElement } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';

export const Footer: FC = (): ReactElement => {
  return (

    // <Box
    //   sx={{
    //     width: '100%',
    //     height: '4vh',
    //     backgroundColor: 'black',
    //     paddingTop: '0.25rem',
    //     paddingBottom: '0.25rem',
    //   }}
    // >
    //   <Container maxWidth='lg'>
    //     <Grid
    //       container
    //       direction='column'
    //       alignItems='center'
    //     >
    //       <Grid
    //         item
    //         xs={12}
    //       >
    //         <Typography
    //           color='white'
    //           variant='h5'
    //         ></Typography>
    //       </Grid>
    //       <Grid
    //         item
    //         xs={12}
    //       >
    //         <Typography
    //           color='white'
    //           variant='subtitle1'
    //         >
    //           {`${new Date().getFullYear()} | YouCoder`}
    //         </Typography>
    //       </Grid>
    //     </Grid>
    //   </Container>
    // </Box>

<footer className="bg-bg-pri m-1 sticky bottom-0">
  <div className="w-full mx-auto max-w-screen-xl p-4 flex flex-wrap justify-between items-center text-sm">
    <div className="flex items-center text-gray-300 mb-2 sm:mb-0">
      <span>© 2023 </span>
      <a href="https://youcoder.io/" className="hover:underline">YouCoder</a>
      <span>. All Rights Reserved.</span>
    </div>
    <ul className="flex items-center text-sm font-medium text-gray-200">
      <li>
        <a href="https://youcoder.io/team" className="hover:underline">Team</a>
      </li>
    </ul>
  </div>
</footer>


    //<footer className='bg-bg-pri my-4 w-full pt-5 flex justify-between items-center text-sm text-gray-500 font-medium px-10'>
    //  <span>
    //    © 2023{' '}
    //    <a
     //     href='https://youcoder.io/'
     //     className='hover:underline'
    //    >
     //     YouCoder
     //   </a>
     //   . All Rights Reserved.
     // </span>
    //  <ul>
     //   <li>
      //    <a
      //      href='#'
      //      className='hover:underline'
       //   >
       //     Contact
      //    </a>
      //  </li>
    //  </ul>
   // </footer>

  );
};

export default Footer;
