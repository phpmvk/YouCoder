import React from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';

const ExampleFrame: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0.6, 1], [0, 1]);
  const width = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const height = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <>
      <div className='absolute w-screen h-[12.5vw] top-[470vw] 600:top-[400vw] sm:top-[400vw] 700:top-[370vw] md:top-[360vw] 900:top-[350vw] lg:top-[355vw] xl:top-[362vw] flex justify-center items-center'>
        <motion.div
          className='min-w-[910px] w-[25vw] h-[12.5vw] bg-bg-pri '
          style={{
            scale: scale,
            zIndex: 1000,
          }}
        >
          <div className=' hidden 850:block border border-white '>
            <iframe
              src='https://youcoder.io/player/5c15fdc9b5595d643f01e67c788318d3cd8b?embed=true&title=true&cover=true'
              width='900'
              height='480'
              allowFullScreen
              title='the end of the world'
              scrolling='no'
            />
          </div>
          <div
            className='w-[80vw] h-[45vw] 850:hidden mx-auto bg-cover bg-center text-bg-alt text-center p-10 pt-16 text-2xl sm:text-3xl'
            style={{
              backgroundImage: `url("public/playerpicture.svg")`,
            }}
          >
            To enjoy the complete playback experience, a minimum screen size of
            850px is required.
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ExampleFrame;
