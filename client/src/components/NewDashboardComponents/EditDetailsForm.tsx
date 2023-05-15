import { ChangeEvent, FC, useState } from 'react';
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

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDetails({ ...details, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    save(details);
  };

  return (
    <form>
      <label>
        Image URL:
        <input
          name='imageUrl'
          value={details.thumbnail_link}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Title:
        <input
          name='title'
          value={details.title}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Description:
        <input
          name='description'
          value={details.description}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Published:
        <input
          name='published'
          type='checkbox'
          checked={details.published}
          onChange={(event) => {
            setDetails({
              ...details,
              published: event.target.checked,
            });
          }}
        />
      </label>
      <button
        type='button'
        onClick={handleSave}
      >
        Save
      </button>
    </form>
  );
};

export default EditDetailsform;
