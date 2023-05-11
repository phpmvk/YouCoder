import React from 'react';


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
   
    <div className="h-[75vh] whitespace-nowrap">
        {percentage > 0.9 && (
              <div className="absolute w-4 h-4 lg:w-5 lg:h-5  bg-red-700 top-[5%] right-[20%] rounded-full animate-[blinking_1s_infinite]"/>
            )}
              <div
                className="text-center whitespace-no-wrap font-semibold mt-[35vh] z-1 xl:text-[150px] lg:text-8xl md:text-8xl text-7xl"
                // style={{
                //   fontSize: 48 + percentage * 100,
                // }}
              >
                {text.map((char, index) => {
                  const opacity = Math.min(percentage * 10 - index, 1);
                  const isCursor = percentage * 10 - index <= 0;
                  return (
                    <React.Fragment key={index}>
                      {isCursor && (
                        <span className="text-white animate-[blinking_1.5s_infinite]">|</span>
                      )}
                      <span
                        className={
                          char === '{' || char === '}'
                            ? 'text-bg-sec'
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