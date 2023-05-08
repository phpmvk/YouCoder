import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import ListItem from './ListItem';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const ListContainer = () => {
  return (
<div className="bg-transparent h-[auto] w-9/12 m-auto mt-[5vh] mb-[20vh]rounded-sm ">
<Box sx={{ width: '100%' }}>
      <Stack spacing={3}>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 1</ListItem>
       
        
      </Stack>
    </Box>
</div>
  )
}

export default ListContainer