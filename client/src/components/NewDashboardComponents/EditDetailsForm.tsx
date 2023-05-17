import { ChangeEvent, FC, useEffect, useState, useRef } from 'react';
import { updateRecording } from '../../types/Creator';
import { BsTrashFill } from 'react-icons/bs';
import PublishModal from './PublishModal';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAppDispatch } from '../../redux/hooks';
import { setLoadingSpinner } from '../../redux/spinnerSlice';

interface EditDetailsformProps {
  detailsToEdit: updateRecording;
  save: (details: updateRecording) => void;
  setDetailsToEdit: React.Dispatch<React.SetStateAction<updateRecording>>;
  cancel: () => void;
  cancelText?: string;
  warnBeforeUnpublish?: boolean;
}

const EditDetailsform: FC<EditDetailsformProps> = ({
  detailsToEdit,
  setDetailsToEdit,
  save,
  cancel,
  cancelText = 'Cancel',
  warnBeforeUnpublish = true,
}) => {
  const [image, setImage] = useState(detailsToEdit.thumbnail_link);
  const [file, setFile] = useState<File | null>(null);
  const [titleError, setTitleError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showUnpublishModal, setShowUnpublishModal] = useState(false);
  const [showDismissModal, setShowDismissModal] = useState(false);
  const [newPublishedValue, setNewPublishedValue] = useState(
    detailsToEdit.published
  );
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const storage = getStorage();
  const dispatch = useAppDispatch();

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDetailsToEdit({
      ...detailsToEdit,
      [event.target.name]: event.target.value,
    });
    if (event.target.name === 'title') {
      setTitleError('');
    }
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.stopPropagation();
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
      };
    }
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [file]);

  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  const handleSave = async () => {
    if (!detailsToEdit.title!.trim()) {
      setTitleError('Title is required');
      return;
    }
    setButtonDisabled(true);
    let updatedDetails = { ...detailsToEdit };

    console.log('file: ', file);
    console.log('image: ', image);

    if (file) {
      try {
        dispatch(setLoadingSpinner(true));
        const storageRef = ref(storage, `thumbnails/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        setImage(url);
        updatedDetails.thumbnail_link = url;
        setDetailsToEdit({ ...detailsToEdit, thumbnail_link: url });
        save(updatedDetails);
      } catch (error) {
        console.error('Error uploading thumbnail:', error);
      }
    } else if (!file && image) {
      updatedDetails.thumbnail_link = image;
      setDetailsToEdit({ ...detailsToEdit, thumbnail_link: image });
      save(updatedDetails);
    } else {
      updatedDetails.thumbnail_link = '';
      setDetailsToEdit({ ...detailsToEdit, thumbnail_link: '' });
      save(updatedDetails);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    // Check if title is empty on blur
    if (event.target.name === 'title' && !detailsToEdit.title!.trim()) {
      setTitleError('Title is required');
    }
  };

  const handleDeleteImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setImage('');
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <form className='text-white'>
        <input
          ref={fileInputRef}
          accept='image/*'
          type='file'
          id='image'
          name='thumbnail_link'
          placeholder='Image'
          onChange={handleFileInputChange}
          className='hidden w-full p-2 border-2 rounded-md h-52 '
        />
        <label
          className='w-full cursor-pointer'
          htmlFor='image'
        >
          <div className='relative border border-gray-400 rounded-md h-52 mb-4'>
            {image && (
              <img
                src={image}
                className='object-cover w-full mx-auto rounded-sm h-full'
                alt='event poster'
              />
            )}
            <div className='px-4 py-2 text-white rounded-md bg-bg-muigrey/80 absolute left-0 right-0 mx-auto w-fit top-0 bottom-0 my-auto h-fit capitalize'>
              {image ? 'change' : 'upload'} poster
            </div>
            {image && (
              <button
                onClick={handleDeleteImage}
                className='absolute top-2 right-2 p-2 bg-bg-muigrey/40 rounded-md hover:bg-bg-muigrey/60'
              >
                <BsTrashFill />
              </button>
            )}
          </div>
        </label>
        <div className='flex flex-col relative'>
          <label>
            Title:
            <input
              className={`w-full p-2 border border-gray-400 rounded-md bg-bg-muigrey/80 mb-4 ${
                titleError && 'border-red-600/70 border'
              }}`}
              name='title'
              value={detailsToEdit.title}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
          </label>
          {titleError && (
            <small className='text-red-600/90 absolute right-0 top-[4.3rem]'>
              {titleError}
            </small>
          )}
          <label>
            Description:
            <textarea
              name='description'
              className='w-full p-2 border border-gray-400 rounded-md bg-bg-muigrey/80 mb-4'
              value={detailsToEdit.description}
              onChange={handleInputChange}
            />
          </label>
          <fieldset className='flex mb-4'>
            <legend className='mb-2'>Published?</legend>
            <label className='flex items-center mb-4 mr-6'>
              <input
                className='mr-1 checked:bg-bg-sec rounded-full appearance-none w-4 h-4 unchecked:bg-red-600 bg-white border border-gray-200'
                name='published'
                type='radio'
                checked={detailsToEdit.published === true}
                onChange={(event) => {
                  if (
                    warnBeforeUnpublish &&
                    detailsToEdit.published &&
                    !event.target.checked
                  ) {
                    setNewPublishedValue(false);
                    setShowUnpublishModal(true);
                  } else {
                    setDetailsToEdit({
                      ...detailsToEdit,
                      published: true,
                    });
                  }
                }}
              />
              YES
            </label>
            <label className='flex items-center mb-4'>
              <input
                className='mr-1 checked:bg-bg-sec rounded-full appearance-none w-4 h-4 unchecked:bg-red-600 bg-white border border-gray-200'
                name='published'
                type='radio'
                checked={detailsToEdit.published === false}
                onChange={(event) => {
                  if (!detailsToEdit.published && event.target.checked) {
                    setDetailsToEdit({
                      ...detailsToEdit,
                      published: false,
                    });
                  } else {
                    setNewPublishedValue(true);
                    setShowUnpublishModal(true);
                  }
                }}
              />
              NO
            </label>
          </fieldset>
        </div>
        <button
          type='button'
          onClick={handleSave}
          className='w-fit py-2 px-4 border border-gray-400 rounded-md bg-bg-sec/90 mb-4 hover:bg-bg-sec/20 active:bg-white/30'
          disabled={buttonDisabled}
        >
          Save
        </button>
        <button
          type='button'
          onClick={
            warnBeforeUnpublish ? cancel : () => setShowDismissModal(true)
          }
          className='ml-10 w-fit py-2 px-4 border border-gray-400 rounded-md mb-4 hover:bg-white/20 active:bg-white/30'
        >
          {cancelText}
        </button>
      </form>
      {showUnpublishModal && (
        <PublishModal
          text={
            'If you unpublish this recording, all the links where this recording is embedded will stop working until you publish it again. Are you sure you want to proceed?'
          }
          close={() => setShowUnpublishModal(false)}
          confirm={() => {
            setDetailsToEdit({ ...detailsToEdit, published: false });
            setShowUnpublishModal(false);
          }}
        />
      )}
      {showDismissModal && (
        <PublishModal
          title={
            cancelText === 'Discard'
              ? 'Dismiss Changes'
              : 'Unpublish Confirmation'
          }
          text={
            'If you dismiss this recording, it will be deleted permanently. Are you sure you want to proceed?'
          }
          close={() => setShowDismissModal(false)}
          confirm={() => {
            cancel();
            setShowDismissModal(false);
          }}
        />
      )}
    </>
  );
};

export default EditDetailsform;
