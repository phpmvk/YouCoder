import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import { initializeApp } from 'firebase/app';
import { config } from './config/config';
import AuthRoute from './components/AuthRoute';
import DashboardPage from './pages/Dashboard';
import RecordingPage from './pages/Recording';
import DocsPage from './pages/Docs';
import VideoPage from './pages/Video';
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
          path='/video'
          element={<VideoPage />}
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
              <RecordingPage />
            </AuthRoute>
          }
        />
        <Route
          path='*'
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
