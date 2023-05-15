// import React, { useState, useEffect, useRef } from 'react';
// import Footer from '../HomePageComponents/Footer';
// import TopNavBar from '../HomePageComponents/TopNavBar';
// import RecordingsList from './RecordingsList';
// import CreateRecordingButton from './CreateRecordingButton';
// import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// import NoRecordings from '../NewDashboardComponents/NoRecordings';
// import { useNavigate } from 'react-router-dom';
// import { Recording } from '../../types/Creator';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../redux/store';
// import LoadingSpinner from '../LoadingSpinner';

// interface DashboardPageProps {}

// const DashboardPage: React.FC<DashboardPageProps> = ({}) => {
//   const [showCreateRecording, setShowCreateRecording] = useState(false);
//   // const navigate = useNavigate();
//   const searchTerm = useSelector((state: RootState) => state.search.searchTerm);

//   const createRecordingButtonRef = useRef(null);

//   // import the user from the reducer
//   const user = useAppSelector((state) => state.user);
//   const [displayRecordings, setDisplayRecordings] = useState<Recording[]>(
//     user.recordings!
//   );

//   useEffect(() => {
//     if (searchTerm === '') {
//       setDisplayRecordings(user.recordings!);
//     } else {
//       setDisplayRecordings(
//         user.recordings!.filter((recording) =>
//           recording.title.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//     }
//   }, [searchTerm]);

//   useEffect(() => {
//     setDisplayRecordings(user.recordings!);
//   }, [user.recordings]);

//   const observerCallback = (entries: any, observer: any) => {
//     entries.forEach((entry: any) => {
//       if (entry.intersectionRatio !== 1) {
//         setShowCreateRecording(true);
//       } else {
//         setShowCreateRecording(false);
//       }
//     });
//   };
//   useEffect(() => {
//     const observer = new IntersectionObserver(observerCallback, {
//       rootMargin: '60px',
//       threshold: 1,
//     });

//     if (createRecordingButtonRef.current) {
//       observer.observe(createRecordingButtonRef.current);
//     }

//     return () => {
//       if (createRecordingButtonRef.current) {
//         observer.unobserve(createRecordingButtonRef.current);
//       }
//     };
//   }, [createRecordingButtonRef]);

//   return (
//     <>
//       <div className='bg-bg-pri h-screen overflow-auto'>
//         <TopNavBar
//           showSearch={true}
//           showCreateRecording={showCreateRecording}
//           showDashboard={false}
//           showFeatures={false}
//           showExamples={false}
//         />
//         <div>
//           <div ref={createRecordingButtonRef}>
//             <CreateRecordingButton />
//           </div>
//           {user.recordings!.length > 0 ? (
//             <RecordingsList recordings={displayRecordings} />
//           ) : (
//             <NoRecordings />
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default DashboardPage;
