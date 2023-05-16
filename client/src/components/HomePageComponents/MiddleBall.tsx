import React from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import Explainer from './Explainer';


const MiddleBall = () => {
  const { scrollYProgress } = useScroll();

  const scale = useTransform(scrollYProgress, [0.3, 0.5], [2, 3]);
  const y = useTransform(scrollYProgress, [0, 0.5], ['0vw', '0vw']);

  return (
    <>
      <div className="py-10">
      <motion.div
        className=" text-2xl md:text-4xl p-20 h-[30vw] w-[30vw] z-10 top-[145vh] md:top-[193vw] lg:top-[178vw] "
        style={{
          position: 'absolute',
          left: '35%',
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
     </div>
    </>
  );
};

export default MiddleBall;
