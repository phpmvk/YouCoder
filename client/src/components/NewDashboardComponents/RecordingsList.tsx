import { Filter } from '@mui/icons-material';
import { Recording } from '../../types/Creator';
import { useEffect, useState } from 'react';
import FilterRecordings from './FilterRecordings';
import RecordingCard from './RecordingCard';
import { useAppSelector } from '../../redux/hooks';
import CreateRecordingButton from './CreateRecordingButton';
import LoginArt from '../LoginPageComponents/LoginArt';

interface RecordingsListProps {
  allowEdit: boolean;
  filterTerm: string;
  setFilterTerm: React.Dispatch<React.SetStateAction<string>>;
  displayRecordings: Recording[];
}

const RecordingsList = ({
  allowEdit,
  filterTerm,
  setFilterTerm,
  displayRecordings,
}: RecordingsListProps) => {
  // const [displayRecordings, setDisplayRecordings] = useState<Recording[]>([]);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const recordings = useAppSelector((state) => state.user.recordings);

  // useEffect(() => {
  //   // re-calculate displayRecordings when recordings changes
  //   setDisplayRecordings(
  //     filterTerm === ''
  //       ? recordings || []
  //       : (recordings || []).filter(
  //           (recording) =>
  //             recording.title
  //               .toLowerCase()
  //               .includes(filterTerm.toLowerCase()) ||
  //             recording.language
  //               .toLowerCase()
  //               .includes(filterTerm.toLowerCase())
  //           // add more filters here
  //         )
  //   );
  // }, [recordings, filterTerm]);

  return (
    <div className='px-[10vw] flex justify-around flex-col mr-[unset]'>
      <div className='align-bottom ml-auto mb-4 h-8'></div>
      {displayRecordings.length >= 3 && (
        <section className='grid 2xl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-y-10 gap-x-20 mt-10'>
          {displayRecordings.map((recording) => (
            <div
              key={recording.recording_id}
              className='w-full max-w-md mx-auto flex justify-center'
            >
              <RecordingCard
                recording={recording}
                allowEdit={allowEdit}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />
            </div>
          ))}
        </section>
      )}
      {displayRecordings.length <= 2 && (
        <section className='flex flex-wrap gap-10 justify-around mt-10'>
          {displayRecordings.map((recording) => (
            <RecordingCard
              key={recording.recording_id}
              recording={recording}
              allowEdit={allowEdit}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
            />
          ))}
        </section>
      )}
    </div>
  );
};

export default RecordingsList;
