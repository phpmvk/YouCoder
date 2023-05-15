import { ChangeEvent, FC, useEffect, useState } from 'react';
import { updateRecording } from '../../types/Creator';

interface EditDetailsformProps {
  detailsToEdit: updateRecording;
  save: (details: updateRecording) => void;
}

const EditDetailsform: FC<EditDetailsformProps> = ({ detailsToEdit, save }) => {
  const [details, setDetails] = useState(detailsToEdit);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDetails({ ...details, [event.target.name]: event.target.value });
  };

  // const handleFileInputChange = (event: any) => {
  //   setFile(event.target.files[0]);
  // };

  //   useEffect(() => {
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file);
  //       reader.onload = () => {
  //         const imageUrl = URL.createObjectURL(file);
  //         setImage(imageUrl);
  //       };
  //     }
  //     return () => {
  //       if (image) {
  //         URL.revokeObjectURL(image);
  //       }
  //     };
  //   }, [file]);

  const handleSave = () => {
    save(details);
  };

  return (
    <form>
      <input
        accept='image/*'
        type='file'
        id='image'
        placeholder='Image'
        // onChange={handleFileInputChange}
        className='hidden w-full p-2 border-2 rounded-md h-52'
      />
      <label
        className='w-full'
        htmlFor='image'
      >
        <div className='relative border-2 rounded-md h-52 '>
          {detailsToEdit.thumbnail_link && (
            <img
              src='https://images.unsplash.com/photo-1684069158042-de27cd720172?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3327&q=80'
              // src={detailsToEdit.thumbnail_link}
              className='object-cover w-full mx-auto rounded-md h-52'
              alt='event poster'
            />
          )}
          <div className='px-4 py-2 text-white rounded-md bg-[#413A55]/80 absolute left-0 right-0 mx-auto w-fit top-0 bottom-0 my-auto h-fit capitalize'>
            {detailsToEdit.thumbnail_link ? 'change' : 'upload'} poster
          </div>
        </div>
      </label>{' '}
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
