import React from 'react'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { Tooltip, styled } from '@mui/material';



const StyledTooltip = styled(({ className, ...props }) => (
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
    <StyledTooltip title="See it in Action" placement="top-start" 
      sx={{
        '.MuiTooltip-tooltip': {
          backgroundColor: 'white', 
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
        borderRadius: '5%',
      }}>
      
      <KeyboardDoubleArrowDownIcon/>

      </button>
    </StyledTooltip>
  )
}

export default GotoBottom

