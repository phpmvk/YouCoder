import React from 'react'
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
      <button onClick={scrollToBottom} style={{
        cursor: 'pointer',
        position: 'fixed',
        bottom: '10vh',
        right: '2vw',
        zIndex: 9999,
        padding: '5px',
        backgroundColor: 'white',
        opacity: '70%',
        borderRadius: '50%',
      }}>
      
      <KeyboardDoubleArrowDownIcon/>

      </button>
    </StyledTooltip>
  )
}

export default GotoBottom

