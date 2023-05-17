import { FC } from 'react';

interface PublishModalProps {
  close: () => void;
  confirm: () => void;
  text: string;
  title?: string;
}

const PublishModal: FC<PublishModalProps> = ({
  close,
  confirm,
  text,
  title = 'Unpublish Confirmation',
}) => {
  return (
    <div
      className='absolute z-10 mx-auto left-0 right-0 top-0 bottom-0 overflow-y-hidden'
      aria-labelledby='modal-title'
      role='dialog'
      aria-modal='true'
    >
      <div className='flex items-end justify-center h-full p-2 text-center'>
        <div
          className='fixed inset-0 bg-bg-pri/80 bg-opacity-75 transition-opacity'
          aria-hidden='true'
        ></div>
        <span
          className='hidden sm:inline-block sm:align-middle'
          aria-hidden='true'
        >
          &#8203;
        </span>
        <div className='inline-block align-bottom bg-bg-muigrey rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
          <div className='bg-bg-muigrey px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
            <div className='sm:flex sm:items-start'>
              <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                <h3
                  className='text-lg leading-6 font-medium text-white/90'
                  id='modal-title'
                >
                  {title}
                </h3>
                <div className='mt-2'>
                  <p className='text-sm text-white/90'>{text}</p>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-bg-muigrey px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
            <button
              onClick={confirm}
              type='button'
              className='inline-flex justify-center px-4 py-2 text-sm font-medium border-red-500 text-white/80 bg-red-500/10 border rounded-md hover:bg-red-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white ml-5'
            >
              Confirm
            </button>
            <button
              onClick={close}
              type='button'
              className='ml-4 inline-flex justify-center px-4 py-2 text-sm font-medium text-white/70 border-white/70 border  rounded-md hover:bg-gray-200/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white'
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishModal;
