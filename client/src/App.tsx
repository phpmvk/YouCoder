import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import { initializeApp } from 'firebase/app';
import { config } from './config/config';
import AuthRoute from './components/AuthRoute';
import DashboardPage from './pages/Dashboard';
import CreateRecordingPage from './pages/CreateRecording';
import DocsPage from './pages/Docs';
import PlayerPage from './pages/Player';
import NotFoundPage from './pages/NotFound';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, editUser } from './redux/userSlice';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { getStorage } from 'firebase/storage';
import { useEffect, useState } from 'react';
import http from './services/userApi';

export const Firebase = initializeApp(config.firebaseConfig);
export const storage = getStorage(Firebase);

function App() {
  const dispatch = useAppDispatch();
  // add a useEffect here to check if there is a token to get the user from the backend and upfate the store
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      login();
    }
  }, []);

  async function login() {
    await http
      .creatorLogin()
      .then((response) => {
        console.log('user from backend response: ', response.data);
        dispatch(setUser({ user: response.data.user }));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // const user = useAppSelector((state) => state.user);
  // console.log('user: ', user);
  // const dispatch = useAppDispatch();
  // dispatch(editUser({ avatar: ' ' }));
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<HomePage />}
        />
        <Route
          path='/login'
          element={<LoginPage />}
        />
        <Route
          path='/docs'
          element={<DocsPage />}
        />
        <Route
          path='/player/:id'
          element={<PlayerPage />}
        />
        <Route
          path='/dashboard'
          element={
            <AuthRoute>
              <DashboardPage />
            </AuthRoute>
          }
        />
        <Route
          path='/recording'
          element={
            <AuthRoute>
              <CreateRecordingPage />
            </AuthRoute>
          }
        />
        <Route
          path='*'
          element={<NotFoundPage type={'404'} />}
        />
        <Route
          path='/404'
          element={<NotFoundPage type={'404'} />}
        />
        <Route
          path='/oops'
          element={<NotFoundPage type={'500'} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
