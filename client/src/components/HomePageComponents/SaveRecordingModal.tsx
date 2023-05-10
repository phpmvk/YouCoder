import React, { ChangeEvent, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { storage } from '../../App';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface SaveRecordingModalProps {
  onSave: (
    title: string,
    description: string,
    thumbnail: string | null
  ) => void;
  onDiscard: () => void;
  onClose: () => void;
}

export const SaveRecordingModal: React.FC<SaveRecordingModalProps> = ({
  onSave,
  onDiscard,
  onClose,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  const handleSave = () => {
    if (title.trim() !== '') {
      onSave(title, description, thumbnail);
      onClose();
    } else {
      alert('Title is mandatory.');
    }
  };

  const handleDiscard = () => {
    setShowDiscardModal(true);
  };

  const handleConfirmDiscard = () => {
    onDiscard();
    onClose();
  };

  async function handleThumbnail(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files![0];
    if (file) {
      try {
        const storageRef = ref(storage, `thumbnails/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        setThumbnail(url);
      } catch (error) {
        console.error('Error uploading thumbnail:', error);
      }
    } else {
      setThumbnail(null);
    }
  }

  return (
    <Transition appear show={true} as={React.Fragment}>
      <Dialog as="div" onClose={onClose}>
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-black"
              >
                Save Recording
              </Dialog.Title>
              <div>
                <label>Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Description:</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <label>Thumbnail:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnail}
                />
              </div>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleDiscard}>Discard</button>

              {showDiscardModal && (
                <div>
                  <p>Are you sure you want to discard your recording?</p>
                  <button onClick={handleConfirmDiscard}>Yes</button>
                  <button onClick={() => setShowDiscardModal(false)}>No</button>
                </div>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
