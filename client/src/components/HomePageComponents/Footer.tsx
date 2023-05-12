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

<footer className="bg-bg-pri m-4 ">
    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://youcoder.io/" className="hover:underline">YouCoder</a>. All Rights Reserved.
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
            <a href="#" className="hover:underline">Contact</a>
        </li>
    </ul>
    </div>
</footer>

  );
};

export default Footer;
