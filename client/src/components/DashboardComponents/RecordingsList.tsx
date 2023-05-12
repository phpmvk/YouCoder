import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Recording } from '../../types/Creator';
import RecordingItem from './RecordingItem';

interface RecordingsListProps {
  recordings: Recording[];
}

const RecordingsList = ({ recordings }: RecordingsListProps) => {
  return (
    // <div className='bg-transparent min-h-screen h-[auto] w-9/12 m-auto mt-[5vh] mb-[20vh] rounded-sm '>
    <div className='bg-transparent w-9/12 m-auto min-h-screen mb-20 rounded-sm '>
      <Box sx={{ width: '100%' }}>
        <Stack spacing={3}>
          {recordings.map((recording, index) => (
            <RecordingItem
              key={index}
              recording={recording}
            />
          ))}
        </Stack>
      </Box>
    </div>
  );
};

export default RecordingsList;
