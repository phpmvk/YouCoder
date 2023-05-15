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

interface NewDashboardPageProps {}

const NewDashboardPage = ({}: NewDashboardPageProps) => {
  const [showCreateRecording, setShowCreateRecording] = useState(false);
  const [displayRecordings, setDisplayRecordings] = useState<Recording[]>([]);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

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
        dispatch(editUser({ ...user, recordings: response.data }));
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
      {user.recordings && user.recordings.length > 0 ? (
        <RecordingsList allowEdit={true} />
      ) : (
        <NoRecordings />
      )}
    </>
  );
};

export default NewDashboardPage;
