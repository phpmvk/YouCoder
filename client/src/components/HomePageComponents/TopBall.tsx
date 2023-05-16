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
        className="absolute bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-800 via-purple-800 to-cyan-100 rounded-full  top-[40vh] sm:top-[55vh] w-[60vw] h-[60vw] opacity-100"
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

