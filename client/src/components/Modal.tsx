import React from 'react';
import { GiCheckMark } from 'react-icons/gi';

interface ModalProps {
  text: string;
}

const Modal = ({ text }: ModalProps) => {
  return (
    <>
      <div className='fixed top-[50vh] left-[48vw] z-[99999]'>
        <div className=' border-bg-sec border rounded-xl bg-bg-pri p-4 flex items-center flex-col justify-around  w-32 h-32'>
          <GiCheckMark className='text-3xl text-bg-alt' />
          <div className='text-xl text-white mt-2'>{text}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
