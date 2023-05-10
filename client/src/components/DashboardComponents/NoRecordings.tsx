import Typewriter from 'typewriter-effect';
import { useAppSelector } from '../../redux/hooks';
interface NoRecordingsProps {}

const NoRecordings: React.FC<NoRecordingsProps> = ({}) => {
  const user = useAppSelector((state) => state.user);
  return (
    <>
      <div className='w-10/12 h-[60vh] bg-gradient-to-r from-white via-bg-alt to-bg-sec mx-auto rounded-md flex items-center justify-center p-3 relative'>
        <div className='w-full h-[57vh] bg-bg-pri m-auto rounded-lg flex items-center justify-center p-5 flex-col'>
          <div className='text-white text-7xl'>
            <Typewriter
              options={{
                strings: [`Hi ${user.shortName}`, "it's time", 'to record!'],
                autoStart: true,
                loop: true,
                wrapperClassName: 'font-console',
              }}
            />
          </div>
          <div className='absolute top-10 mx-auto text-white'>
            click the button above to get started
          </div>
        </div>
      </div>
    </>
  );
};

export default NoRecordings;
