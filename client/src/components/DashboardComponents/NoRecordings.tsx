interface NoRecordingsProps {}

const NoRecordings: React.FC<NoRecordingsProps> = ({}) => {
  return (
    <>
      <div className='w-10/12 h-[60vh] bg-gradient-to-r from-white via-bg-alt to-bg-sec mx-auto rounded-md flex items-center justify-center p-3 relative'>
        <div className='w-full h-[57vh] bg-bg-pri m-auto rounded-lg flex items-center justify-center p-5 flex-col'>
          <div className='text-white text-7xl blinking-cursor'>
            time to record
          </div>
          <div className='absolute top-10 mx-auto text-white'>
            Make your first video
          </div>
        </div>
      </div>
    </>
  );
};

export default NoRecordings;
