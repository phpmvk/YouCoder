// import React from 'react';


// interface BallProps {
//     percentage: number;
//   }

// const BottomBall: React.FC<BallProps> = ({percentage}) => {
//   return (
//     <div 
//     style={{
//         width: percentage * 1000 - 220,
//         height: percentage * 1000 - 220,
//         position: 'absolute',
//         transform: 'translate(50vw, 50vw)',
//         borderRadius: '50%',
//         background: 'radial-gradient(circle, #ccff00, transparent, transparent, transparent, transparent)',
//     }}
//     ></div>
//   )
// }

// export default BottomBall;


import { motion, useTransform, useScroll } from 'framer-motion';
import React from 'react';

const BottomBall: React.FC = () => {
  const { scrollYProgress } = useScroll();

  const scale = useTransform(scrollYProgress, [0.5, 1], [1, 2]);
  const x = useTransform(scrollYProgress, [0.3, 1], ['100vw', '-70vw']);
  const y = useTransform(scrollYProgress, [0.3, 1], ['50vw', '200vw']);
  const opacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);
  

  return (
    <>
      <motion.div
        className="absolute rounded-full z-0 "
        style={{
          x,
          y,
          scale,
          originX: 0,
          originY: 0,
          background: 'radial-gradient(circle, #ccff00, transparent,transparent,transparent)',
          
          width: '30vw',
          height: '30vw',
        }}
      />
      <motion.div
        className="absolute rounded-full z-0"
        style={{
          x,
          y,
          scale,
          originX: 0,
          originY: 0,
          background: 'radial-gradient(circle,  #b300ff, #050505, #b300ff, transparent, transparent, transparent, transparent )',
          
          width: '30vw',
          height: '30vw',
          opacity: opacity,
        }}
      />
    </>
  );
};

export default BottomBall;






