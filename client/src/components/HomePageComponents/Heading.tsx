import React from 'react';
import './Home.css';

  interface HeadingProps {
    percentage: number;
  }
  
  const Heading: React.FC<HeadingProps> = ({ percentage }) => {
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
    ];


  return (
   
    <div className="heading">
        {/* blinking dot */}
        {percentage > 0.9 && (
              <div className="blinking-dot"/>
            )}
              <div
                className="heading-text"
                style={{
                  fontSize: 48 + percentage * 100,
                }}
              >
                {text.map((char, index) => {
                  const opacity = Math.min(percentage * 10 - index, 1);
                  const isCursor = percentage * 10 - index <= 0;
                  return (
                    <React.Fragment key={index}>
                      {isCursor && (
                        <span className="text-white blinking-cursor">|</span>
                      )}
                      <span
                        className={
                          char === '{' || char === '}'
                            ? 'text-purple'
                            : 'text-white'
                        }
                        style={{ opacity }}
                      >
                        {char}
                      </span>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
  )
}

export default Heading;