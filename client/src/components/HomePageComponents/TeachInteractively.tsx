import React, { useState, useEffect, useRef } from 'react';

const TeachInteractively = () => {
  const [isActive, setIsActive] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        console.log('entries: ', entries);
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsActive(true);
          } else {
            setIsActive(false);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const marginLeft = scrollPosition * 0.08;

  return (
    <div ref={ref} className="whitespace-nowrap z-50 xl:text-[5rem] lg:text-6xl md:text-6xl md:visible sm:visible text-4xl ">
      <div
        className='text-white'
        style={{  marginLeft: `${marginLeft}vw` }}
      >
        <span className='text-white'>Teach Inter</span>
        <span
          style={{ fontWeight: 600 }}
          className={isActive ? 'animate-turnYellow' : ''}
        >
          actively.
        </span>
      </div>
    </div>
  );
};

export default TeachInteractively;
