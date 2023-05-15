import { Filter } from '@mui/icons-material';
import { Recording } from '../../types/Creator';
import { useEffect, useState } from 'react';
import FilterRecordings from './FilterRecordings';
import RecordingCard from './RecordingCard';
import { useAppSelector } from '../../redux/hooks';

interface RecordingsListProps {
  allowEdit: boolean;
}

const RecordingsList = ({ allowEdit }: RecordingsListProps) => {
  const [filterTerm, setFilterTerm] = useState<string>('');
  const [displayRecordings, setDisplayRecordings] = useState<Recording[]>([]);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const recordings = useAppSelector((state) => state.user.recordings);

  useEffect(() => {
    // re-calculate displayRecordings when recordings changes
    setDisplayRecordings(
      filterTerm === ''
        ? recordings || []
        : (recordings || []).filter(
            (recording) =>
              recording.title
                .toLowerCase()
                .includes(filterTerm.toLowerCase()) ||
              recording.language
                .toLowerCase()
                .includes(filterTerm.toLowerCase())
            // add more filters here
          )
    );
  }, [recordings, filterTerm]);

  return (
    <div className='px-[10vw] flex justify-around flex-col mr-[unset]'>
      <div className='align-bottom ml-auto mb-4 h-8'>
        <FilterRecordings
          filterTerm={filterTerm}
          setFilterTerm={setFilterTerm}
        />
      </div>

      <section className='flex flex-wrap gap-10 justify-around'>
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
    </div>
  );
};

export default RecordingsList;
