import React from 'react';
import './Home.css';

interface BallProps {
  percentage: number;
}

const TopBall: React.FC<BallProps> = ({ percentage }) => {
  return <div className="top-ball"
  style={{
    width: percentage * 1000 - 220,
    height: percentage * 1000 - 220,
  }}
  ></div>;
};

export default TopBall;