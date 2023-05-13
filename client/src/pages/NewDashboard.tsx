import { useEffect, useRef, useState } from 'react';
import { Recording } from '../types/Creator';
import http from '../services/recordingApi';
import { useAppDispatch } from '../redux/hooks';
import { setLoadingPage, setLoadingSpinner } from '../redux/spinnerSlice';
import TopNavBar from '../components/HomePageComponents/TopNavBar';
import CreateRecordingButton from '../components/DashboardComponents/CreateRecordingButton';
import RecordingsList from '../components/NewDashboardComponents/RecordingsList';
import NoRecordings from '../components/DashboardComponents/NoRecordings';

interface NewDashboardPageProps {}

const NewDashboardPage = ({}: NewDashboardPageProps) => {
  const [showCreateRecording, setShowCreateRecording] = useState(false);
  const [displayRecordings, setDisplayRecordings] = useState<Recording[]>([]);
  const dispatch = useAppDispatch();

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
      rootMargin: '0px',
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
    dispatch(setLoadingPage(true));

    http
      .getAllUserRecordings()
      .then((response) => {
        console.log(response.data);
        setDisplayRecordings(response.data);
        dispatch(setLoadingPage(false));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <TopNavBar showCreateRecording={showCreateRecording} />
      <div ref={createRecordingButtonRef}>
        <CreateRecordingButton />
      </div>
      {displayRecordings.length > 0 ? (
        <RecordingsList
          recordings={displayRecordings}
          edit={true}
        />
      ) : (
        <NoRecordings />
      )}
    </>
  );
};

export default NewDashboardPage;
