import { forwardRef } from 'react';
import Button from '@mui/material/Button';
import { AiFillVideoCamera } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const CreateRecordingButton = forwardRef((_, ref) => {
  return (
    <div className=' w-full flex justify-center'>
      <Link to='/recording'>
        <Button
          className='!hover:bg-white w-80 border-solid !border-2 !border-red-700 hover:!bg-red-700/30 !text-white !rounded-full !text-lg'
          variant='outlined'
        >
          <AiFillVideoCamera className='text-red-700 mr-3 text-2xl' />
          Create A Recording
        </Button>
      </Link>
    </div>
  );
});

CreateRecordingButton.displayName = 'CreateRecordingButton';

export default CreateRecordingButton;
