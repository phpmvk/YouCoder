import React from 'react';


interface BallProps {
    percentage: number;
  }

const MiddleBall: React.FC<BallProps> = ({percentage}) => {
  return (
    <div 
    style={{
        width: percentage * 1000 - 220,
        height: percentage * 1000 - 220,
        position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    background: 'radial-gradient(circle, black, black, black, black, black, black, #b300ff, white, black)',
    boxShadow:
      '0 0 0.3vw 0.3vw rgba(204, 255, 0, 0.9), 0 0 1vw 1vw rgba(255, 255, 255, 0.6), 0 0 2vw 2vw rgba(255, 255, 255, 0.3), 0 0 3vw 3vw rgba(255, 255, 255, 0.2)',
    color: 'white',
    fontSize: '9rem',
    fontWeight: '600',
      }}>
<div>
  <div>Code.</div>
  <div>Record
  <span className="text-red-700 animate-[blinking_1s_infinite] " >.</span></div>
  <div>Share.</div>
  <div>Engage.</div>
</div>
</div>
  )
}

export default MiddleBall