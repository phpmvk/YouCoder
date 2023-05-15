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

  const scale = useTransform(scrollYProgress, [0,1], [0.7,3]);
  const x = useTransform(scrollYProgress, [0, 0.4], ['-10vw', '100vw']);
  const y = useTransform(scrollYProgress, [0, 1], ['0vw', '90vw']); 

  return (
    <>
      <motion.div
        className="absolute bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-800 via-purple-800 to-cyan-100 rounded-full md:top-[30vw] top-[55vh] w-[60vw] h-[60vw] opacity-100"
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

