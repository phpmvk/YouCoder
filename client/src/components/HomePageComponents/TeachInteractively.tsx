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

  const marginLeft = scrollPosition * 0.02;

  return (
    <div ref={ref} >
      <div
        className="text-white"
        style={{ fontSize: '5rem', marginLeft: `${marginLeft}vw` }}
      >
        <span className="text-white">Teach Inter</span>
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
