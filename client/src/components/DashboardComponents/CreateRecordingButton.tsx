import React, { forwardRef } from 'react';
import Button from '@mui/material/Button';

const CreateRecordingButton = forwardRef((_, ref) => {
  return (
    <div
    
      className="w-1/2 h-20 mx-auto mt-[15vh]"
      ref={ref}
    >
<Button className="!hover:bg-white w-full h-full t-[10vw] border-solid !border-2 !border-red-700 !text-white !rounded-full text-xl" variant="outlined">Create Recording</Button>

    </div>

  );
});

CreateRecordingButton.displayName = 'CreateRecordingButton';

export default CreateRecordingButton;
