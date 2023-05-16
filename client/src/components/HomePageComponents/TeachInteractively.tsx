import React from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';


const AnimatedLetter: React.FC<{ index: number; children: React.ReactNode }> = ({ index, children }) => {
  const { scrollYProgress } = useScroll();
  const color = useTransform(scrollYProgress, (value) => (value > index * 0.01 ? '#ccff00' : 'white'));

  return <motion.span style={{ color, fontWeight: 600 }}>{children}</motion.span>;
};

const TeachInteractively = () => {

  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0.02, 0.2], ['90vw', '2vw']);
  const y = useTransform(scrollYProgress, [0.02, 0.2], ['-50', '15vw']);

  const activeText = 'actively.';

  return (
    <motion.div className="whitespace-nowrap z-50 xl:text-[5rem] lg:text-6xl md:text-6xl md:visible sm:visible text-4xl  mt-20 sm:mt-0" style={{ x,y }}>
      <div className='text-white'>
        <span>Teach Inter</span>
        {Array.from(activeText).map((letter, i) => (
          <AnimatedLetter key={i} index={i}>
            {letter}
          </AnimatedLetter>
        ))}
      </div>
    </motion.div>
  );
};

export default TeachInteractively;



