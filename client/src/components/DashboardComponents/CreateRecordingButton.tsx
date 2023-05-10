import React, { forwardRef } from 'react';
import Button from '@mui/material/Button';
import { AiFillVideoCamera } from 'react-icons/ai';

const CreateRecordingButton = forwardRef((_, ref) => {
  return (
    <div className='w-1/5 h-20 mx-auto mt-[15vh]'>
      <Button
        className='!hover:bg-white w-full h-full t-[10vw] border-solid !border-2 !border-red-700 !text-white !rounded-full !text-xl'
        variant='outlined'
      >
        <AiFillVideoCamera className='text-red-700 mr-3 text-2xl' />
        Create Recording
      </Button>
    </div>
  );
});

CreateRecordingButton.displayName = 'CreateRecordingButton';

export default CreateRecordingButton;
