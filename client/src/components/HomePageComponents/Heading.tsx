import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface HeadingProps {}

const Heading: React.FC<HeadingProps> = () => {
  const { scrollYProgress } = useScroll();
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) =>
      setShowCursor(v < 0.025)
    );
    return unsubscribe;
  }, [scrollYProgress]);

  const text: string[] = [
    'Y',
    'o',
    'u',
    ' ',
    '{',
    'C',
    'o',
    'd',
    'e',
    'r',
    '}',
    '·',
  ];

  return (
    <div className='h-[50vw] mt-[20vh] sm:mt-[40vh] whitespace-nowrap'>
      <div className='text-center whitespace-no-wrap font-semibold  z-20  lg:text-8xl md:text-7xl sm:text-6xl text-5xl'>
        {text.map((char, index) => (
          <React.Fragment key={index}>
            {char !== '·' && char !== '}' && (
              <span className={char === '{' ? 'text-bg-sec' : 'text-white'}>
                {char}
              </span>
            )}
            {char === '·' && (
              <motion.span
                className='absolute text-7xl lg:text-8xl text-red-700 mx-5 md:mx-8 -mt-20 lg:-mt-28'
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {char}
              </motion.span>
            )}
            {char === 'r' && showCursor && (
              <span className='text-white animate-blink'>|</span>
            )}
            {char === '}' && !showCursor && (
              <span className='text-bg-sec '>{`}`}</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Heading;
