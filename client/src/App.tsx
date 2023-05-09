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

export const Firebase = initializeApp(config.firebaseConfig);

function App() {
  const user = useAppSelector((state) => state.user);
  console.log('user: ', user);
  const dispatch = useAppDispatch();
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
            // <AuthRoute>
              <DashboardPage />
            // </AuthRoute>
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
