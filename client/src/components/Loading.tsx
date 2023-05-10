const Loading = () => {
  return (
    <>
      <div className='fixed h-screen w-screen bg-bg-pri z-[9999] flex items-center justify-around'>
        <div className='lg:text-5xl sm:text-4xl left-5 flex items-center mx-12 font-title'>
          <span className='text-bg-sec'>{`{`}</span>
          <span className='text-white px-3 blinking-cursor'> Loading...</span>
          <span className='text-bg-sec'>{`}`}</span>
        </div>
      </div>
    </>
  );
};

export default Loading;
