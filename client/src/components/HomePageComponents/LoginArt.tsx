import React from 'react';

const LoginArt = () => {
  return (
    <div className='relative '>
      <div className='x bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-violet-900 via-zinc-400 to-bg-sec rounded-full h-[900px] w-[900px] my-8 ml-10 animate-spin-xslow'>
        {/* <div className="bg-gradient-to-r from-red-600 to-red-900 rounded-full h-[90px] w-[90px] my-8 ml-10 animate-spin -z-10 flex"></div> */}
      </div>
      <div className=' y h-[350px] w-[350px]  opacity rounded-full absolute top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] text-black text-7xl font-bold font-title flex justify-center items-center'>
        <div className='text-left'>
          <div>Code.</div>
          <div>
            Record
            <span className='text-red-700 animate-[blinking_1s_infinite]'>
              .
            </span>
          </div>
          <div>Share.</div>
          <div>Engage.</div>
        </div>
      </div>
    </div>
  );
};

export default LoginArt;
