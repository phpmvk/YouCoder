import React from 'react';
import './Home.css';

interface BallProps {
    percentage: number;
  }

const MiddleBall: React.FC<BallProps> = ({percentage}) => {
  return (
    <div className="middle-ball"
    style={{
        width: percentage * 1000 - 220,
        height: percentage * 1000 - 220,
      }}>
<div>
  <div>Code.</div>
  <div>Record
  <span className="blinking-dot2" style={{ color: 'red' }}>.</span></div>
  <div>Share.</div>
  <div>Engage.</div>
</div>
</div>
  )
}

export default MiddleBall