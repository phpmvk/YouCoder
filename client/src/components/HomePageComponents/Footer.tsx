import React, { FC, ReactElement } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';

export const Footer: FC = (): ReactElement => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '4vh',
        backgroundColor: 'black',
        paddingTop: '0.25rem',
        paddingBottom: '0.25rem',
      }}
    >
      <Container maxWidth='lg'>
        <Grid
          container
          direction='column'
          alignItems='center'
        >
          <Grid
            item
            xs={12}
          >
            <Typography
              color='white'
              variant='h5'
            ></Typography>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Typography
              color='white'
              variant='subtitle1'
            >
              {`${new Date().getFullYear()} | YouCoder`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
