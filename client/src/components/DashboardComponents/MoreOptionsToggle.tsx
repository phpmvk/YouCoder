import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ThemeProvider, createTheme } from '@mui/material';
import Modal from '../Modal';

const options = ['Delete Recording'];

const ITEM_HEIGHT = 48;

interface MoreOptionsToggleProps {
  recording_id: string;
}

const MoreOptionsToggle: React.FC<MoreOptionsToggleProps> = ({
  recording_id,
}) => {
  const [showModal, setShowModal] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const theme = createTheme({ palette: { primary: { main: '#d8d8d8' } } });

  const handleClose = () => {
    setAnchorEl(null);
    setShowModal(true);

    // if delete recording is clicked, send a delete request to the backend
  };

  return (
    <>
      <div>
        <ThemeProvider theme={theme}>
          <IconButton
            aria-label='more'
            id='long-button'
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup='true'
            onClick={handleClick}
            color='primary'
          >
            <MoreVertIcon />
          </IconButton>
        </ThemeProvider>
        <Menu
          id='long-menu'
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '16ch',
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              selected={option === 'Pyxis'}
              onClick={handleClose}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </>
  );
};

export default MoreOptionsToggle;
