import React from 'react';


interface BallProps {
  percentage: number;
}

const TopBall: React.FC<BallProps> = ({ percentage }) => {
  return <div 
  style={{
    width: percentage * 1000 - 220,
    height: percentage * 1000 - 220,
    position: 'absolute',
    transform: 'translate(-40vw, -40vw)',
    borderRadius: '50%',
    background: 'linear-gradient(75deg, black, black, black, black, #b300ff, white)',
  }}
  ></div>;
};

export default TopBall;