import { FC, ReactNode } from 'react';

interface ModalProps {
  show: boolean;
  closeModal: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ show, closeModal, children }) => {
  if (!show) {
    return null;
  }
  return (
    <div className='fixed inset-0 flex items-center justify-center z-[99999]'>
      <div
        className='absolute inset-0 bg-black opacity-50'
        onClick={closeModal}
      />
      <div className='p-6 bg-white rounded shadow-lg z-[99999]'>{children}</div>
    </div>
  );
};

export default Modal;
