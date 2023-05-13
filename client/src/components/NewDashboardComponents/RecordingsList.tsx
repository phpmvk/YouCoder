import { Filter } from '@mui/icons-material';
import { Recording } from '../../types/Creator';
import { useEffect, useState } from 'react';
import FilterRecordings from './FilterRecordings';
import RecordingCard from './RecordingCard';

interface RecordingsListProps {
  recordings: Recording[];
  edit: boolean;
}

const RecordingsList = ({ recordings, edit }: RecordingsListProps) => {
  const [filterTerm, setFilterTerm] = useState<string>('');
  const [displayRecordings, setDisplayRecordings] =
    useState<Recording[]>(recordings);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    if (filterTerm === '') {
      setDisplayRecordings(recordings);
    } else {
      setDisplayRecordings(
        recordings.filter(
          (recording) =>
            recording.title.toLowerCase().includes(filterTerm.toLowerCase()) ||
            recording.language.toLowerCase().includes(filterTerm.toLowerCase())
          // add more filters here
        )
      );
    }
  }, [filterTerm]);

  return (
    <div className='px-[10vw] flex justify-around flex-col mr-[unset]'>
      <div className='align-bottom ml-auto mb-4 h-8'>
        <FilterRecordings
          filterTerm={filterTerm}
          setFilterTerm={setFilterTerm}
        />
      </div>
      <section className='flex flex-wrap w-full justify-evenly'>
        {displayRecordings.map((recording) => (
          <RecordingCard
            key={recording.recording_id}
            recording={recording}
            edit={edit}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
        ))}
      </section>
    </div>
  );
};

export default RecordingsList;
