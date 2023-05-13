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
import { getStorage } from 'firebase/storage';
import LoadingSpinner from './components/LoadingSpinner';
import { useAppSelector } from './redux/hooks';
import NewDashboardPage from './pages/NewDashboard';
import Footer from './components/HomePageComponents/Footer';

export const Firebase = initializeApp(config.firebaseConfig);
export const storage = getStorage(Firebase);

function App() {
  const { loadingSpinner } = useAppSelector((state) => state.loadingSpinner);

  return (
    <>
      <LoadingSpinner show={loadingSpinner} />
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
                <NewDashboardPage />
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
      <Footer />
    </>
  );
}

export default App;
