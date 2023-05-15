import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

interface FilterRecordingsProps {
  filterTerm: string;
  setFilterTerm: React.Dispatch<React.SetStateAction<string>>;
}

const FilterRecordings = ({
  filterTerm,
  setFilterTerm,
}: FilterRecordingsProps) => {
  const [showsearch, setShowSearch] = useState<boolean>(false);
  return (
    <>
      <div className='text-white text-2xl flex items-center'>
        <button
          className={`rounded-full p-1 active:bg-bg-sec/20 ${
            showsearch ? '' : 'border-bg-sec w-20 border hover:bg-bg-sec/20 '
          } `}
          onClick={() => setShowSearch(!showsearch)}
        >
          <AiOutlineSearch />
        </button>
        {showsearch && (
          <input
            className='bg-transparent text-white text-lg border-b border-b-bg-sec pl-1 focus:outline-none'
            type='text'
            placeholder='Search'
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
            autoFocus
          />
        )}
      </div>
    </>
  );
};

export default FilterRecordings;
