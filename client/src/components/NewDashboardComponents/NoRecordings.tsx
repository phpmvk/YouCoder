import Typewriter from 'typewriter-effect';
import { useAppSelector } from '../../redux/hooks';
interface NoRecordingsProps {}

const NoRecordings: React.FC<NoRecordingsProps> = ({}) => {
  const user = useAppSelector((state) => state.user);
  return (
    <div className='px-[10vw] flex justify-around mt-10'>
      <div className='w-full max-w-[1000px] h-[500px] bg-gradient-to-r from-white via-bg-alt to-bg-sec rounded-md flex items-center justify-center p-1 relative'>
        <div className='w-full h-full bg-bg-pri m-auto rounded-lg flex items-center justify-center p-5 flex-col'>
          <div className='text-white text-7xl'>
            <Typewriter
              options={{
                strings: [`Hi ${user.shortName}`, "it's time", 'to record.'],
                autoStart: true,
                loop: true,
                wrapperClassName:
                  'font-console md:text-5xl text-4xl lg:text-7xl',
              }}
            />
          </div>
          <div className='absolute top-5 mx-auto text-white'>
            click the button above to get started
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoRecordings;
