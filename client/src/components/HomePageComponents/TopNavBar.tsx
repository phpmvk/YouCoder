import * as React from 'react';
import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import youcoderlogo from '../../assets/logo.png';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAuth, signOut } from 'firebase/auth';
import { editUser, removeUser } from '../../redux/userSlice';
import { AiFillVideoCamera } from 'react-icons/ai';
import { setSearchTerm, setSearchTriggered } from '../../redux/searchSlice';
import { persistor } from '../../redux/store';
import { toast } from 'react-toastify';
import Modal from '../Modal';
import { UserProfile } from './EditProfileForm';
import { CreatorUpdate } from '../../types/Creator';
import http from '../../services/userApi';
import { storage } from '../../App';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
  onEnterPress?: (event: React.KeyboardEvent) => void;
}

function TopNavBar({
  showSearch = false,
  showCreateRecording = false,
  showDashboard = true,
  showExamples = false,
  onEnterPress,
}: TopNavBarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [term, setTerm] = useState('');
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  // import the user from the reducer
  const user = useAppSelector((state) => state.user);
  const shortName = user.shortName;
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
        setLoggedIn(false);
        navigate('/');
        toast.success('Logged out successfully');
      })
      .catch((error: Error) => {
        console.error(error);
        toast.error('Error logging out');
      });
  }

  function handleSearchKeyPress(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      dispatch(setSearchTerm(term));
      dispatch(setSearchTriggered(true));
      navigate('/discover');
    }
  }

  function showEditProfile() {
    setShowEditProfileModal(true);
  }

  async function handleSave(userToUpdate: CreatorUpdate, blob?: Blob) {
    if (blob) {
      const storageRef = ref(storage, `users/${user.uid}`);
      const snapshot = await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(snapshot.ref);
      userToUpdate.picture = url;
    } else {
      userToUpdate.picture = user.picture;
    }
    http
      .creatorUpdate(userToUpdate)
      ?.then((res) => {
        dispatch(editUser({ ...user, ...res.data.user }));
        toast.success('Profile updated successfully');
      })
      .catch((err) => {
        console.error(err);
        toast.error('Error updating profile');
      });
    setShowEditProfileModal(false);
  }

  return (
    <>
      <Modal
        show={showEditProfileModal}
        closeModal={() => setShowEditProfileModal(false)}
        closeOnOutsideClick={false}
      >
        <UserProfile
          save={handleSave}
          cancel={() => setShowEditProfileModal(false)}
        />
      </Modal>
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
              <Link
                to='/'
                reloadDocument
              >
                <Typography
                  variant='h6'
                  noWrap
                  component='div'
                  sx={{ display: { xs: 'none', sm: 'block' } }}
                >
                  {' '}
                  <img
                    src={youcoderlogo}
                    style={{ height: '55px', marginBottom: '15px' }}
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
                    onKeyDown={handleSearchKeyPress}
                    placeholder='Explore Recordings…'
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
                {showDashboard && loggedIn && (
                  <Link to='/dashboard'>
                    <Button
                      className='hover:!underline'
                      color='inherit'
                    >
                      Dashboard
                    </Button>
                  </Link>
                )}
                <Link
                  reloadDocument
                  to='/discover'
                >
                  <Button
                    className='hover:!underline hover:!underline-offset-8'
                    color='inherit'
                  >
                    Discover
                  </Button>
                </Link>
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
                    <div className='dropdown dropdown-end'>
                      <label
                        tabIndex={0}
                        className='btn btn-ghost btn-circle avatar'
                      >
                        <div className='w-10 rounded-full'>
                          <img src={user.picture} />
                        </div>
                      </label>
                      <ul
                        tabIndex={0}
                        className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-bg-muigrey rounded-box w-52 text-white'
                      >
                        <li>
                          <button onClick={showEditProfile}>Profile</button>
                        </li>
                        <li>
                          <button onClick={logOut}>Logout</button>
                        </li>
                      </ul>
                    </div>
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
    </>
  );
}

export default TopNavBar;

// // Show the search bar on the dashboard page
// <TopNavBar showSearch={true} />

// // Hide the search bar on the home page
// <TopNavBar showSearch={false} />
