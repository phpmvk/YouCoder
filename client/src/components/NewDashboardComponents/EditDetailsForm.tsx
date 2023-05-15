import { FC, useState } from 'react';
import { updateRecording } from '../../types/Creator';

interface EditDetailsformProps {
  initialDetails: updateRecording;
  save: (details: updateRecording) => void;
}

const EditDetailsform: FC<EditDetailsformProps> = ({
  initialDetails,
  save,
}) => {
  const [details, setDetails] = useState(initialDetails);
  return <></>;
};

export default EditDetailsform;
