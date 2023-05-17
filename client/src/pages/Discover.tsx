import { FC, useEffect, useState } from 'react';
import TopNavBar from '../components/HomePageComponents/TopNavBar';
import { Link, useSearchParams } from 'react-router-dom';
import http from '../services/discoverApi';
import { Recording } from '../types/Creator';
import RecordingsList from '../components/NewDashboardComponents/RecordingsList';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { setSearchTriggered } from '../redux/searchSlice';

interface DiscoverPageProps {
  userId?: string;
}

const DiscoverPage: FC<DiscoverPageProps> = ({ userId }) => {
  const [recordingsToDisplay, setRecordingsToDisplay] = useState<Recording[]>(
    []
  );
  const [firstRecordingsToDisplay, setFirstRecordingsToDisplay] = useState<
    Recording[]
  >([]);
  const [showKeywordTitle, setShowKeywordTitle] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const userParams = searchParams.get('user');

  console.log('there is a user:', userParams);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   setRecordingsToDisplay([]);
  //   if (userId) {
  //     http
  //       .discoverByUser(userId)
  //       .then((response) => {
  //         console.log('response: ', response.data);
  //       })
  //       .catch((error) => {
  //         console.log('error: ', error);
  //       });
  //   } else {
  //     http
  //       .discover()
  //       .then((response) => {
  //         console.log('response: ', response.data);
  //         setRecordingsToDisplay(response.data);
  //         setFirstRecordingsToDisplay(response.data);
  //       })
  //       .catch((error) => {
  //         console.log('error: ', error);
  //       });
  //   }
  // }, []);

  const searchTerm = useAppSelector(
    (state: RootState) => state.search.searchTerm
  );
  const searchTriggered = useAppSelector(
    (state: RootState) => state.search.searchTriggered
  );

  // const handleSearchKeyPress = (e: React.KeyboardEvent) => {
  //   console.log('e:', e);
  //   console.log('searchterm: ', searchTerm);
  //   if (e.key === 'Enter' && searchTerm !== '') {
  //     http
  //       .discoverQuery(searchTerm)
  //       .then((response) => {
  //         console.log('response: ', response.data);
  //         setShowKeywordTitle(true);
  //         setRecordingsToDisplay(response.data);
  //       })
  //       .catch((error) => {
  //         console.log('error: ', error);
  //       });
  //   } else if (e.key === 'Enter' && searchTerm === '') {
  //     setShowKeywordTitle(false);
  //     setRecordingsToDisplay(firstRecordingsToDisplay);
  //   }
  // };

  useEffect(() => {
    if (userParams && userParams !== '' && !searchTriggered) {
      console.log('user params is not empty');
      http
        .discoverByUser(userParams)
        .then((response) => {
          console.log('response: ', response.data);
          setRecordingsToDisplay(response.data);
          setFirstRecordingsToDisplay(response.data);
        })
        .catch((error) => {
          console.log('error: ', error);
        });
    } else if (searchTriggered) {
      console.log('search term is triggered');
      if (searchTerm !== '') {
        http
          .discoverQuery(searchTerm)
          .then((response) => {
            console.log('response: ', response.data);
            setRecordingsToDisplay(response.data);
            setShowKeywordTitle(true);
            dispatch(setSearchTriggered(false));
          })
          .catch((error) => {
            console.log('error: ', error);
          });
      } else {
        setRecordingsToDisplay(firstRecordingsToDisplay);
        setShowKeywordTitle(false);
        dispatch(setSearchTriggered(false));
      }
    } else if (searchTerm === '') {
      console.log('search term is empty');
      if (firstRecordingsToDisplay.length === 0) {
        console.log('first recordings to display is empty');
        http
          .discover()
          .then((response) => {
            console.log('response: ', response.data);
            setRecordingsToDisplay(response.data);
            setFirstRecordingsToDisplay(response.data);
          })
          .catch((error) => {
            console.log('error: ', error);
          });
      } else {
        setRecordingsToDisplay(firstRecordingsToDisplay);
        setShowKeywordTitle(false);
      }
    }
  }, [searchTriggered, searchTerm, http, dispatch, userParams]);

  return (
    <>
      <TopNavBar
        showFeatures={true}
        showSearch={true}
        showCreateRecording={false}
        showDashboard={true}
      />
      <Link
        reloadDocument
        to='/discover'
      >
        <h1 className='text-white/80 font-title text-4xl pt-14 px-7'>
          Discover
        </h1>
        <p className='text-white/80 font-title px-7'>Trending recordings</p>
      </Link>
      <RecordingsList
        displayRecordings={recordingsToDisplay}
        allowEdit={false}
        filterTerm={''}
      />
    </>
  );
};

export default DiscoverPage;
