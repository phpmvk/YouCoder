import * as React from 'react';
import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import youcoderlogo from '../../assets/logo.svg';
import { Button } from '@mui/material';
import { Link, Router, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAuth, signOut } from 'firebase/auth';
import { removeUser } from '../../redux/userSlice';
import { AiFillVideoCamera } from 'react-icons/ai';
import { setSearchTerm } from '../../redux/searchSlice';
import { persistor } from '../../redux/store';
import { toast } from 'react-toastify';

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [term, setTerm] = useState('');

  // import the user from the reducer
  const { shortName } = useAppSelector((state) => state.user);
  const [loggedIn, setLoggedIn] = useState(shortName ? true : false);

  const auth = getAuth();

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTerm(e.target.value);
    dispatch(setSearchTerm(e.target.value));
  }

  function logOut() {
    signOut(auth)
      .then(() => {
        localStorage.removeItem('token');
        dispatch(removeUser({}));
        persistor.purge();
        console.log('signed out');
        setLoggedIn(false);
        navigate('/');
        toast.success('Logged out successfully');
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }

  // const isMenuOpen = Boolean(anchorEl);
  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

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

  return (
    <div className='sticky top-0 z-40'>
      <Box sx={{ flexGrow: 1, height: '60px' }}>
        <AppBar
          sx={{
            backgroundColor: '#050505',
            maxHeight: '60px',
            boxShadow: '0 4px 2px -2px #2a2a2a ',
          }}
        >
          <Toolbar>
            <Link to='/'>
              <Typography
                variant='h6'
                noWrap
                component='div'
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                {' '}
                <img
                  src={youcoderlogo}
                  style={{ width: '80px', height: '80px' }}
                ></img>
              </Typography>
            </Link>
            {showSearch && (
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  value={term}
                  onChange={handleSearchChange}
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
                <Link to='/recording'>
                  <Button
                    className='w-full h-full t-[10vw] border-solid !border-2 !border-red-700 hover:!bg-red-700/30 !text-white !rounded-full !text-l !mr-6 whitespace-nowrap'
                    color='inherit'
                    variant='outlined'
                  >
                    <AiFillVideoCamera className='text-red-700 mr-2 text-lg' />
                    Create Recording
                  </Button>
                </Link>
              )}

              {/* Conditionally render the Dashboard button */}
              {showDashboard && (
                <Link to='/dashboard'>
                  <Button
                    className='hover:!underline'
                    color='inherit'
                  >
                    Dashboard
                  </Button>
                </Link>
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
              <Link to='/docs'>
                <Button
                  className='hover:!underline hover:!underline-offset-8'
                  color='inherit'
                >
                  FAQ
                </Button>
              </Link>
            </Box>
            <Box>
              {loggedIn ? (
                <>
                  <Button
                    className='!border-bg-alt !text-bg-alt hover:!text-bg-pri hover:!bg-bg-alt !h-8 !my-auto whitespace-nowrap'
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
                      className='!border-bg-alt !text-bg-pri hover:!bg-bg-pri hover:!text-bg-alt !h-8 !my-auto !bg-bg-alt '
                      variant='outlined'
                    >
                      Sign In
                    </Button>
                  </Link>
                </>
              )}

            
            </Box>
           
          </Toolbar>
        </AppBar>
        
      </Box>
    </div>
  );
}

export default TopNavBar;

// // Show the search bar on the dashboard page
// <TopNavBar showSearch={true} />

// // Hide the search bar on the home page
// <TopNavBar showSearch={false} />
