// import React, { useState, useEffect, useRef } from 'react';

// const TeachInteractively = () => {
//   const [isActive, setIsActive] = useState(false);
//   const [scrollPosition, setScrollPosition] = useState(0);
//   const ref = useRef<HTMLDivElement>(null); // explicitly specify the type of the ref

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrollPosition(window.scrollY);
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         console.log('entries: ', entries);
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setIsActive(true);
//           } else {
//             setIsActive(false);
//           }
//         });
//       },
//       {
//         threshold: 0.5,
//       }
//     );

//     if (ref.current) {
//       observer.observe(ref.current);
//     }

//     return () => {
//       if (ref.current) {
//         observer.unobserve(ref.current);
//       }
//     };
//   }, []);

//   const marginLeft = scrollPosition * 0.06;

//   return (
//     <div ref={ref} className="whitespace-nowrap z-50 xl:text-[5rem] lg:text-6xl md:text-6xl md:visible sm:visible text-4xl ">
//       <div
//         className='text-white'
//         style={{  marginLeft: `${marginLeft}vw` }}
//       >
//         <span className='text-white'>Teach Inter</span>
//         <span
//           style={{ fontWeight: 600 }}
//           className={isActive ? 'animate-turnYellow' : ''}
//         >
//           actively.
//         </span>
//       </div>
//     </div>
//   );
// };

// export default TeachInteractively;



import React from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';

const AnimatedLetter: React.FC<{ index: number; children: React.ReactNode }> = ({ index, children }) => {
  const { scrollYProgress } = useScroll();
  const color = useTransform(scrollYProgress, (value) => (value > index * 0.05 ? '#ccff00' : 'white'));

  return <motion.span style={{ color, fontWeight: 600 }}>{children}</motion.span>;
};

const TeachInteractively = () => {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 0.6], ['100vw', '-100vw']);
  const y = useTransform(scrollYProgress, [0, 0.3], ['0', '10vw']);

  const activeText = 'actively.';

  return (
    <motion.div className="whitespace-nowrap z-50 xl:text-[5rem] lg:text-6xl md:text-6xl md:visible sm:visible text-4xl" style={{ x,y }}>
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



