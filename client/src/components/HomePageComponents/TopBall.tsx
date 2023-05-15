// import React from 'react';


// interface BallProps {
//   percentage: number;
// }

// const TopBall: React.FC<BallProps> = ({ percentage }) => {
//   return <div className="invisible 1140:visible"
//   style={{
//     width: percentage * 1000 - 220,
//     height: percentage * 1000 - 220,
//     position: 'absolute',
//     transform: 'translate(-40vw, -40vw)',
//     borderRadius: '50%',
//     background: 'linear-gradient(75deg, black, black, black, black, #b300ff, white)',
//   }}
//   ></div>;
// };

// export default TopBall;




import { motion, useTransform, useScroll } from 'framer-motion';
import React from 'react';
import TeachInteractively from './TeachInteractively'; // Import the component you want to render

interface BallProps {}

const TopBall: React.FC<BallProps> = () => {
  const { scrollYProgress } = useScroll();

  const scale = useTransform(scrollYProgress, [0,1], [0.9,2]);
  const x = useTransform(scrollYProgress, [0, 0.4], ['-10vw', '0vw']);
  const y = useTransform(scrollYProgress, [0, 1], ['0vw', '30vw']); 

  return (
    <>
      <motion.div
        className="absolute bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-bg-sec/75 via-bg-pri to-bg-pri/75 rounded-full md:top-[20vw] top-[10vh] w-[40vw] h-[40vw]"
        style={{
          x,
          y,
          scale,
          originX: 0,
        }}
      />
      <TeachInteractively /> 
    </>
  );
};

export default TopBall;

