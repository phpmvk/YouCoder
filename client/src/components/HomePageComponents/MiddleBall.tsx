// import React from 'react';


// interface BallProps {
//     percentage: number;
//   }

// const MiddleBall: React.FC<BallProps> = ({percentage}) => {
//   return (
//     <>
//     <div className=" invisible max-lg:visible bg-gradient-to-r from-bg-sec via-black to-black rounded-full h-[350px] w-[350px] -mt-50 -ml-20 animate-spin-xslow -z-10 flex">
    
//       </div> 
//       <div className=" invisible max-lg:visible bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-bg-alt via-transparent to-transparent rounded-full h-[500px] w-[550px] mt-30 ml-20 animate-spin-xslow -z-10 flex">
    
//       </div> 
//     <div className="xl:text-9xl lg:text-9xl lg:font-bold xl:font-bold md:text-8xl md:font-bold sm:font-bold sm:text-7xl text-7xl"
//     style={{
//         width: percentage * 1000 - 220,
//         height: percentage * 1000 - 220,
//         position: 'absolute',
//     left: '50%',
//     top: '50%',
//     transform: 'translate(-50%, -50%)',
//     borderRadius: '50%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'column',
//     textAlign: 'center',
//     background: 'radial-gradient(circle, black, black, black, black, black, black, #b300ff, white, black)',
//     boxShadow:
//       '0 0 0.3vw 0.3vw rgba(204, 255, 0, 0.9), 0 0 1vw 1vw rgba(255, 255, 255, 0.6), 0 0 2vw 2vw rgba(255, 255, 255, 0.3), 0 0 3vw 3vw rgba(255, 255, 255, 0.2)',
//     color: 'white',
    
//       }}>
       
// <div>
//   <div>Code.</div>
//   <div>Record
//   <span className="text-red-700 animate-[blinking_1s_infinite] " >.</span></div>
//   <div>Share.</div>
//   <div>Engage.</div>
// </div>
// </div></>
//   )
// }

// export default MiddleBall;



import React from 'react';
import { motion, useTransform, useViewportScroll } from 'framer-motion';

interface BallProps {
  percentage: number;
}

const MiddleBall: React.FC<BallProps> = ({ percentage }) => {
  const { scrollYProgress } = useViewportScroll();

  const scale = useTransform(scrollYProgress, [0.4, 1], [1, 4.5]);
  const y = useTransform(scrollYProgress, [0, 0.5], ['0vw', '0vw']);

  return (
    <>
      {/* <div className="invisible max-lg:visible bg-gradient-to-r from-bg-sec via-black to-black rounded-full h-[350px] w-[350px] -mt-50 -ml-20 animate-spin-xslow -z-10 flex"></div> */}
      {/* <div className="invisible max-lg:visible bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-bg-alt via-transparent to-transparent rounded-full h-[30vw] w-[10vw] mt-30 ml-20 animate-spin-xslow z-0 flex"></div> */}
      <motion.div
        className="text-5xl p-20 h-[30vw] w-[30vw]"
        style={{
          position: 'absolute',
          left: '35%',
          top: '250vh',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          background: 'radial-gradient(circle, black, black, black, black, black, black, #b300ff, white, black)',
          boxShadow: '0 0 0.3vw 0.3vw rgba(204, 255, 0, 0.9), 0 0 1vw 1vw rgba(255, 255, 255, 0.6), 0 0 2vw 2vw rgba(255, 255, 255, 0.3), 0 0 3vw 3vw rgba(255, 255, 255, 0.2)',
          color: 'white',
          scale,
          y,
        }}
      >
        <div>
          <div>Code.</div>
          <div>
            Record
            <span className="text-red-700 animate-[blinking_1s_infinite]">.</span>
          </div>
          <div>Share.</div>
          <div>Engage.</div>
        </div>
      </motion.div>
    </>
  );
};

export default MiddleBall;
