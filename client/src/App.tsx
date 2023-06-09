import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import { initializeApp } from 'firebase/app';
import { config } from './config/config';
import AuthRoute from './components/AuthRoute';
import CreateRecordingPage from './pages/CreateRecording';
import DocsPage from './pages/Docs';
import PlayerPage from './pages/Player';
import NotFoundPage from './pages/NotFound';
import { getStorage } from 'firebase/storage';
import LoadingSpinner from './components/LoadingSpinner';
import { useAppSelector } from './redux/hooks';

import NewDashboardPage from './pages/NewDashboard';
import Footer from './components/HomePageComponents/Footer';
import LoadingPage from './components/LoadingPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DiscoverPage from './pages/Discover';

export const Firebase = initializeApp(config.firebaseConfig);
export const storage = getStorage(Firebase);

function App() {
  const { loadingSpinner, loadingPage } = useAppSelector(
    (state) => state.loadingSpinner
  );

  return (
    <>
      <ToastContainer
        autoClose={500}
        theme='dark'
        position='bottom-right'
        hideProgressBar={true}
        icon={false}
        closeButton={false}
      />
      <LoadingSpinner show={loadingSpinner} />
      <LoadingPage show={loadingPage} />
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
            path='/discover'
            element={<DiscoverPage />}
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
