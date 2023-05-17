import { FC, useEffect, useState } from 'react';
import TopNavBar from '../components/HomePageComponents/TopNavBar';
import { Link, useSearchParams } from 'react-router-dom';
import http from '../services/discoverApi';
import { Recording } from '../types/Creator';
import RecordingsList from '../components/NewDashboardComponents/RecordingsList';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { setSearchTriggered } from '../redux/searchSlice';
import { motion, useTransform, useScroll } from 'framer-motion';

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


  //framer stuff
  // const { scrollYProgress } = useScroll();

  // const scale = useTransform(scrollYProgress, [0,1], [0.7,3]);
  // const x = useTransform(scrollYProgress, [0, 0.4], ['-10vw', '100vw']);
  // const y = useTransform(scrollYProgress, [0, 1], ['0vw', '90vw']); 



  

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

  useEffect(() => {
    if (userParams && userParams !== '' && !searchTriggered) {
      http
        .discoverByUser(userParams)
        .then((response) => {
          setRecordingsToDisplay(response.data);
          setFirstRecordingsToDisplay(response.data);
        })
        .catch((error) => {
          console.log('error: ', error);
        });
    } else if (searchTriggered) {
      if (searchTerm !== '') {
        http
          .discoverQuery(searchTerm)
          .then((response) => {
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
      if (firstRecordingsToDisplay.length === 0) {
        http
          .discover()
          .then((response) => {
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
        <h1 className='w-[250px] text-transparent font-title text-5xl pt-14 px-7 bg-gradient-to-r from-bg-sec via-white to-bg-alt bg-clip-text z-10'>
  Discover
</h1>
<p className='text-white/80 font-title px-7 z-10'>Trending recordings</p>
      
{/* <motion.div className="absolute top-20 left-96 h-[40vw] w-[40vw] bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-800 via-purple-800 to-cyan-100 rounded-full opacity-50 z-0"
 style={{
  x,
  y,
  scale,
  originX: 0,
}}

></motion.div> */}
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
