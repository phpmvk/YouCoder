import React from 'react';
import './Home.css';

interface BallProps {
    percentage: number;
  }

const BottomBall: React.FC<BallProps> = ({percentage}) => {
  return (
    <div 
    style={{
        width: percentage * 1000 - 220,
        height: percentage * 1000 - 220,
        position: 'absolute',
        transform: 'translate(50vw, 50vw)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, #ccff00, transparent, transparent, transparent, transparent)',
    }}
    ></div>
  )
}

export default BottomBall