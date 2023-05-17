import { useEffect, useRef, useState } from 'react';
import { Recording } from '../types/Creator';
import { editUser } from '../redux/userSlice';
import http from '../services/recordingApi';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setLoadingPage } from '../redux/spinnerSlice';
import TopNavBar from '../components/HomePageComponents/TopNavBar';
import CreateRecordingButton from '../components/NewDashboardComponents/CreateRecordingButton';
import RecordingsList from '../components/NewDashboardComponents/RecordingsList';
import NoRecordings from '../components/NewDashboardComponents/NoRecordings';
import FilterRecordings from '../components/NewDashboardComponents/FilterRecordings';

interface NewDashboardPageProps {}

const NewDashboardPage = ({}: NewDashboardPageProps) => {
  const [showCreateRecording, setShowCreateRecording] = useState(false);
  const [displayRecordings, setDisplayRecordings] = useState<Recording[]>([]);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [filterTerm, setFilterTerm] = useState<string>('');

  // // this is how to use the search term from the navbar (uses redux)
  // const searchTerm = useAppSelector((state: RootState) => state.search.searchTerm);
  // // to filter the recordings based on the search term
  // useEffect(() => {
  //   if (searchTerm === '') {
  //     setDisplayRecordings(user.recordings!);
  //   } else {
  //     setDisplayRecordings(
  //       user.recordings!.filter((recording) =>
  //         recording.title.toLowerCase().includes(searchTerm.toLowerCase())
  //       )
  //     );
  //   }
  // }, [searchTerm]);

  const createRecordingButtonRef = useRef(null);

  const observerCallback = (entries: any, observer: any) => {
    entries.forEach((entry: any) => {
      if (entry.intersectionRatio < 1) {
        setShowCreateRecording(true);
      } else {
        setShowCreateRecording(false);
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '30px',
      threshold: 1,
    });

    if (createRecordingButtonRef.current) {
      observer.observe(createRecordingButtonRef.current);
    }

    return () => {
      if (createRecordingButtonRef.current) {
        observer.unobserve(createRecordingButtonRef.current);
      }
    };
  }, [createRecordingButtonRef]);

  // fetch recordings from the backend
  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(setLoadingPage(true));

    http
      .getAllUserRecordings()
      .then((response) => {
        console.log(response.data);
        dispatch(editUser({ ...user, recordings: response.data }));
        dispatch(setLoadingPage(false));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
    <>
      <TopNavBar
        showCreateRecording={showCreateRecording}
        showSearch={true}
      />
      <div
        className='grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 px-[10vw] text-white items-center pt-12'
        ref={createRecordingButtonRef}
      >
        <div className='flex-shrink'></div>
        <CreateRecordingButton />
        {user.recordings && user.recordings.length > 0 && (
          <div className='ml-auto min-w-[235px] md:pt-12 lg:pt-0 sm:pt-12 pt-12 lg:pt0 md:w-full md:flex md:justify-around sm:w-full sm:flex sm:justify-around xs:w-full xs:flex xs:justify-around'>
            <FilterRecordings
              filterTerm={filterTerm}
              setFilterTerm={setFilterTerm}
            />
          </div>
        )}
      </div>
      {user.recordings && user.recordings.length > 0 ? (
        <RecordingsList
          displayRecordings={displayRecordings}
          allowEdit={true}
          filterTerm={filterTerm}
          setFilterTerm={setFilterTerm}
        />
      ) : (
        <NoRecordings />
      )}
    </>
  );
};

export default NewDashboardPage;
