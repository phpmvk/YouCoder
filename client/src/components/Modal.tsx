import { FC, ReactNode } from 'react';

interface ModalProps {
  show: boolean;
  closeModal: () => void;
  children: ReactNode;
  closeOnOutsideClick?: boolean;
}

const Modal: FC<ModalProps> = ({
  show,
  closeModal,
  children,
  closeOnOutsideClick = true,
}) => {
  if (!show) {
    return null;
  }
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div
        className='absolute inset-0 bg-black opacity-70'
        onClick={closeOnOutsideClick ? closeModal : undefined}
      />
      <div className='w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform shadow-[0px_0px_3px_1px_rgba(0,0,0)] rounded-2xl shadow-bg-sec p-6 bg-bg-pri z-50'>
        {children}
      </div>
    </div>
  );
};

export default Modal;
