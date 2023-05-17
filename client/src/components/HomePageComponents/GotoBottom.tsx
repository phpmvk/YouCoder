import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    '& .MuiTooltip-tooltip': {
      backgroundColor: 'white',
      color: 'black',
      fontSize: '16px',
    },
  });


const GotoBottom: React.FC = () => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const onScroll = () => {
      const scrollPercent = (window.scrollY) / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPercent >= 0.9) {
        setOpacity(1 - (scrollPercent - 0.8) * 10);
      } else {
        setOpacity(1);
      }
    }

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  }

  return (
    <StyledTooltip title="See it in action" placement="top-start" 
      sx={{
        '.MuiTooltip-tooltip': {
          backgroundColor: '#b4b4b4', 
          fontSize: '16px', 
          color: 'black', 
        }
      }}
    >
      <motion.button 
        onClick={scrollToBottom} 
        style={{
          cursor: 'pointer',
          position: 'fixed',
          bottom: '10vh',
          right: '2vw',
          zIndex: 9999,
          padding: '5px',
          backgroundColor: 'white',
          opacity: opacity,
          borderRadius: '50%',
        }}
      >
      
      <KeyboardDoubleArrowDownIcon/>

      </motion.button>
    </StyledTooltip>
  )
}

export default GotoBottom
