import React from 'react';
import './Home.css';

interface BallProps {
    percentage: number;
  }

const BottomBall: React.FC<BallProps> = ({percentage}) => {
  return (
    <div className="bottom-ball"
    style={{
        width: percentage * 1000 - 220,
        height: percentage * 1000 - 220,
    }}
    ></div>
  )
}

export default BottomBall