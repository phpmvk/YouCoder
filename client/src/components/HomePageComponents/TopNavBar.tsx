import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import youcoderlogo from './youcoderlogo.png';
import { Button } from '@mui/material';
import { Link, Router, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAuth, signOut } from 'firebase/auth';
import { removeUser } from '../../redux/userSlice';
import { AiFillVideoCamera } from 'react-icons/ai';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#202123',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

interface TopNavBarProps {
  showSearch?: boolean;
  showCreateRecording?: boolean;
  showDashboard?: boolean;
  showFeatures?: boolean;
  showExamples?: boolean;
}

function TopNavBar({
  showSearch = false,
  showCreateRecording = false,
  showDashboard = false,
  showFeatures = false,
  showExamples = false,
}: TopNavBarProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // import the user from the reducer
  const { shortName } = useAppSelector((state) => state.user);
  console.log('short name: ', shortName);
  const [loggedIn, setLoggedIn] = React.useState(shortName ? true : false);

  const auth = getAuth();

  function logOut() {
    signOut(auth)
      .then(() => {
        localStorage.removeItem('token');
        dispatch(removeUser({}));
        console.log('signed out');
        setLoggedIn(false);
        navigate('/');
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Log In</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem></MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, height: '60px' }}>
      <AppBar sx={{ backgroundColor: '#050505', maxHeight: '60px' }}>
        <Toolbar>
          <Link to='/'>
            <Typography
              variant='h6'
              noWrap
              component='div'
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              {' '}
              LOGO
              {/* <img src={youcoderlogo} style={{width: '80px', height: '80px'}}></img>  */}
            </Typography>
          </Link>
          {showSearch && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder='Search…'
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: 'flex',
              // justifyContent: 'space-between',
              alignItems: 'center',
              // width: '25%',
              marginRight: 2,
            }}
          >
            {/* Conditionally render the Create Recording button */}
            {showCreateRecording && (
              <Button
                className='w-full h-full t-[10vw] border-solid !border-2 !border-red-700 hover:!bg-red-700/20 !text-white !rounded-full !text-l !mr-6'
                color='inherit'
                variant='outlined'
              >
                <AiFillVideoCamera className='text-red-700 mr-2 text-lg' />
                Create Recording
              </Button>
            )}

            {/* Conditionally render the Dashboard button */}
            {showDashboard && (
              <Button
                className='hover:!underline'
                color='inherit'
              >
                Dashboard
              </Button>
            )}
            {showFeatures && (
              <Button
                className='hover:!underline hover:!underline-offset-8'
                color='inherit'
              >
                Features
              </Button>
            )}
            {showExamples && (
              <Button
                className='hover:!underline hover:!underline-offset-8'
                color='inherit'
              >
                Examples
              </Button>
            )}
            <Button
              className='hover:!underline hover:!underline-offset-8'
              color='inherit'
            >
              Docs
            </Button>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {loggedIn ? (
              <>
                <Button
                  className='!border-bg-alt !text-bg-alt hover:!text-bg-pri hover:!bg-bg-alt !h-8 !my-auto'
                  variant='outlined'
                  onClick={logOut}
                >
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Link to='/login'>
                  <Button
                    // className='!border-bg-alt !text-bg-alt hover:!text-bg-pri hover:!bg-bg-alt !h-8 !my-auto'
                    className='!border-bg-alt !text-bg-pri hover:!bg-bg-pri hover:!text-bg-alt !h-8 !my-auto !bg-bg-alt'
                    variant='outlined'
                  >
                    Sign In
                  </Button>
                </Link>
              </>
            )}

            {/* <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
              color='inherit'
            >
              <AccountCircle />
            </IconButton> */}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

export default TopNavBar;

// // Show the search bar on the dashboard page
// <TopNavBar showSearch={true} />

// // Hide the search bar on the home page
// <TopNavBar showSearch={false} />
