// import React, { useEffect, useState } from 'react';

// const debounce = <T extends (...args: any[]) => void>(func: T, wait: number) => {
//   let timeout: ReturnType<typeof setTimeout>;
//   return function executedFunction(...args: Parameters<T>) {
//     const later = () => {
//       clearTimeout(timeout);
//       func(...args);
//     };
//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//   };
// };


// const ExampleFrame: React.FC = () => {
//   const [scrollPosition, setScrollPosition] = useState<number>(0);
//   const [percentage, setPercentage] = useState<number>(0);

//   useEffect(() => {
//     const handleScroll = debounce(() => {
//       const currentScrollPosition = window.pageYOffset;
//       setScrollPosition(currentScrollPosition);
//       setPercentage(
//         (currentScrollPosition /
//           (document.body.offsetHeight - window.innerHeight)) *
//           80
//       );
//     }, 10); // Set debounce duration (10ms in this case)

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const [hasTransitioned, setHasTransitioned] = useState<boolean>(false);

//   useEffect(() => {
//     const transitionTimeout = setTimeout(() => {
//       setHasTransitioned(true);
//     }, 1500); // set the timeout duration to match the transition duration

//     return () => clearTimeout(transitionTimeout);
//   }, []);

//   return (
//     <>
//       <div
//         className={`rectangle${
//           scrollPosition >= window.innerHeight * 0.5 ? ' animate-expand' : ''
//         }`}
//         style={{
//           display: 'flex',
//           position: 'absolute',
//           left: '43%',
//           bottom: '11%',
//           transform: ` scale(${70})`,
//           width: percentage * 2,
//           height: percentage * 1,
//           background: `gray`,
//           transition: hasTransitioned ? 'none' : 'all 1.5s linear',
//           border: '0.7px solid white',
//           zIndex: 1000,
//         }}
//       />
//       <div className='h-[300vh]'></div>
//     </>
//   );
// };

// export default ExampleFrame;


import React from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';

const ExampleFrame: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0.6, 1], [0, 1]);
  const width = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const height = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <>
      <motion.div
        className=" top-[420vw] sm:top-[430vw] 700:top-[410vw] md:top-[380vw] 900:top-[340vw] lg:top-[355vw] min-w-[910px] w-[25vw] h-[12.5vw] bg-bg-pri"
        style={{
          position: 'absolute',
          left: '10%',
          scale: scale,
          zIndex: 1000,
        }}
      >
        <iframe
          src='http://localhost:5173/player/e77140cd6c2bd389b902b538a4127ecb450e?embed=true&title=false&cover=false'
          width='900'
          height='480'
          allowFullScreen
          title='the end of the world'
        />
      </motion.div>

 

    </>
  );
};

export default ExampleFrame;

